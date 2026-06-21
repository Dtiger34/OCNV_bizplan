import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:5173'),

  MONGODB_URI: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

  COOKIE_SECRET: Joi.string().min(32).required(),

  SENDGRID_API_KEY: Joi.string().allow('').optional(),
  EMAIL_FROM: Joi.string().email().default('noreply@ocnv.vn'),
  SMTP_HOST: Joi.string().default('smtp.gmail.com'),
  SMTP_PORT: Joi.number().default(587),
  SMTP_USER: Joi.string().allow('').optional(),
  SMTP_PASS: Joi.string().allow('').optional(),
  APP_URL: Joi.string().uri().default('http://localhost:3000'),

  // PayOS Payment
  PAYOS_CLIENT_ID: Joi.string().allow('').optional(),
  PAYOS_API_KEY: Joi.string().allow('').optional(),
  PAYOS_CHECKSUM_KEY: Joi.string().allow('').optional(),
  PAYOS_RETURN_URL: Joi.string().uri().allow('').optional(),
  PAYOS_CANCEL_URL: Joi.string().uri().allow('').optional(),

});
