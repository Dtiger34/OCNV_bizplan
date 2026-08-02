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

// LƯU Ý: toạ độ position/normal cho tất cả làng nghề hiện là ƯỚC LƯỢNG theo ảnh tham chiếu
// (chưa calibrate chính xác qua dev helper — API positionAndNormalFromPoint của model-viewer 4.x
// bị lỗi raycast trên các model này, xem lịch sử fix non-chuong). Điều chỉnh dần theo phản hồi
// trực quan: so ảnh chụp preview với vị trí vật thể thật, rồi nudge x/y/z tương ứng.
export const VILLAGE_AR_POINTS: Record<string, ArPoint[]> = {
  // Toạ độ ƯỚC LƯỢNG theo ảnh tham chiếu (chưa calibrate qua Alt+click) — kéo gần tâm/bề mặt
  // model theo kinh nghiệm rút ra từ non-chuong, cần tinh chỉnh dần theo phản hồi thực tế.
  'bat-trang': [
    {
      // Người thợ ngồi nặn gốm — trái-giữa, thấp (dáng ngồi), sát bàn xoay
      id: 'nan-va-cat-got',
      position: { x: -0.15, y: -0.15, z: 0.2 },
      normal: { x: -0.1, y: 0, z: 0.4 },
      title: 'Nặn Và Cắt Gọt',
      description:
        'Đất sét được tạo hình trên bàn xoay, sau đó cắt gọt và chỉnh sửa để sản phẩm cân đối trước khi nung.',
    },
    {
      // Lò nung mái vòm — bên phải, ngang tầm giữa/dưới
      id: 'lo-nung-gom',
      position: { x: 0.45, y: -0.1, z: 0.15 },
      normal: { x: 0.4, y: 0.1, z: 0.3 },
      title: 'Lò Nung Gốm',
      description:
        'Sản phẩm được nung ở 1.200–1.300°C, giúp gốm cứng chắc, bền và giữ màu men đẹp.',
    },
    {
      // Kệ gốm thành phẩm — giữa-cao, phía sau người thợ, gần mái nhà
      id: 'gom-thanh-pham',
      position: { x: 0, y: 0.15, z: 0.15 },
      normal: { x: 0, y: 0.3, z: 0.35 },
      title: 'Gốm Thành Phẩm',
      description:
        'Sau khi nung và hoàn thiện, sản phẩm mang vẻ đẹp mộc mạc, bền bỉ và đậm dấu ấn thủ công.',
    },
  ],

  // Bounding box thật đo được (getDimensions() qua Console): x≈1.88 (±0.94), y≈1.13 (±0.56),
  // z≈1.49 (±0.74), tâm ≈ (0,0,0). Toạ độ dưới đây kéo sát vào bề mặt model (không chạm rìa
  // ngoài bounding box) để hotspot bám đúng khối 3D thay vì trôi ra khoảng không phía trước.
  'non-chuong': [
    {
      // Cụm lá cọ xanh — sát cạnh trái nhà, gần bề mặt (không nhô xa ra trước)
      id: 'la-co-chon-loc',
      position: { x: -0.48, y: -0.15, z: 0.12 },
      normal: { x: -0.3, y: 0, z: 0.3 },
      title: 'Lá Cọ Được Chọn Lọc',
      description:
        'Lá cọ non được tuyển chọn, phơi khô và là phẳng để tạo bề mặt trắng mịn, bền đẹp cho chiếc nón.',
    },
    {
      // Giỏ/khung tre đan — sát đất, cạnh trái nhà, thấp nhất trong nhóm 4 điểm
      id: 'khung-tre',
      position: { x: -0.4, y: -0.32, z: 0.15 },
      normal: { x: -0.2, y: -0.1, z: 0.35 },
      title: 'Khung Tre',
      description:
        'Các vành tre được uốn thành nhiều vòng tròn đồng tâm, tạo bộ khung cho chiếc nón lá.',
    },
    {
      // Người thợ ngồi khâu nón — sát cửa nhà, thấp (dáng ngồi)
      id: 'lop-la-len-vanh-non',
      position: { x: -0.03, y: -0.22, z: 0.18 },
      normal: { x: 0, y: 0, z: 0.4 },
      title: 'Lợp Lá Lên Vành Nón',
      description:
        'Những lớp lá được xếp đều lên khung nón theo từng vòng, bảo đảm cân đối và ôm sát từng vành.',
    },
    {
      // Kệ nón lá thành phẩm — sát cạnh phải nhà, ngang tầm giữa
      id: 'non-la-thanh-pham',
      position: { x: 0.5, y: -0.02, z: 0.1 },
      normal: { x: 0.3, y: 0.1, z: 0.25 },
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
      // Cụm sợi tơ nhuộm màu treo — trái, thấp-giữa
      id: 'nhuom-soi-to',
      position: { x: -0.45, y: -0.05, z: 0.15 },
      normal: { x: -0.35, y: 0, z: 0.3 },
      title: 'Nhuộm Sợi Tơ',
      description:
        'Sợi tơ được nhuộm bằng nhiều gam màu khác nhau trước khi đưa lên khung cửi, tạo nên những sắc màu và hoa văn đặc trưng của lụa Vạn Phúc.',
    },
    {
      // Kén tơ tằm — dưới-trái, thấp hơn cụm sợi nhuộm, gần đất
      id: 'ken-to-tam',
      position: { x: -0.35, y: -0.3, z: 0.15 },
      normal: { x: -0.25, y: -0.15, z: 0.3 },
      title: 'Kén Tơ Tằm',
      description:
        'Nguồn nguyên liệu của nghề dệt lụa. Sau khi ươm, sợi tơ tự nhiên thường có màu trắng ngà hoặc vàng nhạt, trước khi được nhuộm hoặc đưa vào dệt.',
    },
    {
      // Khung cửi — chính giữa, nơi người thợ đang thao tác
      id: 'khung-cui',
      position: { x: 0.05, y: -0.05, z: 0.2 },
      normal: { x: 0, y: 0, z: 0.4 },
      title: 'Khung Cửi',
      description:
        'Hoạt động theo cơ chế nâng–hạ sợi dọc và đưa thoi qua lại, giúp các sợi tơ đan xen thành vải.',
    },
    {
      // Vải lụa thành phẩm — phải, tấm vải treo/xếp cạnh bình hoa
      id: 'lua-thanh-pham',
      position: { x: 0.45, y: -0.15, z: 0.15 },
      normal: { x: 0.35, y: 0, z: 0.3 },
      title: 'Vải Lụa Thành Phẩm',
      description:
        'Sau quá trình dệt và hoàn thiện, tấm lụa mềm mại, óng mượt trở thành chất liệu để may áo dài, khăn lụa và nhiều sản phẩm thủ công truyền thống.',
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
