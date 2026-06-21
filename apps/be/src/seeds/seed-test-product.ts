import mongoose from 'mongoose';

const MONGODB_URI = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017/ocnv';

const ProductSchema = new mongoose.Schema(
  {
    name: { vi: String, en: String },
    description: { vi: String, en: String },
    price: Number,
    stock: Number,
    villageId: { type: mongoose.Types.ObjectId, ref: 'Village' },
    images: [{ url: String, isMain: Boolean, order: Number }],
    isVisible: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'products' },
);

const Product = mongoose.model('Product', ProductSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const product = await Product.create({
    name: { vi: 'test', en: 'test' },
    description: { vi: 'Sản phẩm test', en: 'Test product' },
    price: 5000,
    stock: 999,
    images: [{ url: 'https://placehold.co/400x400?text=test', isMain: true, order: 0 }],
    isVisible: true,
    isFeatured: false,
  });

  console.log('Created test product:', product._id, '— price: 5000 VND');
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
