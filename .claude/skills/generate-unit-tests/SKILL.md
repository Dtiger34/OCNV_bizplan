---
name: generate-unit-tests
description: Sinh unit tests đạt coverage target cho BE hoặc FE — chạy sau khi Must-have features cơ bản hoàn thành.
user-invocable: true
---

# Skill: Generate Unit Tests

## Mục tiêu

Đọc code đã implement → chạy coverage hiện tại → sinh thêm test để đạt target trong `testing.md`.

---

## Workflow

### Bước 1 — Xác định scope

Hỏi: "Sinh unit tests cho BE hay FE?"

Đọc `docs/design/tech-stack.md` để xác định test framework đang dùng.

---

### Bước 2 — Chạy coverage hiện tại

Chạy lệnh coverage của layer được chọn (theo test framework trong tech-stack), xem báo cáo:

- File nào đang thiếu coverage
- Function/branch nào chưa được test

---

### Bước 3 — Sinh tests theo layer

#### Nếu chọn BE:

Target: Services ≥ 70% | BE tổng ≥ 65%

Với mỗi service thiếu coverage, sinh test theo rules trong `testing.md`:

- Follow AAA pattern: Arrange → Act → Assert
- Test name mô tả behavior: `"should throw X when Y"`
- Mock: DB client/ORM, external services (email, notification, AI, storage, ...)
- Bắt buộc cover: null/empty input, boundary values, error scenarios
- Bắt buộc cover AI-specific cases nếu `testing.md` yêu cầu:
  - Boundary states (slot vừa hết, đúng thời điểm deadline)
  - Input dài bất thường, Unicode, ký tự đặc biệt

**Ưu tiên test các function quan trọng nhất của business logic trước.**

#### Nếu chọn FE:

Target: Components ≥ 50%

Với mỗi component thiếu coverage:

- Test render với data hợp lệ
- Test interaction (click, submit, input)
- Test loading / empty / error state
- Mock: API calls (qua data-fetching layer), router, store

Không test: primitive UI re-exports, entry point files — theo danh sách exclude trong `testing.md`.

---

### Bước 4 — Verify coverage

Chạy lại coverage sau khi sinh xong. Nếu chưa đạt target → sinh thêm cho file còn thiếu nhiều nhất.

Báo cáo kết quả:

```
Coverage sau khi generate:
- BE Services: X% (target ≥ 70%)
- BE tổng: X% (target ≥ 65%)
- FE components: X% (target ≥ 50%)

Files đạt: [danh sách]
Files chưa đạt: [danh sách + % hiện tại]
```

### Bước 5 — Export coverage report

Sau khi coverage đạt target, export report ra `docs/coverage/`:

- **BE**: chạy coverage command với HTML + lcov reporter → output vào `docs/coverage/be/`
- **FE**: chạy coverage command → output vào `docs/coverage/fe/`

Verify `docs/coverage/be/index.html` và `docs/coverage/fe/index.html` tồn tại trước khi báo done.

---

## Nguyên tắc

- Không cần đạt 100% coverage — có thể bỏ qua case test khó mà giá trị thấp
- Mỗi test case test 1 behavior duy nhất
- Không test implementation detail — test behavior từ góc nhìn caller
- Test phải deterministic — không phụ thuộc thời gian thực hay random
