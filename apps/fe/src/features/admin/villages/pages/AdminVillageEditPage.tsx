import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';
import { useAdminVillage, useUpdateVillage, useCreateStage, useDeleteStage } from '../hooks/useAdminVillages';

export default function AdminVillageEditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: village, isLoading } = useAdminVillage(id ?? '');
  const updateVillage = useUpdateVillage();
  const createStage = useCreateStage(id ?? '');
  const deleteStage = useDeleteStage();

  const [form, setForm] = useState({
    nameVi: '', nameEn: '', taglineVi: '', taglineEn: '',
    shortDescVi: '', shortDescEn: '',
    artisanStoryVi: '', artisanStoryEn: '',
    artisanQuoteVi: '', artisanQuoteEn: '',
  });
  const [saved, setSaved] = useState(false);
  const [newStage, setNewStage] = useState({ titleVi: '', titleEn: '', descVi: '', descEn: '' });
  const [addingStage, setAddingStage] = useState(false);

  useEffect(() => {
    if (village) {
      setForm({
        nameVi: village.name.vi, nameEn: village.name.en,
        taglineVi: village.tagline.vi, taglineEn: village.tagline.en,
        shortDescVi: village.shortDescription.vi, shortDescEn: village.shortDescription.en,
        artisanStoryVi: village.artisanStory.vi, artisanStoryEn: village.artisanStory.en,
        artisanQuoteVi: village.artisanQuote.vi, artisanQuoteEn: village.artisanQuote.en,
      });
    }
  }, [village]);

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateVillage.mutateAsync({
      id,
      data: {
        name: { vi: form.nameVi, en: form.nameEn },
        tagline: { vi: form.taglineVi, en: form.taglineEn },
        shortDescription: { vi: form.shortDescVi, en: form.shortDescEn },
        artisanStory: { vi: form.artisanStoryVi, en: form.artisanStoryEn },
        artisanQuote: { vi: form.artisanQuoteVi, en: form.artisanQuoteEn },
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddStage = async () => {
    if (!newStage.titleVi) return;
    await createStage.mutateAsync({
      title: { vi: newStage.titleVi, en: newStage.titleEn },
      description: { vi: newStage.descVi, en: newStage.descEn },
      order: (village?.stages?.length ?? 0) + 1,
    });
    setNewStage({ titleVi: '', titleEn: '', descVi: '', descEn: '' });
    setAddingStage(false);
  };

  const handleDeleteStage = async (stageId: string) => {
    if (!confirm('Xóa giai đoạn này?')) return;
    await deleteStage.mutateAsync(stageId);
  };

  if (isLoading) return <div className="text-gray-400 text-sm p-8">Đang tải...</div>;
  if (!village) return <div className="text-gray-400 text-sm p-8">Không tìm thấy làng nghề.</div>;

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/villages" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa làng nghề</h1>
          <p className="text-sm text-gray-400">{village.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Thông tin cơ bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Tên (Tiếng Việt)">
              <input value={form.nameVi} onChange={set('nameVi')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </Field>
            <Field label="Tên (English)">
              <input value={form.nameEn} onChange={set('nameEn')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </Field>
            <Field label="Tagline (VI)">
              <input value={form.taglineVi} onChange={set('taglineVi')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </Field>
            <Field label="Tagline (EN)">
              <input value={form.taglineEn} onChange={set('taglineEn')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </Field>
          </div>
          <Field label="Mô tả ngắn (VI)">
            <textarea rows={2} value={form.shortDescVi} onChange={set('shortDescVi')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
          <Field label="Mô tả ngắn (EN)">
            <textarea rows={2} value={form.shortDescEn} onChange={set('shortDescEn')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
        </div>

        {/* Artisan Story */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Câu chuyện nghệ nhân</h2>
          <Field label="Câu chuyện (VI)">
            <textarea rows={3} value={form.artisanStoryVi} onChange={set('artisanStoryVi')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
          <Field label="Câu chuyện (EN)">
            <textarea rows={3} value={form.artisanStoryEn} onChange={set('artisanStoryEn')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
          </Field>
          <Field label="Trích dẫn (VI)">
            <input value={form.artisanQuoteVi} onChange={set('artisanQuoteVi')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </Field>
          <Field label="Trích dẫn (EN)">
            <input value={form.artisanQuoteEn} onChange={set('artisanQuoteEn')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </Field>
        </div>

        <button type="submit" disabled={updateVillage.isPending}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors cursor-pointer ${saved ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
          {saved ? <><Check size={15} /> Đã lưu!</> : updateVillage.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>

      {/* Stages */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Giai đoạn chế tác ({village.stages?.length ?? 0})</h2>
          <button onClick={() => setAddingStage((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 cursor-pointer">
            <Plus size={13} /> Thêm giai đoạn
          </button>
        </div>

        {addingStage && (
          <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Tên giai đoạn (VI) *" value={newStage.titleVi} onChange={(e) => setNewStage((p) => ({ ...p, titleVi: e.target.value }))}
                className="h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
              <input placeholder="Stage title (EN)" value={newStage.titleEn} onChange={(e) => setNewStage((p) => ({ ...p, titleEn: e.target.value }))}
                className="h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
              <input placeholder="Mô tả (VI)" value={newStage.descVi} onChange={(e) => setNewStage((p) => ({ ...p, descVi: e.target.value }))}
                className="h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
              <input placeholder="Description (EN)" value={newStage.descEn} onChange={(e) => setNewStage((p) => ({ ...p, descEn: e.target.value }))}
                className="h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddStage} disabled={createStage.isPending}
                className="px-4 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 cursor-pointer">
                {createStage.isPending ? 'Đang thêm...' : 'Thêm'}
              </button>
              <button onClick={() => setAddingStage(false)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 cursor-pointer">
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {(village.stages ?? []).sort((a, b) => a.order - b.order).map((stage) => (
            <div key={stage._id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">{stage.order}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{stage.title.vi}</p>
                <p className="text-xs text-gray-400">{stage.title.en}</p>
                {stage.description.vi && <p className="text-xs text-gray-500 mt-0.5">{stage.description.vi}</p>}
              </div>
              <button onClick={() => handleDeleteStage(stage._id)}
                className="p-1 text-gray-400 hover:text-red-500 cursor-pointer shrink-0"><Trash2 size={14} /></button>
            </div>
          ))}
          {(village.stages?.length ?? 0) === 0 && (
            <p className="text-sm text-gray-400">Chưa có giai đoạn nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
