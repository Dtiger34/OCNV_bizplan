export interface VillageStage {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface VillageStatic {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullHistory: string;
  coverImageUrl: string;
  heroImageUrl: string;
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
    fullHistory:
      'Làng Gốm Bát Tràng thuộc xã Bát Tràng, nằm bên bờ sông Hồng và cách trung tâm Hà Nội khoảng 15 km. Đây là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam với lịch sử hơn 700 năm hình thành và phát triển.\n\nTừ xa xưa, gốm sứ không chỉ là vật dụng phục vụ đời sống hằng ngày mà còn mang giá trị nghệ thuật và văn hóa sâu sắc. Những sản phẩm gốm Bát Tràng thể hiện sự kết hợp hài hòa giữa kỹ thuật thủ công tinh xảo, óc sáng tạo và nét đẹp truyền thống của người Việt.\n\nThế kỷ XV–XVI, nghề gốm phát triển nhờ chính sách khuyến khích giao thương của nhà Mạc. Đến thế kỷ XVI–XVII là giai đoạn hưng thịnh nhất — sản phẩm được xuất khẩu rộng rãi sang nhiều nước trong khu vực. Ngày nay, Bát Tràng là điểm du lịch văn hóa nổi tiếng, thu hút đông đảo du khách trong và ngoài nước.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1920&q=80',
    artisanStory:
      'Các nghệ nhân Bát Tràng đã dành cả cuộc đời để hoàn thiện kỹ thuật làm gốm, truyền từ đời này sang đời khác với tất cả tâm huyết và niềm tự hào.',
    artisanQuote:
      'Mỗi chiếc bát, mỗi cái bình đều mang trong mình hơi thở của người thợ, của đất, của lửa — ba yếu tố tạo nên linh hồn gốm Bát Tràng.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 700 năm' },
      { label: 'Vị trí', value: 'Gia Lâm, Hà Nội' },
      { label: 'Chất liệu', value: 'Đất sét + Men' },
      { label: 'Nhiệt độ nung', value: '1.000°C – 1.300°C' },
    ],
    stages: [
      {
        id: '1',
        order: 1,
        title: 'Chọn & xử lý đất sét',
        description:
          'Đất sét được lựa chọn kỹ lưỡng, loại bỏ tạp chất, ngâm, nhào và luyện để tạo độ dẻo, giúp sản phẩm dễ tạo hình và hạn chế nứt vỡ khi nung.',
      },
      {
        id: '2',
        order: 2,
        title: 'Tạo hình sản phẩm',
        description:
          'Người thợ sử dụng bàn xoay hoặc khuôn để tạo hình cho sản phẩm như bát, đĩa, bình hoa, tượng hay đồ trang trí theo thiết kế.',
      },
      {
        id: '3',
        order: 3,
        title: 'Phơi & sửa mộc',
        description:
          'Sản phẩm sau khi tạo hình được phơi khô tự nhiên. Người thợ chỉnh sửa, gọt tỉa và làm nhẵn bề mặt để đạt độ hoàn thiện cao.',
      },
      {
        id: '4',
        order: 4,
        title: 'Trang trí & phủ men',
        description:
          'Nghệ nhân vẽ hoa văn, họa tiết trang trí lên sản phẩm rồi phủ lớp men phù hợp để tăng tính thẩm mỹ và độ bền cho gốm.',
      },
      {
        id: '5',
        order: 5,
        title: 'Nung gốm',
        description:
          'Sản phẩm được đưa vào lò nung ở nhiệt độ từ 1.000°C đến hơn 1.300°C — công đoạn quyết định chất lượng, màu sắc và độ bền.',
      },
      {
        id: '6',
        order: 6,
        title: 'Hoàn thiện & đóng gói',
        description:
          'Sau khi nung, sản phẩm được kiểm tra chất lượng, phân loại, làm sạch và đóng gói trước khi đưa ra thị trường hoặc xuất khẩu.',
      },
    ],
  },
  {
    slug: 'non-chuong',
    name: 'Làng Nón Chuông',
    tagline: 'Giữ lại hồn Việt trên từng lá nón',
    shortDescription:
      'Làng Chuông (Phú Xuyên, Hà Nội) là một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam, nơi gần như mỗi gia đình đều biết làm nón.',
    fullHistory:
      'Nằm ở vùng ven của Phú Xuyên, Hà Nội, làng Chuông từ lâu đã trở thành một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam. Nếu nhìn từ xa, làng Chuông có vẻ yên bình như bao làng quê khác. Nhưng khi bước vào sâu bên trong, bạn sẽ thấy một "hệ sinh thái nghề thủ công" tồn tại bền bỉ hàng trăm năm.\n\nTheo lời kể của các bậc cao niên trong làng, nghề làm nón đã có mặt từ khoảng thế kỷ thứ 8. Khi đó, vùng đất này còn được gọi là Trang Thì Trung và đã sớm nổi tiếng với nghề thủ công làm nón, phục vụ nhu cầu sử dụng của nhiều tầng lớp trong xã hội.\n\nNhưng theo thời gian, nón lá dần vượt khỏi chức năng "vật dụng lao động" để trở thành một phần của văn hóa Việt. Hình ảnh người phụ nữ đội nón, áo dài đã đi vào thơ ca, hội họa và ký ức nhiều thế hệ.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80',
    artisanStory:
      'Những người thợ làng Chuông, từ già đến trẻ, từ bình minh đến chiều tà, tiếng kim khâu nón lách cách như một bản nhạc rất riêng — nhịp thở của cả một làng quê.',
    artisanQuote:
      'Một chiếc nón đẹp không phải ở hình dáng — mà ở cái hồn người thợ gửi vào từng mũi kim, từng sợi chỉ.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ VIII' },
      { label: 'Vị trí', value: 'Phú Xuyên, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Lá cọ + Tre' },
      { label: 'Đặc trưng', value: 'Nón lá Việt Nam' },
    ],
    stages: [
      {
        id: '1',
        order: 1,
        title: 'Chọn & xử lý lá',
        description:
          'Lá cọ được chọn kỹ: không quá già, không quá non. Sau khi hái, lá được phơi nắng nhẹ, làm mềm bằng hơi, ép phẳng để giữ bề mặt trắng mịn.',
      },
      {
        id: '2',
        order: 2,
        title: 'Chuốt & tạo khung tre',
        description:
          'Tre được chọn thẳng, dẻo và già vừa đủ. Người thợ chẻ thành nan mảnh, uốn thành các vòng tròn đồng tâm, cố định thành khung nón nhiều lớp vành.',
      },
      {
        id: '3',
        order: 3,
        title: 'Xếp lá lên khuôn',
        description:
          'Lá được đặt lên khung theo từng lớp: lớp ngoài phải đều, mịn, không hở; lớp trong tạo độ chắc. Người thợ phải canh từng milimet để nón không mất cân đối.',
      },
      {
        id: '4',
        order: 4,
        title: 'Khâu nón',
        description:
          'Người thợ dùng kim dài, chỉ mảnh, khâu từng mũi xuyên qua lá và khung tre. Mũi khâu phải đều, thẳng hàng, lực tay ổn định để không làm rách lá.',
      },
      {
        id: '5',
        order: 5,
        title: 'Trang trí & hoàn thiện',
        description:
          'Nón được phủ dầu chống thấm nước, trang trí bằng hình ảnh, thơ, hoa văn và gắn quai bằng vải hoặc lụa. Nhiều chiếc nón được biến thành sản phẩm nghệ thuật.',
      },
    ],
  },
  {
    slug: 'huong-quang-phu-cau',
    name: 'Làng Hương Quảng Phú Cầu',
    tagline: 'Kết nối tâm linh qua từng nén hương',
    shortDescription:
      'Làng Hương Quảng Phú Cầu (Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng nhất Việt Nam với lịch sử hơn 100 năm, nơi những bó hương đỏ rực phơi dưới nắng trở thành biểu tượng đặc trưng.',
    fullHistory:
      'Làng Hương Quảng Phú Cầu (huyện Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng của Việt Nam với lịch sử hơn 100 năm. Từ bao đời nay, hương đã trở thành một phần không thể thiếu trong văn hóa tâm linh dân tộc.\n\nMỗi nén hương được thắp lên là sự kết nối giữa hiện tại và cội nguồn, thể hiện lòng thành kính đối với tổ tiên, thần linh và những giá trị truyền thống tốt đẹp. Chính vì vậy, nghề làm hương không đơn thuần tạo ra một sản phẩm mà còn góp phần gìn giữ bản sắc văn hóa và đời sống tinh thần của cộng đồng.\n\nNghề làm hương tại Quảng Phú Cầu xuất hiện từ đầu thế kỷ XX. Ban đầu, người dân chủ yếu làm nông nghiệp và các nghề thủ công từ tre nứa trước khi phát triển mạnh nghề sản xuất tăm hương. Đặc biệt, hình ảnh những bó chân hương đỏ rực được xòe tròn dưới nắng đã trở thành biểu tượng đặc trưng của làng nghề.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1920&q=80',
    artisanStory:
      'Người dân Quảng Phú Cầu đã gắn bó với nghề làm hương suốt hàng thế kỷ, biến những que tre bình thường thành những nén hương mang theo tâm tư, lòng thành kính của người Việt.',
    artisanQuote:
      'Mỗi nén hương chúng tôi làm ra không chỉ là sản phẩm — đó là sợi dây vô hình nối giữa người sống và người đã khuất, giữa hiện tại và cội nguồn.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 100 năm' },
      { label: 'Vị trí', value: 'Ứng Hòa, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tre, vầu + Bột hương' },
      { label: 'Đặc trưng', value: 'Hương đỏ phơi nắng' },
    ],
    stages: [
      {
        id: '1',
        order: 1,
        title: 'Chọn & xử lý tre',
        description:
          'Nguyên liệu chính là tre hoặc vầu già. Sau khi tuyển chọn kỹ lưỡng, tre được chẻ nhỏ, vót thành những que tăm đều nhau để làm chân hương.',
      },
      {
        id: '2',
        order: 2,
        title: 'Nhuộm chân hương',
        description:
          'Tăm hương sau khi vót sẽ được nhuộm màu đỏ hoặc hồng rồi đem phơi khô. Đây là công đoạn tạo nên sắc đỏ đặc trưng của làng Hương Quảng Phú Cầu.',
      },
      {
        id: '3',
        order: 3,
        title: 'Phơi khô',
        description:
          'Những bó chân hương được xòe tròn như những bông hoa lớn và phơi dưới nắng để màu nhuộm khô hoàn toàn — tạo nên khung cảnh đặc sắc của làng nghề.',
      },
      {
        id: '4',
        order: 4,
        title: 'Se hương',
        description:
          'Người thợ phủ hỗn hợp bột hương lên thân tăm bằng phương pháp thủ công hoặc máy móc hỗ trợ để tạo thành nén hương hoàn chỉnh.',
      },
      {
        id: '5',
        order: 5,
        title: 'Hoàn thiện & đóng gói',
        description:
          'Sản phẩm tiếp tục được phơi khô, phân loại theo kích cỡ và hương liệu, rồi đóng gói trước khi đưa ra thị trường trong nước và xuất khẩu.',
      },
    ],
  },
  {
    slug: 'lua-van-phuc',
    name: 'Làng Lụa Vạn Phúc',
    tagline: 'Tơ lụa Việt Nam kể câu chuyện hơn 1.000 năm',
    shortDescription:
      'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam với lịch sử hơn 1.000 năm.',
    fullHistory:
      'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc từ lâu đã được xem là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam. Điều khiến Vạn Phúc đặc biệt không chỉ nằm ở sản phẩm lụa mềm, nhẹ, có độ óng tự nhiên, mà còn ở "không khí nghề" bao trùm cả làng.\n\nLàng lụa Vạn Phúc xưa kia có tên Vạn Bảo, do kị húy nhà Nguyễn nên đã đổi thành Vạn Phúc. Theo các tài liệu và truyền thuyết địa phương, nghề dệt lụa ở Vạn Phúc có lịch sử hơn 1.000 năm, gắn với tên tuổi bà A Lã Thị Nương, người được xem là tổ nghề dệt lụa.\n\nBà được cho là đã truyền dạy kỹ thuật trồng dâu, nuôi tằm, ươm tơ và dệt lụa cho người dân trong vùng, đặt nền móng cho nghề lụa phát triển bền vững qua nhiều thế hệ. Lụa Vạn Phúc không chỉ được sử dụng trong nước mà còn từng xuất hiện ở nhiều thị trường quốc tế.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80',
    artisanStory:
      'Tiếng thoi đưa trên khung cửi là âm thanh đặc trưng nhất của làng Vạn Phúc — một bản nhạc đã vang lên suốt hơn một nghìn năm và vẫn còn đó trong từng ngôi nhà.',
    artisanQuote:
      'Lụa Vạn Phúc không chỉ là vải — đó là cả một câu chuyện dài hơn nghìn năm được dệt nên bởi đôi tay của những người phụ nữ Việt.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 1.000 năm' },
      { label: 'Vị trí', value: 'Hà Đông, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tơ tằm' },
      { label: 'Đặc trưng', value: 'Lụa óng mềm mại' },
    ],
    stages: [
      {
        id: '1',
        order: 1,
        title: 'Nuôi tằm',
        description:
          'Tằm được nuôi bằng lá dâu tươi. Trong suốt vòng đời ngắn ngủi, tằm tạo ra kén tơ. Chất lượng lá dâu quyết định trực tiếp đến độ mịn và bền của sợi lụa.',
      },
      {
        id: '2',
        order: 2,
        title: 'Ươm tơ từ kén',
        description:
          'Kén tằm được xử lý bằng nước nóng để tách sợi tơ. Người thợ kéo sợi, gom nhiều sợi nhỏ thành sợi lớn, làm khô và se sợi — đòi hỏi sự khéo léo cao.',
      },
      {
        id: '3',
        order: 3,
        title: 'Dệt lụa',
        description:
          'Sợi tơ được đưa lên khung cửi. Người thợ dàn sợi dọc và sợi ngang, dệt thủ công, điều chỉnh độ căng để tạo bề mặt vải đều và mịn.',
      },
      {
        id: '4',
        order: 4,
        title: 'Nhuộm & hoàn thiện',
        description:
          'Vải lụa được nhuộm màu bằng phương pháp truyền thống hoặc hiện đại, giặt và xử lý bề mặt để tạo độ bóng. Mỗi tấm lụa đạt chuẩn phải có độ mềm, rũ và óng tự nhiên.',
      },
    ],
  },
  {
    slug: 'quat-chang-son',
    name: 'Làng Quạt Chàng Sơn',
    tagline: 'Nét tinh hoa thủ công giữa lòng xứ Đoài',
    shortDescription:
      'Nằm tại xã Chàng Sơn (Thạch Thất, Hà Nội), làng nghề quạt Chàng Sơn là một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài, với lịch sử từ thế kỷ XVII.',
    fullHistory:
      'Nằm tại xã Chàng Sơn, làng nghề quạt Chàng Sơn từ lâu đã được biết đến như một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài. Không chỉ đơn thuần là nơi sản xuất quạt giấy, quạt lụa, nơi đây còn là không gian lưu giữ tinh hoa lao động thủ công.\n\nNghề làm quạt ở Chàng Sơn (trước đây có tên là Nủa Chàng) đã có lịch sử từ rất lâu đời, các tư liệu lịch sử ghi nhận nghề đã hình thành và phát triển từ khoảng thế kỷ XVII đến XIX.\n\nNgay từ thế kỷ XIX, quạt Chàng Sơn đã không chỉ là vật dụng làm mát thông thường mà còn là vật phẩm sang trọng, nổi tiếng đến mức từng được người Pháp mang sang Paris để trưng bày trong các triển lãm quốc tế, khẳng định đẳng cấp của thủ công mỹ nghệ Việt. Trong nhịp sống hiện đại, Chàng Sơn vẫn giữ được "hơi thở" truyền thống, đồng thời từng bước thích ứng với thị trường.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1920&q=80',
    artisanStory:
      'Người thợ Chàng Sơn đã đưa những chiếc quạt đơn giản trở thành tác phẩm nghệ thuật được trưng bày ở Paris — bằng chính đôi tay khéo léo và tình yêu với nghề truyền thống.',
    artisanQuote:
      'Một chiếc quạt của Chàng Sơn không chỉ làm mát thân thể mà còn làm mát cả tâm hồn — bởi trong đó có cả trăm năm tinh hoa của người xứ Đoài.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ XVII' },
      { label: 'Vị trí', value: 'Thạch Thất, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tre + Giấy dó / Lụa' },
      { label: 'Đặc trưng', value: 'Triển lãm Paris thế kỷ XIX' },
    ],
    stages: [
      {
        id: '1',
        order: 1,
        title: 'Chọn & xử lý tre',
        description:
          'Tre được chọn phải già, thẳng và dẻo. Chẻ thành từng nan nhỏ, vót mỏng, mài nhẵn để không gây xước tay, uốn tạo hình khung quạt theo kích thước chuẩn.',
      },
      {
        id: '2',
        order: 2,
        title: 'Làm giấy quạt',
        description:
          'Giấy dó hoặc giấy chuyên dụng được xử lý để có độ dai và nhẹ, có thể nhuộm màu hoặc in họa tiết, phơi khô tự nhiên. Sản phẩm cao cấp được vẽ tay hoặc in tranh dân gian.',
      },
      {
        id: '3',
        order: 3,
        title: 'Dán & định hình',
        description:
          'Dán giấy lên khung nan tre, canh chỉnh sao cho hai mặt cân đối, ép và cố định để quạt không bị cong hoặc lệch. Chỉ cần sai lệch nhỏ, quạt có thể bị nhăn hoặc mất dáng.',
      },
      {
        id: '4',
        order: 4,
        title: 'Trang trí & hoàn thiện',
        description:
          'Quạt được vẽ tranh thủ công, viết thư pháp hoặc trang trí họa tiết truyền thống. Sau đó kiểm tra độ mở–gập, độ bền và tính thẩm mỹ trước khi đưa ra thị trường.',
      },
    ],
  },
];

export function getVillage(slug: string): VillageStatic | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
