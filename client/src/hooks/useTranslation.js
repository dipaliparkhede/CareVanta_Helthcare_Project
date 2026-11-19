import { useSelector } from 'react-redux';
import { translations } from '../utils/translations';

export default function useTranslation() {
  const language = useSelector((state) => state.ui?.language) || 'en';

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  return { t, language };
}
