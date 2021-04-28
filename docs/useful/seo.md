## Поисковые роботы

По умолчанию индексирование поисковиками разрешено.

Если вы хотите, что бы ваш сайт был закрыт от индексирования, то в настройках Netlify надо присвоить переменной окружения **NO_INDEX** значение `true`.

## Длина контента

Для поисковика содержимое страницы должно быть по меньшей мере 300 слов.

Источник: [The Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

## Поля Frontmatter

| Имя поля | Рекомендованая длина  | Значение | Первоисточник  | Комментарий                             |
| ------   | ---------             | -------- | ----------     | --------------------------------------- |
| **metaTitle**         | до 50-60 символов. строка будет обрезана гуглом визуально до 600px на странице SERP| `Главная ключевая фраза` `Второстепенная ключевая фраза` \| `Ваш бренд`<br>Уникальное для каждой страницы сайта.    | [What is a meta title tag?](https://moz.com/learn/seo/title-tag), [Create good titles and snippets in Search Results](https://support.google.com/webmasters/answer/35624?hl=en) | Если **metaTitle** отсутствует, то поле **title** будет использовано          |
| **metaDescription**   | 50-160 символов  | 1 параграф из 1-2 предложений. Без кавычек `"` и спецсимволов.<br>Уникальное для каждой страницы сайта.      | [What is a meta description?](https://moz.com/learn/seo/meta-description), [How to create the right meta description](https://yoast.com/meta-descriptions/)                     | Если **metaDescription** отсутствует, то поле **headline** будет использовано |
| cover: **alt**               | до 125 символов | | [What is Alt Text?](https://moz.com/learn/seo/alt-text)                                                                                                                         |                                                          |
| image: **alt**


:bulb: Для полей **metaTitle** и **metaDescription** не пользуйтесь всеми заглавными буквами, т.к. они хуже читаются и занимают больше места при выводе на странице SERP (Search Engine Result Page).


:warning: В случае, если отсутствуют и **metaDescription** и **headline**, то будет использовано соответствующее языку страницы содержимое поля **siteDescription** из файла конфигурации `[CONTENT_DIR]/config/locales.js`.

## Карта сайта (**Sitemap**)

На финальном этапе генерации сайта автоматически выполняется ряд действий:

1. Генерируется файл `sitemap.xml` 
2. Добавляется в `<HEAD>` каждой страницы линк на сайтмэп.
3. Прописывается сайтмэп в `robots.txt`.

В карту сайта автоматически добавляется аттрибут **lastmod** с датой построения сайта. Вы можете запретить генерацию **lastmod** или установить **lastmod** по значению поля **dateModified** из Frontmatter.

По умолчанию в карту сайта добавляются все изображения, связанные со страницей.

Изображения с незаполненным альтернативным текстом **ALT** по умолчанию исключаются из карты сайта.

Эти все свойства определяется настройками плагина в файле `gatsby-config.js`.  


Подробне о Sitemap

- [О файлах Sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=ru)
- [Отправка локализованных версий страницы в Google](https://developers.google.com/search/docs/advanced/crawling/localized-versions?hl=ru)
- [Файлы Sitemap для изображений](https://developers.google.com/search/docs/advanced/sitemaps/image-sitemaps?hl=ru)
- [Quick guide to IPTC Photo Metadata and Google Images](https://iptc.org/standards/photo-metadata/quick-guide-to-iptc-photo-metadata-and-google-images/)

## Новостная лента - RSS

Во время компиляции в корне сайта создается файл `rss.xml`. В него включаются тридцать последних постов согласно даты публикации.

Подробнее о RSS [здесь](https://ru.wikipedia.org/wiki/RSS).

## Стратегия индексации страницы "Блог"

- Все страницы пагинации просматриваются роботами и индексируется.
- С проблемой дублирования контента разбирается поисковик.
- В хед страницы добавляются по необходимости линки с атрибутами `rel=next` и `rel=prev`.


Источник: [Google поменял rel=prev/next и все сломали пагинацию — Вот как всё исправить](https://ahrefs.com/blog/ru/rel-prev-next-pagination/)
