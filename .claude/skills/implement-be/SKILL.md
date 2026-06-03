---
name: implement-be
description: Implement một BE task từ sprint plan — service logic, repository, tạo PR.
user-invocable: true
---

# Skill: Implement BE

## Mục tiêu

Implement hoàn chỉnh 1 task BE từ sprint plan: business logic → PR. Gọi lại skill này cho mỗi task tiếp theo.

---

## Workflow

### Bước 1 — Xác định task

Hỏi: "Bạn muốn implement task BE nào? (đọc từ `docs/plan/sprint-plan.md`)"

Đọc:

- `docs/plan/sprint-plan.md` — task cụ thể và thứ tự ưu tiên
- `docs/design/api-contract.md` — endpoint spec: request, response, error cases
- `docs/design/db-schema.md` — model và relation liên quan
- `docs/design/architecture.md` — layer convention

---

### Bước 2 — Làm rõ điểm mơ hồ

Trước khi code, rà soát spec: nếu phát hiện điều gì chưa rõ hoặc thiếu trong docs → hỏi user ngay, không tự assume.

Sau khi user giải thích → cập nhật doc liên quan trước khi bắt đầu implement.

---

### Bước 3 — Confirm kỹ thuật (nếu cần)

Nếu logic yêu cầu kỹ thuật không hiển nhiên (ví dụ: concurrent access, transaction, caching, state machine, ...) → **không tự quyết định**, trình bày 2–3 phương án kèm tradeoff và đề xuất, chờ user chọn trước khi code.

---

### Bước 4 — Implement

Implement theo thứ tự layer (stub đã có từ `scaffold-feature`):

1. **Repository**: query theo đúng spec, dùng transaction nếu cần
2. **Service**: business logic, validation, throw exception đúng loại
3. **Controller**: kiểm tra DTO validation đủ chưa

Tuân thủ `.claude/rules/backend.md` trong suốt quá trình implement.

---

### Bước 5 — Verify

Chạy build, fix nếu fail.

---

### Bước 6 — Báo cáo kết quả

Sau khi implement xong, báo cáo ngắn gọn để dev nắm vững trước khi technical review:

```
## Kết quả: [Tên feature/endpoint]

### Đã implement
- [Endpoint hoặc logic chính]

### Kỹ thuật áp dụng
- [Kỹ thuật 1]: [lý do chọn, cách hoạt động ngắn gọn]
- [Kỹ thuật 2]: ...

### Lưu ý
- [Điểm đặc biệt cần nhớ nếu technical review hỏi]
```

---

### Bước 7 — Commit

Gợi ý commit message theo conventional commits + `[AI-Assisted: Claude Code]`, hỏi: "Bạn muốn commit với message này không?"

Không tự commit, không tạo PR — chờ user confirm.

---

## Nguyên tắc

- Implement 1 task xong rồi mới sang task tiếp
- Kỹ thuật phức tạp phải confirm trước — không tự quyết định
- Không implement ahead nếu task phụ thuộc endpoint chưa có trong api-contract
- **Code sẽ được review bởi Codex** — viết cẩn thận từ đầu: đặt tên rõ ràng, không shortcut, tuân thủ convention nghiêm, không để TODO chưa giải quyết trong production code
