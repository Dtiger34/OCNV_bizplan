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
    { fullName: 'Khách hàng 1', email: 'customer1@test.com', password: customerPassword, role: 'customer', status: 'active' },
    { fullName: 'Khách hàng 2', email: 'customer2@test.com', password: customerPassword, role: 'customer', status: 'active' },
    { fullName: 'Khách hàng 3', email: 'customer3@test.com', password: customerPassword, role: 'customer', status: 'active' },
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
    'Thẻ nam châm làng nghề là món quà lưu niệm nhỏ gọn, tái hiện hình ảnh đặc trưng của các làng nghề truyền thống Việt Nam như Nón Chuông, Gốm Bát Tràng, Lụa Vạn Phúc, Hương Quảng Phú Cầu và Quạt Chàng Sơn. Mỗi chiếc thẻ không chỉ mang giá trị trang trí mà còn kể một câu chuyện văn hóa thông qua mã QR tích hợp, cho phép người dùng trải nghiệm công nghệ AR và khám phá lịch sử, quy trình chế tác cũng như những nét đặc sắc của từng làng nghề.';
  const MAGNET_DESCRIPTION_EN =
    'The craft village fridge magnet is a compact souvenir depicting the distinctive imagery of Vietnam\'s traditional craft villages — Chuong, Bat Trang, Van Phuc, Quang Phu Cau, and Chang Son. Each magnet carries not only decorative value but also a cultural story through its integrated QR code, letting users experience AR technology and explore the history, craft process, and unique character of each village.';
  const PUZZLE_DESCRIPTION_VI =
    'Tranh ghép Làng nghề – Bộ sưu tập Nghề Xưa Nét Mới là sản phẩm kết hợp giữa trò chơi ghép tranh và trải nghiệm khám phá văn hóa, tái hiện hình ảnh đặc trưng của các làng nghề truyền thống Việt Nam như Nón Chuông, Gốm Bát Tràng, Lụa Vạn Phúc, Hương Quảng Phú Cầu và Quạt Chàng Sơn. Trong quá trình ghép từng mảnh tranh, người chơi sẽ dần hoàn thiện bức tranh về làng nghề, đồng thời khám phá những nét đẹp văn hóa ẩn sau mỗi chi tiết. Sau khi hoàn thành, người dùng có thể quét mã QR để trải nghiệm nội dung AR, tìm hiểu lịch sử hình thành, quy trình chế tác và những câu chuyện văn hóa gắn với từng làng nghề ngay trên điện thoại.';
  const PUZZLE_DESCRIPTION_EN =
    'The Craft Village Puzzle — Nghề Xưa Nét Mới Collection blends jigsaw play with cultural discovery, recreating the distinctive imagery of Vietnam\'s traditional craft villages — Chuong, Bat Trang, Van Phuc, Quang Phu Cau, and Chang Son. As players assemble each piece, the village picture gradually comes together, revealing the cultural beauty hidden within every detail. Once complete, users can scan the QR code to experience AR content and learn about the history, craft process, and cultural stories behind each village right on their phone.';

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
          vi: 'Mô hình 3D Làng Gốm Bát Tràng tái hiện không gian đặc trưng của làng nghề gốm truyền thống với hơn 700 năm lịch sử. Từ khu vực nặn gốm, bàn xoay, lò nung đến không gian trưng bày sản phẩm đều được thu nhỏ tỉ mỉ, mang đến góc nhìn chân thực về quy trình tạo nên những tác phẩm gốm thủ công nổi tiếng của Việt Nam. Sản phẩm tích hợp mã QR và công nghệ AR, giúp người dùng khám phá lịch sử, kỹ thuật chế tác và giá trị văn hóa của làng gốm thông qua trải nghiệm tương tác hiện đại.',
          en: 'The Bat Trang Pottery Village 3D Model recreates the distinctive space of a traditional ceramic craft village with over 700 years of history. The clay-shaping area, potter\'s wheel, kiln, and display space are all meticulously miniaturized, offering an authentic view of how Vietnam\'s famous handcrafted ceramics are made. The product integrates QR code and AR technology, letting users explore the village\'s history, techniques, and cultural value through a modern interactive experience.',
        },
        price: 690000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Gốm Bát Tràng', en: 'Fridge Magnet — Bat Trang Pottery Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 45000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Gốm Bát Tràng', en: 'Jigsaw Puzzle — Bat Trang Pottery Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 129000,
      },
    },
    'non-chuong': {
      model: {
        name: { vi: 'Mô hình 3D Làng Nón Chuông', en: '3D Model — Chuong Conical Hat Village' },
        description: {
          vi: 'Mô hình 3D Làng Nón Chuông tái hiện không gian đặc trưng của làng nghề làm nón truyền thống hơn 300 năm tuổi tại Hà Nội. Từng chi tiết như nghệ nhân, nguyên liệu lá cọ, khung phơi và ngôi nhà cổ được thu nhỏ một cách tinh xảo, giúp người xem hình dung quy trình làm nón ngay trên mô hình. Khi quét mã QR, người dùng có thể trải nghiệm nội dung AR với hình ảnh, video và thông tin về từng công đoạn sản xuất, mang đến hành trình khám phá làng nghề trực quan ngay trên điện thoại.',
          en: 'The Chuong Conical Hat Village 3D Model recreates the distinctive space of a traditional hat-making village over 300 years old in Hanoi. Details such as artisans, palm-leaf material, drying racks, and ancient houses are finely miniaturized, letting viewers visualize the hat-making process on the model itself. By scanning the QR code, users can experience AR content with images, videos, and information about each production stage, offering a vivid journey through the craft village right on their phone.',
        },
        price: 650000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Nón Chuông', en: 'Fridge Magnet — Chuong Conical Hat Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 45000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Nón Chuông', en: 'Jigsaw Puzzle — Chuong Conical Hat Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 129000,
      },
    },
    'quang-phu-cau': {
      model: {
        name: { vi: 'Mô hình 3D Làng Hương Quảng Phú Cầu', en: '3D Model — Quang Phu Cau Incense Village' },
        description: {
          vi: 'Mô hình 3D Làng Hương Quảng Phú Cầu tái hiện không gian đặc trưng của làng nghề làm hương truyền thống nổi tiếng với những bó tăm hương đỏ rực. Các công đoạn từ lựa chọn nguyên liệu, nhuộm chân hương, phơi hương đến bó hương thành phẩm được thể hiện sinh động, giúp người dùng hiểu rõ quy trình tạo nên những nén hương mang đậm giá trị văn hóa và tâm linh của người Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm khám phá làng nghề trực quan và tương tác ngay trên điện thoại.',
          en: 'The Quang Phu Cau Incense Village 3D Model recreates the distinctive space of a traditional incense-making village famous for its vivid red incense bundles. Stages from selecting materials, dyeing incense sticks, and drying to bundling the finished incense are vividly depicted, helping users understand the process behind incense sticks that carry deep cultural and spiritual value for Vietnamese people. The product integrates QR code and AR technology, offering a vivid and interactive way to explore the craft village right on the phone.',
        },
        price: 670000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Hương Quảng Phú Cầu', en: 'Fridge Magnet — Quang Phu Cau Incense Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 45000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Hương Quảng Phú Cầu', en: 'Jigsaw Puzzle — Quang Phu Cau Incense Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 129000,
      },
    },
    'van-phuc': {
      model: {
        name: { vi: 'Mô hình 3D Làng Lụa Vạn Phúc', en: '3D Model — Van Phuc Silk Village' },
        description: {
          vi: 'Mô hình 3D Làng Lụa Vạn Phúc tái hiện không gian đặc trưng của một trong những làng nghề dệt lụa lâu đời và nổi tiếng nhất Việt Nam. Từng chi tiết như khu vực ươm tơ, dệt lụa trên khung cửi truyền thống, nhuộm màu và trưng bày thành phẩm được thu nhỏ một cách tinh xảo, giúp người dùng khám phá hành trình tạo nên những tấm lụa mềm mại, mang đậm bản sắc văn hóa Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm tương tác sinh động, kết nối giữa giá trị truyền thống và công nghệ hiện đại.',
          en: 'The Van Phuc Silk Village 3D Model recreates the distinctive space of one of Vietnam\'s oldest and most renowned silk-weaving villages. Details such as the silk-reeling area, weaving on traditional looms, dyeing, and finished-product display are finely miniaturized, letting users discover the journey behind soft silk fabrics steeped in Vietnamese cultural identity. The product integrates QR code and AR technology, offering a vivid interactive experience that connects traditional value with modern technology.',
        },
        price: 660000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Lụa Vạn Phúc', en: 'Fridge Magnet — Van Phuc Silk Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 45000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Lụa Vạn Phúc', en: 'Jigsaw Puzzle — Van Phuc Silk Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 129000,
      },
    },
    'chang-son': {
      model: {
        name: { vi: 'Mô hình 3D Làng Quạt Chàng Sơn', en: '3D Model — Chang Son Fan Village' },
        description: {
          vi: 'Mô hình 3D Làng Quạt Chàng Sơn tái hiện không gian đặc trưng của làng nghề làm quạt truyền thống với lịch sử hàng trăm năm. Từ công đoạn chọn tre, làm nan quạt, dán giấy hoặc lụa, vẽ hoa văn đến hoàn thiện sản phẩm đều được thu nhỏ một cách tinh xảo, giúp người dùng khám phá quy trình chế tác nên những chiếc quạt thủ công mang đậm dấu ấn văn hóa Việt. Sản phẩm tích hợp mã QR và công nghệ AR, mang đến trải nghiệm tương tác sinh động, kết nối giá trị truyền thống với công nghệ hiện đại.',
          en: 'The Chang Son Fan Village 3D Model recreates the distinctive space of a traditional fan-making village with a history of hundreds of years. Stages from selecting bamboo, making fan ribs, pasting paper or silk, painting patterns, to finishing the product are finely miniaturized, letting users explore the process behind handcrafted fans steeped in Vietnamese cultural identity. The product integrates QR code and AR technology, offering a vivid interactive experience that connects traditional value with modern technology.',
        },
        price: 640000,
      },
      magnet: {
        name: { vi: 'Thẻ nam châm Làng Quạt Chàng Sơn', en: 'Fridge Magnet — Chang Son Fan Village' },
        description: {
          vi: MAGNET_DESCRIPTION_VI,
          en: MAGNET_DESCRIPTION_EN,
        },
        price: 45000,
      },
      puzzle: {
        name: { vi: 'Tranh ghép Làng Quạt Chàng Sơn', en: 'Jigsaw Puzzle — Chang Son Fan Village' },
        description: {
          vi: PUZZLE_DESCRIPTION_VI,
          en: PUZZLE_DESCRIPTION_EN,
        },
        price: 129000,
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

  // ── Reviews ───────────────────────────────────────────────────────────────
  const reviewRecords: unknown[] = [];
  for (let r = 0; r < 5; r++) {
    const deliveredOrder = orders.find((o) => (o as { status: string }).status === 'delivered');
    const order = deliveredOrder ?? orders[0];
    reviewRecords.push({
      userId: customers[r % customers.length]._id,
      productId: products[r % products.length]._id,
      orderId: order._id,
      rating: 4 + (r % 2),
      content: `Sản phẩm rất đẹp và chất lượng tốt. Review số ${r + 1}.`,
      imageUrls: [],
      status: 'approved',
    });
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
