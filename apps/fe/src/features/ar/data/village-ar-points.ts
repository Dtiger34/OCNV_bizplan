// Điểm chú thích cho model AR. Có 2 cách neo, dùng ở 2 chỗ khác nhau:
// - x/y: toạ độ % màn hình, chỉ dùng cho overlay đè lên khi đang ở trong AR thật qua WebXR (chỉ Android —
//   Quick Look/Scene Viewer mở app rời nên trang web bị đẩy ra nền, không overlay được).
// - position/normal: toạ độ 3D neo lên bề mặt model (mét, theo hệ trục gốc của file .glb) — dùng cho
//   2 nơi độc lập: (1) model-viewer hotspot slot khi xem inline trước AR (mọi nền tảng), và
//   (2) panel thông tin bake sẵn LUÔN HIỆN trong file .usdz cho iOS (xem
//   scripts/ar-usdz/build_interactive_usdz.py — không cần tap, tránh phụ thuộc schema
//   Preliminary_Behavior chưa xác nhận được Quick Look có hỗ trợ hay không).
//   Lấy toạ độ bằng cách log point/normal khi click lên model ở chế độ xem thường
//   (xem hướng dẫn calibrate trong VillageArPage.tsx).
export interface ArPoint {
  id: string;
  x: number; // % chiều ngang màn hình (overlay Android in-AR)
  y: number; // % chiều dọc màn hình (overlay Android in-AR)
  position?: { x: number; y: number; z: number }; // mét, neo 3D trên model (hotspot slot)
  normal?: { x: number; y: number; z: number };
  title: string;
  description: string;
}

export const VILLAGE_AR_POINTS: Record<string, ArPoint[]> = {
  'bat-trang': [
    {
      id: 'ban-xoay',
      x: 50,
      y: 62,
      position: { x: 0, y: 0.4, z: 0.3 },
      normal: { x: 0, y: 1, z: 0 },
      title: 'Bàn Xoay Gốm',
      description:
        'Người thợ dùng lực chân đạp bàn xoay, hai tay vuốt đất sét để tạo hình sản phẩm — kỹ thuật đòi hỏi sự khéo léo và cảm nhận tinh tế về độ dày, độ cân đối của thành gốm.',
    },
    {
      id: 'lo-nung',
      x: 22,
      y: 40,
      position: { x: -0.5, y: 0.6, z: -0.2 },
      normal: { x: -1, y: 0, z: 0 },
      title: 'Lò Nung Bầu',
      description:
        'Lò nung truyền thống của Bát Tràng đạt nhiệt độ 1.000°C–1.300°C, quyết định màu men và độ bền của sản phẩm. Đây là công đoạn khó kiểm soát nhất trong toàn bộ quy trình.',
    },
    {
      id: 'hoa-van',
      x: 78,
      y: 45,
      position: { x: 0.5, y: 0.5, z: -0.1 },
      normal: { x: 1, y: 0, z: 0 },
      title: 'Hoa Văn & Men Gốm',
      description:
        'Các nghệ nhân vẽ tay hoa văn truyền thống rồi phủ men — mỗi lớp men tạo ra sắc độ và độ bóng riêng, là dấu ấn nhận diện của gốm Bát Tràng qua từng thời kỳ.',
    },
  ],
};
