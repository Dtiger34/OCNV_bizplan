import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, MapPin, Info } from 'lucide-react';

interface Hotspot { id: string; label: string; description: string; x: number; y: number; }

const INIT: Hotspot[] = [
  { id: 'h1', label: 'Bàn xoay gốm', description: 'Nghệ nhân dùng bàn xoay tre để tạo hình nồi gốm thủ công.', x: 35, y: 55 },
  { id: 'h2', label: 'Lò nung gạch bầu', description: 'Lò nung truyền thống hình bầu, duy trì nhiệt độ 1200°C.', x: 70, y: 40 },
];

export default function AdminHotspotPage() {
  const { id } = useParams();
  const [hotspots, setHotspots] = useState<Hotspot[]>(INIT);
  const [selected, setSelected] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: '', description: '' });

  const selectedHotspot = hotspots.find((h) => h.id === selected);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!adding) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newH: Hotspot = { id: `h${Date.now()}`, label: form.label || 'Hotspot mới', description: form.description, x, y };
    setHotspots((p) => [...p, newH]);
    setSelected(newH.id);
    setAdding(false);
    setForm({ label: '', description: '' });
  };

  const updateSelected = (field: 'label' | 'description', value: string) => {
    if (!selected) return;
    setHotspots((p) => p.map((h) => h.id === selected ? { ...h, [field]: value } : h));
  };

  const remove = (id: string) => { setHotspots((p) => p.filter((h) => h.id !== id)); setSelected(null); };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Hotspot AR</h1>
          <p className="text-sm text-gray-400">Sản phẩm: {id}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>Click vào ảnh để đặt hotspot. Hotspot sẽ hiển thị khi người dùng trải nghiệm AR.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image canvas */}
        <div className="lg:col-span-2 space-y-3">
          <div
            className={`relative bg-gray-100 rounded-xl overflow-hidden border-2 ${adding ? 'border-blue-400 cursor-crosshair' : 'border-gray-200'}`}
            style={{ aspectRatio: '4/3' }}
            onClick={handleImageClick}
          >
            <img
              src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80"
              alt="product"
              className="w-full h-full object-cover pointer-events-none"
            />
            {hotspots.map((h) => (
              <button
                key={h.id}
                onClick={(e) => { e.stopPropagation(); setSelected(h.id); setAdding(false); }}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${selected === h.id ? 'bg-blue-600 border-white scale-110 shadow-lg' : 'bg-amber-500 border-white hover:scale-110 shadow-md'}`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                title={h.label}
              >
                <MapPin size={14} className="text-white" />
              </button>
            ))}
            {adding && (
              <div className="absolute inset-0 bg-blue-500/5 flex items-center justify-center pointer-events-none">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">Click để đặt hotspot</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { setAdding((p) => !p); setSelected(null); }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${adding ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            <Plus size={15} /> {adding ? 'Đang chờ click vào ảnh...' : 'Thêm hotspot mới'}
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Edit selected */}
          {selectedHotspot && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">Chỉnh sửa hotspot</h3>
                <button onClick={() => remove(selectedHotspot.id)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={15} /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Nhãn</label>
                  <input value={selectedHotspot.label} onChange={(e) => updateSelected('label', e.target.value)}
                    className="mt-1 w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Mô tả</label>
                  <textarea rows={3} value={selectedHotspot.description} onChange={(e) => updateSelected('description', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
                </div>
                <div className="text-xs text-gray-400">Vị trí: ({selectedHotspot.x.toFixed(1)}%, {selectedHotspot.y.toFixed(1)}%)</div>
              </div>
            </div>
          )}

          {/* Hotspot list */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Danh sách hotspot ({hotspots.length})</h3>
            {hotspots.length === 0 && <p className="text-sm text-gray-400">Chưa có hotspot nào.</p>}
            {hotspots.map((h) => (
              <div key={h.id} onClick={() => setSelected(h.id)}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selected === h.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${selected === h.id ? 'bg-blue-600' : 'bg-amber-500'}`}>
                  <MapPin size={11} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">{h.label}</p>
                  <p className="text-xs text-gray-400 truncate">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
