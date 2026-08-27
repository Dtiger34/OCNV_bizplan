import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { useRegister } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('auth.pwd_mismatch'));
      return;
    }
    register.mutate({ fullName, email, password }, {
      onSuccess: () => {
        toast.success(t('auth.register_success'));
        navigate('/login');
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err?.message || t('auth.register_failed');
        toast.error(msg);
      },
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-12 max-w-md">
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">

        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">
            {t('auth.register_system')}
          </span>
          <h2 className="text-3xl font-normal text-[#ab2124] text-title-gradient">
            {t('auth.register_title')}
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
              {t('auth.name_label')}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
              {t('auth.email_label')}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
              {t('auth.pwd_min_label')}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={8}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
              {t('auth.pwd_confirm_label')}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={register.isPending}
            className="w-full h-12 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <UserPlus size={16} />
            {register.isPending ? t('auth.registering') : t('auth.register_btn')}
          </button>
        </form>

        <div className="text-center text-xs text-[#ab2124] pt-2 border-t border-[#D4B896]/20">
          {t('auth.has_account')}{' '}
          <Link to="/login" className="text-[#7B1C2E] hover:underline font-bold">
            {t('auth.login_link')}
          </Link>
        </div>
      </div>
    </div>
  );
}
