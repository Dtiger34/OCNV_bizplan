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

// LƯU Ý: toạ độ position/normal cho non-chuong, huong-quang-phu-cau, lua-van-phuc,
// quat-chang-son là ƯỚC LƯỢNG (chưa calibrate trực quan trên từng model .glb thật) — chỉ có
// bat-trang đã được calibrate chính xác bằng dev helper Alt+click. Trước khi dùng thật, mở từng
// trang /villages/<slug> (chế độ xem inline), giữ Alt rồi click vào đúng chi tiết trên model,
// đọc toạ độ log ra console, thay vào đây.
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

  'non-chuong': [
    {
      // Cụm lá cọ xanh — trước-trái mô hình, ngang tầm đế nhà (không phải gần mái)
      id: 'la-co-chon-loc',
      position: { x: -0.85, y: -0.35, z: 0.65 },
      normal: { x: -0.5, y: 0, z: 0.87 },
      title: 'Lá Cọ Được Chọn Lọc',
      description:
        'Lá cọ non được tuyển chọn, phơi khô và là phẳng để tạo bề mặt trắng mịn, bền đẹp cho chiếc nón.',
    },
    {
      // Giỏ/khung tre đan — sát đất, trước-trái, thấp nhất trong nhóm 4 điểm
      id: 'khung-tre',
      position: { x: -0.6, y: -0.55, z: 0.7 },
      normal: { x: -0.4, y: -0.2, z: 0.9 },
      title: 'Khung Tre',
      description:
        'Các vành tre được uốn thành nhiều vòng tròn đồng tâm, tạo bộ khung cho chiếc nón lá.',
    },
    {
      // Người thợ ngồi khâu nón — chính giữa, ngay trước cửa nhà, thấp (dáng ngồi)
      id: 'lop-la-len-vanh-non',
      position: { x: 0, y: -0.45, z: 0.75 },
      normal: { x: 0, y: 0, z: 1 },
      title: 'Lợp Lá Lên Vành Nón',
      description:
        'Những lớp lá được xếp đều lên khung nón theo từng vòng, bảo đảm cân đối và ôm sát từng vành.',
    },
    {
      // Kệ nón lá thành phẩm — bên phải nhà, ngang tầm giữa (không sát mái), nhô ra trước
      id: 'non-la-thanh-pham',
      position: { x: 0.85, y: -0.1, z: 0.6 },
      normal: { x: 0.7, y: 0.1, z: 0.7 },
      title: 'Nón Lá Thành Phẩm',
      description:
        'Sau khi khâu hoàn thiện và cắt viền, chiếc nón trở nên nhẹ, bền. Nhiều nghệ nhân còn trang trí thêm họa tiết hoặc hình vẽ để tạo nên những mẫu nón đa dạng.',
    },
  ],

  'huong-quang-phu-cau': [
    {
      id: 'chan-huong',
      position: { x: 0, y: 0.4, z: 0.3 },
      normal: { x: 0, y: 1, z: 0 },
      title: 'Chẻ Tăm & Nhuộm Chân Hương',
      description:
        'Tre hoặc vầu già được chẻ nhỏ, vót thành que tăm đều nhau rồi nhuộm màu đỏ hoặc hồng — đây là công đoạn tạo nên sắc đỏ đặc trưng của làng Hương Quảng Phú Cầu.',
    },
    {
      id: 'phoi-huong',
      position: { x: -0.5, y: 0.6, z: -0.2 },
      normal: { x: -1, y: 0, z: 0 },
      title: 'Phơi Hương',
      description:
        'Những bó chân hương được xoè tròn như những bông hoa lớn và phơi dưới nắng, tạo nên khung cảnh đặc sắc rực rỡ đã trở thành biểu tượng của làng nghề.',
    },
    {
      id: 'se-huong',
      position: { x: 0.5, y: 0.5, z: -0.1 },
      normal: { x: 1, y: 0, z: 0 },
      title: 'Se Hương',
      description:
        'Người thợ phủ hỗn hợp bột hương lên thân tăm bằng phương pháp thủ công hoặc máy móc hỗ trợ để tạo thành nén hương hoàn chỉnh.',
    },
  ],

  'lua-van-phuc': [
    {
      id: 'khung-cui',
      position: { x: 0, y: 0.4, z: 0.3 },
      normal: { x: 0, y: 1, z: 0 },
      title: 'Khung Cửi',
      description:
        'Sợi tơ sau khi xử lý được đưa lên khung cửi. Tiếng thoi đưa trên khung cửi chính là "âm thanh đặc trưng" của làng nghề Vạn Phúc suốt hơn nghìn năm.',
    },
    {
      id: 'guong-to',
      position: { x: -0.5, y: 0.6, z: -0.2 },
      normal: { x: -1, y: 0, z: 0 },
      title: 'Guồng Ươm Tơ',
      description:
        'Kén tằm sau khi thu hoạch được xử lý bằng nước nóng để tách sợi tơ — công đoạn đòi hỏi sự khéo léo để giữ sợi tơ không bị đứt hoặc rối.',
    },
    {
      id: 'lua-thanh-pham',
      position: { x: 0.5, y: 0.5, z: -0.1 },
      normal: { x: 1, y: 0, z: 0 },
      title: 'Lụa Thành Phẩm',
      description:
        'Mỗi tấm lụa đạt chuẩn phải có độ mềm, độ rũ và độ óng tự nhiên đặc trưng của Vạn Phúc, sau khi nhuộm màu và xử lý bề mặt để tạo độ bóng.',
    },
  ],

  'quat-chang-son': [
    {
      id: 'khung-quat',
      position: { x: 0, y: 0.4, z: 0.3 },
      normal: { x: 0, y: 1, z: 0 },
      title: 'Khung Nan Tre',
      description:
        'Nan tre được chẻ mảnh, vót mỏng, mài nhẵn rồi uốn theo đúng hình dạng của quạt — khung quạt quyết định độ bền và độ cân đối của sản phẩm.',
    },
    {
      id: 'giay-quat',
      position: { x: -0.5, y: 0.6, z: -0.2 },
      normal: { x: -1, y: 0, z: 0 },
      title: 'Dán Giấy Quạt',
      description:
        'Giấy dó hoặc giấy chuyên dụng được dán lên khung nan tre — công đoạn đòi hỏi sự khéo léo cao, chỉ cần sai lệch nhỏ quạt có thể bị nhăn hoặc mất dáng.',
    },
    {
      id: 've-quat',
      position: { x: 0.5, y: 0.5, z: -0.1 },
      normal: { x: 1, y: 0, z: 0 },
      title: 'Vẽ Tranh Trang Trí',
      description:
        'Quạt được vẽ tranh thủ công hoặc viết thư pháp, trang trí họa tiết truyền thống — nhiều chiếc quạt Chàng Sơn từng được trưng bày tại Paris thế kỷ XIX.',
    },
  ],
};
