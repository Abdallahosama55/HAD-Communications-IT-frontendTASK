import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';

export function useTranslation() {
  const { language } = useTheme();
  
  const t = (key: string): string => {
    return getTranslation(key, language);
  };
  
  return { t, language };
}
