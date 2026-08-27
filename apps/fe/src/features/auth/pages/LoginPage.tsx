import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLogin } from '../hooks/useAuth';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const login = useLogin();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password }, {
      onSuccess: (user) => {
        setUser({ _id: user._id, fullName: user.fullName, email: user.email, role: user.role as 'customer' | 'admin', avatarUrl: user.avatarUrl ?? undefined });
        toast.success(t('auth.login_success'));
        navigate('/');
      },
      onError: () => {
        toast.error(t('auth.login_failed'));
      },
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-md">
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">

        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">
            {t('auth.login_system')}
          </span>
          <h2 className="text-3xl font-normal text-[#ab2124] text-title-gradient">
            {t('auth.login_title')}
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
              {t('auth.email_label')}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                {t('auth.password_label')}
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#ab2124] hover:text-[#7B1C2E] underline"
              >
                {t('auth.forgot_pwd')}
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full h-12 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            {login.isPending ? t('auth.logging_in') : t('auth.login_btn')}
          </button>
        </form>

        <div className="text-center text-xs text-[#ab2124] pt-2 border-t border-[#D4B896]/20">
          {t('auth.no_account')}{' '}
          <Link to="/register" className="text-[#7B1C2E] hover:underline font-bold">
            {t('auth.register_link')}
          </Link>
        </div>
      </div>
    </div>
  );
}
