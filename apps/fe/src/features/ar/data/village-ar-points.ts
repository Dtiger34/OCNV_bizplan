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
  title: { vi: string; en: string };
  description: { vi: string; en: string };
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
      title: { vi: 'Nặn Và Cắt Gọt', en: 'Molding and Trimming' },
      description: {
        vi: 'Đất sét được tạo hình trên bàn xoay, sau đó cắt gọt và chỉnh sửa để sản phẩm cân đối trước khi nung.',
        en: 'Clay is shaped on a potter\'s wheel, then trimmed and adjusted so the product is balanced before firing.',
      }
    },
    {
      // Lò nung mái vòm — bên phải, ngang tầm giữa/dưới
      id: 'lo-nung-gom',
      position: { x: 0.45, y: -0.1, z: 0.15 },
      normal: { x: 0.4, y: 0.1, z: 0.3 },
      title: { vi: 'Lò Nung Gốm', en: 'Ceramic Kiln' },
      description: {
        vi: 'Sản phẩm được nung ở 1.200–1.300°C, giúp gốm cứng chắc, bền và giữ màu men đẹp.',
        en: 'Products are fired at 1,200–1,300°C, making the ceramics hard, durable, and preserving the beautiful glaze color.',
      }
    },
    {
      // Kệ gốm thành phẩm — giữa-cao, phía sau người thợ, gần mái nhà
      id: 'gom-thanh-pham',
      position: { x: 0, y: 0.15, z: 0.15 },
      normal: { x: 0, y: 0.3, z: 0.35 },
      title: { vi: 'Gốm Thành Phẩm', en: 'Finished Ceramics' },
      description: {
        vi: 'Sau khi nung và hoàn thiện, sản phẩm mang vẻ đẹp mộc mạc, bền bỉ và đậm dấu ấn thủ công.',
        en: 'After firing and finishing, the product has a rustic, durable beauty and a strong handmade impression.',
      }
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
      title: { vi: 'Lá Cọ Được Chọn Lọc', en: 'Selected Palm Leaves' },
      description: {
        vi: 'Lá cọ non được tuyển chọn, phơi khô và là phẳng để tạo bề mặt trắng mịn, bền đẹp cho chiếc nón.',
        en: 'Young palm leaves are selected, sun-dried, and flattened to create a smooth white, durable and beautiful surface for the hat.',
      }
    },
    {
      // Giỏ/khung tre đan — sát đất, cạnh trái nhà, thấp nhất trong nhóm 4 điểm
      id: 'khung-tre',
      position: { x: -0.4, y: -0.32, z: 0.15 },
      normal: { x: -0.2, y: -0.1, z: 0.35 },
      title: { vi: 'Khung Tre', en: 'Bamboo Frame' },
      description: {
        vi: 'Các vành tre được uốn thành nhiều vòng tròn đồng tâm, tạo bộ khung cho chiếc nón lá.',
        en: 'Bamboo rims are bent into multiple concentric circles, creating the frame for the conical hat.',
      }
    },
    {
      // Người thợ ngồi khâu nón — sát cửa nhà, thấp (dáng ngồi)
      id: 'lop-la-len-vanh-non',
      position: { x: -0.03, y: -0.22, z: 0.18 },
      normal: { x: 0, y: 0, z: 0.4 },
      title: { vi: 'Lợp Lá Lên Vành Nón', en: 'Layering Leaves on Hat Rim' },
      description: {
        vi: 'Những lớp lá được xếp đều lên khung nón theo từng vòng, bảo đảm cân đối và ôm sát từng vành.',
        en: 'Layers of leaves are arranged evenly on the hat frame round by round, ensuring balance and hugging each rim tightly.',
      }
    },
    {
      // Kệ nón lá thành phẩm — sát cạnh phải nhà, ngang tầm giữa
      id: 'non-la-thanh-pham',
      position: { x: 0.5, y: -0.02, z: 0.1 },
      normal: { x: 0.3, y: 0.1, z: 0.25 },
      title: { vi: 'Nón Lá Thành Phẩm', en: 'Finished Conical Hats' },
      description: {
        vi: 'Sau khi khâu hoàn thiện và cắt viền, chiếc nón trở nên nhẹ, bền. Nhiều nghệ nhân còn trang trí thêm họa tiết hoặc hình vẽ để tạo nên những mẫu nón đa dạng.',
        en: 'After sewing and trimming the edges, the hat becomes light and durable. Many artisans also decorate with motifs or drawings to create diverse hat models.',
      }
    },
  ],

  'huong-quang-phu-cau': [
    {
      // Chọn nguyên liệu — trái-dưới, thấp (bó tăm tre phía trước)
      id: 'chon-nguyen-lieu',
      position: { x: -0.45, y: -0.3, z: 0.15 },
      normal: { x: -0.3, y: -0.1, z: 0.3 },
      title: { vi: 'Chọn Nguyên Liệu', en: 'Material Selection' },
      description: {
        vi: 'Tre hoặc nứa được tuyển chọn kỹ để làm tăm hương, bảo đảm độ thẳng, dẻo và bền trước khi sản xuất.',
        en: 'Bamboo is carefully selected to make incense sticks, ensuring straightness, flexibility, and durability before production.',
      }
    },
    {
      // Se hương — giữa, ngang tầm người thợ đang thao tác
      id: 'se-huong',
      position: { x: 0, y: -0.15, z: 0.2 },
      normal: { x: 0, y: 0, z: 0.4 },
      title: { vi: 'Se Hương', en: 'Rolling Incense' },
      description: {
        vi: 'Người thợ phủ hỗn hợp bột hương lên thân tăm bằng phương pháp thủ công hoặc máy se hương. Lớp bột được phủ đều, tạo thành nén hương hoàn chỉnh.',
        en: 'Craftsmen coat the incense powder mixture onto the stick manually or with a rolling machine. The powder layer is evenly coated, creating a complete incense stick.',
      }
    },
    {
      // Phơi hương — hẳn ngoài kệ hương phơi bên phải nhà
      id: 'phoi-huong',
      position: { x: 0.9, y: 0.05, z: 0.2 },
      normal: { x: 0.6, y: 0.1, z: 0.3 },
      title: { vi: 'Phơi Hương', en: 'Drying Incense' },
      description: {
        vi: 'Những bó hương được phơi dưới nắng để khô tự nhiên, giúp hương giữ mùi thơm và cháy đều.',
        en: 'Bundles of incense are sun-dried naturally, helping the incense retain its fragrance and burn evenly.',
      }
    },
  ],

  'lua-van-phuc': [
    {
      // Cụm sợi tơ nhuộm màu treo — trái-thấp, sát khung treo sợi
      id: 'nhuom-soi-to',
      position: { x: -0.6, y: -0.25, z: 0.15 },
      normal: { x: -0.4, y: -0.1, z: 0.3 },
      title: { vi: 'Nhuộm Sợi Tơ', en: 'Dyeing Silk Threads' },
      description: {
        vi: 'Sợi tơ được nhuộm bằng nhiều gam màu khác nhau trước khi đưa lên khung cửi, tạo nên những sắc màu và hoa văn đặc trưng của lụa Vạn Phúc.',
        en: 'Silk threads are dyed in various colors before being put on the loom, creating the characteristic colors and patterns of Van Phuc silk.',
      }
    },
    {
      // Kén tơ tằm — giỏ kén trắng dưới cụm sợi nhuộm, sát đất
      id: 'ken-to-tam',
      position: { x: -0.6, y: -0.62, z: 0.15 },
      normal: { x: -0.4, y: -0.4, z: 0.3 },
      title: { vi: 'Kén Tơ Tằm', en: 'Silkworm Cocoons' },
      description: {
        vi: 'Nguồn nguyên liệu của nghề dệt lụa. Sau khi ươm, sợi tơ tự nhiên thường có màu trắng ngà hoặc vàng nhạt, trước khi được nhuộm hoặc đưa vào dệt.',
        en: 'The source material of silk weaving. After reeling, natural silk threads usually have an ivory white or pale yellow color, before being dyed or woven.',
      }
    },
    {
      // Khung cửi — chính giữa-thấp, tại mặt vải đang dệt trên khung
      id: 'khung-cui',
      position: { x: 0.05, y: -0.35, z: 0.2 },
      normal: { x: 0, y: -0.15, z: 0.4 },
      title: { vi: 'Khung Cửi', en: 'The Loom' },
      description: {
        vi: 'Hoạt động theo cơ chế nâng–hạ sợi dọc và đưa thoi qua lại, giúp các sợi tơ đan xen thành vải.',
        en: 'Operates by raising-lowering warp threads and passing the shuttle back and forth, helping the silk threads interweave into fabric.',
      }
    },
    {
      // Vải lụa thành phẩm — phải-rất thấp, tấm vải xếp cạnh bình hoa
      id: 'lua-thanh-pham',
      position: { x: 0.45, y: -0.55, z: 0.15 },
      normal: { x: 0.35, y: -0.3, z: 0.3 },
      title: { vi: 'Vải Lụa Thành Phẩm', en: 'Finished Silk Fabric' },
      description: {
        vi: 'Sau quá trình dệt và hoàn thiện, tấm lụa mềm mại, óng mượt trở thành chất liệu để may áo dài, khăn lụa và nhiều sản phẩm thủ công truyền thống.',
        en: 'After the weaving and finishing process, the soft, smooth silk becomes a material for making ao dai, silk scarves, and many traditional handicrafts.',
      }
    },
  ],

  'quat-chang-son': [
    {
      // Quạt thành phẩm treo — trái, cao (phía trên cùng bên trái)
      id: 'quat-thanh-pham',
      position: { x: -0.45, y: 0.25, z: 0.2 },
      normal: { x: -0.3, y: 0.2, z: 0.35 },
      title: { vi: 'Quạt Thành Phẩm', en: 'Finished Fans' },
      description: {
        vi: 'Những chiếc quạt hoàn thiện với màu sắc và họa tiết đa dạng, tôn vinh vẻ đẹp nghệ thuật của nghề làm quạt truyền thống.',
        en: 'Finished fans with diverse colors and motifs, honoring the artistic beauty of traditional fan making.',
      }
    },
    {
      // Giỏ tre nguyên liệu — trái-thấp (sát giỏ đựng thanh tre)
      id: 'tre-trong-gio',
      position: { x: -0.6, y: -0.35, z: 0.15 },
      normal: { x: -0.35, y: -0.2, z: 0.3 },
      title: { vi: 'Tre Trong Giỏ', en: 'Bamboo in Basket' },
      description: {
        vi: 'Những ống tre già, thẳng thân, ít mắt được chọn kỹ làm nguyên liệu chính. Tre sau khi chặt sẽ được ngâm, phơi khô và xử lý chống mối mọt để đảm bảo độ dai, bền và không cong vênh.',
        en: 'Old bamboo tubes, straight, with few nodes are carefully selected as the main material. After cutting, bamboo is soaked, dried, and treated against termites to ensure toughness, durability, and prevent warping.',
      }
    },
    {
      // Dụng cụ và bát màu vẽ — trái-rất thấp, sát giỏ màu phía trước
      id: 'dung-cu-va-mau-ve',
      position: { x: -0.15, y: -0.45, z: 0.25 },
      normal: { x: -0.1, y: -0.25, z: 0.4 },
      title: { vi: 'Dụng Cụ Và Màu Vẽ', en: 'Tools and Colors' },
      description: {
        vi: 'Bút lông, chén màu... là những dụng cụ không thể thiếu. Màu được pha từ chất liệu truyền thống, an toàn và bền màu, giúp sản phẩm giữ được nét đẹp lâu dài.',
        en: 'Brushes, color cups... are indispensable tools. Colors are mixed from traditional materials, safe and colorfast, helping the product retain its long-lasting beauty.',
      }
    },
    {
      // Khung nan tre — giữa-rất thấp, sát bó thanh tre trên bàn
      id: 'khung-nan-tre',
      position: { x: 0.15, y: -0.48, z: 0.2 },
      normal: { x: 0.1, y: -0.25, z: 0.35 },
      title: { vi: 'Khung Nan Tre', en: 'Bamboo Slat Frame' },
      description: {
        vi: 'Nan tre được chẻ mảnh, vót mỏng, mài nhẵn — khung quạt quyết định độ bền và độ cân đối của sản phẩm.',
        en: 'Bamboo slats are split thin, whittled, and polished smooth — the fan frame determines the durability and balance of the product.',
      }
    },
    {
      // Vẽ trang trí quạt — giữa-cao, ngay tay người thợ đang vẽ
      id: 've-trang-tri-quat',
      position: { x: 0.05, y: 0.05, z: 0.25 },
      normal: { x: 0, y: 0.1, z: 0.4 },
      title: { vi: 'Vẽ Trang Trí Quạt', en: 'Fan Decoration Painting' },
      description: {
        vi: 'Nghệ nhân dùng bút lông và màu truyền thống để vẽ thủ công lên mặt quạt giấy hoặc lụa. Những họa tiết thường là phong cảnh, hoa lá, chim muông hoặc thư pháp, đòi hỏi sự tỉ mỉ và cảm hứng nghệ thuật.',
        en: 'Artisans use brushes and traditional colors to paint manually on the paper or silk fan face. The motifs are often landscapes, flowers, birds, or calligraphy, requiring meticulousness and artistic inspiration.',
      }
    },
  ],
};
