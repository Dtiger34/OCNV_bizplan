import React, { useState } from 'react';
import { ProfileLayout } from './ProfilePage';
import { Plus, Edit3, Trash2, Home, Check } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Nguyễn Minh Tuấn',
      phone: '0901234567',
      fullAddress: 'Số 10 Hùng Vương, Phường Quán Thánh, Quận Ba Đình, Hà Nội',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Nguyễn Minh Tuấn (Mẹ nhận)',
      phone: '0987654321',
      fullAddress: '15 Tả Thanh Oai, Huyện Thanh Trì, Hà Nội',
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && street) {
      const newAddr: Address = {
        id: 'addr-' + Date.now(),
        name,
        phone,
        fullAddress: street,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddr]);
      setName('');
      setPhone('');
      setStreet('');
      setShowForm(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Xác nhận xóa địa chỉ giao nhận này?')) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4B896]/30 pb-3">
          <h3 className="text-2xl font-bold text-[#2C1A0E]">
            DANH SÁCH ĐỊA CHỈ GIAO NHẬN
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center gap-1 cursor-pointer"
          >
            <Plus size={14} />
            Thêm địa chỉ
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddAddress} className="p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Họ Tên Nhận Hàng</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Số Điện Thoại</label>
                <input
                  type="tel"
                  required
                  placeholder="0901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Địa Chỉ Chi Tiết</label>
              <input
                type="text"
                required
                placeholder="Số nhà, Tên đường, Quận, Tỉnh"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-10 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold uppercase rounded-sm"
              >
                Lưu Địa Chỉ
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#D4B896] text-[#5C3D1E] text-[11px] font-bold uppercase rounded-sm"
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {addresses.length === 0 ? (
            <p className="text-sm text-[#9C8670] italic">Chưa khai báo địa chỉ nhận hàng nào.</p>
          ) : (
            addresses.map((a) => (
              <div
                key={a.id}
                className="p-4 border border-[#D4B896] rounded-md bg-[#FDF6E3] hover:border-[#C9973A] transition-all flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#2C1A0E]">{a.name}</span>
                    <span className="text-xs text-[#5C3D1E]">{a.phone}</span>
                    {a.isDefault && (
                      <span className="flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-[#3A6B4A] bg-[rgba(58,107,74,0.1)] text-[#3A6B4A] rounded-sm">
                        <Home size={10} /> Mặc Định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#2C1A0E]">{a.fullAddress}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!a.isDefault && (
                    <button
                      onClick={() => handleSetDefault(a.id)}
                      className="px-3 py-1.5 border border-[#D4B896] text-xs font-bold text-[#5C3D1E] uppercase hover:bg-[#5C3D1E]/5 rounded-sm cursor-pointer"
                    >
                      Đặt làm mặc định
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-2 border border-[#D4B896] text-[#7B1C2E] hover:bg-[#7B1C2E]/5 rounded-sm cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProfileLayout>
  );
}
