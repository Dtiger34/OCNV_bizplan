# Testing

## Coverage

- Target tổng thể: ≥ 60%
- BE Services: ≥ 70% | BE tổng: ≥ 65%
- FE components: ≥ 50%
- Ít nhất 1 integration test dùng test database riêng

**Files loại trừ khỏi coverage:**

- BE: `*.dto.ts`, `*.module.ts`, `seed.ts`, `main.ts`, `configuration.ts`, `prisma.service.ts`
- FE: `components/ui/*`, `i18n/locales/*`, `main.tsx`, `router/index.tsx`

## Coverage Report

Sau khi coverage đạt target, export report ra `docs/coverage/` (HTML hoặc lcov).

## Tools

- **Backend:** Jest (`*.spec.ts` đặt cùng thư mục với file cần test)
- **Frontend:** Vitest + React Testing Library (`*.test.tsx` đặt cùng thư mục component)
- **Integration test:** Jest + NestJS `Test.createTestingModule()` + Prisma test DB

## Rules

- Follow AAA pattern: Arrange → Act → Assert
- Mỗi test case test 1 behavior duy nhất
- Test name mô tả behavior: `"should throw EVENT_FULL when no slots remaining"`
- KHÔNG skip test — nếu fail thì fix, không comment out
- Tất cả test phải pass (không có test bị skip/fail)
- Mock external dependencies: `PrismaService`, `NotificationsService`, `EmailService`, `GeminiService`
- Integration test dùng `DATABASE_URL_TEST` riêng — không dùng chung DB dev
- Edge cases bắt buộc: null/empty input, boundary values, error scenarios
- Test phải deterministic — không phụ thuộc thời gian thực, random, external state

## Backend — Layer cần test

- **Service** (`*.service.spec.ts`): bắt buộc — chứa toàn bộ business logic
- **Controller**: không cần unit test riêng (logic đã ở service)
- **Repository**: không cần unit test riêng (covered bởi integration test)

## Frontend — Layer cần test

- **Component** có logic (form, conditional render, socket update): bắt buộc
- **Presentational component** thuần UI (shadcn re-exports, simple display): không cần
- **Custom hook** phức tạp (`useAgentChat`, `useSocket`): nên test

## AI-Specific Test Cases

Code do AI generate cần các test case chuyên biệt — bắt buộc cho các service chính:

### Adversarial Testing

- Test boundary trạng thái: event vừa hết chỗ, đăng ký đúng giây cuối `registrationCloseAt`
- Test race condition: 2 users đăng ký chỗ cuối cùng đồng thời (`Promise.all`)
- Test dữ liệu hợp lệ về format nhưng vô nghĩa về business (capacity = 0, endAt trước startAt)

### Prompt Injection Testing

- Test input chứa SQL injection: `"; DROP TABLE events; --`
- Test input chứa template syntax: `{{constructor.constructor('return this')()}}`
- Test input chứa HTML/markdown trong text fields
- Test input cực dài vượt expected max length

### Bias & Fairness

- Test input tiếng Việt có dấu (tên sự kiện, comment) không bị reject
- Test input tiếng Nhật (Unicode) không bị reject
- Test validation không phân biệt dựa trên nội dung ngôn ngữ
