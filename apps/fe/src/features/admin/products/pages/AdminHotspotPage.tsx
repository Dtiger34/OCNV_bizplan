import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, MapPin, Info } from 'lucide-react';
import { useHotspots, useCreateHotspot, useUpdateHotspot, useDeleteHotspot } from '../hooks/useAdminHotspots';

interface HotspotUI { _id: string; label: string; description: string; x: number; y: number; }

function toUI(h: any): HotspotUI {
  return {
    _id: h._id,
    label: h.title?.vi ?? '',
    description: h.content?.vi ?? '',
    x: typeof h.position?.x === 'number' ? (h.position.x * 100) : 50,
    y: typeof h.position?.y === 'number' ? (h.position.y * 100) : 50,
  };
}

export default function AdminHotspotPage() {
  const { id: productId } = useParams<{ id: string }>();
  const { data: rawHotspots, isLoading } = useHotspots(productId ?? '');
  const createHotspot = useCreateHotspot(productId ?? '');
  const updateHotspot = useUpdateHotspot();
  const deleteHotspot = useDeleteHotspot();

  const hotspots: HotspotUI[] = (rawHotspots ?? []).map(toUI);

  const [selected, setSelected] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: '', description: '' });

  const selectedHotspot = hotspots.find((h) => h._id === selected);

  const handleImageClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!adding) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const y = ((e.clientY - rect.top) / rect.height);
    await createHotspot.mutateAsync({
      slotName: `slot-${Date.now()}`,
      position: { x, y, z: 0 },
      normal: { x: 0, y: 1, z: 0 },
      title: { vi: form.label || 'Hotspot mới', en: form.label || 'New hotspot' },
      content: { vi: form.description, en: form.description },
    });
    setAdding(false);
    setForm({ label: '', description: '' });
  };

  const updateSelected = async (field: 'label' | 'description', value: string) => {
    if (!selected || !selectedHotspot) return;
    const patch = field === 'label'
      ? { title: { vi: value, en: value } }
      : { content: { vi: value, en: value } };
    await updateHotspot.mutateAsync({ id: selected, data: patch });
  };

  const handleDelete = async (id: string) => {
    await deleteHotspot.mutateAsync(id);
    setSelected(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Hotspot AR</h1>
          <p className="text-sm text-gray-400">Sản phẩm: {productId}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>Click vào ảnh để đặt hotspot. Hotspot sẽ hiển thị khi người dùng trải nghiệm AR.</span>
      </div>

      {isLoading && <div className="text-sm text-gray-400">Đang tải hotspot...</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image canvas */}
        <div className="lg:col-span-2 space-y-3">
          <div
            className={`relative bg-gray-100 rounded-xl overflow-hidden border-2 ${adding ? 'border-blue-400 cursor-crosshair' : 'border-gray-200'}`}
            style={{ aspectRatio: '4/3' }}
            onClick={handleImageClick}
          >
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              Ảnh sản phẩm
            </div>
            {hotspots.map((h) => (
              <button
                key={h._id}
                onClick={(e) => { e.stopPropagation(); setSelected(h._id); setAdding(false); }}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${selected === h._id ? 'bg-blue-600 border-white scale-110 shadow-lg' : 'bg-amber-500 border-white hover:scale-110 shadow-md'}`}
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
          {selectedHotspot && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">Chỉnh sửa hotspot</h3>
                <button onClick={() => handleDelete(selectedHotspot._id)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={15} /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Nhãn</label>
                  <input defaultValue={selectedHotspot.label} onBlur={(e) => updateSelected('label', e.target.value)}
                    className="mt-1 w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Mô tả</label>
                  <textarea rows={3} defaultValue={selectedHotspot.description} onBlur={(e) => updateSelected('description', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Danh sách hotspot ({hotspots.length})</h3>
            {hotspots.length === 0 && <p className="text-sm text-gray-400">Chưa có hotspot nào.</p>}
            {hotspots.map((h) => (
              <div key={h._id} onClick={() => setSelected(h._id)}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selected === h._id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${selected === h._id ? 'bg-blue-600' : 'bg-amber-500'}`}>
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
