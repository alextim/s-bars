import { useAppContext } from '../context';
import translate from './translate';

const useTranslation = () => {
  const { translations } = useAppContext();

  return { t: (key, params = {}) => translate(key, translations, params) };
};

/**
 * old ver
 * works with Json
 */
/*
const KEY_SEPARATOR = '.';

function find(keys, i, o) {
  if (i === keys.length) {
    return undefined;
  }
  const key = keys[i];
  const result = o[key];
  if (!result) {
    return undefined;
  }
  if (i === keys.length - 1) {
    return result;
  }
  return find(keys, i + 1, result);
}

const useTranslation = () => {
  const { translations } = useLocale();

  const t = (key, params = {}) => {
    if (!key) {
      return 'Undefined translation key';
    }

    const keys = key.split(KEY_SEPARATOR);
    let s = find(keys, 0, translations);
    if (typeof s !== 'string') {
      return key;
    }
    if (!params) {
      return s;
    }
    const ids = Object.keys(params);
    if (ids.length === 0) {
      return s;
    }
    ids.forEach((id) => {
      s = s.replace(`{{${id}}}`, params[id]);
    });
    return s;
  };

  return { t };
};
*/
export default useTranslation;
