'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';

export function SidebarControls() {
  const { actualTheme, language, toggleTheme, toggleLanguage } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{actualTheme === 'dark' ? '🌙' : '☀️'}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('theme')}</span>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="text-sm">{actualTheme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="text-xs font-medium capitalize">{actualTheme}</span>
        </button>
      </div>

      {/* Language Toggle */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{language === 'ar' ? '🇸🇦' : '🇺🇸'}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('language')}</span>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={`Switch to ${language === 'ar' ? 'English' : 'Arabic'}`}
        >
          <span className="text-sm">{language === 'ar' ? '🇺🇸' : '🇸🇦'}</span>
          <span className="text-xs font-medium uppercase">{language === 'ar' ? 'EN' : 'AR'}</span>
        </button>
      </div>
    </div>
  );
}
