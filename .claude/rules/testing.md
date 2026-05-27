# Testing

## Coverage Targets

- Tổng thể: ≥ 60%
- BE Services: ≥ 70% | BE tổng: ≥ 65%
- FE components: ≥ 50%
- Ít nhất 1 integration test dùng test database riêng

## Coverage Report

Sau khi coverage đạt target, export report ra `docs/coverage/` (HTML hoặc lcov).

## Tools

- **Backend unit**: Jest + `@nestjs/testing` — file `*.spec.ts` đặt cùng thư mục source hoặc trong `test/unit/`
- **Backend integration**: Jest + `supertest` + `@nestjs/testing` — file `*.e2e-spec.ts` trong `test/integration/`, dùng MongoDB test DB riêng qua `MONGODB_URI_TEST`
- **Frontend component/hook**: Vitest + React Testing Library — file `*.test.tsx` đặt cùng thư mục component
- **Integration test**: dùng test DB riêng qua `MONGODB_URI_TEST` — không dùng chung DB dev

## Rules

- Follow AAA pattern: Arrange → Act → Assert
- Mỗi test case test 1 behavior duy nhất
- Test name mô tả behavior: `"should throw EVENT_FULL when no slots remaining"`
- KHÔNG skip test — nếu fail thì fix, không comment out
- Tất cả test phải pass
- Mock external dependencies (Mongoose Model, email service, notification service, AI service, ...)
- Edge cases bắt buộc: null/empty input, boundary values, error scenarios
- Test phải deterministic — không phụ thuộc thời gian thực, random, external state

## Files loại trừ khỏi coverage

Loại trừ các file infrastructure/boilerplate không chứa business logic. Cụ thể theo project:

- **BE**: entry point (`main.ts`), module config (`*.module.ts`), DB config, config loader, seed scripts, migration
- **FE**: entry point (`main.*`), router config, locale files, primitive UI re-exports (shadcn, component library wrappers)

Ghi danh sách cụ thể vào `coveragePathIgnorePatterns` trong `jest.config.ts` khi scaffold.

## Backend — Layer cần test

- **Service** (`*.service.spec.ts`): bắt buộc — chứa toàn bộ business logic
- **Controller**: không cần unit test riêng (logic đã ở service)
- **Repository**: không cần unit test riêng (covered bởi integration test)

## Frontend — Layer cần test

- **Component** có logic (form, conditional render, realtime update): bắt buộc
- **Presentational component** thuần UI (primitive re-exports, simple display): không cần
- **Custom hook** phức tạp (data fetching, socket, multi-step state): nên test

## AI-Specific Test Cases

Code do AI generate cần các test case chuyên biệt — bắt buộc cho các service chính:

### Adversarial Testing

- Test boundary trạng thái: resource vừa hết slot, action đúng giây deadline
- Test race condition: 2 users thực hiện cùng action trên resource cuối (`Promise.all` hoặc concurrent request)
- Test dữ liệu hợp lệ về format nhưng vô nghĩa về business (capacity = 0, endAt trước startAt)

### Prompt Injection Testing

- Test input chứa NoSQL injection: `{ "$gt": "" }`, `{ "$where": "..." }`
- Test input chứa template syntax: `{{constructor.constructor('return this')()}}`
- Test input chứa HTML/markdown trong text fields
- Test input cực dài vượt expected max length

### Bias & Fairness

- Test input tiếng Việt có dấu không bị reject
- Test input Unicode (tiếng Nhật, Ả-rập, emoji) không bị reject
- Test validation không phân biệt dựa trên nội dung ngôn ngữ
