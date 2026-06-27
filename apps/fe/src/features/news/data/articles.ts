export interface Article {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  content: {
    lead: string;
    sections: { heading: string; body: string }[];
  };
}

export const articles: Article[] = [
  {
    slug: 'bat-trang-700-nam-hon-dat-nung',
    tag: 'Làng nghề',
    date: '15 tháng 5, 2025',
    title: 'Bát Tràng: 700 năm hồn đất nung trên đôi bàn tay nghệ nhân',
    excerpt:
      'Làng gốm Bát Tràng không chỉ là nơi sản xuất gốm sứ — đó là nơi ký ức của cả một dòng tộc được in lên từng mảnh đất sét.',
    image: '/image/lang-gom.jpg',
    content: {
      lead: 'Nằm bên bờ sông Hồng, cách trung tâm Hà Nội chừng 15 km về phía đông nam, làng gốm Bát Tràng đã tồn tại và phát triển suốt hơn 700 năm. Nơi đây không chỉ là làng nghề — đó là bảo tàng sống nơi mỗi lò nung, mỗi vòng bàn xoay đều chứa đựng câu chuyện của nhiều thế hệ nghệ nhân.',
      sections: [
        {
          heading: 'Nguồn gốc và lịch sử',
          body: 'Theo sử sách, Bát Tràng hình thành từ thời Lý — khi các dòng họ gốm nổi tiếng từ vùng Thanh Hóa di cư ra Bắc, định cư trên vùng đất sét trắng màu mỡ ven sông Hồng. Từ thế kỷ 15, gốm Bát Tràng đã được xuất khẩu sang Nhật Bản, Trung Quốc và các nước Đông Nam Á, trở thành đại sứ thương mại của nước Đại Việt.',
        },
        {
          heading: 'Quy trình thủ công được truyền từ đời sang đời',
          body: 'Điều làm nên hồn cốt của gốm Bát Tràng chính là kỹ thuật xoay vuốt tay trên bàn xoay truyền thống. Đất sét sau khi được lọc kỹ, ủ qua đêm sẽ được nghệ nhân tạo hình bằng đôi tay trần — không có khuôn, không có máy móc. Mỗi chiếc bình, mỗi bộ chén đều là một tác phẩm duy nhất trên thế giới.',
        },
        {
          heading: 'Tiểu cảnh Bát Tràng của Nghề Xưa Nét Mới',
          body: 'Hộp diorama Bát Tràng của chúng tôi tái hiện không gian xưởng gốm với nghệ nhân đang xoay vuốt đất sét bên cạnh lò nung gạch bầu cổ kính. Sử dụng vật liệu Mica acrylic, gỗ MDF và đất sét tự nhiên, mô hình kết hợp công nghệ AR để người xem có thể "bước vào" không gian làng gốm khi quét mã QR.',
        },
      ],
    },
  },
  {
    slug: 'ar-va-di-san-cong-nghe-thoi-hon-tieu-canh-3d',
    tag: 'Công nghệ',
    date: '8 tháng 5, 2025',
    title: 'AR và di sản: Khi công nghệ thổi hồn vào tiểu cảnh 3D',
    excerpt:
      'Ứng dụng AR cho phép người dùng nhìn thấy nghệ nhân đang làm việc ngay trên mô hình thu nhỏ trong lòng bàn tay.',
    image: '/image/anh-cau-chuyen-lang-nghe.jpg',
    content: {
      lead: 'Augmented Reality (AR) — công nghệ thực tế tăng cường — đang mở ra một chương mới cho việc bảo tồn và lan tỏa di sản văn hóa. Tại Nghề Xưa Nét Mới, chúng tôi tin rằng một hộp tiểu cảnh không chỉ là vật trang trí — đó là cánh cổng dẫn vào một thế giới khác.',
      sections: [
        {
          heading: 'AR hoạt động như thế nào trên sản phẩm của chúng tôi?',
          body: 'Mỗi hộp diorama đều được gắn kèm mã QR. Khi quét bằng điện thoại, ứng dụng sẽ nhận diện mô hình và phủ lên đó một lớp animation 3D — nghệ nhân xoay gốm, khung dệt lụa đang chuyển động, hay những bó hương đỏ rực phơi dưới nắng. Công nghệ marker-based AR đảm bảo trải nghiệm ổn định ngay cả trên các thiết bị tầm trung.',
        },
        {
          heading: 'Giáo dục di sản qua công nghệ',
          body: 'Nhiều trường học tại Hà Nội đã đưa bộ sản phẩm vào chương trình giảng dạy văn hóa địa phương. Thay vì chỉ đọc sách, học sinh có thể cầm trên tay mô hình làng nghề và "quan sát" nghệ nhân làm việc theo thời gian thực. Đây là minh chứng rõ ràng nhất cho sức mạnh của công nghệ trong giáo dục di sản.',
        },
        {
          heading: 'Lộ trình phát triển',
          body: 'Trong năm 2025, chúng tôi sẽ ra mắt phiên bản AR 2.0 với khả năng tương tác hai chiều — người dùng có thể "chạm" vào các vật thể trong không gian AR, nghe tiếng lò nung, tiếng thoi đưa và lời kể của chính các nghệ nhân làng nghề.',
        },
      ],
    },
  },
  {
    slug: 'van-phuc-song-lai-nghe-det-lua-qua-diorama',
    tag: 'Cộng đồng',
    date: '1 tháng 5, 2025',
    title: 'Vạn Phúc: Sống lại nghề dệt lụa qua từng ô kính diorama',
    excerpt:
      'Mỗi hộp tiểu cảnh Vạn Phúc là một lát cắt của làng nghề dệt lụa nghìn năm — nơi đường tơ óng ả hòa quyện với ký ức thời gian.',
    image: '/image/lang-lua.jpg',
    content: {
      lead: 'Làng lụa Vạn Phúc, Hà Đông đã dệt nên lịch sử hơn một nghìn năm. Những sấp lụa óng ả từng khoác lên mình vua chúa triều Nguyễn nay được tái hiện trong từng ô kính diorama thu nhỏ — nơi thời gian dường như đứng lại.',
      sections: [
        {
          heading: 'Nghề dệt lụa và câu chuyện tơ tằm',
          body: 'Lụa Vạn Phúc nổi tiếng với hoa văn truyền thống như "song hạc", "thọ đỉnh", "vân chữ thọ". Toàn bộ quy trình từ nuôi tằm, ươm tơ đến dệt lụa đều được thực hiện thủ công bởi những nghệ nhân có thâm niên hàng chục năm. Mỗi mét lụa đòi hỏi hàng nghìn đường thoi tỉ mỉ.',
        },
        {
          heading: 'Thách thức của làng nghề hiện đại',
          body: 'Cũng như nhiều làng nghề truyền thống khác, Vạn Phúc đang đối mặt với nguy cơ mai một khi lớp nghệ nhân trẻ ngày càng ít mặn mà với nghề dệt. Chính vì lẽ đó, việc ghi chép và tái hiện quy trình dệt lụa qua hộp diorama trở thành sứ mệnh bảo tồn quan trọng của chúng tôi.',
        },
        {
          heading: 'Diorama Vạn Phúc — câu chuyện trong lớp kính',
          body: 'Hộp tiểu cảnh Vạn Phúc sử dụng kỹ thuật nhiều lớp để tái hiện chiều sâu của xưởng dệt: lớp ngoài là khung cửa gỗ cổ, lớp giữa là khung cửi tre đang hoạt động với sợi tơ thực sự, lớp trong là những sấp lụa màu sắc rực rỡ xếp ngay ngắn. Khi kết hợp với AR, người xem có thể thấy khung cửi chuyển động và nghe âm thanh thoi đưa đặc trưng.',
        },
      ],
    },
  },
];
