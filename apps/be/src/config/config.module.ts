import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '..', '..', '.env'),
      validationSchema: configSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
})
export class AppConfigModule {}
