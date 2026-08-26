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
      vi: 'Làng Gốm Bát Tràng thuộc xã Bát Tràng, nằm bên bờ sông Hồng và cách trung tâm Hà Nội khoảng 15 km. Đây là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam với lịch sử hơn 700 năm hình thành và phát triển. Từ xa xưa, gốm sứ không chỉ là vật dụng phục vụ đời sống hằng ngày mà còn mang giá trị nghệ thuật và văn hóa sâu sắc. Những sản phẩm gốm Bát Tràng thể hiện sự kết hợp hài hòa giữa kỹ thuật thủ công tinh xảo, óc sáng tạo và nét đẹp truyền thống của người Việt. Ngày nay, bên cạnh việc sản xuất và kinh doanh gốm sứ, Bát Tràng còn là điểm du lịch văn hóa nổi tiếng, thu hút đông đảo du khách trong và ngoài nước đến tham quan, trải nghiệm làm gốm và tìm hiểu về nghề thủ công truyền thống Việt Nam.',
      en: 'Bat Trang Ceramic Village is located in Bat Trang Commune, beside the Red River and approximately 15 km from central Hanoi. It is one of Vietnam\'s most renowned traditional pottery villages with over 700 years of history. Since ancient times, pottery has served not only as everyday utensils but also as objects of artistic and cultural value. Bat Trang ceramics showcase a harmonious blend of exquisite craftsmanship, creativity, and traditional Vietnamese aesthetics. Today, besides pottery production and trade, Bat Trang is a famous cultural tourism destination, attracting many domestic and international visitors who come to experience pottery-making and learn about Vietnam\'s traditional crafts.',
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
    videoUrl: 'https://www.youtube.com/embed/Z5VHUW5oUe4',
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
        title: { vi: 'Bước 1 — Chọn và Xử Lý Đất Sét', en: 'Step 1 — Material Selection & Preparation' },
        desc: {
          vi: 'Đất sét được lựa chọn kỹ lưỡng, loại bỏ tạp chất rồi ngâm, nhào và luyện đất để tạo độ dẻo, giúp sản phẩm dễ tạo hình và hạn chế nứt vỡ khi nung.',
          en: 'Clay is carefully selected and cleaned of impurities, then soaked, kneaded, and worked to achieve the right plasticity, making it easier to shape and reducing cracking during firing.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 2 — Tạo Hình Sản Phẩm', en: 'Step 2 — Shaping' },
        desc: {
          vi: 'Người thợ sử dụng bàn xoay hoặc khuôn để tạo hình cho sản phẩm như bát, đĩa, bình hoa, tượng hay đồ trang trí theo thiết kế mong muốn.',
          en: 'Craftspeople use a pottery wheel or molds to shape products such as bowls, plates, vases, figurines, or decorative items according to desired designs.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 3 — Phơi và Sửa Mộc', en: 'Step 3 — Drying & Trimming' },
        desc: {
          vi: 'Sản phẩm sau khi tạo hình được phơi khô tự nhiên. Người thợ tiến hành chỉnh sửa, gọt tỉa và làm nhẵn bề mặt để sản phẩm đạt độ hoàn thiện cao.',
          en: 'Shaped products are air-dried naturally. Artisans then trim, carve, and smooth the surface to achieve high-quality finish.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 4 — Trang Trí và Phủ Men', en: 'Step 4 — Decoration & Glazing' },
        desc: {
          vi: 'Các nghệ nhân vẽ hoa văn, họa tiết trang trí lên sản phẩm rồi phủ một lớp men phù hợp nhằm tăng tính thẩm mỹ và độ bền cho gốm.',
          en: 'Artisans paint decorative patterns and designs on products, then apply an appropriate glaze to enhance aesthetics and durability.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 5 — Nung Gốm', en: 'Step 5 — Firing' },
        desc: {
          vi: 'Sản phẩm được đưa vào lò nung ở nhiệt độ cao, thường từ 1.000°C đến hơn 1.300°C. Đây là công đoạn quyết định chất lượng, màu sắc và độ bền của sản phẩm.',
          en: 'Products are placed in a kiln at high temperatures, typically between 1,000°C and over 1,300°C. This stage determines the quality, color, and durability of the final product.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 6 — Hoàn Thiện và Đóng Gói', en: 'Step 6 — Finishing & Packaging' },
        desc: {
          vi: 'Sau khi nung, sản phẩm được kiểm tra chất lượng, phân loại, làm sạch và đóng gói trước khi đưa ra thị trường hoặc xuất khẩu.',
          en: 'After firing, products are quality-checked, sorted, cleaned, and packaged before being distributed to market or exported.',
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
      vi: 'Làng lụa Vạn Phúc, Hà Đông, Hà Nội từ lâu đã được xem là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam. Dạo bước trong làng, bạn dễ dàng bắt gặp hình ảnh khung cửi đặt ngay trong nhà, tiếng thoi đưa đều đặn vang lên từ sáng sớm, và những tấm lụa nhiều màu sắc phơi dọc theo các con ngõ nhỏ. Lụa Vạn Phúc không chỉ được sử dụng trong nước mà còn từng xuất hiện ở nhiều thị trường quốc tế, trở thành một trong những biểu tượng tiêu biểu của thủ công mỹ nghệ Việt Nam. Theo các tài liệu và truyền thuyết địa phương, nghề dệt lụa ở Vạn Phúc có lịch sử hơn 1.000 năm, gắn với tên tuổi bà A Lã Thị Nương, người được xem là tổ nghề dệt lụa.',
      en: 'Van Phuc silk village in Ha Dong, Hanoi is considered one of the most important cradles of Vietnam\'s traditional silk-weaving craft. Walking through the village, you easily encounter looms inside homes, the rhythmic sound of shuttles echoing from dawn, and colorful silk fabrics drying along narrow alleys. Van Phuc silk is not only used domestically but has also appeared in many international markets, becoming one of the distinctive symbols of Vietnamese craftsmanship. According to local documents and traditions, the silk-weaving craft at Van Phuc has over 1,000 years of history, associated with Lady La Thi Nuong, considered the founding ancestor of silk weaving.',
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
        title: { vi: 'Bước 1 — Nuôi Tằm', en: 'Step 1 — Silkworm Rearing' },
        desc: {
          vi: 'Tằm được nuôi bằng lá dâu tươi. Trong suốt vòng đời ngắn ngủi, tằm ăn liên tục và phát triển nhanh, tạo ra kén tơ. Chất lượng lá dâu và điều kiện nuôi quyết định trực tiếp đến độ mịn và bền của sợi lụa sau này.',
          en: 'Silkworms are raised on fresh mulberry leaves. Throughout their brief lifespan, they feed continuously and develop rapidly, producing cocoons. The quality of mulberry leaves and rearing conditions directly determine the fineness and durability of the resulting silk thread.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 2 — Ươm Tơ từ Kén Tằm', en: 'Step 2 — Cocoon Processing & Thread Extraction' },
        desc: {
          vi: 'Kén tằm sau khi thu hoạch được xử lý bằng nước nóng để tách sợi tơ. Người thợ sẽ kéo sợi tơ từ kén, gom nhiều sợi nhỏ thành một sợi lớn, làm khô và se sợi. Đây là công đoạn đòi hỏi sự khéo léo để giữ sợi tơ không bị đứt hoặc rối.',
          en: 'After harvesting, cocoons are treated with hot water to separate the silk fibers. Artisans draw out the thread, combine multiple fine filaments into one strand, then dry and twist it. This step requires skill to prevent the thread from breaking or tangling.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 3 — Dệt Lụa trên Khung Cửi', en: 'Step 3 — Silk Weaving on Loom' },
        desc: {
          vi: 'Sợi tơ sau khi xử lý được đưa lên khung cửi. Người thợ dàn sợi dọc và sợi ngang, dệt thủ công hoặc bán thủ công, điều chỉnh độ căng để tạo bề mặt vải đều và mịn. Tiếng thoi đưa trên khung cửi chính là "âm thanh đặc trưng" của làng nghề.',
          en: 'Processed silk threads are placed on the loom. Artisans arrange warp and weft threads, weave by hand or semi-mechanically, and adjust tension for even, smooth fabric. The sound of the shuttle on the loom is the "signature sound" of the craft village.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 4 — Nhuộm và Hoàn Thiện', en: 'Step 4 — Dyeing & Finishing' },
        desc: {
          vi: 'Sau khi dệt xong, vải lụa có thể được nhuộm màu bằng phương pháp truyền thống hoặc hiện đại, giặt và xử lý bề mặt để tạo độ bóng, kiểm tra chất lượng trước khi xuất xưởng. Mỗi tấm lụa đạt chuẩn phải có độ mềm, độ rũ và độ óng tự nhiên đặc trưng của Vạn Phúc.',
          en: 'After weaving, silk fabric can be dyed using traditional or modern methods, then washed and surface-treated for sheen. Quality is checked before finishing. Each premium silk piece must have the softness, drape, and natural luster characteristic of Van Phuc silk.',
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
      vi: 'Làng Hương Quảng Phú Cầu (huyện Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng của Việt Nam với lịch sử hơn 100 năm. Từ bao đời nay, hương đã trở thành một phần không thể thiếu trong văn hóa tâm linh dân tộc. Mỗi nén hương được thắp lên là sự kết nối giữa hiện tại và cội nguồn, thể hiện lòng thành kính đối với tổ tiên, thần linh và những giá trị truyền thống tốt đẹp. Tại Quảng Phú Cầu, các công đoạn làm hương như chẻ tăm, nhuộm chân hương, se hương và phơi hương đều được thực hiện một cách tỉ mỉ. Đặc biệt, hình ảnh những bó chân hương đỏ rực được xòe tròn dưới nắng đã trở thành biểu tượng đặc trưng của làng nghề.',
      en: 'Quang Phu Cau Incense Village (Ung Hoa District, Hanoi) is one of Vietnam\'s most renowned traditional incense-making villages with over 100 years of history. Throughout history, incense has been an indispensable part of Vietnamese spiritual culture. Each lit stick is a connection between present and ancestral roots, expressing devotion to ancestors, spirits, and beautiful traditional values. At Quang Phu Cau, all incense-making steps—from splitting bamboo to dyeing sticks, coating, and drying—are done meticulously by hand. The image of bright red incense bundles spread fan-like in the sun has become the distinctive symbol of this craft village.',
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
        title: { vi: 'Bước 1 — Chọn và Xử Lý Tre (Vầu)', en: 'Step 1 — Bamboo Selection & Preparation' },
        desc: {
          vi: 'Nguyên liệu chính để làm tăm hương là tre hoặc vầu già. Sau khi được tuyển chọn kỹ lưỡng, tre được chẻ nhỏ, vót thành những que tăm đều nhau để làm chân hương.',
          en: 'The primary material for incense sticks is mature bamboo or rattan. After careful selection, bamboo is split into small pieces and shaved into uniform sticks to form the incense base.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 2 — Nhuộm Chân Hương', en: 'Step 2 — Stick Dyeing' },
        desc: {
          vi: 'Tăm hương sau khi vót sẽ được nhuộm màu đỏ hoặc hồng rồi đem phơi khô. Đây là công đoạn tạo nên sắc đỏ đặc trưng của làng Hương Quảng Phú Cầu.',
          en: 'Shaved sticks are dyed red or pink and then sun-dried. This step creates the characteristic red color signature of Quang Phu Cau incense village.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 3 — Phơi Khô', en: 'Step 3 — Sun-Drying' },
        desc: {
          vi: 'Những bó chân hương được xòe tròn như những bông hoa lớn và phơi dưới nắng để màu nhuộm khô hoàn toàn, đồng thời tạo nên khung cảnh đặc sắc của làng nghề.',
          en: 'Incense stick bundles are spread in circular fan patterns like large flowers and sun-dried until the dye completely sets, creating the distinctive scenic landscape of the craft village.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 4 — Se Hương', en: 'Step 4 — Incense Powder Coating' },
        desc: {
          vi: 'Người thợ phủ hỗn hợp bột hương lên thân tăm bằng phương pháp thủ công hoặc máy móc hỗ trợ để tạo thành nén hương hoàn chỉnh.',
          en: 'Artisans apply incense powder mixture onto the bamboo sticks using hand methods or with mechanical assistance to create complete incense sticks.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 5 — Hoàn Thiện và Đóng Gói', en: 'Step 5 — Finishing & Packaging' },
        desc: {
          vi: 'Sau khi se hương, sản phẩm tiếp tục được phơi khô, phân loại và đóng gói trước khi đưa ra thị trường.',
          en: 'After powder coating, products are further sun-dried, sorted by quality, and packaged before distribution to market.',
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
      vi: 'Làng Chuông (hay làng Chuông nón) nằm ở vùng ven của Phú Xuyên, Hà Nội, là một trong những cái nôi của nghề làm nón lá truyền thống Việt Nam. Từ sân nhà, ngõ nhỏ đến hiên cửa, đâu đâu cũng có hình ảnh những chiếc lá cọ được phơi trắng, những vành tre được uốn tròn, hay tiếng kim khâu nón lách cách đều đặn. Làng Chuông là một "bảo tàng sống" nơi gần như mỗi gia đình đều có ít nhất một người biết làm nón. Ngoài việc sản xuất, làng Chuông còn phát triển du lịch làng nghề, góp phần quảng bá văn hóa Việt Nam và đưa những giá trị truyền thống đến gần hơn với thế hệ trẻ.',
      en: 'Chuong village, located on the outskirts of Phu Xuyen in Hanoi, is one of the cradles of Vietnam\'s traditional conical hat-making craft. From courtyards, narrow alleys to doorsteps, white palm leaves are dried everywhere, bamboo ribs are curved into rounds, and the steady sound of hat stitching echoes rhythmically. Chuong is a "living museum" where nearly every family has at least one person skilled in hat-making. Besides production, the village develops craft tourism and promotes Vietnamese culture to younger generations.',
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
        title: { vi: 'Bước 1 — Chọn và Xử Lý Lá', en: 'Step 1 — Leaf Selection & Processing' },
        desc: {
          vi: 'Nguyên liệu chính là lá cọ. Lá phải được chọn kỹ: không quá già (dễ giòn), không quá non (dễ rách). Sau khi hái, lá được phơi nắng nhẹ để giảm độ ẩm, làm mềm bằng hơi hoặc ủ, và là và ép phẳng để giữ bề mặt trắng mịn. Đây là bước quyết định "độ đẹp nền" của chiếc nón.',
          en: 'The main material is palm leaves. Leaves must be carefully selected: not too old (brittle) or too young (prone to tearing). After harvesting, leaves are gently sun-dried to reduce moisture, softened by steam or aging, then pressed flat to maintain a white, smooth surface. This step determines the "base beauty" of the hat.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 2 — Chuốt và Tạo Khung Tre', en: 'Step 2 — Bamboo Frame Making' },
        desc: {
          vi: 'Tre được chọn phải thẳng, dẻo và già vừa đủ. Người thợ chẻ tre thành nan mảnh, uốn thành các vòng tròn đồng tâm, cố định thành khung nón (thường có nhiều lớp vành). Khung nón chính là "xương sống", quyết định độ cân đối của sản phẩm.',
          en: 'Bamboo must be straight, flexible, and properly aged. Artisans split it into thin ribs, curve them into concentric rings, and secure them into the hat frame (usually multiple rings). The frame is the "backbone" that determines the hat\'s balance.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 3 — Xếp Lá Lên Khuôn', en: 'Step 3 — Leaf Layering' },
        desc: {
          vi: 'Lá được đặt lên khung theo từng lớp: lớp ngoài phải đều, mịn, không hở; lớp trong giúp tạo độ chắc và che khuyết điểm. Người thợ phải canh từng milimet, vì chỉ cần lệch một chút là nón sẽ mất cân đối.',
          en: 'Leaves are placed on the frame layer by layer: outer layers must be even, smooth, and without gaps; inner layers provide strength and cover imperfections. Artisans must measure precisely in millimeters, as even slight misalignment can affect the hat\'s balance.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 4 — Khâu Nón', en: 'Step 4 — Stitching' },
        desc: {
          vi: 'Đây là bước đòi hỏi kỹ năng cao nhất. Người thợ dùng kim dài, chỉ mảnh, khâu từng mũi xuyên qua lá và khung tre: mũi khâu phải đều, thẳng hàng; lực tay phải ổn định để không làm rách lá; khoảng cách mũi khâu quyết định độ bền và tính thẩm mỹ.',
          en: 'This step requires the highest skill level. Artisans use long needles and thin thread, stitching through leaves and bamboo frame: stitches must be even and aligned, hand pressure steady to avoid tearing leaves, and stitch spacing determines both durability and aesthetics.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 5 — Trang Trí và Hoàn Thiện', en: 'Step 5 — Decoration & Finishing' },
        desc: {
          vi: 'Sau khi khâu xong, nón có thể được phủ dầu để chống thấm nước, trang trí bằng hình ảnh, thơ, hoa văn, và gắn quai nón bằng vải hoặc lụa. Ở làng Chuông, nhiều chiếc nón còn được biến thành sản phẩm nghệ thuật phục vụ du lịch và thời trang.',
          en: 'After stitching, hats can be oil-coated for water resistance, decorated with images, poetry, or patterns, and fitted with fabric or silk straps. In Chuong village, many hats are transformed into artistic products for tourism and fashion.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1580196969807-cc6de06c05be?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Phương Trung, Thanh Oai, Hà Nội', en: 'Phuong Trung Commune, Thanh Oai, Hanoi' },
    founded: '~TK 17',
    color: '#4A9E6B',
  },

  // ─── 5. CHÀNG SƠN ────────────────────────────────────────────────────────
  {
    slug: 'chang-son',
    name: { vi: 'Làng Quạt Chàng Sơn', en: 'Chang Son Fan Village' },
    tagline: {
      vi: 'Cây quạt gió mát, ghi dấu tâm huyết thủ công',
      en: 'A fan\'s gentle breeze, imprinted with artisan\'s devotion',
    },
    craft: { vi: 'Làm quạt giấy, quạt lụa', en: 'Fan Making' },
    history: {
      vi: 'Làng nghề quạt Chàng Sơn nằm tại xã Chàng Sơn, từ lâu đã được biết đến như một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài. Không chỉ đơn thuần là nơi sản xuất quạt giấy, quạt lụa, nơi đây còn là không gian lưu giữ tinh hoa lao động thủ công, nơi mỗi chiếc quạt mang trong mình dấu ấn của sự tỉ mỉ, khéo léo và bền bỉ qua nhiều thế hệ. Nghề làm quạt ở Chàng Sơn đã có lịch sử từ rất lâu đời, các tư liệu lịch sử ghi nhận nghề đã hình thành và phát triển từ khoảng thế kỷ XVII đến XIX. Ngay từ thế kỷ XIX, quạt Chàng Sơn đã không chỉ là vật dụng làm mát thông thường mà còn là vật phẩm sang trọng, từng được người Pháp mang sang Paris để trưng bày trong các triển lãm quốc tế.',
      en: 'Chang Son fan village in Chang Son Commune is one of the cradles of traditional handcrafts in the Do region. More than just a paper and silk fan manufacturing center, it is a space preserving the essence of manual labor, where each fan bears the mark of meticulous craftsmanship, skill, and durability across generations. Fan-making in Chang Son has a very long history, documented from approximately the 17th to 19th centuries. Since the 19th century, Chang Son fans were not merely cooling utensils but luxury items, once brought to Paris by the French for display in international exhibitions.',
    },
    diaoramaDesc: {
      vi: 'Hộp tiểu cảnh Chàng Sơn tái hiện góc làm quạt: lớp trước là nghệ nhân miniature đang dán giấy quạt lên khung nan tre, lớp giữa là kệ sản phẩm trưng bày các chiếc quạt vẽ tranh thủ công, lớp nền là mái nhà cổ và cây dâu. Quét AR để thấy bàn tay dán quạt và nghe tiếng vẻ quạt mở khép.',
      en: 'The Chang Son diorama recreates a fan-making corner: the foreground shows a miniature artisan applying fan paper to the bamboo frame, the midground displays shelves of finished fans with hand-painted artwork, and the backdrop depicts a traditional roof and mulberry trees. Scan AR to see the hands affixing the paper and hear the gentle sound of fans opening and closing.',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1569778901349-11e8b0d0b90f?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1569778901349-11e8b0d0b90f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657e-5a89?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/RaNZh6sEL7U',
    artisan: {
      name: 'Nghệ nhân Đinh Văn Hoàn',
      title: { vi: 'Bậc thầy vẽ tranh quạt', en: 'Master of Fan Painting' },
      story: {
        vi: 'Ông Đinh Văn Hoàn dành 45 năm học hỏi và vẽ tranh lên quạt. Ông là một trong những vài người còn gìn giữ kỹ thuật vẽ tranh dân gian lên mặt quạt, kết hợp giữa kỹ năng vẽ nước ngoài và lối vẽ Đông Á cổ xưa. Các tác phẩm quạt của ông được bán trên các thị trường quốc tế.',
        en: 'Dinh Van Hoan has devoted 45 years to learning and painting on fans. He is one of the few who preserves the technique of traditional folk painting on fan surfaces, combining watercolor skills with ancient East Asian painting styles. His fan artworks are sold in international markets.',
      },
      quote: {
        vi: 'Chiếc quạt là bức tranh tính mệnh — phải che đẹp, vẽ cũng phải đẹp. Đó là nghệ thuật phục vụ sinh hoạt hằng ngày của người Việt.',
        en: 'A fan is a destinies canvas — it must shelter beautifully, and the painting must be beautiful too. This is art serving the daily life of Vietnamese people.',
      },
    },
    stages: [
      {
        title: { vi: 'Bước 1 — Chọn và Xử Lý Tre', en: 'Step 1 — Bamboo Selection & Preparation' },
        desc: {
          vi: 'Tre được chọn phải già, thẳng và dẻo. Sau đó chẻ thành từng nan nhỏ, vót mỏng và mài nhẵn để không gây xước tay, uốn tạo hình khung quạt theo kích thước chuẩn. Khung quạt là phần quyết định độ bền và độ cân đối của sản phẩm.',
          en: 'Bamboo must be mature, straight, and flexible. It is then split into thin ribs, shaved smooth and sanded to prevent cuts, and curved into fan frame shapes of standard size. The frame determines the fan\'s durability and balance.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1569778901349-11e8b0d0b90f?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 2 — Làm Giấy Quạt', en: 'Step 2 — Fan Paper Making' },
        desc: {
          vi: 'Giấy dùng làm quạt thường là giấy dó hoặc giấy chuyên dụng: giấy được xử lý để có độ dai và nhẹ, có thể được nhuộm màu hoặc in họa tiết, phơi khô tự nhiên để giữ độ bền. Ở một số sản phẩm cao cấp, giấy còn được vẽ tay hoặc in tranh dân gian.',
          en: 'Fan paper is usually mulberry paper or specialty fan paper: processed for durability and lightness, it can be dyed or patterned, and naturally sun-dried for strength. Premium products feature hand-painted or block-printed traditional folk art.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657e-5a89?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 3 — Dán và Định Hình Quạt', en: 'Step 3 — Paper Affixing & Shaping' },
        desc: {
          vi: 'Đây là công đoạn đòi hỏi sự khéo léo cao: dán giấy lên khung nan tre, canh chỉnh sao cho hai mặt cân đối, ép và cố định để quạt không bị cong hoặc lệch. Chỉ cần sai lệch nhỏ, quạt có thể bị nhăn hoặc mất dáng.',
          en: 'This step requires high precision: affixing paper to the bamboo frame, ensuring both sides are balanced, then pressing and securing so the fan does not warp or tilt. Even slight misalignment can cause wrinkles or deformation.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: { vi: 'Bước 4 — Trang Trí và Hoàn Thiện', en: 'Step 4 — Decoration & Finishing' },
        desc: {
          vi: 'Tùy mục đích sử dụng, quạt có thể được vẽ tranh thủ công, viết thư pháp, trang trí họa tiết truyền thống hoặc hiện đại. Sau đó, quạt được kiểm tra độ mở – gập, độ bền và tính thẩm mỹ trước khi đưa ra thị trường.',
          en: 'Depending on the intended use, fans can be hand-painted, decorated with calligraphy, or adorned with traditional or contemporary patterns. Finally, fans are quality-checked for opening-closing function, durability, and aesthetics before market distribution.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&w=600&q=80',
      },
    ],
    location: { vi: 'Xã Chàng Sơn, xứ Đoài', en: 'Chang Son Commune, Do Region' },
    founded: '~TK 17',
    color: '#D4A574',
  },
];

export function getVillageBySlug(slug: string): VillageData | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
