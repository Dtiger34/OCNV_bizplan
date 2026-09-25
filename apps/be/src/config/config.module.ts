import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Resolve the backend .env independently of the startup working directory.
      // Runtime environment variables still take precedence over file values.
      envFilePath: [resolve(__dirname, '../../.env'), resolve(process.cwd(), '.env')],
      validationSchema: configSchema,
      validationOptions: { abortEarly: false },
    }),
  ],
})
export class AppConfigModule {}
