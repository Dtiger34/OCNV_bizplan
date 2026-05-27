import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { AuthRepository } from './auth.repository';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../email/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserStatus } from '../../common/enums';

@Injectable()
export class AuthService {
  private readonly accessTokenTtlMs = 15 * 60 * 1000;
  private readonly refreshTokenTtlMs = 30 * 24 * 60 * 60 * 1000;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.authRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException({ error: 'CONFLICT', message: 'Email đã được sử dụng.' });
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');
    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.usersRepository.create({
      fullName: dto.fullName,
      email: dto.email.toLowerCase().trim(),
      password: passwordHash,
      status: UserStatus.UNVERIFIED,
      emailVerifyToken,
      emailVerifyExpires,
    });

    this.emailService.sendVerificationEmail(dto.email, emailVerifyToken);

    return { message: 'Registration successful. Please check your email to verify your account.' };
  }

  async login(dto: LoginDto, res: Response): Promise<Record<string, unknown>> {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({ error: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu không đúng.' });
    }

    if (user.status === UserStatus.LOCKED) {
      throw new ForbiddenException({ error: 'ACCOUNT_LOCKED', message: 'Tài khoản đã bị khóa.' });
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({ error: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu không đúng.' });
    }

    const payload = { sub: String(user._id), email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'refresh-secret'),
      expiresIn: '30d',
    });

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.updateUser(String(user._id), { refreshToken: refreshTokenHash });

    const csrfToken = crypto.randomBytes(32).toString('hex');

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: this.accessTokenTtlMs,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: this.refreshTokenTtlMs,
    });
    res.cookie('csrf-token', csrfToken, {
      httpOnly: false,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: this.accessTokenTtlMs,
    });

    return {
      _id: String(user._id),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl ?? null,
    };
  }

  async logout(userId: string, res: Response): Promise<void> {
    await this.authRepository.updateUser(userId, { refreshToken: undefined });
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.clearCookie('csrf-token');
  }

  async refresh(refreshToken: string, res: Response): Promise<{ message: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException({ error: 'INVALID_REFRESH_TOKEN', message: 'Refresh token không hợp lệ.' });
    }

    let payload: { sub: string; email: string; role: string };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'refresh-secret'),
        issuer: this.configService.get<string>('JWT_ISSUER', 'ocnv'),
        audience: this.configService.get<string>('JWT_AUDIENCE', 'ocnv-client'),
      });
    } catch {
      throw new UnauthorizedException({ error: 'INVALID_REFRESH_TOKEN', message: 'Refresh token không hợp lệ.' });
    }

    const user = await this.authRepository.findByRefreshToken(payload.sub);
    if (!user) {
      throw new UnauthorizedException({ error: 'INVALID_REFRESH_TOKEN', message: 'Refresh token không hợp lệ.' });
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken!);
    if (!isMatch) {
      throw new UnauthorizedException({ error: 'INVALID_REFRESH_TOKEN', message: 'Refresh token không hợp lệ.' });
    }

    const newPayload = { sub: String(user._id), email: user.email, role: user.role };
    const newAccessToken = this.jwtService.sign(newPayload);
    const csrfToken = crypto.randomBytes(32).toString('hex');

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: this.accessTokenTtlMs,
    });
    res.cookie('csrf-token', csrfToken, {
      httpOnly: false,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: this.accessTokenTtlMs,
    });

    return { message: 'Token refreshed.' };
  }

  async getMe(userId: string): Promise<Record<string, unknown>> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', message: 'Unauthorized.' });
    }
    const u = user as any;
    return {
      _id: String(u._id),
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      avatarUrl: u.avatarUrl ?? null,
      phone: u.phone ?? null,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.authRepository.findByEmail(dto.email);
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      await this.authRepository.updateUser(String(user._id), {
        passwordResetToken: token,
        passwordResetExpires: expires,
      });
      this.emailService.sendPasswordResetEmail(user.email, token);
    }
    return { message: 'If this email exists, a reset link has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.authRepository.findByPasswordResetToken(dto.token);
    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException({ error: 'INVALID_TOKEN', message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    await this.authRepository.updateUser(String(user._id), {
      password: passwordHash,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
      refreshToken: undefined,
    });

    return { message: 'Password reset successfully.' };
  }
}
