import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.from = configService.get<string>('EMAIL_FROM', 'noreply@ocnv.vn');
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
    });
  }

  sendVerificationEmail(email: string, token: string): void {
    const url = `${this.configService.get('FRONTEND_URL', 'http://localhost:5173')}/verify-email?token=${token}`;
    this.send(email, 'Xác thực tài khoản OCNV', this.verifyTemplate(url)).catch((err) =>
      this.logger.error({ err }, 'Failed to send verification email'),
    );
  }

  sendPasswordResetEmail(email: string, token: string): void {
    const url = `${this.configService.get('FRONTEND_URL', 'http://localhost:5173')}/reset-password?token=${token}`;
    this.send(email, 'Đặt lại mật khẩu OCNV', this.resetTemplate(url)).catch((err) =>
      this.logger.error({ err }, 'Failed to send password reset email'),
    );
  }

  sendOrderConfirmationEmail(email: string, orderCode: string): void {
    this.send(email, `Xác nhận đơn hàng ${orderCode}`, this.orderConfirmTemplate(orderCode)).catch(
      (err) => this.logger.error({ err }, 'Failed to send order confirmation email'),
    );
  }

  sendDeliveryUpdateEmail(email: string, orderCode: string, status: string): void {
    this.send(email, `Cập nhật đơn hàng ${orderCode}`, this.deliveryUpdateTemplate(orderCode, status)).catch(
      (err) => this.logger.error({ err }, 'Failed to send delivery update email'),
    );
  }

  private send(to: string, subject: string, html: string): Promise<void> {
    return this.transporter.sendMail({ from: this.from, to, subject, html }).then(() => undefined);
  }

  private verifyTemplate(url: string): string {
    return `<p>Xin chào,</p><p>Nhấn <a href="${url}">vào đây</a> để xác thực tài khoản OCNV của bạn.</p><p>Link có hiệu lực trong 24 giờ.</p>`;
  }

  private resetTemplate(url: string): string {
    return `<p>Bạn đã yêu cầu đặt lại mật khẩu.</p><p>Nhấn <a href="${url}">vào đây</a> để đặt lại mật khẩu.</p><p>Link có hiệu lực trong 1 giờ.</p>`;
  }

  private orderConfirmTemplate(orderCode: string): string {
    return `<p>Đơn hàng <strong>${orderCode}</strong> của bạn đã được xác nhận. Chúng tôi sẽ xử lý trong thời gian sớm nhất.</p>`;
  }

  private deliveryUpdateTemplate(orderCode: string, status: string): string {
    return `<p>Đơn hàng <strong>${orderCode}</strong> đã được cập nhật trạng thái: <strong>${status}</strong>.</p>`;
  }
}
