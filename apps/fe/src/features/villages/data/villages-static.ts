export interface VillageStage {
  id: string;
  order: number;
  title: string;
  description: string;
  details?: string[];
  imageUrl: string;
}

export interface HistoryMilestone {
  period: string;
  points: string[];
}

export interface VillageStatic {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  /** 1. Giới thiệu chung — đoạn văn, tách bằng \n\n */
  intro: string;
  /** 2. Lịch sử hình thành và phát triển — đoạn văn thuật lại (dùng khi không có milestones) */
  historyText?: string;
  /** 2. Lịch sử hình thành và phát triển — dạng mốc thời gian có gạch đầu dòng */
  historyMilestones?: HistoryMilestone[];
  coverImageUrl: string;
  heroImageUrl: string;
  galleryImages: string[];
  /** Video giới thiệu — file local trong public/video/, ưu tiên nếu có cả hai */
  videoUrl?: string;
  /** Video giới thiệu — YouTube video ID (phần sau ?v=) */
  youtubeId?: string;
  /** Tên nguồn/kênh của video giới thiệu, hiển thị dưới banner */
  videoSource?: string;
  color: string;
  artisanStory?: string;
  artisanQuote?: string;
  stages: VillageStage[];
  facts: { label: string; value: string }[];
}

export const VILLAGES: VillageStatic[] = [
  {
    slug: 'bat-trang',
    name: 'Làng Gốm Bát Tràng',
    tagline: 'Hơn 700 năm tinh hoa gốm sứ',
    shortDescription:
      'Bát Tràng là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam, nằm bên bờ sông Hồng, cách trung tâm Hà Nội khoảng 15 km.',
    intro:
      'Làng Gốm Bát Tràng thuộc xã Bát Tràng, nằm bên bờ sông Hồng và cách trung tâm Hà Nội khoảng 15 km. Đây là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam với lịch sử hơn 700 năm hình thành và phát triển.\n\nTừ xa xưa, gốm sứ không chỉ là vật dụng phục vụ đời sống hằng ngày mà còn mang giá trị nghệ thuật và văn hóa sâu sắc. Những sản phẩm gốm Bát Tràng thể hiện sự kết hợp hài hòa giữa kỹ thuật thủ công tinh xảo, óc sáng tạo và nét đẹp truyền thống của người Việt. Vì vậy, nghề làm gốm không chỉ góp phần phát triển kinh tế mà còn giữ vai trò quan trọng trong việc bảo tồn bản sắc văn hóa dân tộc.\n\nTại Bát Tràng, mỗi sản phẩm đều trải qua nhiều công đoạn công phu như xử lý đất, tạo hình, trang trí hoa văn, phủ men và nung trong lò. Sự khéo léo và kinh nghiệm của các nghệ nhân đã tạo nên những sản phẩm gốm có độ bền cao, hoa văn tinh tế và giá trị thẩm mỹ đặc trưng.\n\nNgày nay, bên cạnh việc sản xuất và kinh doanh gốm sứ, Bát Tràng còn là điểm du lịch văn hóa nổi tiếng, thu hút đông đảo du khách trong và ngoài nước đến tham quan, trải nghiệm làm gốm và tìm hiểu về nghề thủ công truyền thống Việt Nam.',
    historyMilestones: [
      {
        period: 'Thế kỷ XV – XVI',
        points: [
          'Nghề gốm phát triển nhờ chính sách khuyến khích giao thương của nhà Mạc.',
          'Sản phẩm gốm bắt đầu mang dấu ấn riêng với tên người chế tác và niên đại sản xuất.',
        ],
      },
      {
        period: 'Thế kỷ XVI – XVII',
        points: [
          'Giai đoạn hưng thịnh nhất của gốm Bát Tràng.',
          'Nhờ thuận lợi về giao thương, sản phẩm được xuất khẩu rộng rãi sang nhiều nước trong khu vực và thế giới.',
        ],
      },
      {
        period: 'Cuối thế kỷ XVII – XIX',
        points: [
          'Gốm Bát Tràng gặp nhiều khó khăn do sự cạnh tranh từ gốm Trung Quốc và Nhật Bản.',
          'Hoạt động sản xuất chủ yếu phục vụ nhu cầu trong nước.',
        ],
      },
      {
        period: 'Từ thế kỷ XX đến nay',
        points: [
          'Nghề gốm dần được phục hồi và phát triển mạnh.',
          'Các cơ sở sản xuất không ngừng đổi mới mẫu mã, đa dạng hóa sản phẩm và kết hợp phát triển du lịch làng nghề.',
        ],
      },
      {
        period: 'Hiện nay',
        points: [
          'Bát Tràng là một trong những làng nghề gốm nổi tiếng nhất Việt Nam, góp phần bảo tồn và quảng bá văn hóa truyền thống dân tộc.',
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
    artisanStory: 'Các nghệ nhân Bát Tràng đã dành cả cuộc đời để hoàn thiện kỹ thuật làm gốm, truyền từ đời này sang đời khác với tất cả tâm huyết và niềm tự hào.',
    artisanQuote: 'Mỗi chiếc bát, mỗi cái bình đều mang trong mình hơi thở của người thợ, của đất, của lửa — ba yếu tố tạo nên linh hồn gốm Bát Tràng.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 700 năm' },
      { label: 'Vị trí', value: 'Gia Lâm, Hà Nội' },
      { label: 'Chất liệu', value: 'Đất sét + Khoáng chất' },
      { label: 'Nhiệt độ nung', value: '1.180°C – 1.280°C' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chuẩn bị và ủ nguyên liệu',
        description: 'Nguyên liệu được phối trộn từ ba đến bốn loại đất cùng với một số khoáng chất như thạch anh và trường thạch. Hỗn hợp được đưa vào máy trộn trong khoảng 12–24 giờ, sau đó ủ từ hai tuần đến một tháng để đất đạt độ dẻo và ổn định trước khi tạo hình.',
        imageUrl: '/image/gom_step1.webp',
      },
      {
        id: '2', order: 2,
        title: 'Tạo hình sản phẩm',
        description: 'Đất sau khi ủ được pha loãng với nước thành hồ đất rồi đổ vào khuôn thạch cao có hình dáng của sản phẩm. Sau khoảng 30 phút, phần hồ đất dư được loại bỏ, chỉ giữ lại lớp đất bám trên thành khuôn để tạo nên hình dạng ban đầu của sản phẩm.',
        imageUrl: '/image/gom_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: 'Tiện và lắp ghép sản phẩm',
        description: 'Sau khi tháo khuôn, người thợ tiến hành gọt, cắt tỉa và chỉnh sửa các chi tiết để loại bỏ một số chỗ gồ ghề và hoàn thiện hình dáng. Đối với các sản phẩm có nhiều bộ phận, các chi tiết sẽ được lắp ghép bằng chất hồ để gắn thành sản phẩm hoàn chỉnh.',
        imageUrl: '/image/gom_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: 'Trang trí và phủ men',
        description: 'Khi sản phẩm đã khô, các nghệ nhân tiến hành vẽ hoa văn và họa tiết thủ công lên bề mặt. Đây là công đoạn thể hiện tính thẩm mỹ và nét đặc trưng của gốm Bát Tràng. Sau khi trang trí, sản phẩm được phủ một lớp men phù hợp để tạo độ bóng, tăng độ bền và làm nổi bật màu sắc của hoa văn.',
        imageUrl: '/image/gom_step4.jpg',
      },
      {
        id: '5', order: 5,
        title: 'Nung gốm',
        description: 'Sản phẩm được đưa vào lò gas để nung trong khoảng 8–12 giờ ở nhiệt độ từ 1.180°C đến 1.280°C. Quá trình nung quyết định độ cứng, màu sắc và chất lượng cuối cùng của sản phẩm. Dưới tác động của nhiệt độ cao, lớp men chảy đều trên bề mặt và tạo nên vẻ đẹp đặc trưng của gốm Bát Tràng.',
        imageUrl: '/image/gom_step5.webp',
      },
    ],
  },
  {
    slug: 'non-chuong',
    name: 'Làng Nón Chuông',
    tagline: 'Giữ lại hồn Việt trên từng lá nón',
    shortDescription:
      'Làng Chuông (Phú Xuyên, Hà Nội) là một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam, nơi gần như mỗi gia đình đều biết làm nón.',
    intro:
      'Nằm ở vùng ven của Phú Xuyên, Hà Nội, làng Chuông (thường được gọi là làng Chuông nón) từ lâu đã trở thành một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam. Nếu nhìn từ xa, làng Chuông có vẻ yên bình như bao làng quê khác. Nhưng khi bước vào sâu bên trong, bạn sẽ thấy một "hệ sinh thái nghề thủ công" tồn tại bền bỉ hàng trăm năm — nơi mà gần như mỗi gia đình đều có ít nhất một người biết làm nón.\n\nĐiều đặc biệt là nơi đây không chỉ "làm nón", mà gần như cả làng cùng sống trong nhịp thở của nón. Từ sân nhà, ngõ nhỏ đến hiên cửa, đâu đâu cũng có hình ảnh những chiếc lá cọ được phơi trắng, những vành tre được uốn tròn, hay tiếng kim khâu nón lách cách đều đặn như một bản nhạc rất riêng của làng quê Bắc Bộ.',
    historyText:
      'Làng Chuông là một trong những làng nghề truyền thống lâu đời của Hà Nội, gắn liền với nghề làm nón lá qua nhiều thế hệ. Tuy nhiên, thời điểm chính xác nghề nón xuất hiện tại đây vẫn chưa được xác định rõ ràng.\n\nTheo lời kể của các bậc cao niên trong làng, nghề làm nón đã có mặt từ khoảng thế kỷ thứ 8. Khi đó, vùng đất này còn được gọi là Trang Thì Trung và đã sớm nổi tiếng với nghề thủ công làm nón, phục vụ nhu cầu sử dụng của nhiều tầng lớp trong xã hội, từ người dân lao động đến giới quan lại.\n\nNhưng theo thời gian, nón lá dần vượt khỏi chức năng "vật dụng lao động" để trở thành một phần của văn hóa Việt. Hình ảnh người phụ nữ đội nón, áo dài đã đi vào thơ ca, hội họa và ký ức nhiều thế hệ.',
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
    artisanStory: 'Những người thợ làng Chuông, từ già đến trẻ, tiếng kim khâu nón lách cách như một bản nhạc rất riêng — nhịp thở của cả một làng quê.',
    artisanQuote: 'Một chiếc nón đẹp không phải ở hình dáng — mà ở cái hồn người thợ gửi vào từng mũi kim, từng sợi chỉ.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ VIII' },
      { label: 'Vị trí', value: 'Phú Xuyên, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Lá lụi + Tre' },
      { label: 'Đặc trưng', value: 'Nón lá Việt Nam' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý lá',
        description: 'Nguyên liệu chính để làm nón là lá lụi — một loại lá thuộc họ cọ, được thu mua từ Phú Thọ, Thanh Hóa và Quảng Bình. Sau khi thu hoạch, lá được vò bằng chân trên nền sỏi trong khoảng 30 phút để làm mềm và tách đều các thớ lá. Tiếp đó, lá được phơi nắng đến khi chuyển từ màu xanh sang màu trắng. Trước khi làm nón, lá được làm ẩm và ủi phẳng bằng khăn ẩm hơ nóng để bề mặt lá mịn và dễ tạo hình.',
        imageUrl: '/image/non_step1.jpg',
      },
      {
        id: '2', order: 2,
        title: 'Chuẩn bị khung nón',
        description: 'Người thợ sử dụng khuôn gỗ có 8 gọng, trên mỗi gọng có 16 khấc để định vị các vòng nón. Các vành tre được lắp lên khuôn theo đúng vị trí, tạo nên bộ khung cân đối cho chiếc nón.',
        imageUrl: '/image/non_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: 'Xếp lá và quay nón',
        description: 'Lá sau khi xử lý được xếp đều lên khung theo từng lớp. Người thợ tiến hành cắt tầm lá, cố định phần chóp nón và quay nón để các lớp lá ôm sát khung, tạo hình tròn đều trước khi khâu.',
        imageUrl: '/image/non_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: 'Khâu nón',
        description: 'Người thợ dùng kim dài và chỉ mảnh để khâu cố định các lớp lá với khung tre. Các mũi khâu phải đều, thẳng hàng và có khoảng cách đồng nhất nhằm đảm bảo độ bền cũng như tính thẩm mỹ của sản phẩm.',
        imageUrl: '/image/non_step4.webp',
      },
      {
        id: '5', order: 5,
        title: 'Hoàn thiện và trang trí',
        description: 'Sau khi khâu xong, chiếc nón được cắt bỏ phần lá thừa, kiểm tra lại các đường khâu và gắn quai nón. Để đáp ứng nhu cầu thị trường, nhiều nghệ nhân còn trang trí thêm họa tiết, hình vẽ hoặc các chi tiết mỹ thuật, tạo nên những mẫu nón đa dạng phục vụ du lịch và thời trang.',
        imageUrl: '/image/non_step5.webp',
      },
    ],
  },
  {
    slug: 'huong-quang-phu-cau',
    name: 'Làng Hương Quảng Phú Cầu',
    tagline: 'Kết nối tâm linh qua từng nén hương',
    shortDescription:
      'Làng Hương Quảng Phú Cầu (Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng nhất Việt Nam, nơi những bó hương đỏ rực phơi dưới nắng trở thành biểu tượng đặc trưng.',
    intro:
      'Làng Hương Quảng Phú Cầu (huyện Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng của Việt Nam với lịch sử hơn 100 năm. Từ bao đời nay, hương đã trở thành một phần không thể thiếu trong văn hóa tâm linh dân tộc. Mỗi nén hương được thắp lên là sự kết nối giữa hiện tại và cội nguồn, thể hiện lòng thành kính đối với tổ tiên, thần linh và những giá trị truyền thống tốt đẹp. Chính vì vậy, nghề làm hương không đơn thuần tạo ra một sản phẩm phục vụ nhu cầu sinh hoạt mà còn góp phần gìn giữ bản sắc văn hóa và đời sống tinh thần của cộng đồng.\n\nTại Quảng Phú Cầu, các công đoạn làm hương như chẻ tăm, nhuộm chân hương, se hương và phơi hương đều được thực hiện một cách tỉ mỉ, thể hiện sự khéo léo của người thợ thủ công. Đặc biệt, hình ảnh những bó chân hương đỏ rực được xòe tròn dưới nắng đã trở thành biểu tượng đặc trưng của làng nghề.\n\nNgày nay, bên cạnh việc duy trì nghề truyền thống, Quảng Phú Cầu còn phát triển du lịch làng nghề, góp phần quảng bá văn hóa Việt Nam và đưa những giá trị truyền thống đến gần hơn với thế hệ trẻ.',
    historyMilestones: [
      {
        period: 'Đầu thế kỷ XX',
        points: [
          'Nghề làm hương tại Quảng Phú Cầu xuất hiện và được lưu truyền qua nhiều thế hệ người dân địa phương.',
          'Ban đầu, người dân chủ yếu làm nông nghiệp và các nghề thủ công từ tre nứa trước khi phát triển mạnh nghề sản xuất tăm hương.',
        ],
      },
      {
        period: 'Giai đoạn phát triển',
        points: [
          'Nhờ nhu cầu sử dụng hương trong đời sống tín ngưỡng ngày càng tăng, nghề làm hương dần trở thành nghề truyền thống và nguồn thu nhập chính của nhiều hộ gia đình.',
          'Người dân không ngừng cải tiến kỹ thuật sản xuất nhưng vẫn giữ gìn những giá trị thủ công truyền thống.',
        ],
      },
      {
        period: 'Ngày nay',
        points: [
          'Quảng Phú Cầu là một trong những làng nghề hương nổi tiếng nhất Việt Nam, vừa phát triển kinh tế vừa góp phần bảo tồn và quảng bá văn hóa dân tộc.',
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
    artisanStory: 'Người dân Quảng Phú Cầu đã gắn bó với nghề làm hương suốt hàng thế kỷ, biến những que tre bình thường thành những nén hương mang theo tâm tư, lòng thành kính của người Việt.',
    artisanQuote: 'Mỗi nén hương chúng tôi làm ra không chỉ là sản phẩm — đó là sợi dây vô hình nối giữa người sống và người đã khuất, giữa hiện tại và cội nguồn.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 100 năm' },
      { label: 'Vị trí', value: 'Ứng Hòa, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Vầu, nứa + Bột hương' },
      { label: 'Đặc trưng', value: 'Hương đỏ phơi nắng' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý nguyên liệu',
        description: 'Nguyên liệu chính là vầu hoặc nứa già. Sau khi được tuyển chọn, vầu và nứa được bổ thành từng thanh nhỏ, phơi khô dưới ánh nắng tự nhiên để đạt độ khô cần thiết trước khi gia công.',
        imageUrl: '/image/huong_step1.webp',
      },
      {
        id: '2', order: 2,
        title: 'Tạo chân hương',
        description: 'Nguyên liệu khô được đưa vào máy để tạo thành các que chân hương có kích thước đồng đều. Sau đó, chân hương được trà nhẵn, loại bỏ dằm xước và sàng lọc để loại bỏ những que cong, gãy hoặc không đạt tiêu chuẩn.',
        imageUrl: '/image/huong_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: 'Nhuộm và phơi chân hương',
        description: 'Chân hương đạt yêu cầu được bó gọn rồi nhúng vào phẩm màu đỏ. Sau khi nhuộm, các bó chân hương được xòe tròn và phơi dưới nắng đến khi khô hoàn toàn. Đây là công đoạn tạo nên sắc đỏ đặc trưng và hình ảnh nổi tiếng của làng hương Quảng Phú Cầu.',
        imageUrl: '/image/huong_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: 'Se hương',
        description: 'Sau khi chân hương khô, người thợ phủ hỗn hợp bột hương (được phối trộn từ bột gỗ, bột keo và các nguyên liệu tạo mùi thơm tự nhiên) lên thân tăm bằng phương pháp thủ công hoặc máy se hương. Lớp bột được phủ đều để tạo thành nén hương hoàn chỉnh.',
        imageUrl: '/image/huong_step4.jpg',
      },
      {
        id: '5', order: 5,
        title: 'Phơi hương thành phẩm',
        description: 'Những nén hương sau khi se tiếp tục được phơi hoặc sấy khô để lớp bột hương bám chắc vào chân hương, đồng thời đảm bảo hương cháy đều và giữ được mùi thơm.',
        imageUrl: '/image/huong_step5.jpg',
      },
    ],
  },
  {
    slug: 'lua-van-phuc',
    name: 'Làng Lụa Vạn Phúc',
    tagline: 'Tơ lụa Việt Nam kể câu chuyện hơn 1.000 năm',
    shortDescription:
      'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam với lịch sử hơn 1.000 năm.',
    intro:
      'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc từ lâu đã được xem là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam. Điều khiến Vạn Phúc đặc biệt không chỉ nằm ở sản phẩm lụa mềm, nhẹ, có độ óng tự nhiên, mà còn ở "không khí nghề" bao trùm cả làng. Dạo bước trong làng, bạn dễ dàng bắt gặp hình ảnh khung cửi đặt ngay trong nhà, tiếng thoi đưa đều đặn vang lên từ sáng sớm, và những tấm lụa nhiều màu sắc phơi dọc theo các con ngõ nhỏ.\n\nLụa Vạn Phúc không chỉ được sử dụng trong nước mà còn từng xuất hiện ở nhiều thị trường quốc tế, trở thành một trong những biểu tượng tiêu biểu của thủ công mỹ nghệ Việt Nam. Với nhiều người trẻ, nơi đây không chỉ là làng nghề, mà còn là một "background sống ảo" mang đậm chất truyền thống xen lẫn hiện đại.',
    historyText:
      'Làng lụa Vạn Phúc xưa kia có tên Vạn Bảo, do kị húy nhà Nguyễn nên đã đổi thành Vạn Phúc. Theo các tài liệu và truyền thuyết địa phương, nghề dệt lụa ở Vạn Phúc có lịch sử hơn 1.000 năm, gắn với tên tuổi bà A Lã Thị Nương — người được xem là tổ nghề dệt lụa.\n\nBà được cho là đã truyền dạy kỹ thuật trồng dâu, nuôi tằm, ươm tơ và dệt lụa cho người dân trong vùng, đặt nền móng cho nghề lụa phát triển bền vững qua nhiều thế hệ. Nhờ đó, Vạn Phúc sớm trở thành một trung tâm dệt lụa lớn, cung cấp sản phẩm cho cả khu vực kinh thành Thăng Long xưa.\n\nTrải qua nhiều thế hệ, lụa Vạn Phúc vẫn giữ được nét đẹp truyền thống và đang đi đầu trong ngành dệt nước ta. Lụa ở làng Vạn Phúc được đánh giá là đẹp và bền. Hoa văn trên lụa rất đa dạng, trang trí đối xứng với nhau, đường nét không rườm rà, phức tạp mà luôn tạo cảm giác phóng thoáng, dứt khoát.',
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
    artisanStory: 'Tiếng thoi đưa trên khung cửi là âm thanh đặc trưng nhất của làng Vạn Phúc — một bản nhạc đã vang lên suốt hơn một nghìn năm và vẫn còn đó trong từng ngôi nhà.',
    artisanQuote: 'Lụa Vạn Phúc không chỉ là vải — đó là cả một câu chuyện dài hơn nghìn năm được dệt nên bởi đôi tay của những người phụ nữ Việt.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 1.000 năm' },
      { label: 'Vị trí', value: 'Hà Đông, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tơ tằm' },
      { label: 'Đặc trưng', value: 'Lụa óng mềm mại' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Trồng dâu, nuôi tằm và tạo kén',
        description: 'Tằm được nuôi bằng lá dâu tươi trong điều kiện phù hợp để tạo ra những kén tơ chất lượng. Khi tằm trưởng thành, người nuôi làm né để tằm nhả tơ và tạo kén. Sau khi thu hoạch, các kén già đạt tiêu chuẩn được tuyển chọn để đưa vào công đoạn lấy tơ.',
        imageUrl: '/image/lua_step1.webp',
      },
      {
        id: '2', order: 2,
        title: 'Lấy tơ và guồng tơ',
        description: 'Kén tằm được xử lý và kéo tơ bằng phương pháp thủ công hoặc máy móc hỗ trợ. Các sợi tơ sau khi kéo sẽ được chuốt thẳng và đưa vào guồng. Công đoạn guồng tơ vẫn đòi hỏi sự khéo léo của người thợ để tránh sợi tơ bị rối hoặc đứt, đồng thời tạo ra những cuộn tơ có chất lượng đồng đều phục vụ cho quá trình dệt.',
        details: ['Kéo sợi tơ từ kén', 'Gom nhiều sợi nhỏ thành một sợi lớn', 'Chuốt thẳng và guồng tơ'],
        imageUrl: '/image/lua_step2.jpg',
      },
      {
        id: '3', order: 3,
        title: 'Dệt lụa trên khung cửi',
        description: 'Tơ sau khi guồng được kéo vào các lô nhỏ để mắc cửi, sau đó đưa lên hệ thống máy dệt. Trong quá trình dệt, các hoa văn được lập trình sẵn trên máy nên sẽ hiện trực tiếp trên mặt vải, tạo nên những họa tiết đặc trưng của lụa Vạn Phúc.',
        imageUrl: '/image/lua_step3.jpg',
      },
      {
        id: '4', order: 4,
        title: 'Nhuộm và hoàn thiện',
        description: 'Trước khi nhuộm, lụa thô được nấu để loại bỏ tạp chất và tăng khả năng bám màu. Sau đó, lụa được nhuộm theo màu sắc mong muốn, giặt sạch rồi sấy khô để màu sắc lên đều và giữ được độ bền. Trước đây, lụa thường được phơi dưới ánh nắng tự nhiên, tuy nhiên hiện nay nhiều cơ sở sử dụng phương pháp sấy để đảm bảo chất lượng màu sắc ổn định.',
        imageUrl: '/image/lua_step4.webp',
      },
      {
        id: '5', order: 5,
        title: 'Thành quả',
        description: 'Lụa Vạn Phúc hoàn thiện mang đặc trưng mềm mại, óng ánh và bền màu, xứng đáng là tinh hoa dệt lụa nghìn năm của người Việt.',
        imageUrl: '/image/lua_step5.jpg',
      },
    ],
  },
  {
    slug: 'quat-chang-son',
    name: 'Làng Quạt Chàng Sơn',
    tagline: 'Nét tinh hoa thủ công giữa lòng xứ Đoài',
    shortDescription:
      'Nằm tại xã Chàng Sơn (Thạch Thất, Hà Nội), làng nghề quạt Chàng Sơn là một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài, với lịch sử từ thế kỷ XVII.',
    intro:
      'Nằm tại xã Chàng Sơn, làng nghề quạt Chàng Sơn từ lâu đã được biết đến như một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài. Không chỉ đơn thuần là nơi sản xuất quạt giấy, quạt lụa, nơi đây còn là không gian lưu giữ tinh hoa lao động thủ công, nơi mỗi chiếc quạt mang trong mình dấu ấn của sự tỉ mỉ, khéo léo và bền bỉ qua nhiều thế hệ.\n\nTrong nhịp sống hiện đại, Chàng Sơn vẫn giữ được "hơi thở" truyền thống, đồng thời từng bước thích ứng với thị trường, đưa sản phẩm làng nghề đến gần hơn với du khách và người tiêu dùng trong nước cũng như quốc tế.',
    historyText:
      'Nghề làm quạt ở Chàng Sơn (trước đây có tên là Nủa Chàng) đã có lịch sử từ rất lâu đời, các tư liệu lịch sử ghi nhận nghề đã hình thành và phát triển từ khoảng thế kỷ XVII đến XIX.\n\nNgay từ thế kỷ XIX, quạt Chàng Sơn đã không chỉ là vật dụng làm mát thông thường mà còn là vật phẩm sang trọng. Nó nổi tiếng đến mức từng được người Pháp mang sang Paris để trưng bày trong các triển lãm quốc tế, khẳng định đẳng cấp của thủ công mỹ nghệ Việt.\n\nThời kỳ bao cấp, làng Chàng Sơn trở thành một "công xưởng" lớn cung cấp quạt giấy cho cả nước theo cơ chế tập trung, giúp nghề quạt được duy trì và phổ biến rộng rãi khắp các vùng miền.',
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
    artisanStory: 'Người thợ Chàng Sơn đã đưa những chiếc quạt đơn giản trở thành tác phẩm nghệ thuật được trưng bày ở Paris — bằng chính đôi tay khéo léo và tình yêu với nghề truyền thống.',
    artisanQuote: 'Một chiếc quạt của Chàng Sơn không chỉ làm mát thân thể mà còn làm mát cả tâm hồn — bởi trong đó có cả trăm năm tinh hoa của người xứ Đoài.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ XVII' },
      { label: 'Vị trí', value: 'Thạch Thất, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tre, nứa + Giấy / Lụa' },
      { label: 'Đặc trưng', value: 'Triển lãm Paris TK XIX' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý nguyên liệu',
        description: 'Nguyên liệu chính để làm quạt là tre hoặc nứa già có độ dẻo và độ bền cao. Tre được chẻ thành các nan nhỏ, vót mỏng, mài nhẵn và xử lý để đảm bảo độ chắc chắn, đồng thời tạo thuận lợi cho quá trình lắp ráp khung quạt.',
        imageUrl: '/image/quat_step1.jpg',
      },
      {
        id: '2', order: 2,
        title: 'Tạo khung quạt',
        description: 'Các nan tre được lắp ghép, khoan lỗ và cố định bằng đinh tán để tạo thành bộ khung quạt có thể đóng mở linh hoạt. Đây là công đoạn quyết định độ cân đối, độ bền và hình dáng của sản phẩm.',
        imageUrl: '/image/quat_step_uon.jpg',
      },
      {
        id: '3', order: 3,
        title: 'Chuẩn bị mặt quạt',
        description: 'Mặt quạt được làm từ giấy hoặc lụa tùy theo từng dòng sản phẩm. Đối với quạt tranh Chàng Sơn, tranh thường được vẽ trực tiếp trên lụa, một số sản phẩm còn được thêu ren trước khi gắn vào khung quạt nhằm tăng giá trị nghệ thuật.',
        imageUrl: '/image/quat_giay.jpg',
      },
      {
        id: '4', order: 4,
        title: 'Gắn mặt quạt vào khung',
        description: 'Sau khi hoàn thiện phần tranh hoặc họa tiết, mặt quạt được dán và gắn lên khung nan bằng phương pháp thủ công. Người thợ căn chỉnh cẩn thận để các nan phân bố đều, giúp quạt đóng mở dễ dàng và giữ được hình dáng chuẩn.',
        imageUrl: '/image/quat_step3.jpg',
      },
      {
        id: '5', order: 5,
        title: 'Trang trí và hoàn thiện',
        description: 'Các nghệ nhân tiếp tục hoàn thiện sản phẩm bằng cách bổ sung hoặc chỉnh sửa các chi tiết mỹ thuật. Đề tài trên quạt rất đa dạng như tranh phong cảnh, tích cổ, tranh Đông Hồ hay các họa tiết truyền thống, tạo nên nét đặc trưng của quạt Chàng Sơn.',
        imageUrl: '/image/quat_step4.jpg',
      },
    ],
  },
];

export function getVillage(slug: string): VillageStatic | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
