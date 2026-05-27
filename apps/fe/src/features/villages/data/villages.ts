export interface VillageStage {
  title: { vi: string; en: string };
  desc: { vi: string; en: string };
  imageUrl?: string;
}

export interface VillageData {
  slug: string;
  name: { vi: string; en: string };
  tagline: { vi: string; en: string };
  craft: { vi: string; en: string };
  history: { vi: string; en: string };
  diaoramaDesc: { vi: string; en: string }; // description of the miniature diorama box
  coverImageUrl: string;
  galleryImages: string[];
  videoUrl?: string;
  audioUrl?: string;
  artisan: {
    name: string;
    title: { vi: string; en: string };
    story: { vi: string; en: string };
    quote: { vi: string; en: string };
    avatarUrl?: string;
  };
  stages: VillageStage[];
  location: { vi: string; en: string };
  founded: string;
  color: string;
}

export const VILLAGES: VillageData[] = [
  // ─── 1. BÁT TRÀNG ────────────────────────────────────────────────────────
  {
    slug: 'bat-trang',
    name: { vi: 'Làng Gốm Bát Tràng', en: 'Bat Trang Ceramic Village' },
    tagline: {
      vi: 'Ngàn năm đất nung, hồn cốt không phai',
      en: 'A thousand years of fired earth, an eternal soul',
    },
    craft: { vi: 'Gốm sứ', en: 'Ceramics & Porcelain' },
    history: {
      vi: 'Bát Tràng là làng nghề gốm sứ nổi tiếng bậc nhất Việt Nam, tọa lạc bên bờ sông Hồng, huyện Gia Lâm, Hà Nội. Lịch sử làng khởi đầu từ thế kỷ 14–15 khi các nghệ nhân từ làng Bồ Bát (Ninh Bình) di cư về đây, khai thác mỏ đất sét trắng tinh khiết dọc ven sông. Trải qua hàng thế kỷ, Bát Tràng cung cấp đồ gốm cho cả triều đình lẫn dân gian — từ bát đĩa gia dụng đến các tác phẩm thờ phụng tinh xảo. Kỹ thuật men rạn đặc trưng, men ngọc xanh ngát và hoa văn lam màu chàm là dấu ấn riêng không thể nhầm lẫn của làng gốm ngàn tuổi này.',
      en: 'Bat Trang is Vietnam\'s most renowned ceramic village, nestled on the banks of the Red River in Gia Lam district, Hanoi. Its history dates to the 14th–15th century when artisans from Bo Bat village migrated here to mine pure white clay along the riverbanks. Over centuries, Bat Trang supplied ceramics to both the royal court and common households. Its signature crackle glaze, jade-green finish, and cobalt-blue floral motifs are unmistakable hallmarks of this thousand-year-old craft village.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Bát Tràng tái hiện lát cắt 3D không gian xưởng gốm cổ kính: lớp trước là nghệ nhân đang xoay vuốt bàn xoay thủ công, lớp giữa là kệ gốm xếp chồng và lò bầu gạch, lớp nền là tranh làng quê ven sông Hồng. Quét AR để thấy bàn xoay chuyển động và nghe thuyết minh câu chuyện nghệ nhân.',
      en: 'The Bat Trang diorama recreates a 3D cross-section of a traditional pottery workshop: the foreground shows an artisan at the hand wheel, the midground features stacked ceramics and a brick kiln, and the painted backdrop depicts the Red River village. Scan AR to see the wheel spin and hear the artisan\'s story.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    artisan: {
      name: 'Nghệ nhân Lê Bá Hiển',
      title: { vi: 'Nghệ nhân ưu tú', en: 'Distinguished Master Artisan' },
      story: {
        vi: 'Nghệ nhân ưu tú Lê Bá Hiển dành trọn 40 năm phục dựng thành công men ngọc lam Huế từng thất truyền suốt một thế kỷ. Ông là cầu nối giữa kỹ thuật cổ đại và mỹ học hiện đại, cố vấn trực tiếp cho dự án mô hình tiểu cảnh Bát Tràng.',
        en: 'Master artisan Le Ba Hien has spent 40 years successfully reviving the lost Hue jade glaze vanished for a century. He bridges ancient technique with modern aesthetics, serving as direct advisor for the Bat Trang diorama project.',
      },
      quote: {
        vi: 'Xoay vuốt đất sét là cách người thợ gốm trò chuyện với thời gian — đưa hồn cốt sông núi đặt vào thớ sứ mỏng manh ngàn năm.',
        en: 'Throwing clay on the wheel is how a potter converses with time — placing the soul of rivers and mountains into delicate porcelain that lasts a thousand years.',
      },
    },
    stages: [
      {
        title: { vi: 'Giai đoạn 1 — Nguyên Liệu', en: 'Stage 1 — Raw Materials' },
        desc: {
          vi: 'Đất sét thạch anh trắng được khai thác, ngâm nước và nhào luyện đến khi dẻo mịn hoàn toàn. Tiểu cảnh mô phỏng khu sơ chế đất với các khối đất xếp chồng và máng nước lọc cạnh bờ sông.',
          en: 'White quartz clay is mined, soaked, and kneaded until perfectly smooth. The diorama shows the clay preparation area with stacked clay blocks and a riverside water filter trough.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 2 — Chế Tác', en: 'Stage 2 — Crafting' },
        desc: {
          vi: 'Trọng tâm của hộp tiểu cảnh: nghệ nhân miniature đang xoay vuốt tạo hình bình gốm trên bàn xoay gỗ thủ công. Quét AR để bàn xoay chuyển động và nghe âm thanh tiếng đất sét ướt.',
          en: 'The centerpiece of the diorama: a miniature artisan shaping a ceramic vase on a hand-powered wooden wheel. Scan AR to animate the wheel and hear the sound of wet clay being worked.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 3 — Xử Lý', en: 'Stage 3 — Processing' },
        desc: {
          vi: 'Gốm được vẽ men và đưa vào lò bầu gạch cổ nung ở 1280–1300°C trong 24 giờ. Mô hình tái hiện lò bầu cắt đôi lộ rõ các tầng gốm bên trong, với hiệu ứng LED mô phỏng lửa đỏ rực.',
          en: 'Glazed pieces enter a traditional brick kiln at 1280–1300°C for 24 hours. The model shows a cross-sectioned kiln revealing stacked ceramics inside, with LED effects simulating red-hot flames.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 4 — Thành Phẩm', en: 'Stage 4 — Finished Product' },
        desc: {
          vi: 'Điểm nhấn thị giác của hộp: các bình gốm men rạn, bát ngọc lam và đĩa hoa lam được trưng bày trên kệ gỗ phía trước. Màu sắc rực rỡ của gốm nổi bật trên nền trung tính của kiến trúc làng nghề.',
          en: 'The visual highlight of the box: crackle-glazed vases, jade-green bowls, and cobalt-painted dishes displayed on a wooden shelf in the foreground. Vibrant ceramic colors pop against the neutral village architecture backdrop.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Bát Tràng, Gia Lâm, Hà Nội', en: 'Bat Trang Commune, Gia Lam, Hanoi' },
    founded: '~1370',
    color: '#C9973A',
  },

  // ─── 2. VẠN PHÚC ─────────────────────────────────────────────────────────
  {
    slug: 'van-phuc',
    name: { vi: 'Làng Lụa Vạn Phúc', en: 'Van Phuc Silk Village' },
    tagline: {
      vi: 'Óng ánh tơ vàng, dệt nên huyền thoại ngàn năm',
      en: 'Shimmering golden silk, weaving a thousand-year legend',
    },
    craft: { vi: 'Dệt lụa tơ tằm', en: 'Silk Weaving' },
    history: {
      vi: 'Vạn Phúc — làng lụa nức tiếng Hà Đông — có lịch sử dệt lụa hơn 1.200 năm. Tương truyền nghề dệt được bà Lã Thị Nga truyền dạy từ thế kỷ 9. Lụa Hà Đông từng là thứ vải quý tiến vua, được Nguyên Sa bất tử hóa trong thơ. Điểm đặc biệt là hàng nghìn mẫu hoa văn khác nhau — từ Song Hạc, mây cuộn đến hoa sen — tất cả tạo ra trên khung cửi gỗ không dùng điện.',
      en: 'Van Phuc — the renowned silk village of Ha Dong — has over 1,200 years of weaving history. Legend holds that Lady La Thi Nga taught the craft in the 9th century. Ha Dong silk was once royal tribute fabric, immortalized in Nguyen Sa\'s poetry. The village is distinguished by thousands of unique woven patterns — Twin Cranes, rolling clouds, lotus flowers — all created on traditional wooden looms without electricity.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Vạn Phúc tái hiện không gian nhà dệt: lớp trước là nghệ nhân ngồi trước khung cửi gỗ lớn, lớp giữa là guồng tơ và bó sợi đủ màu, lớp nền là mái nhà cổ và cây dâu. Quét AR để khung cửi chuyển động và nghe tiếng lạch cạch nhịp nhàng của thoi dệt.',
      en: 'The Van Phuc diorama recreates a weaving house interior: the foreground shows an artisan at a large wooden loom, the midground features silk reels and colorful thread bundles, and the backdrop depicts a traditional roof and mulberry trees. Scan AR to animate the loom and hear the rhythmic clatter of the shuttle.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620122830785-a67d5d0a33b5?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    artisan: {
      name: 'Nghệ nhân Nguyễn Thị Hoa',
      title: { vi: 'Nghệ nhân thế hệ thứ tư', en: 'Fourth-Generation Master Weaver' },
      story: {
        vi: 'Bà Nguyễn Thị Hoa, nghệ nhân dệt lụa thế hệ thứ tư, nắm giữ bí quyết dệt hoa văn Song Hạc — mẫu cổ hiếm chỉ còn được dệt tại Vạn Phúc. Mỗi mét vải mất trung bình 3–4 giờ tập trung hoàn toàn. Bà là cố vấn mẫu hoa văn cho bộ sưu tập hộp tiểu cảnh Vạn Phúc.',
        en: 'Nguyen Thi Hoa, a fourth-generation silk weaver, holds the secret to weaving the Song Hac (Twin Crane) pattern — a rare ancient motif woven only at Van Phuc. Each meter takes 3–4 hours of unbroken concentration. She is the pattern design advisor for the Van Phuc diorama collection.',
      },
      quote: {
        vi: 'Mỗi sợi tơ là một nhịp thở. Dệt lụa không chỉ là nghề — đó là cách chúng tôi giữ hơi ấm tổ tiên trong từng thước vải.',
        en: 'Each silk thread is a breath. Weaving is not merely a craft — it is how we keep the warmth of our ancestors in every length of fabric.',
      },
    },
    stages: [
      {
        title: { vi: 'Giai đoạn 1 — Nguyên Liệu', en: 'Stage 1 — Raw Materials' },
        desc: {
          vi: 'Tằm được nuôi bằng lá dâu tươi trong 25–30 ngày. Tiểu cảnh tái hiện góc nuôi tằm với khay kén và cây dâu thu nhỏ. Kén được luộc sơ để kéo sợi tơ liên tục mịn như sương mai.',
          en: 'Silkworms are raised on fresh mulberry leaves for 25–30 days. The diorama shows a silkworm-rearing corner with cocoon trays and miniature mulberry trees. Cocoons are briefly boiled to unravel continuous filaments fine as morning mist.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 2 — Chế Tác', en: 'Stage 2 — Crafting' },
        desc: {
          vi: 'Trung tâm của hộp: nghệ nhân miniature điều khiển khung cửi gỗ bằng tay và chân đồng thời, đan xen sợi ngang tạo hoa văn. Quét AR để khung cửi chuyển động nhịp nhàng như đang dệt lụa thật.',
          en: 'The diorama\'s centerpiece: a miniature artisan operating the wooden loom with hands and feet simultaneously, interlacing weft threads to form patterns. Scan AR to see the loom move rhythmically as if weaving real silk.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 3 — Xử Lý', en: 'Stage 3 — Processing' },
        desc: {
          vi: 'Tơ được nhuộm bằng thực vật tự nhiên: lá chàm cho màu xanh, vỏ lựu cho vàng, rễ cây cho đỏ. Mô hình tái hiện khu nhuộm với các chảo màu và sào phơi sợi tơ đủ màu sắc rực rỡ.',
          en: 'Threads are dyed with natural botanicals: indigo for blue, pomegranate rind for yellow, roots for red. The model recreates a dyeing corner with color vats and drying racks hung with vibrantly colored silk threads.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 4 — Thành Phẩm', en: 'Stage 4 — Finished Product' },
        desc: {
          vi: 'Điểm sáng thị giác của hộp: các tấm lụa gấp nhỏ nhiều màu — vàng óng, xanh ngọc, đỏ son — trưng bày phía trước trên kệ gỗ. Hoa văn Song Hạc và hoa sen in nổi rõ nét trên từng tấm lụa miniature.',
          en: 'The visual highlight: small folded silk pieces in multiple colors — golden yellow, jade green, vermillion — displayed on the foreground shelf. Twin Crane and lotus patterns are embossed clearly on each miniature silk panel.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1620122830785-a67d5d0a33b5?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Phường Vạn Phúc, Hà Đông, Hà Nội', en: 'Van Phuc Ward, Ha Dong, Hanoi' },
    founded: '~TK 9',
    color: '#8B6FBA',
  },

  // ─── 3. QUẢNG PHÚ CẦU ────────────────────────────────────────────────────
  {
    slug: 'quang-phu-cau',
    name: { vi: 'Làng Hương Quảng Phú Cầu', en: 'Quang Phu Cau Incense Village' },
    tagline: {
      vi: 'Khói hương ngan ngát, nối đất với trời',
      en: 'Fragrant incense smoke, bridging earth and heaven',
    },
    craft: { vi: 'Làm hương que', en: 'Incense Making' },
    history: {
      vi: 'Làng Quảng Phú Cầu, huyện Ứng Hòa, Hà Nội mang vẻ đẹp đặc biệt với những bó hương sặc sỡ phơi đầy sân. Nghề làm hương que thủ công có tuổi đời trên 100 năm. Mỗi buổi sáng sớm, cả làng rực lên sắc đỏ, tím, vàng của hàng vạn bó hương xếp thành hàng thẳng tắp — khung cảnh đã trở thành biểu tượng nhiếp ảnh nổi tiếng thế giới. Toàn bộ quy trình từ se que đến bọc bột đến phơi đều làm bằng tay không máy móc.',
      en: 'Quang Phu Cau village in Ung Hoa district is famed for its spectacular courtyards filled with vibrant drying incense bundles. The entirely handmade craft spans over 100 years. Each early morning, the village glows red, purple, and yellow with tens of thousands of perfectly arranged incense bundles — a globally iconic photography scene. The entire process from stick rolling to powder coating to sun-drying is done completely by hand.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Quảng Phú Cầu tái hiện sân phơi hương lúc bình minh: lớp trước là các bó hương rực màu đỏ-tím-vàng xếp thành nan quạt, lớp giữa là người thợ đang se que và bọc bột, lớp nền là mái ngói rêu phong và bầu trời sớm mai. Bật đèn LED để mô phỏng ánh nắng vàng buổi sáng chiếu xuyên bó hương.',
      en: 'The Quang Phu Cau diorama recreates the drying yard at dawn: the foreground features vibrant red-purple-yellow incense bundles fanned in rows, the midground shows a worker rolling sticks and coating powder, and the backdrop depicts mossy tile roofs under a morning sky. Switch on LED to simulate golden morning light streaming through the incense bundles.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610993304578-e4cf56a7c61e?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    artisan: {
      name: 'Nghệ nhân Trần Văn Minh',
      title: { vi: 'Người giữ bí phương hương cổ', en: 'Keeper of the Ancient Incense Formula' },
      story: {
        vi: 'Ông Trần Văn Minh, thế hệ thứ ba trong gia đình bốn đời làm hương, là người duy nhất còn gìn giữ công thức bột hương trầm cổ pha từ 12 loại thảo dược. Hương của ông cháy chậm đều trong 4 giờ, tỏa mùi trầm ấm không hắc.',
        en: 'Tran Van Minh, the third of four generations in his family\'s incense tradition, is the sole keeper of an ancient agarwood formula blending 12 medicinal herbs. His incense burns slowly and evenly for 4 hours, releasing a warm, non-pungent agarwood fragrance.',
      },
      quote: {
        vi: 'Mỗi nén hương là một lời cầu nguyện. Chúng tôi không chỉ làm ra sản phẩm — chúng tôi chưng cất tâm linh vào từng sợi khói mỏng manh.',
        en: 'Every stick of incense is a prayer. We do not merely make a product — we distill the spiritual into each wisp of fragile smoke.',
      },
    },
    stages: [
      {
        title: { vi: 'Giai đoạn 1 — Nguyên Liệu', en: 'Stage 1 — Raw Materials' },
        desc: {
          vi: 'Tre già được chẻ thành que mỏng đều, phơi khô. Song song đó, bột trầm hương, quế, hồi, đinh hương và thảo dược được cân đo theo bí phương. Tiểu cảnh mô phỏng kho nguyên liệu với que tre xếp bó và các hũ thảo mộc.',
          en: 'Mature bamboo is split into uniform thin sticks and sun-dried. Simultaneously, agarwood, cinnamon, star anise, clove and medicinal herb powders are measured by secret recipe. The diorama shows a material storage corner with bundled bamboo sticks and herb jars.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 2 — Chế Tác', en: 'Stage 2 — Crafting' },
        desc: {
          vi: 'Trọng tâm mô hình: người thợ miniature đang nhúng que tre vào bột hương ẩm, lăn tay tạo lớp bột đồng đều. Quét AR để xem bàn tay chuyển động thoăn thoắt và nghe tiếng nhịp tay se hương.',
          en: 'The diorama\'s centerpiece: a miniature worker dipping bamboo sticks into moist incense powder and hand-rolling for an even coat. Scan AR to see the hands move deftly and hear the rhythmic sound of stick rolling.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 3 — Xử Lý', en: 'Stage 3 — Processing' },
        desc: {
          vi: 'Phần que trần được nhuộm màu tươi sáng bằng phẩm thực vật. Sau đó bó hương được mang ra sân phơi 1–2 ngày cho khô hoàn toàn. Mô hình tái hiện khu nhuộm màu nhỏ và sào phơi đầy hương nhiều màu.',
          en: 'The bare stick end is dyed in vivid colors using vegetable dyes. Bundles are then taken to the drying yard for 1–2 days of complete sun-drying. The model recreates a small dyeing station and drying racks loaded with multicolored incense.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 4 — Thành Phẩm', en: 'Stage 4 — Finished Product' },
        desc: {
          vi: 'Điểm nhấn rực rỡ nhất của hộp: hàng chục bó hương đỏ-tím-vàng xếp thành nan quạt toa sáng ở lớp trước. Bật đèn LED để ánh sáng ấm chiếu qua các bó hương tạo hiệu ứng bình minh làng hương nổi tiếng thế giới.',
          en: 'The most vivid highlight of the box: dozens of red-purple-yellow incense bundles fanned out and glowing in the foreground. Switch on LED to cast warm light through the bundles, recreating the world-famous dawn scene of the incense village.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1610993304578-e4cf56a7c61e?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Quảng Phú Cầu, Ứng Hòa, Hà Nội', en: 'Quang Phu Cau Commune, Ung Hoa, Hanoi' },
    founded: '~1900s',
    color: '#E05A5A',
  },

  // ─── 4. CHUÔNG ───────────────────────────────────────────────────────────
  {
    slug: 'chuong',
    name: { vi: 'Làng Nón Chuông', en: 'Chuong Conical Hat Village' },
    tagline: {
      vi: 'Vành nón trắng nghiêng, che nắng che mưa cả đời',
      en: 'White brim tilted low — sheltering a lifetime from sun and rain',
    },
    craft: { vi: 'Làm nón lá', en: 'Conical Hat Making' },
    history: {
      vi: 'Làng Chuông thuộc huyện Thanh Oai, Hà Nội — làng nghề làm nón lá lâu đời nhất miền Bắc với lịch sử hơn 300 năm. Chiếc nón Chuông nổi tiếng nhờ vành đều, lá mỏng, nan tre chẻ nhỏ như sợi chỉ và đường khâu tăm tắp không lộ mũi. Mỗi chiếc nón là sản phẩm của 15–20 công đoạn thủ công tỉ mỉ hoàn toàn bằng tay. Nón Chuông từng được chọn là quà tặng ngoại giao đại diện cho bản sắc Việt Nam.',
      en: 'Chuong village in Thanh Oai district, Hanoi is the oldest conical hat-making village in northern Vietnam with over 300 years of history. Chuong hats are prized for even brims, thin leaves, bamboo ribs split fine as thread, and invisible stitching. Each hat requires 15–20 entirely hand-done steps. Chuong hats have been chosen as diplomatic gifts representing Vietnamese identity.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Chuông tái hiện góc làm nón dưới mái hiên: lớp trước là nghệ nhân miniature đang khâu nón trên khuôn gỗ, lớp giữa là bó lá nón và nan tre, lớp nền là vườn tre và cánh đồng lúa xanh. Quét AR để thấy kim chỉ chạy qua từng lớp lá và nghe tiếng khâu nhẹ nhàng.',
      en: 'The Chuong diorama recreates a hat-making corner under the eaves: the foreground shows a miniature artisan stitching a hat on a wooden mold, the midground features palm leaf bundles and bamboo ribs, and the backdrop depicts a bamboo grove and green rice paddies. Scan AR to see the needle trace through each leaf layer and hear the gentle sewing sounds.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580196969807-cc6de06c05be?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    artisan: {
      name: 'Nghệ nhân Nguyễn Thị Lan',
      title: { vi: 'Bàn tay khâu nón nhanh nhất làng', en: 'The Village\'s Fastest Stitching Hands' },
      story: {
        vi: 'Bà Nguyễn Thị Lan bắt đầu học khâu nón từ năm 7 tuổi theo bà nội. Hơn 50 năm sau, bà có thể hoàn thành một chiếc nón chỉ trong 4 tiếng với đường khâu đều tuyệt đối — kỷ lục tay nghề của làng Chuông. Bà hiện truyền nghề cho hơn 30 học trò.',
        en: 'Nguyen Thi Lan began learning hat stitching at age 7 from her grandmother. Over 50 years later, she can complete one hat in just 4 hours with perfectly even stitching — the village\'s craftsmanship record. She now teaches the craft to more than 30 students.',
      },
      quote: {
        vi: 'Chiếc nón không chỉ che đầu — nó che cả một đời người. Mỗi mũi khâu là một phần cuộc sống của người làm ra nó.',
        en: 'The conical hat does not just shade the head — it shades a whole lifetime. Each stitch holds a piece of the life of the person who made it.',
      },
    },
    stages: [
      {
        title: { vi: 'Giai đoạn 1 — Nguyên Liệu', en: 'Stage 1 — Raw Materials' },
        desc: {
          vi: 'Lá nón (lá cọ non) được phơi nắng nhạt màu rồi ủi phẳng. Nan tre vầu chẻ mỏng như sợi chỉ, vót nhẵn tạo 16 vành tròn đồng tâm. Tiểu cảnh tái hiện góc phơi lá và bó nan tre.',
          en: 'Young palm leaves are sun-bleached and ironed flat. Vau bamboo is split as thin as thread and sanded smooth to create 16 concentric rings. The diorama shows a leaf-drying corner and bundles of bamboo ribs.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 2 — Chế Tác', en: 'Stage 2 — Crafting' },
        desc: {
          vi: 'Trọng tâm hộp: nghệ nhân miniature đặt lá lên khuôn nón gỗ hình chóp, xếp nan vành rồi dùng kim chỉ màu trắng khâu từng lớp lá kỹ lưỡng. Quét AR để thấy động tác khâu tỉ mỉ từng mũi một.',
          en: 'The diorama\'s centerpiece: a miniature artisan layers leaves onto a conical wooden mold, positions the bamboo rings, then stitches each leaf layer with white thread. Scan AR to see the meticulous stitch-by-stitch motion.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 3 — Xử Lý', en: 'Stage 3 — Processing' },
        desc: {
          vi: 'Nón hoàn thiện được phủ dầu bóng (dầu thông hoặc dầu trẩu) để chống mưa và tăng độ sáng bóng. Sau đó phơi nắng cho khô. Mô hình tái hiện giá phơi nón dưới nắng với bóng bảo vệ phủ đều.',
          en: 'Finished hats are coated with varnish (pine or tung oil) for waterproofing and sheen. They are then sun-dried. The model recreates a hat-drying rack under sunlight with an even protective coating.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 4 — Thành Phẩm', en: 'Stage 4 — Finished Product' },
        desc: {
          vi: 'Điểm nhấn thị giác: hàng nón trắng bóng xếp chồng nghiêng nghiêng ở lớp trước, một chiếc được treo lên cao nổi bật trên nền xanh lá. Nhiều chiếc nón có thêu hoa văn đỏ hoặc thêu thơ bên trong vành.',
          en: 'The visual highlight: rows of gleaming white hats stacked and tilted in the foreground, one suspended prominently against a green backdrop. Several hats feature red embroidery or poetry verses stitched inside the brim.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1580196969807-cc6de06c05be?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Phương Trung, Thanh Oai, Hà Nội', en: 'Phuong Trung Commune, Thanh Oai, Hanoi' },
    founded: '~TK 17',
    color: '#4A9E6B',
  },

  // ─── 5. PHÚ VINH ─────────────────────────────────────────────────────────
  {
    slug: 'phu-vinh',
    name: { vi: 'Làng Mây Tre Đan Phú Vinh', en: 'Phu Vinh Bamboo & Rattan Village' },
    tagline: {
      vi: 'Tre già uốn mềm, đan nên cả một trời thủ công',
      en: 'Aged bamboo bends supple — woven into an entire craft universe',
    },
    craft: { vi: 'Mây tre đan', en: 'Bamboo & Rattan Weaving' },
    history: {
      vi: 'Làng Phú Vinh, xã Phú Nghĩa, huyện Chương Mỹ, Hà Nội — làng mây tre đan nổi tiếng nhất Việt Nam với lịch sử hơn 400 năm. Người thợ Phú Vinh nắm giữ hơn 200 mẫu hoa văn đan truyền thống khác nhau. Sản phẩm từ mây, tre, giang của làng được xuất khẩu đến hơn 40 quốc gia. Kỹ thuật đan ba chiều (3D weaving) độc đáo của làng tạo ra các tác phẩm vừa bền chắc vừa có giá trị thẩm mỹ cao như tranh nghệ thuật.',
      en: 'Phu Vinh village in Chuong My district, Hanoi is Vietnam\'s most famous bamboo and rattan weaving village with over 400 years of history. Phu Vinh artisans hold over 200 traditional weaving patterns. Products made from rattan, bamboo, and reed are exported to more than 40 countries. The village\'s unique 3D weaving technique creates pieces that are both durable and artistically valued like fine art.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Phú Vinh tái hiện xưởng đan thủ công: lớp trước là nghệ nhân miniature đang đan giỏ tre trên khuôn, lớp giữa là kệ sản phẩm đủ loại — giỏ, lồng, đèn mây — và bó giang phơi, lớp nền là rặng tre xanh um. Quét AR để thấy đôi tay đan nhanh thoăn thoắt và nghe tiếng tre nứt giòn.',
      en: 'The Phu Vinh diorama recreates a handcraft workshop: the foreground shows a miniature artisan weaving a bamboo basket on a mold, the midground features product shelves — baskets, cages, rattan lamps — and drying reed bundles, the backdrop depicts dense green bamboo groves. Scan AR to see nimble hands weaving rapidly and hear the crisp sound of splitting bamboo.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587467512961-120760940315?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    artisan: {
      name: 'Nghệ nhân Nguyễn Văn Trung',
      title: { vi: 'Bậc thầy đan 3D Phú Vinh', en: 'Master of 3D Weaving, Phu Vinh' },
      story: {
        vi: 'Ông Nguyễn Văn Trung là một trong số ít nghệ nhân còn nắm giữ kỹ thuật đan 3D cổ truyền — kỹ thuật tạo khối lồng nhau không cần keo hay đinh. Tác phẩm của ông đã được trưng bày tại bảo tàng ở Pháp, Nhật Bản và Hàn Quốc.',
        en: 'Nguyen Van Trung is one of the few artisans who still masters the traditional 3D interlocking weave technique — creating nested volumes without glue or nails. His works have been exhibited in museums in France, Japan, and South Korea.',
      },
      quote: {
        vi: 'Tre có thể uốn theo ý mình, nhưng phải hiểu tre trước. Mỗi nan tre có tính cách riêng — thợ giỏi là người biết lắng nghe.',
        en: 'Bamboo can be bent to your will, but you must understand it first. Each strip has its own character — a skilled artisan knows how to listen.',
      },
    },
    stages: [
      {
        title: { vi: 'Giai đoạn 1 — Nguyên Liệu', en: 'Stage 1 — Raw Materials' },
        desc: {
          vi: 'Tre già 3 tuổi được chặt, phơi nắng khô kiệt rồi ngâm nước vôi chống mối mọt. Giang, mây được bóc vỏ và phơi. Tiểu cảnh mô phỏng khu xử lý tre với cây tre cắt khúc và bể ngâm vôi.',
          en: 'Three-year-old bamboo is cut, sun-dried completely, then soaked in lime water to prevent insects. Rattan is peeled and dried. The diorama shows a bamboo processing area with sectioned bamboo and a lime soaking tank.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 2 — Chế Tác', en: 'Stage 2 — Crafting' },
        desc: {
          vi: 'Trọng tâm hộp: nghệ nhân miniature đang dùng ngón tay khéo léo đan từng nan tre qua khuôn giỏ. Kỹ thuật đan ba chiều tạo hình khối phức tạp mà không cần keo. Quét AR để thấy bàn tay đan nhanh thoăn thoắt.',
          en: 'The diorama\'s centerpiece: a miniature artisan skillfully interlacing bamboo strips through a basket mold. The 3D weaving technique creates complex forms without adhesive. Scan AR to see the hands weave with swift precision.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 3 — Xử Lý', en: 'Stage 3 — Processing' },
        desc: {
          vi: 'Sản phẩm đan xong được hun khói lưu huỳnh để diệt khuẩn, tăng màu vàng óng tự nhiên. Sau đó phủ vecni bóng bảo vệ và phơi khô. Mô hình tái hiện buồng hun khói và giá phơi sản phẩm.',
          en: 'Finished woven pieces are sulfur-fumigated to sterilize and enhance the natural golden hue. They are then varnished and sun-dried. The model recreates a fumigation chamber and product drying rack.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Giai đoạn 4 — Thành Phẩm', en: 'Stage 4 — Finished Product' },
        desc: {
          vi: 'Điểm nhấn thị giác: kệ trưng bày phía trước xếp đầy giỏ mây vàng óng, đèn lồng tre tinh xảo và tranh đan hoa văn truyền thống. Sắc vàng ấm của tre chín nổi bật trên nền xanh rặng tre phía sau.',
          en: 'The visual highlight: the foreground display shelf is filled with golden rattan baskets, intricate bamboo lanterns, and woven pattern art panels. The warm gold of aged bamboo pops against the green bamboo grove backdrop.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1587467512961-120760940315?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Phú Nghĩa, Chương Mỹ, Hà Nội', en: 'Phu Nghia Commune, Chuong My, Hanoi' },
    founded: '~TK 17',
    color: '#7A8C3E',
  },
];

export function getVillageBySlug(slug: string): VillageData | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
