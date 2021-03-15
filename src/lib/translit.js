const ru = {
  г: 'g',
  и: 'i',
  й: 'j',
  ц: 'c',
};
const uk = {
  г: 'h',
  и: 'y',
  й: 'i',
  ц: 'ts',
};
const common = {
  а: 'a',
  б: 'b',
  в: 'v',

  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',

  з: 'z',

  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',

  є: 'ie',
  ї: 'i',
  і: 'i',
  ю: 'iu',
  я: 'ia',

  ґ: 'g',
  "'": '',
};

const first = {
  є: 'ye',
  ї: 'yi',
  й: 'y',
  ю: 'yu',
  я: 'ya',
};

const translit = (src, locale = 'uk') => {
  if (!src) {
    return src;
  }

  let prepared = src.toLowerCase();
  let all;

  if (locale === 'uk') {
    prepared = prepared.replace('зг', 'zgh');
    all = { ...common, ...uk };
  } else {
    all = { ...common, ...ru };
  }
  return prepared
    .split(' ')
    .map((w) => {
      const n = w.length;
      let s = '';
      for (let i = 0; i < n; i++) {
        const c = w[i];
        let r;
        if (i === 0) {
          if (locale === 'uk') {
            r = first[c];
          }
        }

        if (r === undefined) {
          r = all[c];
        }
        s += r !== undefined ? r : c;
      }
      return s;
    })
    .join(' ');
};

module.exports = translit;
