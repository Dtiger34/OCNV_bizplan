// Điểm chú thích cố định hiển thị đè lên màn hình khi đang ở trong AR thật (WebXR, chỉ Android) —
// không neo theo vị trí 3D của model, chỉ là nút UI 2D tại toạ độ phần trăm màn hình (x/y: 0-100)
export interface ArPoint {
  id: string;
  x: number; // % chiều ngang màn hình
  y: number; // % chiều dọc màn hình
  title: string;
  description: string;
}

export const VILLAGE_AR_POINTS: Record<string, ArPoint[]> = {
  'bat-trang': [
    {
      id: 'ban-xoay',
      x: 50,
      y: 62,
      title: 'Bàn Xoay Gốm',
      description:
        'Người thợ dùng lực chân đạp bàn xoay, hai tay vuốt đất sét để tạo hình sản phẩm — kỹ thuật đòi hỏi sự khéo léo và cảm nhận tinh tế về độ dày, độ cân đối của thành gốm.',
    },
    {
      id: 'lo-nung',
      x: 22,
      y: 40,
      title: 'Lò Nung Bầu',
      description:
        'Lò nung truyền thống của Bát Tràng đạt nhiệt độ 1.000°C–1.300°C, quyết định màu men và độ bền của sản phẩm. Đây là công đoạn khó kiểm soát nhất trong toàn bộ quy trình.',
    },
    {
      id: 'hoa-van',
      x: 78,
      y: 45,
      title: 'Hoa Văn & Men Gốm',
      description:
        'Các nghệ nhân vẽ tay hoa văn truyền thống rồi phủ men — mỗi lớp men tạo ra sắc độ và độ bóng riêng, là dấu ấn nhận diện của gốm Bát Tràng qua từng thời kỳ.',
    },
  ],
};
