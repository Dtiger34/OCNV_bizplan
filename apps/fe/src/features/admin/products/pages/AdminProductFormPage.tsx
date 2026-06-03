import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useAdminProduct, useCreateProduct, useUpdateProduct } from '../hooks/useAdminProducts';
import { useAdminVillages } from '../../villages/hooks/useAdminVillages';

interface FormState {
  nameVi: string; nameEn: string;
  descVi: string; descEn: string;
  price: string; stock: string;
  villageId: string;
  isVisible: boolean; isFeatured: boolean;
}

const EMPTY: FormState = { nameVi: '', nameEn: '', descVi: '', descEn: '', price: '', stock: '', villageId: '', isVisible: true, isFeatured: false };

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'new';

  const { data: product } = useAdminProduct(isEdit ? id : '');
  const { data: villages } = useAdminVillages();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        nameVi: product.name.vi,
        nameEn: product.name.en,
        descVi: product.description?.vi ?? '',
        descEn: product.description?.en ?? '',
        price: String(product.price),
        stock: String(product.stock),
        villageId: (product as any).villageId ?? product.village?._id ?? '',
        isVisible: product.isVisible,
        isFeatured: product.isFeatured,
      });
    }
  }, [product]);

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));
  const setCheck = (f: keyof FormState) => () => setForm((p) => ({ ...p, [f]: !p[f] }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nameVi.trim()) e.nameVi = 'Bắt buộc';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Phải là số';
    if (!form.stock || isNaN(Number(form.stock))) e.stock = 'Phải là số';
    if (!form.villageId) e.villageId = 'Bắt buộc';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: { vi: form.nameVi, en: form.nameEn },
      description: { vi: form.descVi, en: form.descEn },
      price: Number(form.price),
      stock: Number(form.stock),
      villageId: form.villageId,
      isVisible: form.isVisible,
      isFeatured: form.isFeatured,
    };
    if (isEdit && id) {
      await updateProduct.mutateAsync({ id, data: payload });
    } else {
      await createProduct.mutateAsync(payload);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/admin/products'); }, 1200);
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

  const isPending = createProduct.isPending || updateProduct.isPending;

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
          <Field label="Tên sản phẩm (Tiếng Việt)" name="nameVi" required>
            <input value={form.nameVi} onChange={set('nameVi')} placeholder="VD: Mô Hình Làng Gốm Bát Tràng"
              className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:border-blue-400 ${errors.nameVi ? 'border-red-400' : 'border-gray-200'}`} />
          </Field>
          <Field label="Tên sản phẩm (English)" name="nameEn">
            <input value={form.nameEn} onChange={set('nameEn')} placeholder="VD: Bat Trang Pottery Village Diorama"
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </Field>
          <Field label="Làng nghề" name="villageId" required>
            <select value={form.villageId} onChange={set('villageId')}
              className={`w-full h-10 px-3 border rounded-lg text-sm bg-white focus:outline-none focus:border-blue-400 cursor-pointer ${errors.villageId ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">-- Chọn làng nghề --</option>
              {villages?.map((v) => <option key={v._id} value={v._id}>{v.name.vi}</option>)}
            </select>
          </Field>
          <Field label="Mô tả (Tiếng Việt)" name="descVi">
            <textarea rows={4} value={form.descVi} onChange={set('descVi')} placeholder="Mô tả chi tiết sản phẩm..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
          <Field label="Mô tả (English)" name="descEn">
            <textarea rows={3} value={form.descEn} onChange={set('descEn')} placeholder="Product description..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
        </div>

        {/* Pricing & stock */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Giá & Tồn kho</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Giá bán (₫)" name="price" required>
              <input type="number" value={form.price} onChange={set('price')} placeholder="1250000"
                className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:border-blue-400 ${errors.price ? 'border-red-400' : 'border-gray-200'}`} />
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
            <p className="text-xs text-gray-400 mt-1">PNG, JPG tối đa 5MB.</p>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cài đặt hiển thị</h2>
          {[
            { key: 'isVisible' as const, label: 'Hiển thị trên cửa hàng', desc: 'Khách hàng có thể xem sản phẩm này' },
            { key: 'isFeatured' as const, label: 'Đặt là sản phẩm nổi bật', desc: 'Hiển thị trong phần "Mô Hình Nổi Bật" ở trang chủ' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer group">
              <div onClick={setCheck(key)} className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${form[key] ? 'bg-gray-800 border-gray-800' : 'border-gray-300 group-hover:border-gray-500'}`}>
                {form[key] && <Check size={12} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isPending}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors cursor-pointer ${saved ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
            {saved ? <><Check size={15} /> Đã lưu!</> : isPending ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
          </button>
          <Link to="/admin/products" className="px-6 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Huỷ
          </Link>
        </div>
      </form>
    </div>
  );
}
