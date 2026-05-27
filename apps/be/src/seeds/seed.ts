import mongoose, { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// ── connection ───────────────────────────────────────────────────────────────
const MONGODB_URI = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017/ocnv';

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
    slug: 'phu-vinh',
    name: { vi: 'Làng mây tre Phú Vinh', en: 'Phu Vinh Bamboo & Rattan Village' },
    tagline: { vi: 'Nghệ thuật từ tre và mây', en: 'Art from bamboo and rattan' },
    shortDescription: {
      vi: 'Làng nghề đan lát mây tre nứa nổi tiếng của Hà Nội',
      en: 'Famous bamboo and rattan weaving craft village of Hanoi',
    },
    fullHistory: {
      vi: 'Phú Vinh nổi tiếng với nghề đan lát mây tre từ lâu đời...',
      en: 'Phu Vinh is renowned for its ancient bamboo weaving tradition...',
    },
    artisanStory: { vi: 'Nghệ nhân đan mây tre Phú Vinh', en: 'Phu Vinh bamboo weaving artisan' },
    artisanQuote: { vi: 'Tre uốn theo tay, tâm uốn theo nghề', en: 'Bamboo bends with the hand, the heart with the craft' },
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

  // ── Products (2 per village) ──────────────────────────────────────────────
  const productRecords: unknown[] = [];
  let featuredCount = 0;
  for (const village of villages) {
    for (let i = 1; i <= 2; i++) {
      const isFeatured = featuredCount < 2;
      if (isFeatured) featuredCount++;
      productRecords.push({
        name: {
          vi: `Sản phẩm ${i} của ${(village.name as { vi: string }).vi}`,
          en: `Product ${i} from ${(village.name as { en: string }).en}`,
        },
        description: {
          vi: `Mô tả sản phẩm ${i} từ làng ${(village.name as { vi: string }).vi}`,
          en: `Description of product ${i} from ${(village.name as { en: string }).en}`,
        },
        price: 100000 + i * 50000 + Math.floor(Math.random() * 200000),
        stock: 50 + Math.floor(Math.random() * 100),
        villageId: village._id,
        images: [{ url: `https://placehold.co/400x400?text=Product+${i}`, isMain: true, order: 0 }],
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
