import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n';

type Language = 'vi' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'vi',
      setLanguage: (language) => {
        set({ language });
        i18n.changeLanguage(language);
      },
    }),
    { name: 'ocnv-language' },
  ),
);
