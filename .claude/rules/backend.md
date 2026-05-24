---
paths:
  - "apps/api/**"
---

# Backend Rules

## Architecture

- Framework: **FastAPI** (Python 3.12)
- Tách layer bắt buộc: Router → Service → Repository → SQLAlchemy Session → DB
- Router: chỉ parse request, gọi service, trả response — không chứa business logic
- Service: business logic và orchestration — không query DB trực tiếp
- Repository: tất cả SQLAlchemy query nằm ở đây — service không import session trực tiếp
- Mỗi feature là 1 package riêng trong `app/modules/<feature>/`
- Dependency injection qua FastAPI `Depends()`
- Auth middleware (`get_current_user`, `require_roles`) áp dụng ở router level

## API Design

- API prefix: `/api/v1`
- RESTful: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE
- Endpoint path: kebab-case, danh từ số nhiều — không dùng động từ trong path
- Response format thống nhất: `{ success: true, data }`
- Error format thống nhất: `{ success: false, error: { code, message } }`
- Pagination cho list endpoint: `?page=1&limit=20`
- Input validation tại router (Pydantic schema) — reject sớm, không để xuống service
- HTTP status code đúng nghĩa: 200, 201, 400, 401, 403, 404, 409, 500
- **`GET /health`** bắt buộc — response `{ status: 'ok' }` HTTP 200, không cần auth

## Database (SQLAlchemy async + PostgreSQL)

- Dùng **Alembic** cho migration — không sửa DB schema thủ công
- Mọi thay đổi schema phải qua migration file (`alembic revision --autogenerate`)
- Async session qua `asyncpg` driver
- Index cho các field thường dùng trong WHERE / ORDER BY
- Soft delete dùng `deleted_at` timestamp — không hard delete entity chính
- Không dùng raw SQL string concatenation — dùng parameterized query hoặc SQLAlchemy ORM

## Job Queue (Procrastinate)

- Job queue: **Procrastinate** với PostgreSQL backend — không dùng Redis
- Task definition đặt trong `app/tasks/<feature>.py`
- Worker chạy riêng (horizontal scale): `procrastinate worker`
- Job status cập nhật qua DB — SSE endpoint đọc từ DB để push về client

## Storage (MinIO)

- Dùng **minio** Python SDK — không dùng boto3
- Không expose internal MinIO path ra client
- Download URL phải là presigned URL, hết hạn sau 15 phút
- File path convention: `<bucket>/<project_id>/<document_id>/<version>/<filename>`

## Exception Handling

- Raise `HTTPException` với status code và detail rõ ràng
- Custom exception handler bắt tất cả exception, format response, không lộ stack trace
- Business logic error → `HTTPException(status_code=400, detail=...)`

## Logging

- Dùng **structlog** hoặc Python `logging` với JSON formatter — không dùng `print()`
- Log format: JSON với field `level`, `message`, `context`
- Log KHÔNG chứa sensitive data (password, token, PII)

## API Documentation

- FastAPI tự động sinh OpenAPI — mount Swagger UI tại `/api/docs`
- Dùng Pydantic schema docstring và `response_model` để docs tự động đầy đủ
