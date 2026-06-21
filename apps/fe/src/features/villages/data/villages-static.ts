export interface VillageStage {
  id: string;
  order: number;
  title: string;
  description: string;
  details?: string[];
  imageUrl: string;
}

export interface VillageStatic {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullHistory: string;
  coverImageUrl: string;
  heroImageUrl: string;
  galleryImages: string[];
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
    fullHistory:
      'Làng Gốm Bát Tràng thuộc xã Bát Tràng, nằm bên bờ sông Hồng và cách trung tâm Hà Nội khoảng 15 km. Đây là một trong những làng nghề gốm sứ truyền thống nổi tiếng và lâu đời nhất Việt Nam với lịch sử hơn 700 năm hình thành và phát triển.\n\nTừ xa xưa, gốm sứ không chỉ là vật dụng phục vụ đời sống hằng ngày mà còn mang giá trị nghệ thuật và văn hóa sâu sắc. Những sản phẩm gốm Bát Tràng thể hiện sự kết hợp hài hòa giữa kỹ thuật thủ công tinh xảo, óc sáng tạo và nét đẹp truyền thống của người Việt.\n\nThế kỷ XV–XVI, nghề gốm phát triển nhờ chính sách khuyến khích giao thương của nhà Mạc, sản phẩm bắt đầu mang dấu ấn riêng với tên người chế tác và niên đại sản xuất. Đến thế kỷ XVI–XVII là giai đoạn hưng thịnh nhất — nhờ thuận lợi giao thương, sản phẩm được xuất khẩu rộng rãi sang nhiều nước trong khu vực và thế giới.\n\nNgày nay, Bát Tràng là điểm du lịch văn hóa nổi tiếng, thu hút đông đảo du khách trong và ngoài nước đến tham quan, trải nghiệm làm gốm và tìm hiểu về nghề thủ công truyền thống Việt Nam.',
    coverImageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
    ],
    color: '#8B5E3C',
    artisanStory: 'Các nghệ nhân Bát Tràng đã dành cả cuộc đời để hoàn thiện kỹ thuật làm gốm, truyền từ đời này sang đời khác với tất cả tâm huyết và niềm tự hào.',
    artisanQuote: 'Mỗi chiếc bát, mỗi cái bình đều mang trong mình hơi thở của người thợ, của đất, của lửa — ba yếu tố tạo nên linh hồn gốm Bát Tràng.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 700 năm' },
      { label: 'Vị trí', value: 'Gia Lâm, Hà Nội' },
      { label: 'Chất liệu', value: 'Đất sét + Men' },
      { label: 'Nhiệt độ nung', value: '1.000°C – 1.300°C' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý đất sét',
        description: 'Đất sét được lựa chọn kỹ lưỡng, loại bỏ tạp chất rồi ngâm, nhào và luyện đất để tạo độ dẻo, giúp sản phẩm dễ tạo hình và hạn chế nứt vỡ khi nung.',
        imageUrl: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2', order: 2,
        title: 'Tạo hình sản phẩm',
        description: 'Người thợ sử dụng bàn xoay hoặc khuôn để tạo hình cho sản phẩm như bát, đĩa, bình hoa, tượng hay đồ trang trí theo thiết kế mong muốn.',
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3', order: 3,
        title: 'Phơi và sửa mộc',
        description: 'Sản phẩm sau khi tạo hình được phơi khô tự nhiên. Người thợ tiến hành chỉnh sửa, gọt tỉa và làm nhẵn bề mặt để sản phẩm đạt độ hoàn thiện cao.',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4', order: 4,
        title: 'Trang trí và phủ men',
        description: 'Các nghệ nhân vẽ hoa văn, họa tiết trang trí lên sản phẩm rồi phủ một lớp men phù hợp nhằm tăng tính thẩm mỹ và độ bền cho gốm.',
        imageUrl: 'https://images.unsplash.com/photo-1510106137213-d9f12be1e9c3?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5', order: 5,
        title: 'Nung gốm',
        description: 'Sản phẩm được đưa vào lò nung ở nhiệt độ cao, thường từ 1.000°C đến hơn 1.300°C. Đây là công đoạn quyết định chất lượng, màu sắc và độ bền của sản phẩm.',
        imageUrl: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '6', order: 6,
        title: 'Hoàn thiện và đóng gói',
        description: 'Sau khi nung, sản phẩm được kiểm tra chất lượng, phân loại, làm sạch và đóng gói trước khi đưa ra thị trường hoặc xuất khẩu.',
        imageUrl: 'https://images.unsplash.com/photo-1530018352490-c6eef07fd7e0?auto=format&fit=crop&w=800&q=80',
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
      'Nằm ở vùng ven của Phú Xuyên, Hà Nội, làng Chuông từ lâu đã trở thành một trong những cái tên tiêu biểu nhất khi nhắc đến nghề làm nón lá truyền thống Việt Nam. Nếu nhìn từ xa, làng Chuông có vẻ yên bình như bao làng quê khác. Nhưng khi bước vào sâu bên trong, bạn sẽ thấy một "hệ sinh thái nghề thủ công" tồn tại bền bỉ hàng trăm năm — nơi mà gần như mỗi gia đình đều có ít nhất một người biết làm nón.\n\nĐiều đặc biệt là nơi đây không chỉ "làm nón", mà gần như cả làng cùng sống trong nhịp thở của nón. Từ sân nhà, ngõ nhỏ đến hiên cửa, đâu đâu cũng có hình ảnh những chiếc lá cọ được phơi trắng, những vành tre được uốn tròn, hay tiếng kim khâu nón lách cách đều đặn như một bản nhạc rất riêng của làng quê Bắc Bộ.\n\nTheo lời kể của các bậc cao niên trong làng, nghề làm nón đã có mặt từ khoảng thế kỷ thứ 8. Khi đó, vùng đất này còn được gọi là Trang Thì Trung và đã sớm nổi tiếng với nghề thủ công làm nón, phục vụ nhu cầu sử dụng của nhiều tầng lớp trong xã hội.\n\nNhưng theo thời gian, nón lá dần vượt khỏi chức năng "vật dụng lao động" để trở thành một phần của văn hóa Việt. Hình ảnh người phụ nữ đội nón, áo dài đã đi vào thơ ca, hội họa và ký ức nhiều thế hệ.',
    coverImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    ],
    color: '#4A7C59',
    artisanStory: 'Những người thợ làng Chuông, từ già đến trẻ, tiếng kim khâu nón lách cách như một bản nhạc rất riêng — nhịp thở của cả một làng quê.',
    artisanQuote: 'Một chiếc nón đẹp không phải ở hình dáng — mà ở cái hồn người thợ gửi vào từng mũi kim, từng sợi chỉ.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ VIII' },
      { label: 'Vị trí', value: 'Phú Xuyên, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Lá cọ + Tre' },
      { label: 'Đặc trưng', value: 'Nón lá Việt Nam' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý lá',
        description: 'Nguyên liệu chính là lá cọ. Lá phải được chọn kỹ: không quá già (dễ giòn), không quá non (dễ rách). Đây là bước quyết định "độ đẹp nền" của chiếc nón.',
        details: ['Phơi nắng nhẹ để giảm độ ẩm', 'Làm mềm bằng hơi hoặc ủ', 'Là và ép phẳng để giữ bề mặt trắng mịn'],
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2', order: 2,
        title: 'Chuốt và tạo khung tre',
        description: 'Tre được chọn phải thẳng, dẻo và già vừa đủ. Khung nón chính là "xương sống", quyết định độ cân đối của sản phẩm.',
        details: ['Chẻ tre thành nan mảnh', 'Uốn thành các vòng tròn đồng tâm', 'Cố định thành khung nón nhiều lớp vành'],
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3', order: 3,
        title: 'Xếp lá lên khuôn',
        description: 'Lá được đặt lên khung theo từng lớp. Người thợ phải canh từng milimet — chỉ cần lệch một chút là nón sẽ mất cân đối.',
        details: ['Lớp ngoài phải đều, mịn, không hở', 'Lớp trong giúp tạo độ chắc và che khuyết điểm'],
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4', order: 4,
        title: 'Khâu nón',
        description: 'Đây là bước đòi hỏi kỹ năng cao nhất. Người thợ dùng kim dài, chỉ mảnh, khâu từng mũi xuyên qua lá và khung tre. Một người thợ lành nghề có thể "khâu như máy" nhưng vẫn giữ được sự mềm mại thủ công.',
        details: ['Mũi khâu phải đều, thẳng hàng', 'Lực tay ổn định để không làm rách lá', 'Khoảng cách mũi khâu quyết định độ bền và thẩm mỹ'],
        imageUrl: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5', order: 5,
        title: 'Trang trí và hoàn thiện',
        description: 'Ở làng Chuông, nhiều chiếc nón được biến thành sản phẩm nghệ thuật phục vụ du lịch và thời trang.',
        details: ['Phủ dầu để chống thấm nước', 'Trang trí bằng hình ảnh, thơ, hoa văn', 'Gắn quai nón bằng vải hoặc lụa'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    slug: 'huong-quang-phu-cau',
    name: 'Làng Hương Quảng Phú Cầu',
    tagline: 'Kết nối tâm linh qua từng nén hương',
    shortDescription:
      'Làng Hương Quảng Phú Cầu (Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng nhất Việt Nam, nơi những bó hương đỏ rực phơi dưới nắng trở thành biểu tượng đặc trưng.',
    fullHistory:
      'Làng Hương Quảng Phú Cầu (huyện Ứng Hòa, Hà Nội) là một trong những làng nghề làm hương truyền thống nổi tiếng của Việt Nam với lịch sử hơn 100 năm. Từ bao đời nay, hương đã trở thành một phần không thể thiếu trong văn hóa tâm linh dân tộc. Mỗi nén hương được thắp lên là sự kết nối giữa hiện tại và cội nguồn, thể hiện lòng thành kính đối với tổ tiên, thần linh và những giá trị truyền thống tốt đẹp.\n\nTại Quảng Phú Cầu, các công đoạn làm hương như chẻ tăm, nhuộm chân hương, se hương và phơi hương đều được thực hiện một cách tỉ mỉ. Đặc biệt, hình ảnh những bó chân hương đỏ rực được xòe tròn dưới nắng đã trở thành biểu tượng đặc trưng của làng nghề.\n\nNghề làm hương tại Quảng Phú Cầu xuất hiện từ đầu thế kỷ XX. Ban đầu người dân chủ yếu làm nông nghiệp và các nghề thủ công từ tre nứa, trước khi phát triển mạnh nghề sản xuất tăm hương. Nhờ nhu cầu sử dụng hương trong đời sống tín ngưỡng ngày càng tăng, nghề làm hương dần trở thành nguồn thu nhập chính của nhiều hộ gia đình.\n\nNgày nay, bên cạnh việc duy trì nghề truyền thống, Quảng Phú Cầu còn phát triển du lịch làng nghề, góp phần quảng bá văn hóa Việt Nam và đưa những giá trị truyền thống đến gần hơn với thế hệ trẻ.',
    coverImageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    ],
    color: '#C0392B',
    artisanStory: 'Người dân Quảng Phú Cầu đã gắn bó với nghề làm hương suốt hàng thế kỷ, biến những que tre bình thường thành những nén hương mang theo tâm tư, lòng thành kính của người Việt.',
    artisanQuote: 'Mỗi nén hương chúng tôi làm ra không chỉ là sản phẩm — đó là sợi dây vô hình nối giữa người sống và người đã khuất, giữa hiện tại và cội nguồn.',
    facts: [
      { label: 'Lịch sử', value: 'Hơn 100 năm' },
      { label: 'Vị trí', value: 'Ứng Hòa, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tre, vầu + Bột hương' },
      { label: 'Đặc trưng', value: 'Hương đỏ phơi nắng' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý tre (vầu)',
        description: 'Nguyên liệu chính để làm tăm hương là tre hoặc vầu già. Sau khi được tuyển chọn kỹ lưỡng, tre được chẻ nhỏ, vót thành những que tăm đều nhau để làm chân hương.',
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2', order: 2,
        title: 'Nhuộm chân hương',
        description: 'Tăm hương sau khi vót sẽ được nhuộm màu đỏ hoặc hồng rồi đem phơi khô. Đây là công đoạn tạo nên sắc đỏ đặc trưng của làng Hương Quảng Phú Cầu.',
        imageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3', order: 3,
        title: 'Phơi khô',
        description: 'Những bó chân hương được xòe tròn như những bông hoa lớn và phơi dưới nắng để màu nhuộm khô hoàn toàn, đồng thời tạo nên khung cảnh đặc sắc của làng nghề.',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4', order: 4,
        title: 'Se hương',
        description: 'Người thợ phủ hỗn hợp bột hương lên thân tăm bằng phương pháp thủ công hoặc máy móc hỗ trợ để tạo thành nén hương hoàn chỉnh.',
        imageUrl: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5', order: 5,
        title: 'Hoàn thiện và đóng gói',
        description: 'Sau khi se hương, sản phẩm tiếp tục được phơi khô, phân loại theo kích cỡ và hương liệu, rồi đóng gói trước khi đưa ra thị trường.',
        imageUrl: 'https://images.unsplash.com/photo-1530018352490-c6eef07fd7e0?auto=format&fit=crop&w=800&q=80',
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
      'Nằm tại khu vực Hà Đông, Hà Nội, làng lụa Vạn Phúc từ lâu đã được xem là một trong những cái nôi quan trọng nhất của nghề dệt lụa truyền thống Việt Nam. Điều khiến Vạn Phúc đặc biệt không chỉ nằm ở sản phẩm lụa mềm, nhẹ, có độ óng tự nhiên, mà còn ở "không khí nghề" bao trùm cả làng. Dạo bước trong làng, bạn dễ dàng bắt gặp hình ảnh khung cửi đặt ngay trong nhà, tiếng thoi đưa đều đặn vang lên từ sáng sớm.\n\nLàng lụa Vạn Phúc xưa kia có tên Vạn Bảo, do kị húy nhà Nguyễn nên đã đổi thành Vạn Phúc. Theo các tài liệu và truyền thuyết địa phương, nghề dệt lụa ở Vạn Phúc có lịch sử hơn 1.000 năm, gắn với tên tuổi bà A Lã Thị Nương — người được xem là tổ nghề dệt lụa.\n\nBà được cho là đã truyền dạy kỹ thuật trồng dâu, nuôi tằm, ươm tơ và dệt lụa cho người dân trong vùng, đặt nền móng cho nghề lụa phát triển bền vững qua nhiều thế hệ. Nhờ đó, Vạn Phúc sớm trở thành một trung tâm dệt lụa lớn, cung cấp sản phẩm cho cả khu vực kinh thành Thăng Long xưa.\n\nLụa Vạn Phúc không chỉ được sử dụng trong nước mà còn từng xuất hiện ở nhiều thị trường quốc tế. Hoa văn trên lụa rất đa dạng, trang trí đối xứng, đường nét không rườm rà mà luôn tạo cảm giác phóng thoáng, dứt khoát.',
    coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1612462780247-ff52c6d93d8d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80',
    ],
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
        title: 'Nuôi tằm',
        description: 'Tằm được nuôi bằng lá dâu tươi. Trong suốt vòng đời ngắn ngủi, tằm ăn liên tục và phát triển nhanh, tạo ra kén tơ. Chất lượng lá dâu và điều kiện nuôi quyết định trực tiếp đến độ mịn và bền của sợi lụa sau này.',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2', order: 2,
        title: 'Ươm tơ từ kén tằm',
        description: 'Kén tằm sau khi thu hoạch được xử lý bằng nước nóng để tách sợi tơ. Đây là công đoạn đòi hỏi sự khéo léo để giữ sợi tơ không bị đứt hoặc rối.',
        details: ['Kéo sợi tơ từ kén', 'Gom nhiều sợi nhỏ thành một sợi lớn', 'Làm khô và se sợi'],
        imageUrl: 'https://images.unsplash.com/photo-1612462780247-ff52c6d93d8d?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3', order: 3,
        title: 'Dệt lụa trên khung cửi',
        description: 'Sợi tơ sau khi xử lý được đưa lên khung cửi. Tiếng thoi đưa trên khung cửi chính là "âm thanh đặc trưng" của làng nghề.',
        details: ['Dàn sợi dọc và sợi ngang', 'Dệt thủ công hoặc bán thủ công', 'Điều chỉnh độ căng để tạo bề mặt vải đều và mịn'],
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4', order: 4,
        title: 'Nhuộm và hoàn thiện',
        description: 'Mỗi tấm lụa đạt chuẩn phải có độ mềm, độ rũ và độ óng tự nhiên đặc trưng của Vạn Phúc.',
        details: ['Nhuộm màu bằng phương pháp truyền thống hoặc hiện đại', 'Giặt và xử lý bề mặt để tạo độ bóng', 'Kiểm tra chất lượng trước khi xuất xưởng'],
        imageUrl: 'https://images.unsplash.com/photo-1510106137213-d9f12be1e9c3?auto=format&fit=crop&w=800&q=80',
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
      'Nằm tại xã Chàng Sơn, làng nghề quạt Chàng Sơn từ lâu đã được biết đến như một trong những cái nôi của nghề thủ công truyền thống tiêu biểu vùng xứ Đoài. Không chỉ đơn thuần là nơi sản xuất quạt giấy, quạt lụa, nơi đây còn là không gian lưu giữ tinh hoa lao động thủ công, nơi mỗi chiếc quạt mang trong mình dấu ấn của sự tỉ mỉ, khéo léo và bền bỉ qua nhiều thế hệ.\n\nNghề làm quạt ở Chàng Sơn (trước đây có tên là Nủa Chàng) đã có lịch sử từ rất lâu đời, các tư liệu lịch sử ghi nhận nghề đã hình thành và phát triển từ khoảng thế kỷ XVII đến XIX.\n\nNgay từ thế kỷ XIX, quạt Chàng Sơn đã không chỉ là vật dụng làm mát thông thường mà còn là vật phẩm sang trọng. Nó nổi tiếng đến mức từng được người Pháp mang sang Paris để trưng bày trong các triển lãm quốc tế, khẳng định đẳng cấp của thủ công mỹ nghệ Việt.\n\nThời kỳ bao cấp, làng Chàng Sơn trở thành một "công xưởng" lớn cung cấp quạt giấy cho cả nước theo cơ chế tập trung, giúp nghề quạt được duy trì và phổ biến rộng rãi. Trong nhịp sống hiện đại, Chàng Sơn vẫn giữ được "hơi thở" truyền thống, đồng thời từng bước thích ứng với thị trường.',
    coverImageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
    ],
    color: '#2E6B8A',
    artisanStory: 'Người thợ Chàng Sơn đã đưa những chiếc quạt đơn giản trở thành tác phẩm nghệ thuật được trưng bày ở Paris — bằng chính đôi tay khéo léo và tình yêu với nghề truyền thống.',
    artisanQuote: 'Một chiếc quạt của Chàng Sơn không chỉ làm mát thân thể mà còn làm mát cả tâm hồn — bởi trong đó có cả trăm năm tinh hoa của người xứ Đoài.',
    facts: [
      { label: 'Lịch sử', value: 'Từ thế kỷ XVII' },
      { label: 'Vị trí', value: 'Thạch Thất, Hà Nội' },
      { label: 'Nguyên liệu', value: 'Tre + Giấy dó / Lụa' },
      { label: 'Đặc trưng', value: 'Triển lãm Paris TK XIX' },
    ],
    stages: [
      {
        id: '1', order: 1,
        title: 'Chọn và xử lý tre',
        description: 'Tre được chọn phải già, thẳng và dẻo. Khung quạt là phần quyết định độ bền và độ cân đối của sản phẩm.',
        details: ['Chẻ thành từng nan nhỏ', 'Vót mỏng và mài nhẵn để không gây xước tay', 'Uốn tạo hình khung quạt theo kích thước chuẩn'],
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2', order: 2,
        title: 'Làm giấy quạt',
        description: 'Giấy dùng làm quạt thường là giấy dó hoặc giấy chuyên dụng. Ở một số sản phẩm cao cấp, giấy còn được vẽ tay hoặc in tranh dân gian.',
        details: ['Xử lý để có độ dai và nhẹ', 'Có thể nhuộm màu hoặc in họa tiết', 'Phơi khô tự nhiên để giữ độ bền'],
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3', order: 3,
        title: 'Dán và định hình quạt',
        description: 'Đây là công đoạn đòi hỏi sự khéo léo cao. Chỉ cần sai lệch nhỏ, quạt có thể bị nhăn hoặc mất dáng.',
        details: ['Dán giấy lên khung nan tre', 'Canh chỉnh sao cho hai mặt cân đối', 'Ép và cố định để quạt không bị cong hoặc lệch'],
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4', order: 4,
        title: 'Trang trí và hoàn thiện',
        description: 'Sau đó quạt được kiểm tra độ mở–gập, độ bền và tính thẩm mỹ trước khi đưa ra thị trường.',
        details: ['Vẽ tranh thủ công hoặc viết thư pháp', 'Trang trí họa tiết truyền thống hoặc hiện đại', 'Kiểm tra độ mở–gập và độ bền'],
        imageUrl: 'https://images.unsplash.com/photo-1510106137213-d9f12be1e9c3?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export function getVillage(slug: string): VillageStatic | undefined {
  return VILLAGES.find((v) => v.slug === slug);
}
