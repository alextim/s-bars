Настройки сайта находятся в двух JavaScript-файлах:

- `[CONTENT_DIR]/config/locales.js`
- `[CONTENT_DIR]/config/website.js`

:bulb: Если необходима настройка, то рекомендуется привлечение :sunglasses: программиста!

## Общие

Файл: `[CONTENT_DIR]/config/website.js`

Обязательные поля:

- **siteUrl**
Измените это `https://s-bars.netlify.app` на действительный адрес сайта (БЕЗ СЛЭША В КОНЦЕ!).

- **noRobots**
`true` если вы хотите запретить индексирования сайта (добавляет в хедер серверного ответа `X-Robots-Tag: noindex, nofollow`).


- **content**
Имя репозитория с данными.


Оставьте значения нижеперечисленных переменных пустыми, если вы не используете или Google Analytics или Facebook App или Twitter:

- **googleAnalyticsID**
Идентификатор отслеживания представляет собой строку вида UA-000000-2. Это обязательный элемент кода отслеживания, по которому Google Аналитика определяет, в какой аккаунт и ресурс передавать данные.  


- **fbAppID**
Чтобы воспользоваться статистикой Facebook, добавьте на страницу ID приложения. Статистика позволяет просматривать информацию о переходах на ваш сайт из Facebook. ID приложения указан в панели приложений.  


- **twitterSite**
- **twitterCreator**

- **noBreadcrumns**
По умолчанию `false`. Если значение `true`, то запрещает микроразметку **Breadcrumbs** в плагине `at-seo`.

## Языки

`uk` и `ru`

Файл: `[CONTENT_DIR]/config/locales.js`

По содержимому этого файла во время компиляции сайта добавляется префикс языка к адресам страниц, создается переключатель языков, SEO и многое другое.

Пример содержимого

```js
module.exports = {
  // входит в имя файла
  // например: index.uk.md
  uk: {
    // язык сайта по умолчанию
    default: true,

    // язык страницы
    // 1. тег <html>
    // 2. <meta>
    // 3. sitemap.xml
    // 4. structured data  "@type": "WebSite" - inLanguage
    // 5. structured data  "@type": "WebPage", "Blog", "Article", "BlogPosting" - inLanguage
    htmlLang: 'uk', // uk-ua

    // формат вывода дат и чисел
    formatLocale: 'uk-UA',

    // 1. manifest.webmanifest - lang
    // 2. <meta> - язык OpenGraph
    ogLocale: 'uk_UA',

    name: 'Ukranian',

    // 1. пепеключатеь языков
    shortName: 'Укр',

    localName: 'Український',
    shortLocalName: 'Укр',

    dateFormat: 'dd.MM.yyyy',

    // 1. manifest.webmanifest - name
    // 2. alt для лого в хедере
    // 3. тег <title>, если поля title и metaTitle не заполнены
    // 4. structured data  "@type": "WebSite" - name
    siteTitle: 'КОМПАНІЯ «СНІЖНИЙ БАРС»',

    // 1. manifest.webmanifest - description
    // 2. <meta> - если не заполнены поля headline, metaDescription
    // 3. structured data "@type": "Organization" - description
    // 4. structured data  "@type": "WebSite" - description
    siteDescription:
      'Мы предлагаем широкий спектр услуг в сфере промальпа, заказывайте строительные работы на высоте от компании Снежный Барс.',
    
    // 1. manifest.webmanifest - short_name
    // 2. выводится рядом с лого в хедере
    siteShortName: 'СНІЖНИЙ БАРС',
  },

  // второй языык сайта
  // будет добавлен в URL
  ru: {
    htmlLang: 'ru', // ru-UA
```

