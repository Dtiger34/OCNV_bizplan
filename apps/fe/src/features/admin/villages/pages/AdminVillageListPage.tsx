import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { useAdminVillages } from '../hooks/useAdminVillages';

export default function AdminVillageListPage() {
  const navigate = useNavigate();
  const { data: villages = [], isLoading } = useAdminVillages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Làng nghề</h1>
        <p className="text-sm text-gray-500 mt-0.5">{villages.length} làng nghề trong hệ thống</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Làng nghề</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Slug</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Tagline</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-gray-400 text-sm">Đang tải...</td></tr>
            )}
            {!isLoading && villages.length === 0 && (
              <tr><td colSpan={4} className="py-16 text-center text-gray-400 text-sm">Không có dữ liệu.</td></tr>
            )}
            {villages.map((v) => (
              <tr key={v._id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {v.coverImageUrl ? (
                      <img src={v.coverImageUrl} alt={v.name.vi} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">
                        {v.name.vi[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{v.name.vi}</p>
                      <p className="text-xs text-gray-400">{v.name.en}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell font-mono text-xs">{v.slug}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell text-xs truncate max-w-[240px]">{v.tagline?.vi ?? '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => navigate(`/admin/villages/${v._id}/edit`)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer mx-auto block" title="Sửa">
                    <Pencil size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
