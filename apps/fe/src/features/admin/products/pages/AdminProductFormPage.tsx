import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Trash2, Check } from 'lucide-react';

const VILLAGES = ['Bát Tràng', 'Vạn Phúc', 'Quảng Phú Cầu', 'Làng Chuông', 'Phú Vinh'];
const CATEGORIES = ['Hộp Làng Gốm', 'Hộp Làng Lụa', 'Hộp Làng Hương', 'Hộp Làng Nón', 'Hộp Làng Tre Đan'];

const MOCK_PRODUCTS: Record<string, any> = {
  'tieu-canh-bat-trang': {
    name: 'Mô Hình Làng Gốm Bát Tràng', category: 'Hộp Làng Gốm', village: 'Bát Tràng',
    price: '1250000', originalPrice: '', stock: '12', material: 'Mica acrylic, Gỗ MDF, Đất sét',
    description: 'Mô hình tiểu cảnh diorama gỗ ghép nhiều lớp tái hiện nghệ nhân làm gốm vuốt đất sét trên bàn xoay thủ công bên lò nung gạch cổ kính.',
    visible: true, featured: false,
  },
};

export default function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'new';
  const mock = isEdit ? MOCK_PRODUCTS[id] : null;

  const [form, setForm] = useState({
    name: mock?.name ?? '',
    category: mock?.category ?? CATEGORIES[0],
    village: mock?.village ?? VILLAGES[0],
    price: mock?.price ?? '',
    originalPrice: mock?.originalPrice ?? '',
    stock: mock?.stock ?? '',
    material: mock?.material ?? '',
    description: mock?.description ?? '',
    visible: mock?.visible ?? true,
    featured: mock?.featured ?? false,
  });
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));
  const setCheck = (f: string) => () => setForm((p) => ({ ...p, [f]: !p[f as keyof typeof p] }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Bắt buộc';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Phải là số';
    if (!form.stock || isNaN(Number(form.stock))) e.stock = 'Phải là số';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/admin/products'); }, 1500);
  };

  const Field = ({ label, name, required, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
          {isEdit && <p className="text-sm text-gray-400">ID: {id}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Thông tin cơ bản</h2>
          <Field label="Tên sản phẩm" name="name" required>
            <input value={form.name} onChange={set('name')} placeholder="VD: Mô Hình Làng Gốm Bát Tràng"
              className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:border-blue-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Danh mục" name="category">
              <select value={form.category} onChange={set('category')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-400 cursor-pointer">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Làng nghề" name="village">
              <select value={form.village} onChange={set('village')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-400 cursor-pointer">
                {VILLAGES.map((v) => <option key={v}>{v}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Chất liệu" name="material">
            <input value={form.material} onChange={set('material')} placeholder="VD: Mica acrylic, Gỗ MDF, Đất sét"
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </Field>
          <Field label="Mô tả" name="description">
            <textarea rows={4} value={form.description} onChange={set('description')} placeholder="Mô tả chi tiết sản phẩm..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
        </div>

        {/* Pricing & stock */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Giá & Tồn kho</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Giá bán (₫)" name="price" required>
              <input type="number" value={form.price} onChange={set('price')} placeholder="1250000"
                className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:border-blue-400 ${errors.price ? 'border-red-400' : 'border-gray-200'}`} />
            </Field>
            <Field label="Giá gốc (₫)" name="originalPrice">
              <input type="number" value={form.originalPrice} onChange={set('originalPrice')} placeholder="Để trống nếu không giảm giá"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </Field>
            <Field label="Số lượng tồn" name="stock" required>
              <input type="number" value={form.stock} onChange={set('stock')} placeholder="0"
                className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:border-blue-400 ${errors.stock ? 'border-red-400' : 'border-gray-200'}`} />
            </Field>
          </div>
        </div>

        {/* Image upload placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Hình ảnh sản phẩm</h2>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-blue-300 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-500">Kéo thả hoặc click để tải ảnh lên</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG tối đa 5MB. Tỷ lệ 4:3 được khuyến nghị.</p>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cài đặt hiển thị</h2>
          {[
            { key: 'visible', label: 'Hiển thị trên cửa hàng', desc: 'Khách hàng có thể xem sản phẩm này' },
            { key: 'featured', label: 'Đặt là sản phẩm nổi bật', desc: 'Hiển thị trong phần "Mô Hình Nổi Bật" ở trang chủ' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer group">
              <div onClick={setCheck(key)} className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${form[key as keyof typeof form] ? 'bg-gray-800 border-gray-800' : 'border-gray-300 group-hover:border-gray-500'}`}>
                {form[key as keyof typeof form] && <Check size={12} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors cursor-pointer ${saved ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
            {saved ? <><Check size={15} /> Đã lưu!</> : isEdit ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
          </button>
          <Link to="/admin/products" className="px-6 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Huỷ
          </Link>
        </div>
      </form>
    </div>
  );
}
