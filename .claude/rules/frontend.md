---
paths:
  - "apps/web/**"
---

# Frontend Rules

## Architecture

- Framework: **React 19 + TypeScript + Vite**
- Tổ chức theo feature: `src/features/<domain>/components|hooks|pages`
- Page component (`*Page.tsx`): chỉ compose layout + feature components, không chứa business logic
- Feature component: logic + UI của 1 domain cụ thể
- Shared UI đặt trong `src/components/ui/` (shadcn/ui re-exports) và `src/components/layout/`
- Không sửa trực tiếp file trong `components/ui/` — override qua Tailwind className
- Hook tên bắt đầu bằng `use`, đặt trong `hooks/` của feature hoặc `src/hooks/` nếu dùng nhiều nơi

## State Management

- **TanStack Query v5**: quản lý tất cả server state (fetch, cache, refetch, invalidate)
  - Mỗi API resource có 1 custom hook (ví dụ: `useDocuments`, `useTranslationJob`)
  - Sau write action (create/update/delete) phải `invalidateQueries` để refetch
- **Zustand v5**: chỉ dùng cho client state toàn cục
  - Không đưa server data vào Zustand
- Local `useState` / `useReducer` cho UI state chỉ dùng trong 1 component

## API Integration

- Tất cả API call qua `src/lib/api-client.ts` (axios instance với base URL và interceptors)
- JWT lưu trong HTTP-only cookie — interceptor tự động refresh token khi nhận 401
- Không gọi `fetch` hoặc `axios` trực tiếp trong component — luôn qua TanStack Query hook
- SSE (job status) dùng native `EventSource` API, wrap trong custom hook `useJobStatus`

## Forms

- **Formik + Yup** cho tất cả form có validation
- Schema Yup định nghĩa riêng trong file `<feature>.schema.ts`

## i18n

- **i18next + react-i18next**: hỗ trợ VI / EN / JP
- Locale files đặt trong `src/i18n/locales/<lang>.json`
- Không hardcode string UI — luôn dùng `t('key')`
- User preference lưu vào `localStorage`

## UI/UX

- Layout phải đúng trên **1366×768** và **1920×1080**
- Loading state cho mọi async operation
- Error state với thông báo thân thiện — không hiện stack trace
- Empty state khi danh sách trống
- Hiển thị feedback cho user sau mỗi action (toast/alert)

## PDF Preview

- Dùng **react-pdf v9** để nhúng PDF viewer trong browser
- Các định dạng khác (DOCX, PPTX, XLSX) được convert sang PDF phía BE trước khi preview
