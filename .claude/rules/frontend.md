# Frontend Rules — React + Vite + Tailwind CSS

## Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS 4.x — không dùng inline style hay CSS module, chỉ dùng Tailwind utility class
- **UI components**: shadcn/ui — không sửa trực tiếp file trong `components/ui/`, override qua `className`
- **Server state**: TanStack Query 5.x — mỗi API resource có 1 custom hook, invalidate sau write
- **Global client state**: Zustand 5.x — chỉ cho state thực sự global (user info, language), không đưa server data vào
- **Forms**: React Hook Form 7.x + Zod 3.x — schema validation định nghĩa trong `<feature>.schema.ts`
- **HTTP client**: Axios 1.x — singleton tại `src/lib/api-client.ts`, `withCredentials: true`, interceptor CSRF
## Project Structure

```
src/
  features/
    <domain>/
      components/
      hooks/
      pages/
  components/
    ui/        # shadcn/ui re-exports — không sửa trực tiếp
    layout/    # shared layout components
  lib/
    api-client.ts   # axios instance với base URL + interceptors
  hooks/             # shared custom hooks
  router/
  store/             # global client state (nếu dùng)
```

- Tổ chức theo feature domain — không theo layer (không có folder `components/` chứa tất cả)
- Page component: chỉ compose layout + feature components, không chứa business logic
- Hook tên bắt đầu bằng `use`, đặt trong `hooks/` của feature hoặc `src/hooks/` nếu dùng nhiều nơi

## State Management

- **Server state** (data từ API): dùng data-fetching library đã chốt trong `tech-stack.md` (TanStack Query, SWR, RTK Query, ...)
  - Mỗi API resource có 1 custom hook (`useUsers`, `useOrderDetail`, ...)
  - Sau write action (create/update/delete) phải invalidate/refetch để UI đồng bộ
- **Global client state**: dùng store library đã chốt (Zustand, Redux, Pinia, ...) — chỉ cho state thực sự global, không đưa server data vào
- **Local UI state**: `useState` / `useReducer` cho state chỉ dùng trong 1 component

## API Integration

- Toàn bộ API call qua Axios singleton (`src/lib/api-client.ts`) với `withCredentials: true` — cookie tự động gửi kèm mọi request
- Không lưu token trong localStorage hay memory — auth hoàn toàn qua httpOnly cookie do BE set
- CSRF: interceptor đọc `csrf-token` cookie và gắn vào header `X-CSRF-Token` cho mọi write request (POST/PUT/PATCH/DELETE)
- Không gọi Axios trực tiếp trong component — luôn qua TanStack Query hook hoặc custom hook
- Xử lý 401: interceptor gọi `/api/v1/auth/refresh` một lần, nếu fail redirect về `/login`

## Forms

- Dùng form library đã chốt trong `tech-stack.md` (React Hook Form, Formik, VeeValidate, ...)
- Schema validation định nghĩa riêng trong file `<feature>.schema.ts` hoặc tương đương
- Validation chạy ở client (UX) và BE (security) — không bỏ qua BE validation

## UI/UX

- Loading state cho mọi async operation
- Error state với thông báo thân thiện — không hiện stack trace ra UI
- Empty state khi danh sách trống — không để màn hình trắng
- Feedback cho user sau mỗi action (toast / alert / redirect)
- Layout phải đúng trên các viewport target đã chốt trong PRD

## Code Style

- TypeScript strict — không dùng `any` nếu tránh được
- Tên component: PascalCase. Tên hook: camelCase bắt đầu bằng `use`
- Không comment giải thích WHAT — chỉ comment khi WHY không rõ ràng
- Async trong component: không dùng `async` trực tiếp trong `useEffect` — wrap trong inner function hoặc dùng data-fetching hook
