'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Direction = 'ltr' | 'rtl';
type Language = 'en' | 'ar';

interface ThemeContextType {
  theme: Theme;
  direction: Direction;
  language: Language;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setDirection: (direction: Direction) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  toggleDirection: () => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [direction, setDirection] = useState<Direction>('ltr');
  const [language, setLanguage] = useState<Language>('en');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    const savedDirection = localStorage.getItem('direction') as Direction || 'ltr';
    const savedLanguage = localStorage.getItem('language') as Language || 'en';
    
    setTheme(savedTheme);
    setDirection(savedDirection);
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Apply theme
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setActualTheme(systemTheme);
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      setActualTheme(theme);
      root.classList.toggle('dark', theme === 'dark');
    }

    // Apply direction and language
    root.setAttribute('dir', direction);
    root.classList.toggle('rtl', direction === 'rtl');
    root.setAttribute('lang', language);

    // Save preferences
    localStorage.setItem('theme', theme);
    localStorage.setItem('direction', direction);
    localStorage.setItem('language', language);
  }, [theme, direction, language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      direction,
      language,
      actualTheme,
      setTheme,
      setDirection,
      setLanguage,
      toggleTheme,
      toggleDirection,
      toggleLanguage,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
