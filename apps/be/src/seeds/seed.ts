import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

// ── connection ───────────────────────────────────────────────────────────────
const MONGODB_URI = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017/ocnv';

// ── product image folders ─────────────────────────────────────────────────────
const PRODUCT_IMAGE_ROOT = path.join(process.cwd(), '..', 'fe', 'public', 'image', 'SANPHAM');

function listProductImages(villageFolder: string, productFolder: string): string[] {
  const dir = path.join(PRODUCT_IMAGE_ROOT, villageFolder, productFolder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/image/SANPHAM/${encodeURIComponent(villageFolder)}/${encodeURIComponent(productFolder)}/${encodeURIComponent(f)}`);
}

// ── inline schemas (avoid importing NestJS DI) ───────────────────────────────
const bilingualSchema = { vi: String, en: String };

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    phone: String,
    avatarUrl: String,
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    status: { type: String, enum: ['active', 'locked', 'unverified'], default: 'unverified' },
    emailVerifyToken: String,
    emailVerifyExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    refreshToken: String,
  },
  { timestamps: true, collection: 'users' },
);

const VillageSchema = new mongoose.Schema(
  {
    name: bilingualSchema,
    slug: { type: String, unique: true },
    tagline: bilingualSchema,
    shortDescription: bilingualSchema,
    fullHistory: bilingualSchema,
    coverImageUrl: String,
    introVideoUrl: String,
    artisanImageUrl: String,
    artisanStory: bilingualSchema,
    artisanQuote: bilingualSchema,
  },
  { timestamps: true, collection: 'villages' },
);

const VillageStageSchema = new mongoose.Schema(
  {
    villageId: { type: Types.ObjectId, ref: 'Village' },
    order: Number,
    title: bilingualSchema,
    description: bilingualSchema,
    imageUrls: [String],
    videoUrl: String,
  },
  { timestamps: true, collection: 'villageStages' },
);

const ProductSchema = new mongoose.Schema(
  {
    name: bilingualSchema,
    description: bilingualSchema,
    price: Number,
    stock: Number,
    villageId: { type: Types.ObjectId, ref: 'Village' },
    images: [{ url: String, isMain: Boolean, order: Number }],
    isVisible: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'products' },
);

const HotspotSchema = new mongoose.Schema(
  {
    productId: { type: Types.ObjectId, ref: 'Product' },
    slotName: String,
    position: { x: Number, y: Number, z: Number },
    normal: { x: Number, y: Number, z: Number },
    title: bilingualSchema,
    content: bilingualSchema,
    imageUrl: String,
  },
  { timestamps: true, collection: 'hotspots' },
);

const OrderSchema = new mongoose.Schema(
  {
    orderCode: { type: String, unique: true },
    userId: { type: Types.ObjectId, ref: 'User' },
    shippingAddress: {
      fullName: String,
      phone: String,
      province: String,
      district: String,
      ward: String,
      street: String,
    },
    items: [
      {
        productId: { type: Types.ObjectId, ref: 'Product' },
        productName: String,
        productImageUrl: String,
        quantity: Number,
        unitPrice: Number,
        isReviewed: Boolean,
      },
    ],
    subtotal: Number,
    shippingFee: Number,
    total: Number,
    payment: {
      method: String,
      status: String,
    },
    status: { type: String, default: 'pending' },
    statusHistory: [{ status: String, updatedAt: Date, note: String }],
    customerNote: String,
    adminNote: String,
  },
  { timestamps: true, collection: 'orders' },
);

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    guestName: String,
    productId: { type: Types.ObjectId, ref: 'Product' },
    orderId: { type: Types.ObjectId, ref: 'Order' },
    rating: Number,
    content: String,
    imageUrls: [String],
    videoUrl: String,
    status: { type: String, default: 'approved' },
  },
  { timestamps: true, collection: 'reviews' },
);

const StaticContentSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    content: bilingualSchema,
  },
  { timestamps: true, collection: 'staticContents' },
);

// ── models ───────────────────────────────────────────────────────────────────
const User = mongoose.model('User', UserSchema);
const Village = mongoose.model('Village', VillageSchema);
const VillageStage = mongoose.model('VillageStage', VillageStageSchema);
const Product = mongoose.model('Product', ProductSchema);
const Hotspot = mongoose.model('Hotspot', HotspotSchema);
const Order = mongoose.model('Order', OrderSchema);
const Review = mongoose.model('Review', ReviewSchema);
const StaticContent = mongoose.model('StaticContent', StaticContentSchema);

// ── helpers ──────────────────────────────────────────────────────────────────
async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

function generateOrderCode(): string {
  return `OCNV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// ── seed data ────────────────────────────────────────────────────────────────
const VILLAGE_DATA = [
  {
    slug: 'bat-trang',
    name: { vi: 'Làng gốm Bát Tràng', en: 'Bat Trang Pottery Village' },
    tagline: { vi: 'Tinh hoa gốm sứ nghìn năm', en: 'A thousand years of ceramic artistry' },
    shortDescription: {
      vi: 'Làng nghề gốm sứ truyền thống nổi tiếng nhất Việt Nam',
      en: 'The most famous traditional ceramic craft village in Vietnam',
    },
    fullHistory: {
      vi: 'Bát Tràng có lịch sử hơn 500 năm làm gốm sứ...',
      en: 'Bat Trang has a history of over 500 years of ceramics...',
    },
    artisanStory: { vi: 'Nghệ nhân gốm Bát Tràng', en: 'Bat Trang ceramic artisan' },
    artisanQuote: { vi: 'Gốm là tâm hồn của đất', en: 'Ceramics is the soul of the earth' },
  },
  {
    slug: 'van-phuc',
    name: { vi: 'Làng lụa Vạn Phúc', en: 'Van Phuc Silk Village' },
    tagline: { vi: 'Lụa Hà Đông vang danh', en: 'The renowned Ha Dong silk' },
    shortDescription: {
      vi: 'Làng nghề dệt lụa truyền thống nổi tiếng của Hà Nội',
      en: 'Famous traditional silk weaving village of Hanoi',
    },
    fullHistory: {
      vi: 'Vạn Phúc có nghề dệt lụa từ hơn 1000 năm trước...',
      en: 'Van Phuc has been weaving silk for over 1000 years...',
    },
    artisanStory: { vi: 'Nghệ nhân dệt lụa Vạn Phúc', en: 'Van Phuc silk weaving artisan' },
    artisanQuote: { vi: 'Mỗi sợi tơ là một câu chuyện', en: 'Every silk thread tells a story' },
  },
  {
    slug: 'non-chuong',
    name: { vi: 'Làng nón Chuông', en: 'Chuong Conical Hat Village' },
    tagline: { vi: 'Nón lá truyền thống Việt Nam', en: 'Traditional Vietnamese conical hats' },
    shortDescription: {
      vi: 'Làng nổi tiếng với nghề làm nón lá truyền thống',
      en: 'Village famous for traditional conical hat making',
    },
    fullHistory: {
      vi: 'Làng Chuông có truyền thống làm nón lá hơn 300 năm...',
      en: 'Chuong village has a 300-year tradition of making conical hats...',
    },
    artisanStory: { vi: 'Nghệ nhân làm nón làng Chuông', en: 'Chuong conical hat artisan' },
    artisanQuote: {
      vi: 'Nón lá che mưa, che nắng và che cả nỗi nhớ quê hương',
      en: 'The conical hat shields from rain, sun, and homesickness',
    },
  },
  {
    slug: 'chang-son',
    name: { vi: 'Làng quạt Chàng Sơn', en: 'Chang Son Fan Village' },
    tagline: { vi: 'Tinh hoa thủ công xứ Đoài', en: 'Handcraft artistry of Xu Doai' },
    shortDescription: {
      vi: 'Làng nghề làm quạt giấy, quạt lụa truyền thống nổi tiếng của Hà Nội',
      en: 'Famous traditional paper and silk fan making craft village of Hanoi',
    },
    fullHistory: {
      vi: 'Chàng Sơn có nghề làm quạt truyền thống từ thế kỷ XVII đến XIX...',
      en: 'Chang Son has a tradition of fan making dating from the 17th to 19th century...',
    },
    artisanStory: { vi: 'Nghệ nhân làm quạt Chàng Sơn', en: 'Chang Son fan making artisan' },
    artisanQuote: { vi: 'Mỗi nếp quạt là một nét tài hoa', en: 'Every fold of the fan is a mark of craftsmanship' },
  },
  {
    slug: 'quang-phu-cau',
    name: { vi: 'Làng hương Quảng Phú Cầu', en: 'Quang Phu Cau Incense Village' },
    tagline: { vi: 'Hương thơm từ đất Việt', en: 'Fragrance from Vietnamese soil' },
    shortDescription: {
      vi: 'Làng nghề làm hương nổi tiếng với những bó hương đầy màu sắc',
      en: 'Incense-making village famous for its colorful incense bundles',
    },
    fullHistory: {
      vi: 'Quảng Phú Cầu có nghề làm hương truyền thống hơn 100 năm...',
      en: 'Quang Phu Cau has a 100-year tradition of incense making...',
    },
    artisanStory: { vi: 'Nghệ nhân làm hương Quảng Phú Cầu', en: 'Quang Phu Cau incense artisan' },
    artisanQuote: { vi: 'Mỗi nén hương là một lời cầu nguyện', en: 'Each incense stick is a prayer' },
  },
];

const STAGE_TITLES = [
  { vi: 'Nguyên liệu', en: 'Raw Materials' },
  { vi: 'Chế tác', en: 'Crafting' },
  { vi: 'Xử lý', en: 'Processing' },
  { vi: 'Thành phẩm', en: 'Finished Product' },
];

// ── main ─────────────────────────────────────────────────────────────────────
async function seed(): Promise<void> {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected. Starting seed...');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Village.deleteMany({}),
    VillageStage.deleteMany({}),
    Product.deleteMany({}),
    Hotspot.deleteMany({}),
    Order.deleteMany({}),
    Review.deleteMany({}),
    StaticContent.deleteMany({}),
  ]);

  // ── Users ─────────────────────────────────────────────────────────────────
  const adminPassword = await hashPassword('Admin@123456');
  const customerPassword = await hashPassword('Customer@123456');

  const admin = await User.create({
    fullName: 'Admin OCNV',
    email: 'admin@ocnv.vn',
    password: adminPassword,
    role: 'admin',
    status: 'active',
  });

  const customers = await User.insertMany([
    { fullName: 'Nguyễn Thị Hà', email: 'customer1@test.com', password: customerPassword, role: 'customer', status: 'active' },
    { fullName: 'Trần Văn Hùng', email: 'customer2@test.com', password: customerPassword, role: 'customer', status: 'active' },
    { fullName: 'Lê Thị Phương', email: 'customer3@test.com', password: customerPassword, role: 'customer', status: 'active' },
  ]);

  console.log(`Created ${1 + customers.length} users`);

  // ── Villages ──────────────────────────────────────────────────────────────
  const villages = await Village.insertMany(VILLAGE_DATA);
  console.log(`Created ${villages.length} villages`);

  // ── Village Stages ────────────────────────────────────────────────────────
  const stageRecords: unknown[] = [];
  for (const village of villages) {
    for (let i = 0; i < STAGE_TITLES.length; i++) {
      stageRecords.push({
        villageId: village._id,
        order: i + 1,
        title: STAGE_TITLES[i],
        description: {
          vi: `Mô tả giai đoạn ${i + 1} của ${(village.name as { vi: string }).vi}`,
          en: `Description of stage ${i + 1} for ${(village.name as { en: string }).en}`,
        },
        imageUrls: [],
      });
    }
  }
  await VillageStage.insertMany(stageRecords);
  console.log(`Created ${stageRecords.length} village stages`);

  // ── Products (mô hình 3D + thẻ nam châm + tranh ghép per village) ─────────
  const MAGNET_DESCRIPTION_VI =
    'Thẻ nam châm làng nghề là món quà lưu niệm nhỏ gọn, tái hiện hình ảnh đặc trưng của các làng nghề truyền thống Việt Nam như Nón Chuông, Gốm Bát Tràng, Lụa Vạn Phúc, Hương Quảng Phú Cầu và Quạt Chàng Sơn. Mỗi chiếc thẻ không chỉ mang giá trị trang trí mà còn kể một câu chuyện văn hóa thông qua mã QR tích hợp, cho phép người dùng trải nghiệm công nghệ AR và khám phá lịch sử, quy trình chế tác cũng như những nét đặc sắc của từng làng nghề.\n\n' +
    'Thông số sản phẩm\n' +
    '- Tên sản phẩm: Thẻ nam châm Làng nghề truyền thống\n' +
    '- Kích thước: 6,5cm x 9cm\n' +
    '- Độ dày: Khoảng 5 mm\n' +
    '- Chất liệu: Ảnh nam châm 5 lớp - lớp bóng kính, lớp ảnh in màu cao cấp, lớp kẽm, lớp bìa lót và lớp nam châm\n' +
    '- Khối lượng: ~20 g\n' +
    '- Công nghệ: In UV sắc nét, cắt laser chính xác\n' +
    '- Độ tuổi phù hợp: Từ 4 tuổi trở lên\n' +
    '- Xuất xứ: Việt Nam\n' +
    '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
    'Bộ sản phẩm bao gồm\n' +
    '- 01 thẻ nam châm làng nghề.\n' +
    '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
    '- 01 bao bì mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n\n' +
    'Hướng dẫn bảo quản\n' +
    '- Lau sạch bằng khăn mềm, khô khi cần vệ sinh.\n' +
    '- Tránh để sản phẩm tiếp xúc lâu với nước hoặc môi trường có độ ẩm cao.\n' +
    '- Hạn chế va đập mạnh để bảo vệ lớp in và bề mặt sản phẩm.\n' +
    '- Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp để giữ màu sắc bền đẹp.';
  const MAGNET_DESCRIPTION_EN =
    'The craft village fridge magnet is a compact souvenir depicting the distinctive imagery of Vietnam\'s traditional craft villages — Chuong, Bat Trang, Van Phuc, Quang Phu Cau, and Chang Son. Each magnet carries not only decorative value but also a cultural story through its integrated QR code, letting users experience AR technology and explore the history, craft process, and unique character of each village.\n\n' +
    'Product specifications\n' +
    '- Product name: Traditional Craft Village Fridge Magnet\n' +
    '- Size: 6.5cm x 9cm\n' +
    '- Thickness: About 5 mm\n' +
    '- Material: 5-layer magnetic photo — gloss laminate, premium color print, zinc layer, backing board, and magnet layer\n' +
    '- Weight: ~20 g\n' +
    '- Technology: Sharp UV printing, precision laser cutting\n' +
    '- Recommended age: 4 years and up\n' +
    '- Origin: Vietnam\n' +
    '- Brand: Nghe Xua Net Moi\n\n' +
    'Package includes\n' +
    '- 01 craft village fridge magnet.\n' +
    '- 01 instruction card with QR code.\n' +
    '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n\n' +
    'Care instructions\n' +
    '- Wipe clean with a soft, dry cloth when needed.\n' +
    '- Avoid prolonged contact with water or high humidity.\n' +
    '- Avoid strong impacts to protect the print layer and surface.\n' +
    '- Store in a dry place, away from direct sunlight, to keep colors vivid.';
  const PUZZLE_DESCRIPTION_VI =
    'Tranh ghép Làng nghề – Bộ sưu tập Nghề Xưa Nét Mới là sản phẩm kết hợp giữa trò chơi ghép tranh và trải nghiệm khám phá văn hóa, tái hiện hình ảnh đặc trưng của các làng nghề truyền thống Việt Nam như Nón Chuông, Gốm Bát Tràng, Lụa Vạn Phúc, Hương Quảng Phú Cầu và Quạt Chàng Sơn. Trong quá trình ghép từng mảnh tranh, người chơi sẽ dần hoàn thiện bức tranh về làng nghề, đồng thời khám phá những nét đẹp văn hóa ẩn sau mỗi chi tiết. Sau khi hoàn thành, người dùng có thể quét mã QR để trải nghiệm nội dung AR, tìm hiểu lịch sử hình thành, quy trình chế tác và những câu chuyện văn hóa gắn với từng làng nghề ngay trên điện thoại.\n\n' +
    'Thông số sản phẩm\n' +
    '- Tên sản phẩm: Tranh ghép Làng nghề truyền thống\n' +
    '- Kích thước hoàn thiện: 18 × 25 cm\n' +
    '- Số lượng mảnh ghép: 80 mảnh\n' +
    '- Chất liệu: Bìa carton cứng cao cấp (chipboard), bề mặt cán bóng giúp hình ảnh sắc nét và màu sắc nổi bật.\n' +
    '- Khối lượng: ~200 g\n' +
    '- Công nghệ: In offset chất lượng cao, cắt bế chính xác\n' +
    '- Độ tuổi phù hợp: Từ 5 tuổi trở lên\n' +
    '- Xuất xứ: Việt Nam\n' +
    '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
    'Bộ sản phẩm bao gồm\n' +
    '- 01 bộ tranh ghép 80 mảnh.\n' +
    '- 01 khung trưng bày tranh\n' +
    '- 01 hình mẫu tham khảo\n' +
    '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
    '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n\n' +
    'Hướng dẫn bảo quản\n' +
    '- Bảo quản nơi khô ráo, tránh nước và độ ẩm cao.\n' +
    '- Tránh bẻ cong hoặc làm gấp các mảnh ghép.\n' +
    '- Sau khi hoàn thành, có thể đặt tranh vào khung để cố định các mảnh ghép và thuận tiện cho việc trưng bày.\n' +
    '- Tránh ánh nắng trực tiếp để giữ màu sắc bền đẹp theo thời gian.';
  const PUZZLE_DESCRIPTION_EN =
    'The Craft Village Puzzle — Nghề Xưa Nét Mới Collection blends jigsaw play with cultural discovery, recreating the distinctive imagery of Vietnam\'s traditional craft villages — Chuong, Bat Trang, Van Phuc, Quang Phu Cau, and Chang Son. As players assemble each piece, the village picture gradually comes together, revealing the cultural beauty hidden within every detail. Once complete, users can scan the QR code to experience AR content and learn about the history, craft process, and cultural stories behind each village right on their phone.\n\n' +
    'Product specifications\n' +
    '- Product name: Traditional Craft Village Jigsaw Puzzle\n' +
    '- Finished size: 18 × 25 cm\n' +
    '- Number of pieces: 80 pieces\n' +
    '- Material: Premium hard chipboard with a glossy laminated surface for sharp, vivid imagery.\n' +
    '- Weight: ~200 g\n' +
    '- Technology: High-quality offset printing, precision die-cutting\n' +
    '- Recommended age: 5 years and up\n' +
    '- Origin: Vietnam\n' +
    '- Brand: Nghe Xua Net Moi\n\n' +
    'Package includes\n' +
    '- 01 set of 80-piece puzzle.\n' +
    '- 01 display frame\n' +
    '- 01 reference image\n' +
    '- 01 instruction card with QR code.\n' +
    '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n\n' +
    'Care instructions\n' +
    '- Store in a dry place, away from water and high humidity.\n' +
    '- Avoid bending or folding the puzzle pieces.\n' +
    '- Once completed, the puzzle can be placed in the frame to keep the pieces secure and ready for display.\n' +
    '- Avoid direct sunlight to keep the colors vivid over time.';

  const VILLAGE_IMAGE_FOLDER: Record<string, string> = {
    'bat-trang': 'LÀNG GỐM',
    'non-chuong': 'LÀNG NÓN',
    'quang-phu-cau': 'LÀNG HƯƠNG',
    'van-phuc': 'LÀNG LỤA',
    'chang-son': 'LÀNG QUẠT',
  };
  const PRODUCT_TYPE_IMAGE_FOLDER: Record<string, (villageFolder: string) => string> = {
    model: (v) => `MÔ HÌNH ${v.replace('LÀNG ', '')}`,
    magnet: (v) => `NAM CHÂM ${v.replace('LÀNG ', '')}`,
    puzzle: (v) => `XẾP HÌNH ${v.replace('LÀNG ', '')}`,
  };

  type ProductInfo = { name: { vi: string; en: string }; description: { vi: string; en: string }; price: number };
  const PRODUCT_DATA: Record<string, { model: ProductInfo; magnet: ProductInfo; puzzle: ProductInfo }> = {
    'bat-trang': {
      model: {
        name: { vi: 'Mô hình 3D Làng Gốm Bát Tràng', en: '3D Model — Bat Trang Pottery Village' },
        description: {
          vi: 'Mô hình 3D Làng Gốm Bát Tràng tái hiện không gian đặc trưng của làng nghề gốm truyền thống với hơn 700 năm lịch sử. Từ khu vực nặn gốm, bàn xoay, lò nung đến không gian trưng bày sản phẩm đều được thu nhỏ tỉ mỉ, mang đến góc nhìn chân thực về quy trình tạo nên những tác phẩm gốm thủ công nổi tiếng của Việt Nam. Sản phẩm tích hợp mã QR và công nghệ AR, giúp người dùng khám phá lịch sử, kỹ thuật chế tác và giá trị văn hóa của làng gốm thông qua trải nghiệm tương tác hiện đại.\n\n' +
            'Thông số sản phẩm\n' +
            '- Tên sản phẩm: Mô hình 3D Làng Gốm Bát Tràng\n' +
            '- Chất liệu: Nhựa PLA in 3D, mica trong, sơn gốc nước thân thiện với môi trường\n' +
            '- Kích thước: 21 × 21 × 17 cm\n' +
            '- Khối lượng: ~680 g\n' +
            '- Màu sắc: Tông màu đất nung, gỗ tự nhiên và men gốm đặc trưng\n' +
            '- Công nghệ: In 3D kết hợp lắp ráp, hoàn thiện thủ công và tích hợp trải nghiệm QR/AR\n' +
            '- Độ tuổi phù hợp: Từ 12 tuổi trở lên\n' +
            '- Xuất xứ: Việt Nam\n' +
            '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
            'Bộ sản phẩm bao gồm\n' +
            '- 01 mô hình 3D Làng Gốm Bát Tràng.\n' +
            '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
            '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n' +
            '- 01 phiếu bảo hành và hướng dẫn bảo quản.\n\n' +
            'Hướng dẫn bảo quản\n' +
            '- Đặt sản phẩm ở nơi khô ráo, tránh ánh nắng trực tiếp và môi trường có độ ẩm cao.\n' +
            '- Vệ sinh bằng khăn mềm, khô; không sử dụng hóa chất tẩy rửa mạnh.\n' +
            '- Tránh va đập mạnh để bảo vệ các chi tiết của mô hình.',
          en: 'The Bat Trang Pottery Village 3D Model recreates the distinctive space of a traditional ceramic craft village with over 700 years of history. The clay-shaping area, potter\'s wheel, kiln, and display space are all meticulously miniaturized, offering an authentic view of how Vietnam\'s famous handcrafted ceramics are made. The product integrates QR code and AR technology, letting users explore the village\'s history, techniques, and cultural value through a modern interactive experience.\n\n' +
            'Product specifications\n' +
            '- Product name: 3D Model — Bat Trang Pottery Village\n' +
            '- Material: 3D-printed PLA plastic, clear acrylic, eco-friendly water-based paint\n' +
            '- Size: 21 × 21 × 17 cm\n' +
            '- Weight: ~680 g\n' +
            '- Color: Terracotta and natural wood tones with signature ceramic-glaze accents\n' +
            '- Technology: 3D printing combined with assembly, hand-finishing, and integrated QR/AR experience\n' +
            '- Recommended age: 12 years and up\n' +
            '- Origin: Vietnam\n' +
            '- Brand: Nghe Xua Net Moi\n\n' +
            'Package includes\n' +
            '- 01 Bat Trang Pottery Village 3D model.\n' +
            '- 01 instruction card with QR code.\n' +
            '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n' +
            '- 01 warranty card and care instructions.\n\n' +
            'Care instructions\n' +
            '- Place in a dry area, away from direct sunlight and high humidity.\n' +
            '- Clean with a soft, dry cloth; do not use harsh chemical cleaners.\n' +
            '- Avoid strong impacts to protect the model\'s details.',
        },
        price: 700000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Gốm Bát Tràng', en: 'Fridge Magnet — Bat Trang Pottery Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 30000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Gốm Bát Tràng', en: 'Jigsaw Puzzle — Bat Trang Pottery Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 100000,
      },
    },
    'non-chuong': {
      model: {
        name: { vi: 'Mô hình 3D Làng Nón Chuông', en: '3D Model — Chuong Conical Hat Village' },
        description: {
          vi: 'Mô hình 3D Làng Nón Chuông tái hiện không gian đặc trưng của làng nghề làm nón truyền thống hơn 300 năm tuổi tại Hà Nội. Từng chi tiết như nghệ nhân, nguyên liệu lá cọ, khung phơi và ngôi nhà cổ được thu nhỏ một cách tinh xảo, giúp người xem hình dung quy trình làm nón ngay trên mô hình. Khi quét mã QR, người dùng có thể trải nghiệm nội dung AR với hình ảnh, video và thông tin về từng công đoạn sản xuất, mang đến hành trình khám phá làng nghề trực quan ngay trên điện thoại.\n\n' +
            'Thông số sản phẩm\n' +
            '- Tên sản phẩm: Mô hình 3D Làng Nón Chuông\n' +
            '- Chất liệu: Nhựa PLA in 3D, mica trong, sơn gốc nước thân thiện với môi trường\n' +
            '- Kích thước: 21 × 21 × 17 cm\n' +
            '- Khối lượng: ~650 g\n' +
            '- Màu sắc: Tông màu gỗ tự nhiên kết hợp sắc màu đặc trưng của làng nghề nón Chuông\n' +
            '- Công nghệ: In 3D kết hợp lắp ráp, hoàn thiện thủ công và tích hợp trải nghiệm QR/AR\n' +
            '- Độ tuổi phù hợp: Từ 12 tuổi trở lên\n' +
            '- Xuất xứ: Việt Nam\n' +
            '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
            'Bộ sản phẩm bao gồm\n' +
            '- 01 mô hình 3D Làng Nón Chuông.\n' +
            '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
            '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n' +
            '- 01 phiếu bảo hành và hướng dẫn bảo quản.\n\n' +
            'Hướng dẫn bảo quản\n' +
            '- Đặt sản phẩm ở nơi khô ráo, tránh ánh nắng trực tiếp và môi trường có độ ẩm cao.\n' +
            '- Vệ sinh bằng khăn mềm, khô hoặc hơi ẩm; không sử dụng hóa chất tẩy rửa mạnh.\n' +
            '- Hạn chế va đập mạnh để bảo vệ các chi tiết của mô hình.',
          en: 'The Chuong Conical Hat Village 3D Model recreates the distinctive space of a traditional hat-making village over 300 years old in Hanoi. Details such as artisans, palm-leaf material, drying racks, and ancient houses are finely miniaturized, letting viewers visualize the hat-making process on the model itself. By scanning the QR code, users can experience AR content with images, videos, and information about each production stage, offering a vivid journey through the craft village right on their phone.\n\n' +
            'Product specifications\n' +
            '- Product name: 3D Model — Chuong Conical Hat Village\n' +
            '- Material: 3D-printed PLA plastic, clear acrylic, eco-friendly water-based paint\n' +
            '- Size: 21 × 21 × 17 cm\n' +
            '- Weight: ~650 g\n' +
            '- Color: Natural wood tones combined with the signature colors of Chuong hat village\n' +
            '- Technology: 3D printing combined with assembly, hand-finishing, and integrated QR/AR experience\n' +
            '- Recommended age: 12 years and up\n' +
            '- Origin: Vietnam\n' +
            '- Brand: Nghe Xua Net Moi\n\n' +
            'Package includes\n' +
            '- 01 Chuong Conical Hat Village 3D model.\n' +
            '- 01 instruction card with QR code.\n' +
            '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n' +
            '- 01 warranty card and care instructions.\n\n' +
            'Care instructions\n' +
            '- Place in a dry area, away from direct sunlight and high humidity.\n' +
            '- Clean with a soft, dry or slightly damp cloth; do not use harsh chemical cleaners.\n' +
            '- Avoid strong impacts to protect the model\'s details.',
        },
        price: 700000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Nón Chuông', en: 'Fridge Magnet — Chuong Conical Hat Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 30000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Nón Chuông', en: 'Jigsaw Puzzle — Chuong Conical Hat Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 100000,
      },
    },
    'quang-phu-cau': {
      model: {
        name: { vi: 'Mô hình 3D Làng Hương Quảng Phú Cầu', en: '3D Model — Quang Phu Cau Incense Village' },
        description: {
          vi: 'Mô hình 3D Làng Hương Quảng Phú Cầu tái hiện không gian đặc trưng của làng nghề làm hương truyền thống nổi tiếng với những bó tăm hương đỏ rực. Các công đoạn từ lựa chọn nguyên liệu, nhuộm chân hương, phơi hương đến bó hương thành phẩm được thể hiện sinh động, giúp người dùng hiểu rõ quy trình tạo nên những nén hương mang đậm giá trị văn hóa và tâm linh của người Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm khám phá làng nghề trực quan và tương tác ngay trên điện thoại.\n\n' +
            'Thông số sản phẩm\n' +
            '- Tên sản phẩm: Mô hình 3D Làng Hương Quảng Phú Cầu\n' +
            '- Chất liệu: Nhựa PLA in 3D, mica trong, sơn gốc nước thân thiện với môi trường\n' +
            '- Kích thước: 21 × 21 × 17 cm\n' +
            '- Khối lượng: ~670 g\n' +
            '- Màu sắc: Tông nâu gỗ tự nhiên kết hợp các điểm nhấn màu đỏ lấy cảm hứng từ những bó hương Quảng Phú Cầu\n' +
            '- Công nghệ: In 3D kết hợp lắp ráp, hoàn thiện thủ công và tích hợp trải nghiệm QR/AR\n' +
            '- Độ tuổi phù hợp: Từ 12 tuổi trở lên\n' +
            '- Xuất xứ: Việt Nam\n' +
            '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
            'Bộ sản phẩm bao gồm\n' +
            '- 01 mô hình 3D Làng Hương Quảng Phú Cầu.\n' +
            '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
            '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n' +
            '- 01 phiếu bảo hành và hướng dẫn bảo quản.\n\n' +
            'Hướng dẫn bảo quản\n' +
            '- Đặt sản phẩm ở nơi khô ráo, tránh ánh nắng trực tiếp và môi trường có độ ẩm cao.\n' +
            '- Vệ sinh bằng khăn mềm, khô; không sử dụng hóa chất tẩy rửa mạnh.\n' +
            '- Tránh va đập mạnh để bảo vệ các chi tiết của mô hình.',
          en: 'The Quang Phu Cau Incense Village 3D Model recreates the distinctive space of a traditional incense-making village famous for its vivid red incense bundles. Stages from selecting materials, dyeing incense sticks, and drying to bundling the finished incense are vividly depicted, helping users understand the process behind incense sticks that carry deep cultural and spiritual value for Vietnamese people. The product integrates QR code and AR technology, offering a vivid and interactive way to explore the craft village right on the phone.\n\n' +
            'Product specifications\n' +
            '- Product name: 3D Model — Quang Phu Cau Incense Village\n' +
            '- Material: 3D-printed PLA plastic, clear acrylic, eco-friendly water-based paint\n' +
            '- Size: 21 × 21 × 17 cm\n' +
            '- Weight: ~670 g\n' +
            '- Color: Natural brown wood tones with red accents inspired by Quang Phu Cau incense bundles\n' +
            '- Technology: 3D printing combined with assembly, hand-finishing, and integrated QR/AR experience\n' +
            '- Recommended age: 12 years and up\n' +
            '- Origin: Vietnam\n' +
            '- Brand: Nghe Xua Net Moi\n\n' +
            'Package includes\n' +
            '- 01 Quang Phu Cau Incense Village 3D model.\n' +
            '- 01 instruction card with QR code.\n' +
            '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n' +
            '- 01 warranty card and care instructions.\n\n' +
            'Care instructions\n' +
            '- Place in a dry area, away from direct sunlight and high humidity.\n' +
            '- Clean with a soft, dry cloth; do not use harsh chemical cleaners.\n' +
            '- Avoid strong impacts to protect the model\'s details.',
        },
        price: 700000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Hương Quảng Phú Cầu', en: 'Fridge Magnet — Quang Phu Cau Incense Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 30000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Hương Quảng Phú Cầu', en: 'Jigsaw Puzzle — Quang Phu Cau Incense Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 100000,
      },
    },
    'van-phuc': {
      model: {
        name: { vi: 'Mô hình 3D Làng Lụa Vạn Phúc', en: '3D Model — Van Phuc Silk Village' },
        description: {
          vi: 'Mô hình 3D Làng Lụa Vạn Phúc tái hiện không gian đặc trưng của một trong những làng nghề dệt lụa lâu đời và nổi tiếng nhất Việt Nam. Từng chi tiết như khu vực ươm tơ, dệt lụa trên khung cửi truyền thống, nhuộm màu và trưng bày thành phẩm được thu nhỏ một cách tinh xảo, giúp người dùng khám phá hành trình tạo nên những tấm lụa mềm mại, mang đậm bản sắc văn hóa Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm tương tác sinh động, kết nối giữa giá trị truyền thống và công nghệ hiện đại.\n\n' +
            'Thông số sản phẩm\n' +
            '- Tên sản phẩm: Mô hình 3D Làng Lụa Vạn Phúc\n' +
            '- Chất liệu: Gỗ MDF, nhựa PLA in 3D, mica trong, sơn gốc nước thân thiện với môi trường\n' +
            '- Kích thước: 21 × 21 × 17 cm\n' +
            '- Khối lượng: ~660 g\n' +
            '- Màu sắc: Tông nâu gỗ tự nhiên, lấy cảm hứng từ vẻ mộc mạc của các làng nghề truyền thống Việt Nam\n' +
            '- Công nghệ: In 3D kết hợp lắp ráp, hoàn thiện thủ công và tích hợp trải nghiệm QR/AR\n' +
            '- Độ tuổi phù hợp: Từ 12 tuổi trở lên\n' +
            '- Xuất xứ: Việt Nam\n' +
            '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
            'Bộ sản phẩm bao gồm\n' +
            '- 01 mô hình 3D Làng Lụa Vạn Phúc.\n' +
            '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
            '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n' +
            '- 01 phiếu bảo hành và hướng dẫn bảo quản.\n\n' +
            'Hướng dẫn bảo quản\n' +
            '- Đặt sản phẩm ở nơi khô ráo, tránh ánh nắng trực tiếp và môi trường có độ ẩm cao.\n' +
            '- Vệ sinh bằng khăn mềm, khô; không sử dụng hóa chất tẩy rửa mạnh.\n' +
            '- Tránh va đập mạnh để bảo vệ các chi tiết của mô hình.',
          en: 'The Van Phuc Silk Village 3D Model recreates the distinctive space of one of Vietnam\'s oldest and most renowned silk-weaving villages. Details such as the silk-reeling area, weaving on traditional looms, dyeing, and finished-product display are finely miniaturized, letting users discover the journey behind soft silk fabrics steeped in Vietnamese cultural identity. The product integrates QR code and AR technology, offering a vivid interactive experience that connects traditional value with modern technology.\n\n' +
            'Product specifications\n' +
            '- Product name: 3D Model — Van Phuc Silk Village\n' +
            '- Material: MDF wood, 3D-printed PLA plastic, clear acrylic, eco-friendly water-based paint\n' +
            '- Size: 21 × 21 × 17 cm\n' +
            '- Weight: ~660 g\n' +
            '- Color: Natural brown wood tones, inspired by the rustic charm of Vietnam\'s traditional craft villages\n' +
            '- Technology: 3D printing combined with assembly, hand-finishing, and integrated QR/AR experience\n' +
            '- Recommended age: 12 years and up\n' +
            '- Origin: Vietnam\n' +
            '- Brand: Nghe Xua Net Moi\n\n' +
            'Package includes\n' +
            '- 01 Van Phuc Silk Village 3D model.\n' +
            '- 01 instruction card with QR code.\n' +
            '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n' +
            '- 01 warranty card and care instructions.\n\n' +
            'Care instructions\n' +
            '- Place in a dry area, away from direct sunlight and high humidity.\n' +
            '- Clean with a soft, dry cloth; do not use harsh chemical cleaners.\n' +
            '- Avoid strong impacts to protect the model\'s details.',
        },
        price: 700000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Lụa Vạn Phúc', en: 'Fridge Magnet — Van Phuc Silk Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 30000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Lụa Vạn Phúc', en: 'Jigsaw Puzzle — Van Phuc Silk Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 100000,
      },
    },
    'chang-son': {
      model: {
        name: { vi: 'Mô hình 3D Làng Quạt Chàng Sơn', en: '3D Model — Chang Son Fan Village' },
        description: {
          vi: 'Mô hình 3D Làng Quạt Chàng Sơn tái hiện không gian đặc trưng của làng nghề làm quạt truyền thống với lịch sử hàng trăm năm. Từ công đoạn chọn tre, làm nan quạt, dán giấy hoặc lụa, vẽ hoa văn đến hoàn thiện sản phẩm đều được thu nhỏ một cách tinh xảo, giúp người dùng khám phá quy trình chế tác nên những chiếc quạt thủ công mang đậm dấu ấn văn hóa Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm tương tác sinh động, kết nối giá trị truyền thống với công nghệ hiện đại.\n\n' +
            'Thông số sản phẩm\n' +
            '- Tên sản phẩm: Mô hình 3D Làng Quạt Chàng Sơn\n' +
            '- Chất liệu: Gỗ MDF, nhựa PLA in 3D, mica trong, sơn gốc nước thân thiện với môi trường\n' +
            '- Kích thước: 21 × 21 × 17 cm\n' +
            '- Khối lượng: ~640 g\n' +
            '- Màu sắc: Tông nâu gỗ tự nhiên, lấy cảm hứng từ vẻ mộc mạc của các làng nghề truyền thống Việt Nam\n' +
            '- Công nghệ: In 3D kết hợp lắp ráp, hoàn thiện thủ công và tích hợp trải nghiệm QR/AR\n' +
            '- Độ tuổi phù hợp: Từ 12 tuổi trở lên\n' +
            '- Xuất xứ: Việt Nam\n' +
            '- Thương hiệu: Nghề Xưa Nét Mới\n\n' +
            'Bộ sản phẩm bao gồm\n' +
            '- 01 mô hình 3D Làng Quạt Chàng Sơn.\n' +
            '- 01 thẻ hướng dẫn sử dụng và quét mã QR.\n' +
            '- 01 hộp đựng mang nhận diện thương hiệu Nghề Xưa Nét Mới.\n' +
            '- 01 phiếu bảo hành và hướng dẫn bảo quản.\n\n' +
            'Hướng dẫn bảo quản\n' +
            '- Đặt sản phẩm ở nơi khô ráo, tránh ánh nắng trực tiếp và môi trường có độ ẩm cao.\n' +
            '- Vệ sinh bằng khăn mềm, khô; không sử dụng hóa chất tẩy rửa mạnh.\n' +
            '- Tránh va đập mạnh để bảo vệ các chi tiết của mô hình.',
          en: 'The Chang Son Fan Village 3D Model recreates the distinctive space of a traditional fan-making village with a history of hundreds of years. Stages from selecting bamboo, making fan ribs, pasting paper or silk, painting patterns, to finishing the product are finely miniaturized, letting users explore the process behind handcrafted fans steeped in Vietnamese cultural identity. The product integrates QR code and AR technology, offering a vivid interactive experience that connects traditional value with modern technology.\n\n' +
            'Product specifications\n' +
            '- Product name: 3D Model — Chang Son Fan Village\n' +
            '- Material: MDF wood, 3D-printed PLA plastic, clear acrylic, eco-friendly water-based paint\n' +
            '- Size: 21 × 21 × 17 cm\n' +
            '- Weight: ~640 g\n' +
            '- Color: Natural brown wood tones, inspired by the rustic charm of Vietnam\'s traditional craft villages\n' +
            '- Technology: 3D printing combined with assembly, hand-finishing, and integrated QR/AR experience\n' +
            '- Recommended age: 12 years and up\n' +
            '- Origin: Vietnam\n' +
            '- Brand: Nghe Xua Net Moi\n\n' +
            'Package includes\n' +
            '- 01 Chang Son Fan Village 3D model.\n' +
            '- 01 instruction card with QR code.\n' +
            '- 01 packaging carrying the Nghe Xua Net Moi brand identity.\n' +
            '- 01 warranty card and care instructions.\n\n' +
            'Care instructions\n' +
            '- Place in a dry area, away from direct sunlight and high humidity.\n' +
            '- Clean with a soft, dry cloth; do not use harsh chemical cleaners.\n' +
            '- Avoid strong impacts to protect the model\'s details.',
        },
        price: 700000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Quạt Chàng Sơn', en: 'Fridge Magnet — Chang Son Fan Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 30000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Quạt Chàng Sơn', en: 'Jigsaw Puzzle — Chang Son Fan Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 100000,
      },
    },
  };

  const productRecords: unknown[] = [];
  let featuredCount = 0;
  for (const village of villages) {
    const slug = (village as { slug: string }).slug;
    const items = PRODUCT_DATA[slug];
    const villageFolder = VILLAGE_IMAGE_FOLDER[slug];
    for (const [type, info] of Object.entries(items) as [string, ProductInfo][]) {
      const isFeatured = featuredCount < 2;
      if (isFeatured) featuredCount++;
      const productFolder = PRODUCT_TYPE_IMAGE_FOLDER[type](villageFolder);
      const imageUrls = listProductImages(villageFolder, productFolder);
      const images = imageUrls.length
        ? imageUrls.map((url, order) => ({ url, isMain: order === 0, order }))
        : [{ url: `https://placehold.co/400x400?text=${encodeURIComponent(info.name.en)}`, isMain: true, order: 0 }];
      productRecords.push({
        name: info.name,
        description: info.description,
        price: info.price,
        stock: 50 + Math.floor(Math.random() * 100),
        villageId: village._id,
        images,
        isVisible: true,
        isFeatured,
      });
    }
  }
  const products = await Product.insertMany(productRecords);
  console.log(`Created ${products.length} products`);

  // ── Hotspots (2-3 per product) ────────────────────────────────────────────
  const hotspotRecords: unknown[] = [];
  for (let pi = 0; pi < products.length; pi++) {
    const product = products[pi];
    const count = pi % 2 === 0 ? 2 : 3;
    for (let h = 0; h < count; h++) {
      hotspotRecords.push({
        productId: product._id,
        slotName: `slot-${h + 1}`,
        position: { x: h * 0.1, y: 0.5, z: 0 },
        normal: { x: 0, y: 1, z: 0 },
        title: { vi: `Điểm nổi bật ${h + 1}`, en: `Highlight ${h + 1}` },
        content: { vi: `Nội dung hotspot ${h + 1}`, en: `Hotspot content ${h + 1}` },
      });
    }
  }
  await Hotspot.insertMany(hotspotRecords);
  console.log(`Created ${hotspotRecords.length} hotspots`);

  // ── Orders ────────────────────────────────────────────────────────────────
  const orderStatuses = ['pending', 'packing', 'shipping', 'delivered', 'cancelled'];
  const orderRecords: unknown[] = [];
  for (let o = 0; o < 5; o++) {
    const product = products[o % products.length];
    const customer = customers[o % customers.length];
    const qty = o + 1;
    const unitPrice = (product as { price: number }).price;
    const subtotal = qty * unitPrice;
    const shippingFee = 30000;
    orderRecords.push({
      orderCode: generateOrderCode(),
      userId: customer._id,
      shippingAddress: {
        fullName: (customer as { fullName: string }).fullName,
        phone: '0987654321',
        province: 'Hà Nội',
        district: 'Hoàn Kiếm',
        ward: 'Hàng Bài',
        street: `${o + 1} Phố Huế`,
      },
      items: [
        {
          productId: product._id,
          productName: (product.name as { vi: string }).vi,
          productImageUrl: 'https://placehold.co/400x400',
          quantity: qty,
          unitPrice,
          isReviewed: orderStatuses[o] === 'delivered',
        },
      ],
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      payment: { method: 'cod', status: orderStatuses[o] === 'delivered' ? 'paid' : 'pending' },
      status: orderStatuses[o],
      statusHistory: [{ status: orderStatuses[o], updatedAt: new Date(), note: 'Seed data' }],
    });
  }
  const orders = await Order.insertMany(orderRecords);
  console.log(`Created ${orders.length} orders`);

  // ── Reviews (3-5 đánh giá 4-5 sao cho mỗi sản phẩm) ────────────────────────
  const GUEST_REVIEWERS = [
    'Nguyễn Thị Lan', 'Trần Minh Quân', 'Phạm Thu Hương', 'Lê Văn Đức', 'Vũ Thị Mai',
    'Hoàng Anh Tuấn', 'Ngô Thị Bích', 'Đinh Thanh Tùng', 'Bùi Thị Ngọc', 'Đỗ Văn Nam',
    'Phan Thị Thảo', 'Trịnh Quốc Bảo', 'Đặng Thị Huyền', 'Vương Minh Khôi', 'Cao Thị Yến',
    'Lý Văn Phúc', 'Dương Thị Nga', 'Hồ Anh Dũng', 'Tô Thị Kim', 'Mai Văn Sơn',
    'Đoàn Thị Thu', 'Chu Văn Hải', 'Nguyễn Văn Long', 'Trần Thị Hồng', 'Phạm Văn Kiên',
    'Lê Thị Duyên', 'Vũ Văn Toàn', 'Hoàng Thị Nhung', 'Ngô Văn Thắng', 'Bùi Thị Loan',
  ];
  const REVIEW_CONTENTS = [
    'Sản phẩm rất đẹp, chi tiết tỉ mỉ, đóng gói cẩn thận. Mình mua làm quà tặng và được khen rất nhiều!',
    'Hộp tiểu cảnh chất lượng vượt kỳ vọng. Tính năng AR quét mã thực sự thú vị, con mình thích mê.',
    'Giao hàng nhanh, sản phẩm nguyên vẹn. Khung gỗ và chi tiết bên trong rất tinh xảo. Sẽ mua thêm!',
    'Mua về trưng bày trên bàn làm việc, ai vào cũng hỏi mua ở đâu. Câu chuyện văn hóa đằng sau sản phẩm rất ý nghĩa.',
    'Tặng sinh nhật bạn bè rất phù hợp. Sản phẩm đẹp, ý nghĩa, khác biệt so với quà thông thường.',
    'Chất lượng tốt, giao hàng đúng hẹn. Đóng gói chắc chắn, mở hộp ra là ưng ngay.',
    'Đây là lần thứ 3 mình mua sản phẩm của Nghề Xưa Nét Mới. Chất lượng luôn ổn định, dịch vụ nhiệt tình.',
    'Mô hình tiểu cảnh rất chân thực, cảm giác như đang thu nhỏ cả một làng nghề vào lòng bàn tay. Rất đáng tiền!',
    'Màu sắc y như hình, không bị lỗi chi tiết nào. Rất hài lòng với trải nghiệm mua hàng lần này.',
    'Sản phẩm tinh xảo, đúng như mô tả. Nhân viên tư vấn nhiệt tình, đóng gói kỹ càng.',
  ];

  // Ngày tạo review random rải rác từ đầu tháng 7 đến thời điểm chạy seed,
  // tránh việc tất cả review cùng hiện một ngày (ngày chạy script).
  const REVIEW_DATE_START = new Date('2026-07-01T00:00:00Z').getTime();
  const REVIEW_DATE_END = Date.now();
  const randomReviewDate = () => new Date(REVIEW_DATE_START + Math.random() * (REVIEW_DATE_END - REVIEW_DATE_START));

  const reviewRecords: unknown[] = [];
  const deliveredOrder = orders.find((o) => (o as { status: string }).status === 'delivered') ?? orders[0];
  let reviewSeq = 0;
  let guestCursor = 0;
  for (const product of products) {
    const reviewCount = 3 + (reviewSeq % 3); // 3, 4 hoặc 5 đánh giá mỗi sản phẩm
    // Mỗi sản phẩm chỉ dùng 1 tài khoản thật (xoay vòng qua 3 khách hàng demo),
    // các review còn lại dùng guest reviewer khác nhau kéo dài dần qua danh sách
    // để không sản phẩm nào lặp lại đúng cùng một nhóm tên.
    const realCustomerSlot = Math.floor(Math.random() * reviewCount);
    const customer = customers[reviewSeq % customers.length];
    for (let i = 0; i < reviewCount; i++) {
      const rating = 4 + Math.round(Math.random()); // chỉ 4 hoặc 5 sao
      const content = REVIEW_CONTENTS[Math.floor(Math.random() * REVIEW_CONTENTS.length)];
      const createdAt = randomReviewDate();
      if (i === realCustomerSlot) {
        reviewRecords.push({
          userId: customer._id,
          productId: product._id,
          orderId: deliveredOrder._id,
          rating,
          content,
          imageUrls: [],
          status: 'approved',
          createdAt,
          updatedAt: createdAt,
        });
      } else {
        reviewRecords.push({
          guestName: GUEST_REVIEWERS[guestCursor % GUEST_REVIEWERS.length],
          productId: product._id,
          rating,
          content,
          imageUrls: [],
          status: 'approved',
          createdAt,
          updatedAt: createdAt,
        });
        guestCursor++;
      }
      reviewSeq++;
    }
  }
  await Review.insertMany(reviewRecords);
  console.log(`Created ${reviewRecords.length} reviews`);

  // ── Static Content ────────────────────────────────────────────────────────
  await StaticContent.insertMany([
    {
      key: 'faq',
      content: {
        vi: '<h2>Câu hỏi thường gặp</h2><p>Nội dung FAQ...</p>',
        en: '<h2>Frequently Asked Questions</h2><p>FAQ content...</p>',
      },
    },
    {
      key: 'return_policy',
      content: {
        vi: '<h2>Chính sách đổi trả</h2><p>Chúng tôi chấp nhận đổi trả trong 7 ngày...</p>',
        en: '<h2>Return Policy</h2><p>We accept returns within 7 days...</p>',
      },
    },
    {
      key: 'shipping_policy',
      content: {
        vi: '<h2>Chính sách vận chuyển</h2><p>Giao hàng toàn quốc...</p>',
        en: '<h2>Shipping Policy</h2><p>Nationwide delivery...</p>',
      },
    },
    {
      key: 'contact',
      content: {
        vi: '<h2>Liên hệ</h2><p>Email: contact@ocnv.vn | SĐT: 0987654321</p>',
        en: '<h2>Contact</h2><p>Email: contact@ocnv.vn | Phone: 0987654321</p>',
      },
    },
  ]);
  console.log('Created 4 static content records');

  console.log('\nSeed completed successfully!');
  console.log(`Admin: admin@ocnv.vn / Admin@123456`);
  console.log(`Customers: customer1@test.com, customer2@test.com, customer3@test.com / Customer@123456`);
}

seed()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('Seed failed:', err);
    mongoose.disconnect().finally(() => process.exit(1));
  });
