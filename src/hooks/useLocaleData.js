import { useLocale } from '../i18n/i18n-context';
import i18n from '../i18n';

const useLocaleData = () => {
  const { locale } = useLocale();

  return i18n.locales[locale];
};

export default useLocaleData;
