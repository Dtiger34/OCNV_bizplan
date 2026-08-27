export interface Article {
  slug: string;
  tag: { vi: string; en: string };
  date: { vi: string; en: string };
  title: { vi: string; en: string };
  excerpt: { vi: string; en: string };
  image: string;
  content: {
    lead: { vi: string; en: string };
    sections: { heading: { vi: string; en: string }; body: { vi: string; en: string } }[];
  };
}

export const articles: Article[] = [
  {
    slug: 'bat-trang-700-nam-hon-dat-nung',
    tag: { vi: 'Làng nghề', en: 'Craft Village' },
    date: { vi: '15 tháng 5, 2025', en: 'May 15, 2025' },
    title: { 
      vi: 'Bát Tràng: 700 năm hồn đất nung trên đôi bàn tay nghệ nhân', 
      en: 'Bat Trang: 700 years of fired earth soul in artisans\' hands' 
    },
    excerpt: {
      vi: 'Làng gốm Bát Tràng không chỉ là nơi sản xuất gốm sứ — đó là nơi ký ức của cả một dòng tộc được in lên từng mảnh đất sét.',
      en: 'Bat Trang pottery village is not just a place for ceramics — it is where the memory of an entire lineage is imprinted on every piece of clay.'
    },
    image: '/image/lang-gom.jpg',
    content: {
      lead: {
        vi: 'Nằm bên bờ sông Hồng, cách trung tâm Hà Nội chừng 15 km về phía đông nam, làng gốm Bát Tràng đã tồn tại và phát triển suốt hơn 700 năm. Nơi đây không chỉ là làng nghề — đó là bảo tàng sống nơi mỗi lò nung, mỗi vòng bàn xoay đều chứa đựng câu chuyện của nhiều thế hệ nghệ nhân.',
        en: 'Located on the banks of the Red River, about 15 km southeast of central Hanoi, Bat Trang pottery village has existed and developed for over 700 years. It is not just a craft village — it is a living museum where every kiln and every wheel spin contains the story of many generations of artisans.'
      },
      sections: [
        {
          heading: { vi: 'Nguồn gốc và lịch sử', en: 'Origin and History' },
          body: {
            vi: 'Theo sử sách, Bát Tràng hình thành từ thời Lý — khi các dòng họ gốm nổi tiếng từ vùng Thanh Hóa di cư ra Bắc, định cư trên vùng đất sét trắng màu mỡ ven sông Hồng. Từ thế kỷ 15, gốm Bát Tràng đã được xuất khẩu sang Nhật Bản, Trung Quốc và các nước Đông Nam Á, trở thành đại sứ thương mại của nước Đại Việt.',
            en: 'According to history books, Bat Trang was formed during the Ly dynasty — when famous pottery families from Thanh Hoa migrated north, settling on the fertile white clay area along the Red River. Since the 15th century, Bat Trang ceramics have been exported to Japan, China, and Southeast Asian countries, becoming the commercial ambassador of Dai Viet.'
          },
        },
        {
          heading: { vi: 'Quy trình thủ công được truyền từ đời sang đời', en: 'Handcrafted Process Passed Down Through Generations' },
          body: {
            vi: 'Điều làm nên hồn cốt của gốm Bát Tràng chính là kỹ thuật xoay vuốt tay trên bàn xoay truyền thống. Đất sét sau khi được lọc kỹ, ủ qua đêm sẽ được nghệ nhân tạo hình bằng đôi tay trần — không có khuôn, không có máy móc. Mỗi chiếc bình, mỗi bộ chén đều là một tác phẩm duy nhất trên thế giới.',
            en: 'What makes the soul of Bat Trang pottery is the hand-throwing technique on traditional wheels. Clay, after being carefully filtered and incubated overnight, is shaped by artisans with bare hands — no molds, no machines. Every vase, every set of cups is a unique work in the world.'
          },
        },
        {
          heading: { vi: 'Tiểu cảnh Bát Tràng của Nghề Xưa Nét Mới', en: 'Bat Trang Diorama by Ancient Craft New Essence' },
          body: {
            vi: 'Hộp diorama Bát Tràng của chúng tôi tái hiện không gian xưởng gốm với nghệ nhân đang xoay vuốt đất sét bên cạnh lò nung gạch bầu cổ kính. Sử dụng vật liệu Mica acrylic, gỗ MDF và đất sét tự nhiên, mô hình kết hợp công nghệ AR để người xem có thể "bước vào" không gian làng gốm khi quét mã QR.',
            en: 'Our Bat Trang diorama recreates the pottery workshop space with an artisan throwing clay next to an ancient brick kiln. Using acrylic mica, MDF wood, and natural clay, the model combines AR technology so viewers can "step into" the pottery village space when scanning the QR code.'
          },
        },
      ],
    },
  },
  {
    slug: 'ar-va-di-san-cong-nghe-thoi-hon-tieu-canh-3d',
    tag: { vi: 'Công nghệ', en: 'Technology' },
    date: { vi: '8 tháng 5, 2025', en: 'May 8, 2025' },
    title: {
      vi: 'AR và di sản: Khi công nghệ thổi hồn vào tiểu cảnh 3D',
      en: 'AR and Heritage: When Technology Breathes Life into 3D Dioramas'
    },
    excerpt: {
      vi: 'Ứng dụng AR cho phép người dùng nhìn thấy nghệ nhân đang làm việc ngay trên mô hình thu nhỏ trong lòng bàn tay.',
      en: 'The AR app allows users to see artisans working right on the miniature model in the palm of their hand.'
    },
    image: '/image/anh-cau-chuyen-lang-nghe.jpg',
    content: {
      lead: {
        vi: 'Augmented Reality (AR) — công nghệ thực tế tăng cường — đang mở ra một chương mới cho việc bảo tồn và lan tỏa di sản văn hóa. Tại Nghề Xưa Nét Mới, chúng tôi tin rằng một hộp tiểu cảnh không chỉ là vật trang trí — đó là cánh cổng dẫn vào một thế giới khác.',
        en: 'Augmented Reality (AR) is opening a new chapter for the preservation and spread of cultural heritage. At Ancient Craft New Essence, we believe a diorama is not just a decoration — it is a gateway to another world.'
      },
      sections: [
        {
          heading: { vi: 'AR hoạt động như thế nào trên sản phẩm của chúng tôi?', en: 'How Does AR Work on Our Products?' },
          body: {
            vi: 'Mỗi hộp diorama đều được gắn kèm mã QR. Khi quét bằng điện thoại, ứng dụng sẽ nhận diện mô hình và phủ lên đó một lớp animation 3D — nghệ nhân xoay gốm, khung dệt lụa đang chuyển động, hay những bó hương đỏ rực phơi dưới nắng. Công nghệ marker-based AR đảm bảo trải nghiệm ổn định ngay cả trên các thiết bị tầm trung.',
            en: 'Each diorama box comes with a QR code. When scanned with a phone, the app recognizes the model and overlays a 3D animation — pottery artisans, moving silk looms, or bright red incense bundles drying in the sun. Marker-based AR technology ensures a stable experience even on mid-range devices.'
          },
        },
        {
          heading: { vi: 'Giáo dục di sản qua công nghệ', en: 'Heritage Education through Technology' },
          body: {
            vi: 'Nhiều trường học tại Hà Nội đã đưa bộ sản phẩm vào chương trình giảng dạy văn hóa địa phương. Thay vì chỉ đọc sách, học sinh có thể cầm trên tay mô hình làng nghề và "quan sát" nghệ nhân làm việc theo thời gian thực. Đây là minh chứng rõ ràng nhất cho sức mạnh của công nghệ trong giáo dục di sản.',
            en: 'Many schools in Hanoi have incorporated our products into their local culture curriculum. Instead of just reading books, students can hold the craft village model in their hands and "observe" artisans working in real-time. This is the clearest testament to the power of technology in heritage education.'
          },
        },
        {
          heading: { vi: 'Lộ trình phát triển', en: 'Development Roadmap' },
          body: {
            vi: 'Trong năm 2025, chúng tôi sẽ ra mắt phiên bản AR 2.0 với khả năng tương tác hai chiều — người dùng có thể "chạm" vào các vật thể trong không gian AR, nghe tiếng lò nung, tiếng thoi đưa và lời kể của chính các nghệ nhân làng nghề.',
            en: 'In 2025, we will launch AR version 2.0 with two-way interaction capabilities — users can "touch" objects in the AR space, hear kilns, shuttles, and stories told by the artisans themselves.'
          },
        },
      ],
    },
  },
  {
    slug: 'van-phuc-song-lai-nghe-det-lua-qua-diorama',
    tag: { vi: 'Cộng đồng', en: 'Community' },
    date: { vi: '1 tháng 5, 2025', en: 'May 1, 2025' },
    title: {
      vi: 'Vạn Phúc: Sống lại nghề dệt lụa qua từng ô kính diorama',
      en: 'Van Phuc: Silk Weaving Craft Revived Through Diorama Glass'
    },
    excerpt: {
      vi: 'Mỗi hộp tiểu cảnh Vạn Phúc là một lát cắt của làng nghề dệt lụa nghìn năm — nơi đường tơ óng ả hòa quyện với ký ức thời gian.',
      en: 'Each Van Phuc diorama box is a slice of a thousand-year-old silk weaving village — where glossy silk threads blend with memories of time.'
    },
    image: '/image/lang-lua.jpg',
    content: {
      lead: {
        vi: 'Làng lụa Vạn Phúc, Hà Đông đã dệt nên lịch sử hơn một nghìn năm. Những sấp lụa óng ả từng khoác lên mình vua chúa triều Nguyễn nay được tái hiện trong từng ô kính diorama thu nhỏ — nơi thời gian dường như đứng lại.',
        en: 'Van Phuc silk village, Ha Dong has woven a history of over a thousand years. The glossy silk rolls that once draped the Nguyen dynasty kings are now recreated in miniature diorama glass panes — where time seems to stand still.'
      },
      sections: [
        {
          heading: { vi: 'Nghề dệt lụa và câu chuyện tơ tằm', en: 'Silk Weaving and the Story of Silkworms' },
          body: {
            vi: 'Lụa Vạn Phúc nổi tiếng với hoa văn truyền thống như "song hạc", "thọ đỉnh", "vân chữ thọ". Toàn bộ quy trình từ nuôi tằm, ươm tơ đến dệt lụa đều được thực hiện thủ công bởi những nghệ nhân có thâm niên hàng chục năm. Mỗi mét lụa đòi hỏi hàng nghìn đường thoi tỉ mỉ.',
            en: 'Van Phuc silk is famous for traditional patterns like "song hac", "tho dinh", "van chu tho". The entire process from raising silkworms, extracting silk to weaving is done manually by artisans with decades of experience. Each meter of silk requires thousands of meticulous shuttle passes.'
          },
        },
        {
          heading: { vi: 'Thách thức của làng nghề hiện đại', en: 'Challenges of Modern Craft Villages' },
          body: {
            vi: 'Cũng như nhiều làng nghề truyền thống khác, Vạn Phúc đang đối mặt với nguy cơ mai một khi lớp nghệ nhân trẻ ngày càng ít mặn mà với nghề dệt. Chính vì lẽ đó, việc ghi chép và tái hiện quy trình dệt lụa qua hộp diorama trở thành sứ mệnh bảo tồn quan trọng của chúng tôi.',
            en: 'Like many other traditional craft villages, Van Phuc is facing the risk of fading away as younger artisans are less interested in weaving. That is why recording and recreating the silk weaving process through dioramas becomes our important conservation mission.'
          },
        },
        {
          heading: { vi: 'Diorama Vạn Phúc — câu chuyện trong lớp kính', en: 'Van Phuc Diorama — A Story in Glass' },
          body: {
            vi: 'Hộp tiểu cảnh Vạn Phúc sử dụng kỹ thuật nhiều lớp để tái hiện chiều sâu của xưởng dệt: lớp ngoài là khung cửa gỗ cổ, lớp giữa là khung cửi tre đang hoạt động với sợi tơ thực sự, lớp trong là những sấp lụa màu sắc rực rỡ xếp ngay ngắn. Khi kết hợp với AR, người xem có thể thấy khung cửi chuyển động và nghe âm thanh thoi đưa đặc trưng.',
            en: 'The Van Phuc diorama uses multi-layer techniques to recreate the depth of a weaving workshop: the outer layer is an ancient wooden door frame, the middle is a working bamboo loom with real silk threads, and the inner layer is neatly stacked vibrant silk rolls. Combined with AR, viewers can see the loom moving and hear the signature shuttle sounds.'
          },
        },
      ],
    },
  },
];
