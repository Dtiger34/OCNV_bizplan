# Backend Rules — NestJS + MongoDB

## Project Structure

```
src/
  common/           # decorators, filters, guards, interceptors, pipes dùng chung
  config/           # env config, validation schema (class-validator)
  modules/
    <feature>/
      <feature>.module.ts
      <feature>.controller.ts   # routes only
      <feature>.service.ts      # business logic
      <feature>.repository.ts   # DB queries (Mongoose)
      dto/
        create-<feature>.dto.ts
        update-<feature>.dto.ts
        <feature>-response.dto.ts
      schemas/
        <feature>.schema.ts     # Mongoose schema + document type
  app.module.ts
  main.ts
test/
  unit/
  integration/
```

- Mỗi feature là 1 NestJS module riêng trong `src/modules/<feature>/`
- Không tạo file quá 300 dòng — tách module nếu vượt
- Export service ra ngoài module qua `exports` array, không inject trực tiếp qua đường vòng

## Layer Rules

- **Controller**: parse request, gọi service, trả response — không chứa business logic
- **Service**: business logic, orchestration — không gọi Mongoose Model trực tiếp, gọi qua repository
- **Repository**: toàn bộ Mongoose query — service gọi repo, không inject Model trực tiếp vào service
- Dependency injection qua NestJS DI container — không dùng global state, không `new Service()`
- Auth guard (`JwtAuthGuard`, `RolesGuard`) áp dụng ở controller level bằng decorator

## API Design

- Prefix: `/api/v1`
- RESTful: `GET` read, `POST` create, `PUT` full update, `PATCH` partial, `DELETE` remove
- Path: kebab-case, danh từ số nhiều — không dùng động từ trong path (`/users`, không phải `/getUser`)
- Response thành công: `{ "success": true, "data": ... }`
- Response lỗi: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Pagination: `?page=1&limit=20`, trả thêm `total`, `page`, `limit` trong `data`
- HTTP status code đúng nghĩa: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500
- `GET /health` bắt buộc — `{ "status": "ok" }` HTTP 200, không cần auth
- Validate input tại controller bằng `class-validator` + `ValidationPipe` global — reject sớm, không để lọt xuống service

## DTOs & Validation

- Tách riêng DTO cho request (`CreateXxxDto`, `UpdateXxxDto`) và response (`XxxResponseDto`)
- Dùng `class-transformer` + `@Exclude()`, `@Expose()` để kiểm soát field trả về
- Không expose Mongoose Document trực tiếp ra response — map sang DTO trong service hoặc dùng `ClassSerializerInterceptor`
- Field nhạy cảm (password, token, refreshToken) phải `@Exclude()` trong response DTO
- Dùng `@IsString()`, `@IsEmail()`, `@IsEnum()`, `@IsOptional()`, v.v. đầy đủ trong request DTO

## Database — Mongoose + MongoDB

- Dùng `@nestjs/mongoose` — khai báo schema bằng `@Schema()` decorator + `SchemaFactory.createForClass()`
- Không dùng `mongoose.connect()` trực tiếp — dùng `MongooseModule.forRootAsync()` với config service
- Index cho field dùng trong query thường xuyên: `@Prop({ index: true })`
- Soft delete dùng `deletedAt: Date | null` — không hard delete entity chính
- Không dùng raw string query — dùng Mongoose Model methods hoặc Aggregation Pipeline
- Tên collection: camelCase hoặc snake_case số nhiều, nhất quán trong toàn project (`users`, `courseEnrollments`)
- Dùng `session` cho multi-document transaction khi cần atomic operation
- Migration nếu cần: dùng `migrate-mongo` — không sửa data thủ công trên production

## Exception Handling

- Throw `HttpException` subclass hoặc built-in NestJS exceptions (`NotFoundException`, `ConflictException`, `BadRequestException`, ...)
- Đăng ký `GlobalExceptionFilter` để format response lỗi thống nhất, không lộ stack trace ra client
- Business error → 400; Auth → 401/403; Not found → 404; Conflict → 409; Validation → 422 (handled by `ValidationPipe`)

## Security

- Không hardcode secret — đọc từ environment variable qua `@nestjs/config` + `ConfigService`
- JWT: verify `exp`, `iss`, `aud` — dùng `@nestjs/jwt`, không trust payload chưa verify
- Hash password bằng `bcrypt` (`bcryptjs`) — không dùng MD5/SHA1
- CORS: chỉ allow origin cụ thể ở production — không dùng `origin: '*'`
- Rate limit endpoint auth (`/login`, `/register`) bằng `@nestjs/throttler`
- Sanitize mọi input trước khi dùng trong file path, shell command, template

## Logging

- Dùng NestJS built-in `Logger` với prefix class name, hoặc `nestjs-pino` cho JSON structured log
- Log format với field: `level`, `message`, `timestamp`, `context`, `requestId`
- Không log sensitive data (password, token, PII)
- Log request id (từ `x-request-id` header hoặc tự sinh) để trace across services

## Background Jobs

- Dùng `@nestjs/bull` (Bull queue + Redis) cho async job
- Task definition đặt trong `src/modules/<feature>/<feature>.processor.ts`
- Worker (processor) chạy riêng — không chạy job nặng trong request lifecycle
- Job phải idempotent — retry-safe nếu worker crash giữa chừng

## File Storage

- Không expose internal storage path ra client
- Download URL phải là presigned URL, có TTL ngắn (≤ 15 phút)
- Validate file type và size tại server bằng `FileInterceptor` + custom `ParseFilePipe` — không tin client-provided content-type

## API Documentation

- Dùng `@nestjs/swagger` — mount Swagger UI tại `/api/docs`
- Khai báo `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth` cho mỗi controller/endpoint
- Dùng `@ApiProperty()` trong DTO để tự động điền mô tả field trong docs

## Auth — httpOnly Cookie

- JWT access token (15 phút) + refresh token (30 ngày) set qua `Set-Cookie: HttpOnly; Secure; SameSite=Lax`
- Không trả token trong response body — không để FE lưu vào localStorage
- CSRF protection: double-submit cookie — server set `csrf-token` cookie (không HttpOnly), FE gửi lại trong header `X-CSRF-Token`; BE verify header khớp cookie trước khi xử lý write request
- `JwtAuthGuard` đọc token từ cookie (dùng `cookie-parser`), không từ `Authorization` header
- Refresh endpoint `POST /api/v1/auth/refresh`: nhận refresh token cookie, trả access token cookie mới

## Background Jobs — Bull + Redis

- Broker: Redis 7.x
- Processor đặt trong `src/modules/<feature>/<feature>.processor.ts`, method rõ nghĩa: `generateAssessmentTest`, `prebuildLearningPath`
- Worker chạy riêng process — không block request lifecycle
- Mọi task phải idempotent — retry-safe khi worker crash

## Code Style

- TypeScript strict mode — không dùng `any` nếu tránh được
- Async/await xuyên suốt — không mix callback-style trong async context
- Không comment giải thích WHAT — chỉ comment khi WHY không rõ ràng
- Tên method: `verbNoun` (`getUser`, `createEnrollment`) — rõ nghĩa, không viết tắt
- Tên class: PascalCase. Tên file: kebab-case (`user.service.ts`, `create-user.dto.ts`)
