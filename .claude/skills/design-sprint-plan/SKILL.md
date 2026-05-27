---
name: design-sprint-plan
description: Dựa vào PRD, API contract và UI screens, tạo sprint plan phân chia task cụ thể cho FE và BE.
user-invocable: true
---

# Skill: Design Sprint Plan

## Mục tiêu

Đọc toàn bộ docs design đã có → ước tính thời gian → phân task cụ thể cho FE và BE → ghi `docs/plan/sprint-plan.md`.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — feature list với priority (Must/Should/Won't)
- `docs/design/api-contract.md` — số lượng và độ phức tạp của endpoints (ước tính BE effort)
- `docs/design/ui-screens.md` — số lượng và độ phức tạp của screens (ước tính FE effort)
- `docs/design/tech-stack.md` — scaffold steps cần thiết

---

### Bước 2 — Propose task breakdown

Trình bày để user confirm:

**Feature priority + phân công:**

```
| # | Feature | Priority | Owner | Ước tính |
|---|---------|----------|-------|---------|
| 1 | Auth (login/register) | Must | BE+FE | 30 phút |
| 2 | [Feature A] | Must | BE+FE | X phút |
| 3 | [Feature B] | Should | BE+FE | X phút |
```

**Task cụ thể theo từng giai đoạn:**

```
[0:00–0:30] Setup
  Shared: init repo, docker-compose, env files
  BE: init framework, DB migrate, seed
  FE: init framework, setup HTTP client, routing

[0:30–3:30] Core Dev (Must-have trước)
  BE: [danh sách endpoint theo thứ tự implement]
  FE: [danh sách screen theo thứ tự implement]

[3:30–4:30] Integration + Bug Fix
  Shared: connect FE-BE, smoke test các luồng chính

[4:30–5:00] Polish + Submit
  Shared: README, demo prep, nộp bài
```

Nguyên tắc phân task:

- Must-have feature hoàn thành trước 3:30 — Should-have chỉ làm nếu còn thời gian
- BE implement endpoint trước FE implement screen tương ứng ~30 phút (để FE không bị block)
- Task mỗi người không quá 45 phút liên tục — checkpoint sau mỗi feature

Hỏi confirm: "Task breakdown này hợp lý chưa? Cần điều chỉnh thứ tự hay phân công không?"

---

### Bước 3 — Ghi `docs/plan/sprint-plan.md`

Sau khi user confirm, ghi vào file theo template có sẵn.
