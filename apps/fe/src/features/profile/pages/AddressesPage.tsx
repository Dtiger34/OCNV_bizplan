import React, { useState } from 'react';
import { ProfileLayout } from './ProfilePage';
import { Plus, Trash2, Home } from 'lucide-react';
import { useAddresses, useCreateAddress, useDeleteAddress, useSetDefaultAddress } from '../hooks/useAddresses';
import { Address } from '@/types/api';

interface AddressForm { fullName: string; phone: string; province: string; district: string; ward: string; street: string; }
const EMPTY_FORM: AddressForm = { fullName: '', phone: '', province: '', district: '', ward: '', street: '' };

export default function AddressesPage() {
  const { data: addresses = [], isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefault = useSetDefaultAddress();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);

  const set = (f: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.street) return;
    await createAddress.mutateAsync({
      fullName: form.fullName,
      phone: form.phone,
      province: form.province,
      district: form.district,
      ward: form.ward,
      street: form.street,
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa địa chỉ giao nhận này?')) return;
    await deleteAddress.mutateAsync(id);
  };

  const formatAddress = (a: Address) =>
    [a.street, a.ward, a.district, a.province].filter(Boolean).join(', ');

  return (
    <ProfileLayout>
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4B896]/30 pb-3">
          <h3 className="text-2xl font-bold text-[#ab2124]">DANH SÁCH ĐỊA CHỈ GIAO NHẬN</h3>
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center gap-1 cursor-pointer">
            <Plus size={14} /> Thêm địa chỉ
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="p-4 bg-[#fff8e7] border border-[#D4B896] rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                { key: 'fullName', label: 'Họ Tên Nhận Hàng', placeholder: 'Nguyễn Văn A', type: 'text' },
                { key: 'phone', label: 'Số Điện Thoại', placeholder: '0901234567', type: 'tel' },
                { key: 'province', label: 'Tỉnh / Thành Phố', placeholder: 'Hà Nội', type: 'text' },
                { key: 'district', label: 'Quận / Huyện', placeholder: 'Ba Đình', type: 'text' },
                { key: 'ward', label: 'Phường / Xã', placeholder: 'Quán Thánh', type: 'text' },
              ] as const).map(({ key, label, placeholder, type }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key]} onChange={set(key)}
                    className="w-full h-10 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
                </div>
              ))}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">Số Nhà, Tên Đường</label>
                <input type="text" placeholder="10 Hùng Vương" value={form.street} onChange={set('street')} required
                  className="w-full h-10 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={createAddress.isPending}
                className="px-4 py-2 bg-[#ab2124] text-[#fff8e7] text-[11px] font-bold uppercase rounded-sm cursor-pointer">
                {createAddress.isPending ? 'Đang lưu...' : 'Lưu Địa Chỉ'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#D4B896] text-[#ab2124] text-[11px] font-bold uppercase rounded-sm cursor-pointer">
                Hủy Bỏ
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {isLoading && <p className="text-sm text-[#ab2124] italic">Đang tải...</p>}
          {!isLoading && addresses.length === 0 && (
            <p className="text-sm text-[#ab2124] italic">Chưa khai báo địa chỉ nhận hàng nào.</p>
          )}
          {addresses.map((a) => (
            <div key={a._id}
              className="p-4 border border-[#D4B896] rounded-md bg-[#fff8e7] hover:border-[#C9973A] transition-all flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#ab2124]">{a.fullName}</span>
                  <span className="text-xs text-[#ab2124]">{a.phone}</span>
                  {a.isDefault && (
                    <span className="flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-[#3A6B4A] bg-[rgba(58,107,74,0.1)] text-[#3A6B4A] rounded-sm">
                      <Home size={10} /> Mặc Định
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#ab2124]">{formatAddress(a)}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {!a.isDefault && (
                  <button onClick={() => setDefault.mutate(a._id)}
                    className="px-3 py-1.5 border border-[#D4B896] text-xs font-bold text-[#ab2124] uppercase hover:bg-[#ab2124]/5 rounded-sm cursor-pointer">
                    Đặt làm mặc định
                  </button>
                )}
                <button onClick={() => handleDelete(a._id)}
                  className="p-2 border border-[#D4B896] text-[#7B1C2E] hover:bg-[#7B1C2E]/5 rounded-sm cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
}
