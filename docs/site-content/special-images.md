Пути указаны относительно папки `[PROJECT_DIR]`.

| №  | Назначение  | Имя файла             | Папка                             | Ш : В   | Размер, px  | Кол-во
|---:|-----------  |---                    |---                                |  ---:   |        ---: |---
|  1 | Site        | favicon.ico           | static/                           | 1 : 1   |   16 x 16   | 1
|    |             |                       |                                   |         |             |
|  2 | OpenGraph   | banner-`{locale}`.jpg | static/assets/images/og/          | 1.9 : 1 | 1200 x 630  | 1 на `locale`
|    |             |                       |                                   |         |             |
|  3 | Twitter     | banner-`{locale}`.jpg | static/assets/images/twitter/1x1/ | 1 : 1   |  450 x 450  | 1 на `locale`
|  4 |             | banner-`{locale}`.jpg | static/assets/images/twitter/2x1/ | 2 : 1   |  600 x 300  | 1 на `locale`
|    |             |                       |                                   |         |             |
|  5 | schema.org  | business-photo.jpg | static/assets/images/organization/1x1/  | 1 : 1  | >  696 x 696 | 1
|  6 |             | business-photo.jpg | static/assets/images/organization/4x3/  | 4 : 3  | > 1200 x 900 | 1
|  7 |             | business-photo.jpg | static/assets/images/organization/16x9/ | 16 : 9 | > 1600 x 900 | 1
|    |             |                       |                                   |         |             |
|  8 | schema.org  | logo.png              | static/assets/images/             |         |             | 1
|  9 | webmanifest | icon.png              | src/assets/images/                | 1 : 1   | > 512 x 512 | 1


*Установите, если надо, свои размеры изображений для Twitter и Facebook OpenGraph и в файле `[CONTENT_DIR]/config/website.js`.*

*Для Twitter и Facebook OpenGraph рекомендуется любое красивое фото с наложенным поверх лого.*

*business-photo.jpg - изображение презентующее ваш бизнес, отображается в поиске Google.*

Источники для ознакомления:

- [favicon.ico](https://en.wikipedia.org/wiki/Favicon)
- [Facebook OpenGrpah](https://developers.facebook.com/docs/sharing/best-practices#images)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image)
- [Местная компания](https://developers.google.com/search/docs/data-types/local-business?hl=ru)
- [Логотип](https://developers.google.com/search/docs/data-types/logo?hl=ru)
- [Add a web app manifest](https://web.dev/add-manifest/)
