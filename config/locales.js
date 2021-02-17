/**
 * webmanifest   - gatsby-config.js: htmlLang, siteTitle, siteDescription, siteShortName
 * SEO           - SeoBase.jsx:      htmlLang, siteTitle, siteDescription, siteHeadline, ogLocale
 * publishedDate - PostInfo.jsx:     formatLocale
 * Site Title    - Logo.jsx:         siteShortName
 */
module.exports = {
  ua: {
    default: true,

    htmlLang: 'uk',
    formatLocale: 'ua-UA',
    ogLocale: 'uk_UA',
    name: 'Ukranian',
    shortName: 'Ukr',
    localName: 'Український',
    shortLocalName: 'Укр',

    dateFormat: 'dd.MM.yyyy',

    siteTitle: 'КОМПАНІЯ «СНІЖНИЙ БАРС»',
    siteDescription:
      'Услуги промышленного альпинизма по Украине, заказывайте строительные работы на высоте ☎+38 (096) 555-30-92 от компании Снежный Барс.',
    siteHeadline: 'Промышленный альпинизм и высотные работы, промальп | Снежный Барс',
    siteShortName: 'СНІЖНИЙ БАРС',
  },

  ru: {
    htmlLang: 'ru',
    formatLocale: 'ru-UA',
    ogLocale: 'ru_UA',
    name: 'Russian',
    shortName: 'Рус',
    localName: 'Русский',
    shortLocalName: 'Рус',

    dateFormat: 'dd.MM.yyyy',

    siteTitle: 'КОМПАНИЯ «СНЕЖНЫЙ БАРС»',
    siteDescription:
      'Услуги промышленного альпинизма по Украине, заказывайте строительные работы на высоте ☎+38 (096) 555-30-92 от компании Снежный Барс.',
    siteHeadline: 'Промышленный альпинизм и высотные работы, промальп | Снежный Барс',
    siteShortName: 'СНЕЖНЫЙ БАРС',
  },
};
