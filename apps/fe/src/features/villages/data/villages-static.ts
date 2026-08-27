export interface VillageStage {
  id: string;
  order: number;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  details?: { vi: string; en: string }[];
  imageUrl: string;
}

export interface HistoryMilestone {
  period: { vi: string; en: string };
  points: { vi: string; en: string }[];
}

export interface VillageStatic {
  slug: string;
  name: { vi: string; en: string };
  tagline: { vi: string; en: string };
  shortDescription: { vi: string; en: string };
  intro: { vi: string; en: string };
  historyText?: { vi: string; en: string };
  historyMilestones?: HistoryMilestone[];
  coverImageUrl: string;
  heroImageUrl: string;
  galleryImages: string[];
  videoUrl?: string;
  youtubeId?: string;
  videoSource?: string;
  color: string;
  artisanStory?: { vi: string; en: string };
  artisanQuote?: { vi: string; en: string };
  stages: VillageStage[];
  facts: { label: { vi: string; en: string }; value: { vi: string; en: string } }[];
}

export const VILLAGES: VillageStatic[] = [
  {
    slug: 'bat-trang',
    name: { vi: 'Làng Gốm Bát Tràng', en: 'Bat Trang Ceramic Village' },
    tagline: { vi: 'Hơn 700 năm tinh hoa gốm sứ', en: 'Over 700 years of ceramic essence' },
    shortDescription: {
      vi: 'Bát Tràng là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam, nằm bên bờ sông Hồng, cách trung tâm Hà Nội khoảng 15 km.',
      en: 'Bat Trang is one of Vietnam\'s most famous and oldest traditional ceramic villages, located on the banks of the Red River, about 15 km from central Hanoi.'
    },
    intro: {
      vi: 'Làng Gốm Bát Tràng thuộc xã Bát Tràng, nằm bên bờ sông Hồng và cách trung tâm Hà Nội khoảng 15 km. Đây là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam với lịch sử hơn 700 năm hình thành và phát triển.\n\nTừ xa xưa, gốm sứ không chỉ là vật dụng phục vụ đời sống hằng ngày mà còn mang giá trị nghệ thuật và văn hóa sâu sắc. Những sản phẩm gốm Bát Tràng thể hiện sự kết hợp hài hòa giữa kỹ thuật thủ công tinh xảo, óc sáng tạo và nét đẹp truyền thống của người Việt. Vì vậy, nghề làm gốm không chỉ góp phần phát triển kinh tế mà còn giữ vai trò quan trọng trong việc bảo tồn bản sắc văn hóa dân tộc.\n\nTại Bát Tràng, mỗi sản phẩm đều trải qua nhiều công đoạn công phu như xử lý đất, tạo hình, trang trí hoa văn, phủ men và nung trong lò. Sự khéo léo và kinh nghiệm của các nghệ nhân đã tạo nên những sản phẩm gốm có độ bền cao, hoa văn tinh tế và giá trị thẩm mỹ đặc trưng.\n\nNgày nay, bên cạnh việc sản xuất và kinh doanh gốm sứ, Bát Tràng còn là điểm du lịch văn hóa nổi tiếng, thu hút đông đảo du khách trong và ngoài nước đến tham quan, trải nghiệm làm gốm và tìm hiểu về nghề thủ công truyền thống Việt Nam.',
      en: 'Bat Trang Ceramic Village belongs to Bat Trang commune, located on the banks of the Red River and about 15 km from central Hanoi. This is one of the most famous and oldest traditional ceramic villages in Vietnam with a history of over 700 years of formation and development.\n\nSince ancient times, ceramics have not only been daily items but also hold profound artistic and cultural value. Bat Trang ceramic products represent a harmonious combination of exquisite craftsmanship, creativity, and the traditional beauty of the Vietnamese people. Therefore, pottery making not only contributes to economic development but also plays an important role in preserving the national cultural identity.\n\nAt Bat Trang, every product goes through many elaborate stages such as clay processing, shaping, pattern decoration, glazing, and firing in the kiln. The skill and experience of the artisans have created ceramic products with high durability, exquisite patterns, and distinctive aesthetic value.\n\nToday, besides the production and trading of ceramics, Bat Trang is also a famous cultural tourism destination, attracting many domestic and foreign tourists to visit, experience pottery making, and learn about Vietnam\'s traditional crafts.'
    },
    historyMilestones: [
      {
        period: { vi: 'Thế kỷ XV – XVI', en: '15th - 16th Century' },
        points: [
          { vi: 'Nghề gốm phát triển nhờ chính sách khuyến khích giao thương của nhà Mạc.', en: 'Pottery flourished thanks to the Mac dynasty\'s policies encouraging trade.' },
          { vi: 'Sản phẩm gốm bắt đầu mang dấu ấn riêng với tên người chế tác và niên đại sản xuất.', en: 'Ceramic products began to carry a distinct mark with the creator\'s name and production date.' },
        ],
      },
      {
        period: { vi: 'Thế kỷ XVI – XVII', en: '16th - 17th Century' },
        points: [
          { vi: 'Giai đoạn hưng thịnh nhất của gốm Bát Tràng.', en: 'The most prosperous period of Bat Trang ceramics.' },
          { vi: 'Nhờ thuận lợi về giao thương, sản phẩm được xuất khẩu rộng rãi sang nhiều nước trong khu vực và thế giới.', en: 'Thanks to favorable trade conditions, products were widely exported to many countries regionally and globally.' },
        ],
      },
      {
        period: { vi: 'Cuối thế kỷ XVII – XIX', en: 'Late 17th - 19th Century' },
        points: [
          { vi: 'Gốm Bát Tràng gặp nhiều khó khăn do sự cạnh tranh từ gốm Trung Quốc và Nhật Bản.', en: 'Bat Trang ceramics faced many difficulties due to competition from Chinese and Japanese ceramics.' },
          { vi: 'Hoạt động sản xuất chủ yếu phục vụ nhu cầu trong nước.', en: 'Production mainly served domestic needs.' },
        ],
      },
      {
        period: { vi: 'Từ thế kỷ XX đến nay', en: '20th Century to Present' },
        points: [
          { vi: 'Nghề gốm dần được phục hồi và phát triển mạnh.', en: 'Pottery gradually recovered and developed strongly.' },
          { vi: 'Các cơ sở sản xuất không ngừng đổi mới mẫu mã, đa dạng hóa sản phẩm và kết hợp phát triển du lịch làng nghề.', en: 'Production facilities continuously innovate designs, diversify products, and combine craft village tourism development.' },
        ],
      },
      {
        period: { vi: 'Hiện nay', en: 'Present' },
        points: [
          { vi: 'Bát Tràng là một trong những làng nghề gốm nổi tiếng nhất Việt Nam, góp phần bảo tồn và quảng bá văn hóa truyền thống dân tộc.', en: 'Bat Trang is one of the most famous ceramic villages in Vietnam, contributing to preserving and promoting national traditional culture.' },
        ],
      },
    ],
    coverImageUrl: '/image/gom_cover.jpg',
    heroImageUrl: '/image/gom_cover.jpg',
    galleryImages: [
      '/image/gom_gallery1.jpg',
      '/image/gom_gallery2.jpg',
      '/image/gom_gallery3.jpg',
    ],
    youtubeId: 'Z5VHUW5oUe4',
    videoSource: 'Diễm Quỳnh Japan',
    color: '#8B5E3C',
    artisanStory: {
      vi: 'Các nghệ nhân Bát Tràng đã dành cả cuộc đời để hoàn thiện kỹ thuật làm gốm, truyền từ đời này sang đời khác với tất cả tâm huyết và niềm tự hào.',
      en: 'Bat Trang artisans have dedicated their lives to perfecting pottery techniques, passing them down from generation to generation with utmost dedication and pride.'
    },
    artisanQuote: {
      vi: 'Mỗi chiếc bát, mỗi cái bình đều mang trong mình hơi thở của người thợ, của đất, của lửa — ba yếu tố tạo nên linh hồn gốm Bát Tràng.',
      en: 'Every bowl, every vase carries the breath of the craftsman, the earth, the fire — the three elements that create the soul of Bat Trang ceramics.'
    },
    facts: [
      { label: { vi: 'Lịch sử', en: 'History' }, value: { vi: 'Hơn 700 năm', en: 'Over 700 years' } },
      { label: { vi: 'Vị trí', en: 'Location' }, value: { vi: 'Gia Lâm, Hà Nội', en: 'Gia Lam, Hanoi' } },
      { label: { vi: 'Chất liệu', en: 'Material' }, value: { vi: 'Đất sét + Khoáng chất', en: 'Clay & Minerals' } },
      { label: { vi: 'Nhiệt độ nung', en: 'Firing Temp' }, value: { vi: '1.180°C – 1.280°C', en: '1.180°C – 1.280°C' } },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: { vi: 'Chuẩn bị và ủ nguyên liệu', en: 'Material Preparation & Aging' },
        description: {
          vi: 'Nguyên liệu được phối trộn từ ba đến bốn loại đất cùng với một số khoáng chất như thạch anh và trường thạch. Hỗn hợp được đưa vào máy trộn trong khoảng 12–24 giờ, sau đó ủ từ hai tuần đến một tháng để đất đạt độ dẻo và ổn định trước khi tạo hình.',
          en: 'Raw materials are blended from three to four types of clay along with minerals like quartz and feldspar. The mixture is put into a mixer for about 12-24 hours, then aged from two weeks to a month to achieve plasticity and stability before shaping.'
        },
        imageUrl: '/image/village-steps/gom_step1.webp',
      },
      {
        id: '2', order: 2,
        title: { vi: 'Tạo hình sản phẩm', en: 'Product Shaping' },
        description: {
          vi: 'Đất sau khi ủ được pha loãng với nước thành hồ đất rồi đổ vào khuôn thạch cao có hình dáng của sản phẩm. Sau khoảng 30 phút, phần hồ đất dư được loại bỏ, chỉ giữ lại lớp đất bám trên thành khuôn để tạo nên hình dạng ban đầu của sản phẩm.',
          en: 'After aging, clay is diluted with water into a slip and poured into a plaster mold shaped like the product. After about 30 minutes, excess slip is removed, leaving only the clay layer clinging to the mold walls to form the initial shape.'
        },
        imageUrl: '/image/village-steps/gom_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: { vi: 'Tiện và lắp ghép sản phẩm', en: 'Trimming & Assembling' },
        description: {
          vi: 'Sau khi tháo khuôn, người thợ tiến hành gọt, cắt tỉa và chỉnh sửa các chi tiết để loại bỏ một số chỗ gồ ghề và hoàn thiện hình dáng. Đối với các sản phẩm có nhiều bộ phận, các chi tiết sẽ được lắp ghép bằng chất hồ để gắn thành sản phẩm hoàn chỉnh.',
          en: 'After demolding, the craftsman trims, cuts, and refines details to remove rough spots and perfect the shape. For products with multiple parts, the pieces are assembled using slip to attach them into a complete product.'
        },
        imageUrl: '/image/village-steps/gom_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: { vi: 'Trang trí và phủ men', en: 'Decoration & Glazing' },
        description: {
          vi: 'Khi sản phẩm đã khô, các nghệ nhân tiến hành vẽ hoa văn và họa tiết thủ công lên bề mặt. Đây là công đoạn thể hiện tính thẩm mỹ và nét đặc trưng của gốm Bát Tràng. Sau khi trang trí, sản phẩm được phủ một lớp men phù hợp để tạo độ bóng, tăng độ bền và làm nổi bật màu sắc của hoa văn.',
          en: 'When the product is dry, artisans manually paint patterns and motifs on the surface. This stage showcases the aesthetics and distinctive features of Bat Trang ceramics. After decoration, a suitable glaze is applied to create a gloss, increase durability, and highlight pattern colors.'
        },
        imageUrl: '/image/village-steps/gom_step4.jpg',
      },
      {
        id: '5', order: 5,
        title: { vi: 'Nung gốm', en: 'Ceramic Firing' },
        description: {
          vi: 'Sản phẩm được đưa vào lò gas để nung trong khoảng 8–12 giờ ở nhiệt độ từ 1.180°C đến 1.280°C. Quá trình nung quyết định độ cứng, màu sắc và chất lượng cuối cùng của sản phẩm. Dưới tác động của nhiệt độ cao, lớp men chảy đều trên bề mặt và tạo nên vẻ đẹp đặc trưng của gốm Bát Tràng.',
          en: 'Products are placed in a gas kiln for firing for about 8-12 hours at temperatures from 1,180°C to 1,280°C. Firing determines the hardness, color, and final quality. Under high heat, the glaze melts evenly on the surface, creating the characteristic beauty of Bat Trang ceramics.'
        },
        imageUrl: '/image/village-steps/gom_step5.jpg',
      },
      {
        id: '6', order: 6,
        title: { vi: 'Hoàn thiện và đóng gói', en: 'Finishing & Packaging' },
        description: {
          vi: 'Sau khi nung, sản phẩm được kiểm tra chất lượng, phân loại, làm sạch và đóng gói cẩn thận trước khi đưa ra thị trường hoặc xuất khẩu.',
          en: 'After firing, products undergo quality checks, sorting, cleaning, and careful packaging before being distributed to the market or exported.'
        },
        imageUrl: '/image/village-steps/gom_step6.jpg',
      },
    ],
  },
  {
    slug: 'non-chuong',
    name: { vi: 'Làng Nón Chuông', en: 'Chuong Conical Hat Village' },
    tagline: { vi: 'Giữ lại hồn Việt trên từng lá nón', en: 'Preserving the Vietnamese soul on every hat leaf' },
    shortDescription: {
      vi: 'Làng Chuông (Phú Xuyên, Hà Nội) là một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam, nơi gần như mỗi gia đình đều biết làm nón.',
      en: 'Chuong Village (Phu Xuyen, Hanoi) is one of the most representative names when mentioning Vietnam\'s traditional conical hat making, where almost every family knows how to make hats.'
    },
    intro: {
      vi: 'Nằm ở vùng ven của Phú Xuyên, Hà Nội, làng Chuông (thường được gọi là làng Chuông nón) từ lâu đã trở thành một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam. Nếu nhìn từ xa, làng Chuông có vẻ yên bình như bao làng quê khác. Nhưng khi bước vào sâu bên trong, bạn sẽ thấy một "hệ sinh thái nghề thủ công" tồn tại bền bỉ hàng trăm năm — nơi mà gần như mỗi gia đình đều có ít nhất một người biết làm nón.\n\nĐiều đặc biệt là nơi đây không chỉ "làm nón", mà gần như cả làng cùng sống trong nhịp thở của nón. Từ sân nhà, ngõ nhỏ đến hiên cửa, đâu đâu cũng có hình ảnh những chiếc lá cọ được phơi trắng, những vành tre được uốn tròn, hay tiếng kim khâu nón lách cách đều đặn như một bản nhạc rất riêng của làng quê Bắc Bộ.',
      en: 'Located in the outskirts of Phu Xuyen, Hanoi, Chuong village (often called Chuong hat village) has long become one of the most typical names when referring to the traditional Vietnamese conical hat making craft. Seen from afar, Chuong village looks as peaceful as any other countryside village. But stepping deep inside, you will see a "handicraft ecosystem" that has persisted for hundreds of years — where almost every family has at least one person who knows how to make hats.\n\nThe special thing is that this place not only "makes hats", but almost the whole village lives in the rhythm of hats. From the courtyard, the small alleys to the front porches, everywhere you can see images of white palm leaves being dried, bamboo rims being bent into circles, or the regular clicking sound of hat sewing needles like a very unique melody of the Northern countryside.'
    },
    historyText: {
      vi: 'Làng Chuông là một trong những làng nghề truyền thống lâu đời của Hà Nội, gắn liền với nghề làm nón lá qua nhiều thế hệ. Tuy nhiên, thời điểm chính xác nghề nón xuất hiện tại đây vẫn chưa được xác định rõ ràng.\n\nTheo lời kể của các bậc cao niên trong làng, nghề làm nón đã có mặt từ khoảng thế kỷ thứ 8. Khi đó, vùng đất này còn được gọi là Trang Thì Trung và đã sớm nổi tiếng với nghề thủ công làm nón, phục vụ nhu cầu sử dụng của nhiều tầng lớp trong xã hội, từ người dân lao động đến giới quan lại.\n\nNhưng theo thời gian, nón lá dần vượt khỏi chức năng "vật dụng lao động" để trở thành một phần của văn hóa Việt. Hình ảnh người phụ nữ đội nón, áo dài đã đi vào thơ ca, hội họa và ký ức nhiều thế hệ.',
      en: 'Chuong Village is one of the oldest traditional craft villages in Hanoi, associated with conical hat making for many generations. However, the exact time the hat making craft appeared here has not been clearly determined.\n\nAccording to the elders in the village, the hat making craft has been present since about the 8th century. At that time, this land was called Trang Thi Trung and early became famous for its hat making craft, serving the needs of many social classes, from working people to mandarins.\n\nBut over time, the conical hat gradually surpassed its function as a "labor tool" to become part of Vietnamese culture. The image of a woman wearing a conical hat and ao dai has entered poetry, painting, and the memories of many generations.'
    },
    coverImageUrl: '/image/non_cover.jpg',
    heroImageUrl: '/image/non_cover.jpg',
    galleryImages: [
      '/image/non_gallery1.jpg',
      '/image/non_gallery2.png',
      '/image/non_gallery3.webp',
    ],
    videoUrl: '/video/video làng nón.mp4',
    videoSource: 'PTV - Truyền thông đa phương tiện PTIT',
    color: '#4A7C59',
    artisanStory: {
      vi: 'Những người thợ làng Chuông, từ già đến trẻ, tiếng kim khâu nón lách cách như một bản nhạc rất riêng — nhịp thở của cả một làng quê.',
      en: 'The craftsmen of Chuong village, from young to old, the clicking sound of hat sewing needles is like a very unique melody — the rhythm of an entire countryside.'
    },
    artisanQuote: {
      vi: 'Một chiếc nón đẹp không phải ở hình dáng — mà ở cái hồn người thợ gửi vào từng mũi kim, từng sợi chỉ.',
      en: 'A beautiful hat is not in its shape — but in the soul the craftsman puts into every stitch, every thread.'
    },
    facts: [
      { label: { vi: 'Lịch sử', en: 'History' }, value: { vi: 'Từ thế kỷ VIII', en: 'Since 8th Century' } },
      { label: { vi: 'Vị trí', en: 'Location' }, value: { vi: 'Phú Xuyên, Hà Nội', en: 'Phu Xuyen, Hanoi' } },
      { label: { vi: 'Nguyên liệu', en: 'Material' }, value: { vi: 'Lá lụi + Tre', en: 'Palm leaves & Bamboo' } },
      { label: { vi: 'Đặc trưng', en: 'Feature' }, value: { vi: 'Nón lá Việt Nam', en: 'Vietnamese Conical Hat' } },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: { vi: 'Chọn và xử lý lá', en: 'Leaf Selection & Processing' },
        description: {
          vi: 'Nguyên liệu chính để làm nón là lá lụi — một loại lá thuộc họ cọ, được thu mua từ Phú Thọ, Thanh Hóa và Quảng Bình. Sau khi thu hoạch, lá được vò bằng chân trên nền sỏi trong khoảng 30 phút để làm mềm và tách đều các thớ lá. Tiếp đó, lá được phơi nắng đến khi chuyển từ màu xanh sang màu trắng. Trước khi làm nón, lá được làm ẩm và ủi phẳng bằng khăn ẩm hơ nóng để bề mặt lá mịn và dễ tạo hình.',
          en: 'The main material for making hats is "lui" leaves — a type of palm leaf, purchased from Phu Tho, Thanh Hoa, and Quang Binh. After harvesting, leaves are crushed by foot on gravel for about 30 minutes to soften and separate the leaf fibers evenly. Then, leaves are dried in the sun until turning from green to white. Before making a hat, leaves are moistened and ironed flat with a hot damp cloth so the surface is smooth and easy to shape.'
        },
        imageUrl: '/image/village-steps/non_step1.jpg',
      },
      {
        id: '2', order: 2,
        title: { vi: 'Chuẩn bị khung nón', en: 'Preparing Hat Frame' },
        description: {
          vi: 'Người thợ sử dụng khuôn gỗ có 8 gọng, trên mỗi gọng có 16 khấc để định vị các vòng nón. Các vành tre được lắp lên khuôn theo đúng vị trí, tạo nên bộ khung cân đối cho chiếc nón.',
          en: 'The craftsman uses a wooden mold with 8 ribs, each rib has 16 notches to position the hat rings. Bamboo rims are mounted on the mold in the correct position, creating a balanced frame for the hat.'
        },
        imageUrl: '/image/village-steps/non_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: { vi: 'Xếp lá và quay nón', en: 'Layering Leaves & Spinning' },
        description: {
          vi: 'Lá sau khi xử lý được xếp đều lên khung theo từng lớp. Người thợ tiến hành cắt tầm lá, cố định phần chóp nón và quay nón để các lớp lá ôm sát khung, tạo hình tròn đều trước khi khâu.',
          en: 'After processing, leaves are arranged evenly on the frame layer by layer. The craftsman cuts the leaf span, fixes the hat peak, and spins the hat so the leaf layers closely hug the frame, creating a perfectly round shape before sewing.'
        },
        imageUrl: '/image/village-steps/non_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: { vi: 'Khâu nón', en: 'Sewing Hat' },
        description: {
          vi: 'Người thợ dùng kim dài và chỉ mảnh để khâu cố định các lớp lá với khung tre. Các mũi khâu phải đều, thẳng hàng và có khoảng cách đồng nhất nhằm đảm bảo độ bền cũng như tính thẩm mỹ của sản phẩm.',
          en: 'The craftsman uses a long needle and thin thread to sew the leaf layers to the bamboo frame. The stitches must be even, straight, and uniformly spaced to ensure durability as well as aesthetics.'
        },
        imageUrl: '/image/village-steps/non_step4.webp',
      },
      {
        id: '5', order: 5,
        title: { vi: 'Hoàn thiện và trang trí', en: 'Finishing & Decoration' },
        description: {
          vi: 'Sau khi khâu xong, chiếc nón được cắt bỏ phần lá thừa, kiểm tra lại các đường khâu và gắn quai nón. Để đáp ứng nhu cầu thị trường, nhiều nghệ nhân còn trang trí thêm họa tiết, hình vẽ hoặc các chi tiết mỹ thuật, tạo nên những mẫu nón đa dạng phục vụ du lịch và thời trang.',
          en: 'After sewing, the hat is trimmed of excess leaves, the seams are checked again, and the strap is attached. To meet market needs, many artisans also decorate with motifs, drawings, or artistic details, creating diverse hat models for tourism and fashion.'
        },
        imageUrl: '/image/village-steps/non_step5.jpg',
      },
    ],
  },
  {
    slug: 'huong-quang-phu-cau',
    name: { vi: 'Làng Hương Quảng Phú Cầu', en: 'Quang Phu Cau Incense Village' },
    tagline: { vi: 'Kết nối tâm linh qua từng nén hương', en: 'Connecting spirituality through every incense stick' },
    shortDescription: {
      vi: 'Làng Hương Quảng Phú Cầu (Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng nhất Việt Nam, nơi những bó hương đỏ rực phơi dưới nắng trở thành biểu tượng đặc trưng.',
      en: 'Quang Phu Cau Incense Village (Ung Hoa, Hanoi) is one of the most famous traditional incense making villages in Vietnam, where brilliant red incense bundles drying in the sun have become a characteristic symbol.'
    },
    intro: {
      vi: 'Làng Hương Quảng Phú Cầu (huyện Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng của Việt Nam với lịch sử hơn 100 năm. Từ bao đời nay, hương đã trở thành một phần không thể thiếu trong văn hóa tâm linh dân tộc. Mỗi nén hương được thắp lên là sự kết nối giữa hiện tại và cội nguồn, thể hiện lòng thành kính đối với tổ tiên, thần linh và những giá trị truyền thống tốt đẹp. Chính vì vậy, nghề làm hương không đơn thuần tạo ra một sản phẩm phục vụ nhu cầu sinh hoạt mà còn góp phần gìn giữ bản sắc văn hóa và đời sống tinh thần của cộng đồng.\n\nTại Quảng Phú Cầu, các công đoạn làm hương như chẻ tăm, nhuộm chân hương, se hương và phơi hương đều được thực hiện một cách tỉ mỉ, thể hiện sự khéo léo của người thợ thủ công. Đặc biệt, hình ảnh những bó chân hương đỏ rực được xòe tròn dưới nắng đã trở thành biểu tượng đặc trưng của làng nghề.\n\nNgày nay, bên cạnh việc duy trì nghề truyền thống, Quảng Phú Cầu còn phát triển du lịch làng nghề, góp phần quảng bá văn hóa Việt Nam và đưa những giá trị truyền thống đến gần hơn với thế hệ trẻ.',
      en: 'Quang Phu Cau Incense Village (Ung Hoa district, Hanoi) is one of Vietnam\'s famous traditional incense making villages with a history of over 100 years. For generations, incense has become an indispensable part of the nation\'s spiritual culture. Each incense stick lit is a connection between the present and the roots, showing reverence to ancestors, gods, and good traditional values. Therefore, incense making is not simply creating a product to serve daily needs but also contributing to preserving the cultural identity and spiritual life of the community.\n\nAt Quang Phu Cau, incense making stages such as splitting bamboo, dyeing incense sticks, rolling incense, and drying incense are all done meticulously, showing the skill of craftsmen. In particular, the image of bright red incense bundles spread out in a circle under the sun has become a characteristic symbol of the craft village.\n\nToday, besides maintaining the traditional craft, Quang Phu Cau also develops craft village tourism, contributing to promoting Vietnamese culture and bringing traditional values closer to the younger generation.'
    },
    historyMilestones: [
      {
        period: { vi: 'Đầu thế kỷ XX', en: 'Early 20th Century' },
        points: [
          { vi: 'Nghề làm hương tại Quảng Phú Cầu xuất hiện và được lưu truyền qua nhiều thế hệ người dân địa phương.', en: 'The incense making craft in Quang Phu Cau appeared and has been passed down through many generations of local people.' },
          { vi: 'Ban đầu, người dân chủ yếu làm nông nghiệp và các nghề thủ công từ tre nứa trước khi phát triển mạnh nghề sản xuất tăm hương.', en: 'Initially, people mainly did farming and bamboo handicrafts before strongly developing the incense stick production craft.' },
        ],
      },
      {
        period: { vi: 'Giai đoạn phát triển', en: 'Development Phase' },
        points: [
          { vi: 'Nhờ nhu cầu sử dụng hương trong đời sống tín ngưỡng ngày càng tăng, nghề làm hương dần trở thành nghề truyền thống và nguồn thu nhập chính của nhiều hộ gia đình.', en: 'Thanks to the increasing demand for incense in religious life, incense making gradually became a traditional profession and the main source of income for many households.' },
          { vi: 'Người dân không ngừng cải tiến kỹ thuật sản xuất nhưng vẫn giữ gìn những giá trị thủ công truyền thống.', en: 'Locals constantly improve production techniques while preserving traditional handicraft values.' },
        ],
      },
      {
        period: { vi: 'Ngày nay', en: 'Today' },
        points: [
          { vi: 'Quảng Phú Cầu là một trong những làng nghề hương nổi tiếng nhất Việt Nam, vừa phát triển kinh tế vừa góp phần bảo tồn và quảng bá văn hóa dân tộc.', en: 'Quang Phu Cau is one of the most famous incense villages in Vietnam, both developing the economy and contributing to preserving and promoting national culture.' },
        ],
      },
    ],
    coverImageUrl: '/image/huong_cover.webp',
    heroImageUrl: '/image/huong_cover.webp',
    galleryImages: [
      '/image/huong_gallery1.jpg',
      '/image/huong_gallery2.jpg',
      '/image/huong_gallery3.jpg',
    ],
    videoUrl: '/video/làng hương quảng phú cầu.mp4',
    videoSource: 'Chú Tiểu Làng Hương',
    color: '#C0392B',
    artisanStory: {
      vi: 'Người dân Quảng Phú Cầu đã gắn bó với nghề làm hương suốt hàng thế kỷ, biến những que tre bình thường thành những nén hương mang theo tâm tư, lòng thành kính của người Việt.',
      en: 'The people of Quang Phu Cau have been attached to incense making for centuries, turning ordinary bamboo sticks into incense sticks carrying the thoughts and reverence of the Vietnamese people.'
    },
    artisanQuote: {
      vi: 'Mỗi nén hương chúng tôi làm ra không chỉ là sản phẩm — đó là sợi dây vô hình nối giữa người sống và người đã khuất, giữa hiện tại và cội nguồn.',
      en: 'Every incense stick we make is not just a product — it is an invisible thread connecting the living and the departed, between the present and the roots.'
    },
    facts: [
      { label: { vi: 'Lịch sử', en: 'History' }, value: { vi: 'Hơn 100 năm', en: 'Over 100 years' } },
      { label: { vi: 'Vị trí', en: 'Location' }, value: { vi: 'Ứng Hòa, Hà Nội', en: 'Ung Hoa, Hanoi' } },
      { label: { vi: 'Nguyên liệu', en: 'Material' }, value: { vi: 'Vầu, nứa + Bột hương', en: 'Bamboo & Incense powder' } },
      { label: { vi: 'Đặc trưng', en: 'Feature' }, value: { vi: 'Hương đỏ phơi nắng', en: 'Sun-dried red incense' } },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: { vi: 'Chọn và xử lý nguyên liệu', en: 'Material Selection & Processing' },
        description: {
          vi: 'Nguyên liệu chính là vầu hoặc nứa già. Sau khi được tuyển chọn, vầu và nứa được bổ thành từng thanh nhỏ, phơi khô dưới ánh nắng tự nhiên để đạt độ khô cần thiết trước khi gia công.',
          en: 'The main material is old bamboo (vau or nua). After selection, bamboo is split into small strips, sun-dried naturally to achieve the necessary dryness before processing.'
        },
        imageUrl: '/image/village-steps/huong_step1.webp',
      },
      {
        id: '2', order: 2,
        title: { vi: 'Tạo chân hương', en: 'Creating Incense Core' },
        description: {
          vi: 'Nguyên liệu khô được đưa vào máy để tạo thành các que chân hương có kích thước đồng đều. Sau đó, chân hương được trà nhẵn, loại bỏ dằm xước và sàng lọc để loại bỏ những que cong, gãy hoặc không đạt tiêu chuẩn.',
          en: 'Dried material is fed into a machine to create uniformly sized incense cores. Then, the cores are sanded smooth, splinters removed, and sifted to discard bent, broken, or substandard sticks.'
        },
        imageUrl: '/image/village-steps/huong_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: { vi: 'Nhuộm và phơi chân hương', en: 'Dyeing & Drying' },
        description: {
          vi: 'Chân hương đạt yêu cầu được bó gọn rồi nhúng vào phẩm màu đỏ. Sau khi nhuộm, các bó chân hương được xòe tròn và phơi dưới nắng đến khi khô hoàn toàn. Đây là công đoạn tạo nên sắc đỏ đặc trưng và hình ảnh nổi tiếng của làng hương Quảng Phú Cầu.',
          en: 'Qualified incense cores are bundled neatly and dipped in red dye. After dyeing, the bundles are spread out in a circle and sun-dried until completely dry. This stage creates the characteristic red color and the famous image of Quang Phu Cau incense village.'
        },
        imageUrl: '/image/village-steps/huong_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: { vi: 'Se hương', en: 'Rolling Incense' },
        description: {
          vi: 'Sau khi chân hương khô, người thợ phủ hỗn hợp bột hương (được phối trộn từ bột gỗ, bột keo và các nguyên liệu tạo mùi thơm tự nhiên) lên thân tăm bằng phương pháp thủ công hoặc máy se hương. Lớp bột được phủ đều để tạo thành nén hương hoàn chỉnh.',
          en: 'After the cores are dry, the craftsman coats an incense powder mixture (blended from wood powder, glue powder, and natural aromatic ingredients) onto the stick manually or with a rolling machine. The powder layer is evenly coated to form a complete incense stick.'
        },
        imageUrl: '/image/village-steps/huong_step4.jpg',
      },
      {
        id: '5', order: 5,
        title: { vi: 'Phơi hương thành phẩm', en: 'Drying Final Product' },
        description: {
          vi: 'Những nén hương sau khi se tiếp tục được phơi hoặc sấy khô để lớp bột hương bám chắc vào chân hương, đồng thời đảm bảo hương cháy đều và giữ được mùi thơm.',
          en: 'The rolled incense sticks continue to be sun-dried or heat-dried so the powder layer clings firmly to the core, while ensuring the incense burns evenly and retains its fragrance.'
        },
        imageUrl: '/image/village-steps/huong_step5.jpg',
      },
    ],
  },
  {
    slug: 'lua-van-phuc',
    name: { vi: 'Làng Lụa Vạn Phúc', en: 'Van Phuc Silk Village' },
    tagline: { vi: 'Tơ lụa Việt Nam kể câu chuyện hơn 1.000 năm', en: 'Vietnamese silk tells a story of over 1,000 years' },
    shortDescription: {
      vi: 'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam với lịch sử hơn 1.000 năm.',
      en: 'Located in Ha Dong area, Hanoi, Van Phuc silk village is one of the most important cradles of Vietnam\'s traditional silk weaving craft with a history of over 1,000 years.'
    },
    intro: {
      vi: 'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc từ lâu đã được xem là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam. Điều khiến Vạn Phúc đặc biệt không chỉ nằm ở sản phẩm lụa mềm, nhẹ, có độ óng tự nhiên, mà còn ở "không khí nghề" bao trùm cả làng. Dạo bước trong làng, bạn dễ dàng bắt gặp hình ảnh khung cửi đặt ngay trong nhà, tiếng thoi đưa đều đặn vang lên từ sáng sớm, và những tấm lụa nhiều màu sắc phơi dọc theo các con ngõ nhỏ.\n\nLụa Vạn Phúc không chỉ được sử dụng trong nước mà còn từng xuất hiện ở nhiều thị trường quốc tế, trở thành một trong những biểu tượng tiêu biểu của thủ công mỹ nghệ Việt Nam. Với nhiều người trẻ, nơi đây không chỉ là làng nghề, mà còn là một "background sống ảo" mang đậm chất truyền thống xen lẫn hiện đại.',
      en: 'Located in Ha Dong area, Hanoi, Van Phuc silk village has long been considered one of the most important cradles of Vietnam\'s traditional silk weaving craft. What makes Van Phuc special lies not only in its soft, light silk products with a natural shine, but also in the "craft atmosphere" that envelops the whole village. Strolling through the village, you can easily catch sight of looms placed right inside houses, the regular sound of shuttles echoing from early morning, and colorful silk fabrics hanging along small alleys.\n\nVan Phuc silk is not only used domestically but has also appeared in many international markets, becoming one of the typical symbols of Vietnamese handicrafts. For many young people, this place is not just a craft village, but also a "virtual living background" full of traditional qualities mixed with modernity.'
    },
    historyText: {
      vi: 'Làng lụa Vạn Phúc xưa kia có tên Vạn Bảo, do kị húy nhà Nguyễn nên đã đổi thành Vạn Phúc. Theo các tài liệu và truyền thuyết địa phương, nghề dệt lụa ở Vạn Phúc có lịch sử hơn 1.000 năm, gắn với tên tuổi bà A Lã Thị Nương — người được xem là tổ nghề dệt lụa.\n\nBà được cho là đã truyền dạy kỹ thuật trồng dâu, nuôi tằm, ươm tơ và dệt lụa cho người dân trong vùng, đặt nền móng cho nghề lụa phát triển bền vững qua nhiều thế hệ. Nhờ đó, Vạn Phúc sớm trở thành một trung tâm dệt lụa lớn, cung cấp sản phẩm cho cả khu vực kinh thành Thăng Long xưa.\n\nTrải qua nhiều thế hệ, lụa Vạn Phúc vẫn giữ được nét đẹp truyền thống và đang đi đầu trong ngành dệt nước ta. Lụa ở làng Vạn Phúc được đánh giá là đẹp và bền. Hoa văn trên lụa rất đa dạng, trang trí đối xứng với nhau, đường nét không rườm rà, phức tạp mà luôn tạo cảm giác phóng thoáng, dứt khoát.',
      en: 'Van Phuc silk village was formerly known as Van Bao, but due to a taboo of the Nguyen dynasty, it was changed to Van Phuc. According to local documents and legends, silk weaving in Van Phuc has a history of over 1,000 years, associated with the name of Mrs. A La Thi Nuong — considered the founder of the silk weaving craft.\n\nShe is said to have taught the techniques of growing mulberries, raising silkworms, reeling silk, and weaving silk to the local people, laying the foundation for the sustainable development of the silk craft through many generations. As a result, Van Phuc soon became a major silk weaving center, supplying products to the entire ancient Thang Long capital region.\n\nThrough many generations, Van Phuc silk has retained its traditional beauty and is leading the weaving industry in our country. Silk in Van Phuc village is highly regarded for its beauty and durability. Patterns on the silk are diverse, decorated symmetrically, with lines that are not cumbersome or complex but always create a sense of liberality and decisiveness.'
    },
    coverImageUrl: '/image/lua_cover.jpg',
    heroImageUrl: '/image/lua_cover.jpg',
    galleryImages: [
      '/image/lua_gallery1.jpg',
      '/image/lua_gallery2.jpg',
      '/image/lua_gallery3.jpg',
    ],
    videoUrl: '/video/làng lụa.mp4',
    videoSource: 'Ohh Vietnam',
    color: '#7B3F8C',
    artisanStory: {
      vi: 'Tiếng thoi đưa trên khung cửi là âm thanh đặc trưng nhất của làng Vạn Phúc — một bản nhạc đã vang lên suốt hơn một nghìn năm và vẫn còn đó trong từng ngôi nhà.',
      en: 'The sound of the shuttle on the loom is the most characteristic sound of Van Phuc village — a melody that has been playing for over a thousand years and is still present in every home.'
    },
    artisanQuote: {
      vi: 'Lụa Vạn Phúc không chỉ là vải — đó là cả một câu chuyện dài hơn nghìn năm được dệt nên bởi đôi tay của những người phụ nữ Việt.',
      en: 'Van Phuc silk is not just fabric — it is a story of over a thousand years woven by the hands of Vietnamese women.'
    },
    facts: [
      { label: { vi: 'Lịch sử', en: 'History' }, value: { vi: 'Hơn 1.000 năm', en: 'Over 1,000 years' } },
      { label: { vi: 'Vị trí', en: 'Location' }, value: { vi: 'Hà Đông, Hà Nội', en: 'Ha Dong, Hanoi' } },
      { label: { vi: 'Nguyên liệu', en: 'Material' }, value: { vi: 'Tơ tằm', en: 'Mulberry silk' } },
      { label: { vi: 'Đặc trưng', en: 'Feature' }, value: { vi: 'Lụa óng mềm mại', en: 'Soft shiny silk' } },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: { vi: 'Trồng dâu, nuôi tằm và tạo kén', en: 'Growing Mulberries, Raising Silkworms & Cocooning' },
        description: {
          vi: 'Tằm được nuôi bằng lá dâu tươi trong điều kiện phù hợp để tạo ra những kén tơ chất lượng. Khi tằm trưởng thành, người nuôi làm né để tằm nhả tơ và tạo kén. Sau khi thu hoạch, các kén già đạt tiêu chuẩn được tuyển chọn để đưa vào công đoạn lấy tơ.',
          en: 'Silkworms are fed with fresh mulberry leaves under suitable conditions to produce quality silk cocoons. When silkworms mature, the breeder prepares frames for them to spin silk and form cocoons. After harvesting, mature cocoons meeting standards are selected for the silk reeling stage.'
        },
        imageUrl: '/image/village-steps/lua_step1.webp',
      },
      {
        id: '2', order: 2,
        title: { vi: 'Lấy tơ và guồng tơ', en: 'Silk Reeling & Spooling' },
        description: {
          vi: 'Kén tằm được xử lý và kéo tơ bằng phương pháp thủ công hoặc máy móc hỗ trợ. Các sợi tơ sau khi kéo sẽ được chuốt thẳng và đưa vào guồng. Công đoạn guồng tơ vẫn đòi hỏi sự khéo léo của người thợ để tránh sợi tơ bị rối hoặc đứt, đồng thời tạo ra những cuộn tơ có chất lượng đồng đều phục vụ cho quá trình dệt.',
          en: 'Silkworm cocoons are processed and silk is drawn manually or with machine assistance. Silk threads after being drawn will be smoothed straight and put into spools. The spooling stage still requires the skill of the craftsman to prevent the threads from tangling or breaking, while creating uniform quality silk rolls for weaving.'
        },
        details: [
          { vi: 'Kéo sợi tơ từ kén', en: 'Drawing silk threads from cocoons' },
          { vi: 'Gom nhiều sợi nhỏ thành một sợi lớn', en: 'Gathering many small threads into a large one' },
          { vi: 'Chuốt thẳng và guồng tơ', en: 'Smoothing straight and spooling silk' }
        ],
        imageUrl: '/image/village-steps/lua_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: { vi: 'Dệt lụa trên khung cửi', en: 'Weaving Silk on the Loom' },
        description: {
          vi: 'Tơ sau khi guồng được kéo vào các lô nhỏ để mắc cửi, sau đó đưa lên hệ thống máy dệt. Trong quá trình dệt, các hoa văn được lập trình sẵn trên máy nên sẽ hiện trực tiếp trên mặt vải, tạo nên những họa tiết đặc trưng của lụa Vạn Phúc.',
          en: 'Silk after spooling is drawn into small batches to set up the warp, then put on the weaving machine system. During weaving, patterns are pre-programmed on the machine so they will appear directly on the fabric surface, creating the characteristic motifs of Van Phuc silk.'
        },
        imageUrl: '/image/village-steps/lua_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: { vi: 'Nhuộm và hoàn thiện', en: 'Dyeing & Finishing' },
        description: {
          vi: 'Trước khi nhuộm, lụa thô được nấu để loại bỏ tạp chất và tăng khả năng bám màu. Sau đó, lụa được nhuộm theo màu sắc mong muốn, giặt sạch rồi sấy khô để màu sắc lên đều và giữ được độ bền. Trước đây, lụa thường được phơi dưới ánh nắng tự nhiên, tuy nhiên hiện nay nhiều cơ sở sử dụng phương pháp sấy để đảm bảo chất lượng màu sắc ổn định.',
          en: 'Before dyeing, raw silk is boiled to remove impurities and increase color adhesion. Then, the silk is dyed to the desired color, washed, and dried so the color is even and durable. Previously, silk was often sun-dried naturally, but today many facilities use drying methods to ensure stable color quality.'
        },
        imageUrl: '/image/village-steps/lua_step4.webp',
      },
      {
        id: '5', order: 5,
        title: { vi: 'Thành quả', en: 'Final Result' },
        description: {
          vi: 'Lụa Vạn Phúc hoàn thiện mang đặc trưng mềm mại, óng ánh và bền màu, xứng đáng là tinh hoa dệt lụa nghìn năm của người Việt.',
          en: 'Finished Van Phuc silk is characterized by being soft, shiny, and colorfast, deserving to be the quintessence of Vietnamese thousand-year silk weaving.'
        },
        imageUrl: '/image/village-steps/lua_step5.jpg',
      },
    ],
  },
  {
    slug: 'quat-chang-son',
    name: { vi: 'Làng Quạt Chàng Sơn', en: 'Chang Son Fan Village' },
    tagline: { vi: 'Nét tinh hoa thủ công giữa lòng xứ Đoài', en: 'The essence of craftsmanship in the heart of Doai region' },
    shortDescription: {
      vi: 'Nằm tại xã Chàng Sơn (Thạch Thất, Hà Nội), làng nghề quạt Chàng Sơn là một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài, với lịch sử từ thế kỷ XVII.',
      en: 'Located in Chang Son commune (Thach That, Hanoi), Chang Son fan village is one of the cradles of typical traditional handicrafts in Doai region, with a history dating back to the 17th century.'
    },
    intro: {
      vi: 'Nằm tại xã Chàng Sơn, làng nghề quạt Chàng Sơn từ lâu đã được biết đến như một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài. Không chỉ đơn thuần là nơi sản xuất quạt giấy, quạt lụa, nơi đây còn là không gian lưu giữ tinh hoa lao động thủ công, nơi mỗi chiếc quạt mang trong mình dấu ấn của sự tỉ mỉ, khéo léo và bền bỉ qua nhiều thế hệ.\n\nTrong nhịp sống hiện đại, Chàng Sơn vẫn giữ được "hơi thở" truyền thống, đồng thời từng bước thích ứng với thị trường, đưa sản phẩm làng nghề đến gần hơn với du khách và người tiêu dùng trong nước cũng như quốc tế.',
      en: 'Located in Chang Son commune, Chang Son fan village has long been known as one of the cradles of typical traditional handicrafts in the Doai region. Not merely a place to produce paper fans and silk fans, this place is also a space that preserves the essence of manual labor, where each fan carries the mark of meticulousness, ingenuity, and persistence through many generations.\n\nIn modern life, Chang Son still retains the traditional "breath", while gradually adapting to the market, bringing craft village products closer to tourists and consumers domestically and internationally.'
    },
    historyText: {
      vi: 'Nghề làm quạt ở Chàng Sơn (trước đây có tên là Nủa Chàng) đã có lịch sử từ rất lâu đời, các tư liệu lịch sử ghi nhận nghề đã hình thành và phát triển từ khoảng thế kỷ XVII đến XIX.\n\nNgay từ thế kỷ XIX, quạt Chàng Sơn đã không chỉ là vật dụng làm mát thông thường mà còn là vật phẩm sang trọng. Nó nổi tiếng đến mức từng được người Pháp mang sang Paris để trưng bày trong các triển lãm quốc tế, khẳng định đẳng cấp của thủ công mỹ nghệ Việt.\n\nThời kỳ bao cấp, làng Chàng Sơn trở thành một "công xưởng" lớn cung cấp quạt giấy cho cả nước theo cơ chế tập trung, giúp nghề quạt được duy trì và phổ biến rộng rãi khắp các vùng miền.',
      en: 'Fan making in Chang Son (formerly known as Nua Chang) has a very long history; historical documents record that the craft was formed and developed from about the 17th to 19th centuries.\n\nEven from the 19th century, Chang Son fans were not only ordinary cooling items but also luxury goods. It was so famous that it was brought to Paris by the French to be displayed in international exhibitions, affirming the class of Vietnamese fine arts handicrafts.\n\nDuring the subsidy period, Chang Son village became a large "factory" supplying paper fans to the whole country under a centralized mechanism, helping the fan craft be maintained and widely popularized across regions.'
    },
    coverImageUrl: '/image/quat_cover.jpg',
    heroImageUrl: '/image/quat_cover.jpg',
    galleryImages: [
      '/image/quat_gallery1.jpg',
      '/image/quat_gallery2.jpg',
      '/image/quat_gallery3.jpg',
    ],
    youtubeId: 'RaNZh6sEL7U',
    videoSource: 'PHÁT THANH TRUYỀN HÌNH INTERNET',
    color: '#2E6B8A',
    artisanStory: {
      vi: 'Người thợ Chàng Sơn đã đưa những chiếc quạt đơn giản trở thành tác phẩm nghệ thuật được trưng bày ở Paris — bằng chính đôi tay khéo léo và tình yêu với nghề truyền thống.',
      en: 'Chang Son craftsmen have turned simple fans into artworks exhibited in Paris — with their own skillful hands and love for traditional crafts.'
    },
    artisanQuote: {
      vi: 'Một chiếc quạt của Chàng Sơn không chỉ làm mát thân thể mà còn làm mát cả tâm hồn — bởi trong đó có cả trăm năm tinh hoa của người xứ Đoài.',
      en: 'A Chang Son fan not only cools the body but also cools the soul — because in it contains hundreds of years of essence of the Doai people.'
    },
    facts: [
      { label: { vi: 'Lịch sử', en: 'History' }, value: { vi: 'Từ thế kỷ XVII', en: 'Since 17th Century' } },
      { label: { vi: 'Vị trí', en: 'Location' }, value: { vi: 'Thạch Thất, Hà Nội', en: 'Thach That, Hanoi' } },
      { label: { vi: 'Nguyên liệu', en: 'Material' }, value: { vi: 'Tre, nứa + Giấy / Lụa', en: 'Bamboo & Paper/Silk' } },
      { label: { vi: 'Đặc trưng', en: 'Feature' }, value: { vi: 'Triển lãm Paris TK XIX', en: 'Paris Expo 19th Century' } },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: { vi: 'Chọn và xử lý nguyên liệu', en: 'Material Selection & Processing' },
        description: {
          vi: 'Nguyên liệu chính để làm quạt là tre hoặc nứa già có độ dẻo và độ bền cao. Tre được chẻ thành các nan nhỏ, vót mỏng, mài nhẵn và xử lý để đảm bảo độ chắc chắn, đồng thời tạo thuận lợi cho quá trình lắp ráp khung quạt.',
          en: 'The main material for making fans is old bamboo with high flexibility and durability. Bamboo is split into small slats, whittled thin, polished smooth, and treated to ensure sturdiness, while facilitating the assembly of the fan frame.'
        },
        imageUrl: '/image/village-steps/quat_step1.jpg',
      },
      {
        id: '2', order: 2,
        title: { vi: 'Tạo khung quạt', en: 'Creating Fan Frame' },
        description: {
          vi: 'Các nan tre được lắp ghép, khoan lỗ và cố định bằng đinh tán để tạo thành bộ khung quạt có thể đóng mở linh hoạt. Đây là công đoạn quyết định độ cân đối, độ bền và hình dáng của sản phẩm.',
          en: 'Bamboo slats are assembled, drilled with holes, and fixed with rivets to form a fan frame that can open and close flexibly. This is the stage that determines the balance, durability, and shape of the product.'
        },
        imageUrl: '/image/village-steps/quat_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: { vi: 'Chuẩn bị mặt quạt', en: 'Preparing Fan Face' },
        description: {
          vi: 'Mặt quạt được làm từ giấy hoặc lụa tùy theo từng dòng sản phẩm. Đối với quạt tranh Chàng Sơn, tranh thường được vẽ trực tiếp trên lụa, một số sản phẩm còn được thêu ren trước khi gắn vào khung quạt nhằm tăng giá trị nghệ thuật.',
          en: 'The fan face is made of paper or silk depending on each product line. For Chang Son picture fans, pictures are often drawn directly on silk, some products are even lace-embroidered before being attached to the fan frame to increase artistic value.'
        },
        imageUrl: '/image/village-steps/quat_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: { vi: 'Gắn mặt quạt vào khung', en: 'Attaching Face to Frame' },
        description: {
          vi: 'Sau khi hoàn thiện phần tranh hoặc họa tiết, mặt quạt được dán và gắn lên khung nan bằng phương pháp thủ công. Người thợ căn chỉnh cẩn thận để các nan phân bố đều, giúp quạt đóng mở dễ dàng và giữ được hình dáng chuẩn.',
          en: 'After completing the picture or motif part, the fan face is glued and attached to the slat frame manually. The craftsman carefully aligns so that the slats are distributed evenly, helping the fan open and close easily and maintain a standard shape.'
        },
        imageUrl: '/image/village-steps/quat_step4.jpg',
      },
      {
        id: '5', order: 5,
        title: { vi: 'Trang trí và hoàn thiện', en: 'Decoration & Finishing' },
        description: {
          vi: 'Các nghệ nhân tiếp tục hoàn thiện sản phẩm bằng cách bổ sung hoặc chỉnh sửa các chi tiết mỹ thuật. Đề tài trên quạt rất đa dạng như tranh phong cảnh, tích cổ, tranh Đông Hồ hay các họa tiết truyền thống, tạo nên nét đặc trưng của quạt Chàng Sơn.',
          en: 'Artisans continue to finish the product by adding or editing artistic details. Topics on the fan are very diverse such as landscape paintings, ancient tales, Dong Ho paintings, or traditional motifs, creating the distinctive features of Chang Son fans.'
        },
        imageUrl: '/image/village-steps/quat_step5.jpg',
      },
    ],
  },
];

export function getVillage(slug: string): VillageStatic | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
