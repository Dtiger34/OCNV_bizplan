import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { existsSync } from 'fs';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);
  const frontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:5173');

  app.useLogger(app.get(Logger));

  app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('OCNV API')
    .setDescription('OCNV — Nền tảng Thương mại Điện tử Làng Nghề Việt Nam')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Serve FE index.html for all non-API routes (SPA fallback)
  const feDistIndex = join(process.cwd(), 'fe', 'dist', 'index.html');
  if (existsSync(feDistIndex)) {
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('*', (_req: unknown, res: { sendFile: (path: string) => void }) => {
      res.sendFile(feDistIndex);
    });
  }

  await app.listen(port);
}

bootstrap();
