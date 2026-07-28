// Điểm chú thích cho model AR trong phiên AR thật (8th Wall, xem VillageXr8Page.tsx).
// position/normal: toạ độ 3D neo lên bề mặt model (mét, theo hệ trục gốc của file .glb, tương
// đối so với gốc model — Y-up). Mỗi frame, VillageXr8Page project 3D->2D bằng
// THREE.Vector3.project(camera) để point luôn bám đúng vị trí trên model dù model xoay/camera
// di chuyển. Lấy toạ độ bằng dev helper Alt+click trên model ở chế độ xem inline
// (VillagePage.tsx, xem model-viewer onClick handler) hoặc ước lượng thủ công theo bounding box.
export interface ArPoint {
  id: string;
  position: { x: number; y: number; z: number };
  normal?: { x: number; y: number; z: number };
  title: string;
  description: string;
}

export const VILLAGE_AR_POINTS: Record<string, ArPoint[]> = {
  'bat-trang': [
    {
      id: 'ban-xoay',
      position: { x: 0, y: 0.4, z: 0.3 },
      normal: { x: 0, y: 1, z: 0 },
      title: 'Bàn Xoay Gốm',
      description:
        'Người thợ dùng lực chân đạp bàn xoay, hai tay vuốt đất sét để tạo hình sản phẩm — kỹ thuật đòi hỏi sự khéo léo và cảm nhận tinh tế về độ dày, độ cân đối của thành gốm.',
    },
    {
      id: 'lo-nung',
      position: { x: -0.5, y: 0.6, z: -0.2 },
      normal: { x: -1, y: 0, z: 0 },
      title: 'Lò Nung Bầu',
      description:
        'Lò nung truyền thống của Bát Tràng đạt nhiệt độ 1.000°C–1.300°C, quyết định màu men và độ bền của sản phẩm. Đây là công đoạn khó kiểm soát nhất trong toàn bộ quy trình.',
    },
    {
      id: 'hoa-van',
      position: { x: 0.5, y: 0.5, z: -0.1 },
      normal: { x: 1, y: 0, z: 0 },
      title: 'Hoa Văn & Men Gốm',
      description:
        'Các nghệ nhân vẽ tay hoa văn truyền thống rồi phủ men — mỗi lớp men tạo ra sắc độ và độ bóng riêng, là dấu ấn nhận diện của gốm Bát Tràng qua từng thời kỳ.',
    },
  ],
};
