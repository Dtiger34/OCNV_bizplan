import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

const ALLOWED_TYPES: Record<string, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  glb: ['model/gltf-binary', 'application/octet-stream'],
  video: ['video/mp4', 'video/webm'],
  general: ['image/jpeg', 'image/png', 'image/webp', 'model/gltf-binary', 'application/octet-stream', 'video/mp4'],
};

const MAX_SIZE_BYTES = 50 * 1024 * 1024;

@Injectable()
export class UploadService {
  private readonly uploadsRoot: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadsRoot = path.join(process.cwd(), configService.get<string>('STATIC_FILES_PATH', './uploads'));
    this.baseUrl = configService.get<string>('APP_URL', 'http://localhost:3000');
  }

  async saveFile(file: Express.Multer.File, type: string): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException({ error: 'VALIDATION_ERROR', message: 'Không có file được gửi lên.' });
    }

    if (file.size > MAX_SIZE_BYTES) {
      throw new BadRequestException({ error: 'FILE_TOO_LARGE', message: 'File vượt quá dung lượng cho phép (50MB).' });
    }

    const allowedMimes = ALLOWED_TYPES[type] ?? ALLOWED_TYPES['general'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException({ error: 'INVALID_FILE_TYPE', message: 'Loại file không được hỗ trợ.' });
    }

    const dir = path.join(this.uploadsRoot, type);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomBytes(16).toString('hex')}${ext}`;
    fs.writeFileSync(path.join(dir, filename), file.buffer);

    return { url: `${this.baseUrl}/static/${type}/${filename}` };
  }
}
