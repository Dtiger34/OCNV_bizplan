import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { User, MapPin, ClipboardList, Heart, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const tabs = [
    { name: t('profile.tab_info'), path: '/profile', icon: <User size={16} /> },
    { name: t('profile.tab_address'), path: '/profile/addresses', icon: <MapPin size={16} /> },
    { name: t('profile.tab_orders'), path: '/profile/orders', icon: <ClipboardList size={16} /> },
    { name: t('profile.tab_wishlist'), path: '/profile/wishlist', icon: <Heart size={16} /> }
  ];

  return (
    <div className="container mx-auto px-6 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6 reveal-left">
          <div className="flex items-center gap-3 pb-4 border-b border-[#D4B896]/30">
            <div className="w-12 h-12 rounded-full bg-[#ab2124] text-[#fff8e7] text-2xl font-bold flex items-center justify-center border border-[#C9973A]">
              {user?.fullName?.[0] || 'V'}
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#ab2124]">{user?.fullName || t('profile.default_name')}</h4>
              <span className="text-[9px] text-[#ab2124] uppercase">{user?.email || t('profile.not_logged_in')}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-3 p-3 rounded-[4px] transition-all ${
                    isActive
                      ? 'bg-[#ab2124] text-[#fff8e7] font-semibold'
                      : 'text-[#ab2124] hover:bg-[#ab2124]/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Right */}
        <div className="lg:col-span-3 reveal-right">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState(user?.fullName ?? 'Nguyễn Minh Tuấn');
  const [phone, setPhone] = useState('0901234567');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, fullName });
      toast.success(t('profile.update_success'));
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <h3 className="text-2xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
          {t('profile.title_info')}
        </h3>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('profile.name_label')}</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('profile.phone_label')}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('profile.email_label')}</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full h-11 px-3 border border-[#D4B896]/40 bg-[#EDE3CE] rounded-sm text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle"
          >
            <Save size={16} />
            {t('profile.save_changes')}
          </button>
        </form>

        {/* Change password section */}
        <div className="border-t border-[#D4B896]/30 pt-6 space-y-4">
          <h4 className="text-lg font-bold text-[#ab2124]">{t('profile.change_pwd_title')}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('profile.current_pwd')}</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('profile.new_pwd')}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              if (currentPassword && newPassword) {
                toast.success(t('profile.pwd_success'));
                setCurrentPassword('');
                setNewPassword('');
              } else {
                toast.error(t('profile.pwd_empty'));
              }
            }}
            className="px-6 py-2.5 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            {t('profile.change_pwd_btn')}
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
}
