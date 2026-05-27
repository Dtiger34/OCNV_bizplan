import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContactStatus = 'new' | 'read' | 'replied';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
  status: ContactStatus;
  createdAt: string;
  note: string;
}

interface ContactStore {
  contacts: ContactSubmission[];
  addContact: (data: Omit<ContactSubmission, 'id' | 'status' | 'createdAt' | 'note'>) => void;
  updateStatus: (id: string, status: ContactStatus) => void;
  updateNote: (id: string, note: string) => void;
  deleteContact: (id: string) => void;
}

const MOCK_CONTACTS: ContactSubmission[] = [
  {
    id: 'mock-1',
    name: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@gmail.com',
    phone: '0912 345 678',
    subject: 'Hỏi về sản phẩm',
    message: 'Cho tôi hỏi hộp tiểu cảnh Bát Tràng có thể đặt làm theo kích thước lớn hơn không? Tôi muốn mua làm quà tặng cho đối tác nước ngoài.',
    rating: 5,
    status: 'replied',
    createdAt: '2025-05-20T09:15:00.000Z',
    note: 'Đã gọi điện tư vấn, khách đồng ý đặt 3 hộp size L.',
  },
  {
    id: 'mock-2',
    name: 'Trần Minh Quân',
    email: 'quan.tran@company.vn',
    phone: '0987 654 321',
    subject: 'Hợp tác kinh doanh',
    message: 'Công ty chúng tôi đang tìm kiếm đối tác cung cấp quà tặng doanh nghiệp cao cấp mang bản sắc văn hóa Việt. Rất muốn được trao đổi thêm về khả năng hợp tác.',
    rating: 4,
    status: 'read',
    createdAt: '2025-05-22T14:30:00.000Z',
    note: '',
  },
  {
    id: 'mock-3',
    name: 'Phạm Thu Hương',
    email: 'huong.pham@yahoo.com',
    phone: '',
    subject: 'Vận chuyển & giao hàng',
    message: 'Tôi đặt hàng 5 ngày rồi mà chưa nhận được. Mã đơn OCNV2025051803. Nhờ kiểm tra giúp tôi.',
    rating: 2,
    status: 'new',
    createdAt: '2025-05-25T08:00:00.000Z',
    note: '',
  },
  {
    id: 'mock-4',
    name: 'Lê Văn Đức',
    email: 'duc.le@gmail.com',
    phone: '0909 111 222',
    subject: 'Góp ý chung',
    message: 'Website rất đẹp và sản phẩm chất lượng. Góp ý nhỏ là nên có thêm tùy chọn gói quà có chữ theo yêu cầu để tăng tính cá nhân hóa.',
    rating: 5,
    status: 'new',
    createdAt: '2025-05-26T17:45:00.000Z',
    note: '',
  },
];

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      contacts: MOCK_CONTACTS,
      addContact: (data) =>
        set((state) => ({
          contacts: [
            {
              ...data,
              id: `contact-${Date.now()}`,
              status: 'new',
              createdAt: new Date().toISOString(),
              note: '',
            },
            ...state.contacts,
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      updateNote: (id, note) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? { ...c, note } : c)),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        })),
    }),
    { name: 'ocnv-contacts' }
  )
);
