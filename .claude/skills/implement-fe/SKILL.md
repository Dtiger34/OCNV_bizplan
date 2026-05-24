---
name: implement-fe
description: Implement một FE task từ sprint plan — UI component, hook, unit test, tạo PR.
user-invocable: true
---

# Skill: Implement FE

## Mục tiêu

Implement hoàn chỉnh 1 task FE từ sprint plan: UI + hook + test → commit. Gọi lại skill này cho mỗi task tiếp theo.

---

## Workflow

### Bước 1 — Xác định task

Hỏi: "Bạn muốn implement màn hình/task FE nào? (đọc từ `docs/plan/sprint-plan.md`)"

Đọc:

- `docs/plan/sprint-plan.md` — task cụ thể và thứ tự ưu tiên
- `docs/design/ui-screens.md` — spec màn hình: data hiển thị, actions, edge cases
- `docs/design/api-contract.md` — endpoint, request/response shape cho màn hình này

Nếu endpoint cần chưa có trên BE → báo cho Lead, implement UI với mock data trước.

---

### Bước 2 — Làm rõ điểm mơ hồ

Trước khi code, rà soát spec: nếu phát hiện điều gì chưa rõ hoặc thiếu trong docs → hỏi user ngay, không tự assume.

Sau khi user giải thích → cập nhật doc liên quan trước khi bắt đầu implement.

---

### Bước 3 — Confirm kỹ thuật (nếu cần)

Nếu UI yêu cầu kỹ thuật không hiển nhiên (ví dụ: optimistic update, infinite scroll, debounce, realtime, ...) → trình bày 2–3 phương án kèm tradeoff và đề xuất, chờ user chọn trước khi code.

---

### Bước 4 — Implement

Implement theo thứ tự (stub đã có từ `scaffold-feature`):

1. **Hook** (`use[Feature].ts`): TanStack Query với đúng endpoint, xử lý loading/error state
2. **Page component**: layout theo ui-screens.md, gọi hook, render data
3. **Sub-components**: tách ra nếu có logic tái sử dụng

Tuân thủ `.claude/rules/frontend.md` trong suốt quá trình implement.

**UI base**: nếu có Google Stitch template → base theo bố cục và style đó cho nhất quán.

Đảm bảo implement đủ 3 state: Loading / Empty / Error.

---

### Bước 5 — Unit test cơ bản

Viết test cho component có logic với các case chính — chưa cần đạt coverage target:

- Test render đúng data
- Test interaction chính (submit form, click action)

> Coverage đầy đủ sẽ bổ sung ở phase unit test riêng theo schedule.

---

### Bước 6 — Verify

Chạy build + test, fix nếu fail.

---

### Bước 7 — Báo cáo kết quả

Sau khi implement xong, báo cáo ngắn gọn:

```
## Kết quả: [Tên màn hình]

### Đã implement
- [Màn hình / component chính]

### Kỹ thuật áp dụng
- [Kỹ thuật 1]: [lý do chọn, cách hoạt động ngắn gọn]
- [Kỹ thuật 2]: ...

### Lưu ý
- [Điểm đặc biệt cần nhớ nếu technical review hỏi]
```

---

### Bước 8 — Commit

Scan toàn bộ file vừa implement:

- Tìm tất cả mock data còn sót (`// TODO: remove mock`, hardcoded array, ...)
- Nếu còn mock → báo danh sách, hỏi: "Các mock này đã có thể thay bằng API thật chưa?"
- Chỉ commit khi không còn mock trong production code (mock trong file test là ok)

Gợi ý commit message theo conventional commits + `[AI-Assisted: Claude Code]`, hỏi: "Bạn muốn commit với message này không?"

Không tự commit, không tạo PR — chờ user confirm.

---

## Nguyên tắc

- Implement 1 màn hình xong (UI + test cơ bản) rồi mới sang màn tiếp
- Kỹ thuật phức tạp phải confirm trước — không tự quyết định
- Mock data chỉ tồn tại trong development session, không được commit vào production code
- **Code sẽ được review bởi Codex** — viết cẩn thận từ đầu: đặt tên rõ ràng, không shortcut, tuân thủ convention nghiêm, không để TODO chưa giải quyết trong production code
