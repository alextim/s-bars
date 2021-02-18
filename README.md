# Снежный барс
## Ввведение
### Особенности
Сайт сделан по технологии [JAMStack](https://jamstack.org/).

Для хранения данных используются форматы [YAML](https://yaml.org/) и [Markdown](https://daringfireball.net/projects/markdown/).

Исходные файлы сайта создаются, хранятся и редактируются на локальном компьютере.
Изменения данных отслеживаются распределенной системой контроля версий [Git](https://git-scm.com/).

По команде пользователя система контроля версий [Git](https://git-scm.com/) синхронизирует изменения данных на локальном компьютере с облачным репозиторием [GitHub](https://github.com/).

Облачный репозиторий [GitHub](https://github.com/) связан с облачным провайдером [Netlify](https://netlify.com), который подписан на изменения в вашем репозитории.

После каждого изменения провайдер автоматически скачивает обновленные данные из вашего репозитория себе, запускает генератор статических сайтов [Gatsby](https://www.gatsbyjs.com/), компилирует и публикует обновленную версию сайта.


Для обработки форм и отправки почты используются [бессерверные функции](https://docs.netlify.com/functions/overview/) провайдера и облачный почтовый сервер [SendGrid](https://sendgrid.com/).


Технология JAMStack в комлексе с бессерверными вычислениями позволяют не разворачивать собственный сервер, избежать затрат на хостинг и обслуживание. Статический сайт безопасен, устойчив к атакам и вирусам, обладает хорошим быстродействием.

### Лимиты бесплатных сервисов (на 1 марта 2021 г).

#### Netlify

##### Хостинг

Время на построение сайта (build time) - 300 минут в месяц.
/* В среднем этот сайт из 8 страниц, 9 услуг, 6 типов объектов и 30 постов строится менее, чем за 4 минуты. Итого вы можете обновить такого объема сайт около 80 раз в месяц или 2-3 раза в сутки.

##### Функции

- До 125000 вызовов функций в месяц
- До 100 часов времени исполнения в месяц
- 
#### SendGrid

Посылка 40000 писем за первые 30 дней после регистрации, затем 100 писем в день.

### Лицензия

MIT


## Инсталляция

### Предварительные условия

1. Учетная запись на [SendGrid](https://sendgrid.com). Вы должны получить API key и верифицировать ваш e-mail.
1. Учетная запись на [GitHub](https://github.com).
1. Учетная запись на  [Netlify](https://netlify.com).
1. Инсталлировать **Git** на ваш локальный компьютер. Вы можете загрузить его [отсюда](https://git-scm.com/download).
1. Текстовый редактор. Рекомендуется Visual Studio Code (VSC). Ссылка для [скачивания](https://code.visualstudio.com/download). Желательно дополнительно установить расширения для VSC: "YAML Language Support by Red Hat", "Markdown Preview Enhanced", "markdownlint
1. Графический редактор.

### Пошаговая инструкция

#### Создание fork из репозитория-источника и клонирование на локальный компьютер

1. Зайдите в вашу учетную запись на [GitHub](https://github.com).
1. Откройте браузером репозиторий-источник [здесь](https://github.com/alextim/s-bars).
1. Создайте fork из репозитория-источника - нажмите **Fork** кнопку  (правый верхний угол страницы).
1. После завершения процесса нажмите кнопку **Code**.
1. Скопируйте URL вашего репозитория.  
   Адрес должен будет выглядеть как здесь: `https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.git`.
1. Запустите коммандную строку на вашем компьютере.  
   Для Windows это будет так: `Start` -> `Windows System` -> `Command Prompt`.
1. Перейдите в желаемую папку при помощи `cd` (change directory) комманды.
1. Клонируйте dваш репозиторий-fork в выбранную папку следующей командой:

```cmd
git clone https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.git
```

#### Подключение вашего репозитория к хостингу и построение сайта

1. Зайдите в вашу учетную запись на [Netlify](https://netlify.com).
2. Нажмите кнопку **New site from Git**.
3. Нажмите кнопку **GitHub** на следующем экране.
4. Авторизуйте Netlify для доступа к GitHub в несколько шагов.
   - Нажмите кнопку  **Authorize Application**.
   - Нажмите кнопку  **Install** в последующем диалоговом окне.
   - Введите ваш GitHub пароль.
5. Выберите репозиторий `s-bars`.
6. Проверьте **Site settings**.  
   Следующие поля должны содержать такие значения:
   - **Build command**: `yarn build`
   - **Publish directoty**: `public`
7. Перейдите в раздел **Environment variables**.  
   Добавьте переменные:
   |  Key              | Value
   |---                |---
   | SENDGRID_API_KEY  | ваш SendGrid API ключ 
   | SENDGRID_TO_EMAIL | ваш e-mail, верифицированный SendGrid
   | WARNINGS          | true


8. Нажмите кнопку **Deploy site**.
   Netlify начнет компиляцию сайта. Через несколько минут ваш сайт будет on-line!

## Публикация изменений

1. Правьте данные сайта на локальном компьютере выбранной программой редактирования.
2. Запустите командную строку.
3. Перейдите в папку, где хранятся ваши файлы и репозитория при помощи команды `cd`.
4. Commit результаты редактирования на локальном компьютере и push изменения из локального репозитория в удаленный репозиторий.
   Запустите последовательно следующие комманды:

```
git add .
git commit -m 'ВАШ КОММЕНТАРИЙ'
git push
```

Ваш сайт будет обновлен и опубликован облачным провайдером автоматически после команды push.

## Разрешение проблем построения сайта

### Сайт не обновляется

1. Зайдите в вашу учетную запись на [Netlify](https://netlify.com).
2. Нажмите **Sites**
3. Выберите ваш сайт
4. Нажмите **Deploys**
Вы попадете на страницу со списком асех компиляций вашего сайта, отсортированный по времени в порядке убывания.


Если последняя компиляция в статусе **Published** (зеленая метка) 

1. Нажмите кнопку **Trigger deploy**
1. Выберите **Clear cache and deploy site**
1. Очистите кеш браузера, сайт должен обновиться.


Если последняя компиляция в статусе **Failed** (красная метка) 

1. Нажмите на стрелочку `>` справа для перехода на страницу **Deploy details**
2. Просмотрите содержимое окна **Deploy log** и найдите описание ошибки. Ошибка будет подсвечена красным.
Скорее всего у вас не правильно оформлен файл Markdown или Yaml. В логе это будет отражено название файла и место, где неправильно оформлено. Если это так, то исправьте ошибки оформления на локальной машине, сделайте commit и push. Сайт будет построен автоматически.

Если причина другая, то потребуется помощь специалиста.

## Правила именования файлов

- самообъясняющие имена
- только English алфавит
- все символы в нижнем регистре
- без пробелов
- не использовать транслитерацию
- используйте дефис `-` для разделения слов
- без точек, подчеркивание или специальных символов

хорошо:

- `weekend-with-family.jpg`
- `my-awesome-file.png`

плохо:

- `asdasda-cajjqq1sd.jpg` - непонятное имя
- `мой-красивый-файл.jpg`- не английский алфавит
- `MyAwesomeFile.jpg` - заглавные буквы
- `moi-prijatnii-fail.jpg` - транслитерация
- `my_awesome_file.jpg` - подчеркивания
- `my.awesome.file.jpg` - точки


## SEO

| Поле из Frontmatter | Рекомендованая длина  | Подробнее                                                                                                                                                                       | Комментарий                                                                |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| metaTitle         | до 60 сиволов      | [What is a meta title tag?](https://moz.com/learn/seo/title-tag), [Create good titles and snippets in Search Results](https://support.google.com/webmasters/answer/35624?hl=en) | Если **metaTitle** отсутствует, то поле **title** будет использовано          |
| metaDescription   | 50-160 символов        | [What is a meta description?](https://moz.com/learn/seo/meta-description), [How to create the right meta description](https://yoast.com/meta-descriptions/)                     | Если **metaDescription** отсутствует, то поле **description** будет использовано |
| alt               | до 125 символов | [What is Alt Text?](https://moz.com/learn/seo/alt-text)                                                                                                                         | images                                                              |

***В случае, если отсутствуют и **metaDescription** и **description**, то будет использовано содержимое поля **siteDescription** из `[PROJECT_DIR]/config/locales.js`.*

Для поисковика содержимое страницы должно быть по меньшей мере 300 слов.

Источник: [The Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

## Специальные изображения

| Назначение  | Имя файла                       | Папка                           | Пропорции   | Размер, px              | Количество     | Комментарий                                   |
| ----------- | ------------------------------- | ------------------------------- | ----------- | ----------------------- | -------------- | --------------------------------------------- |
| Site        | favicon.ico                     | [PROJECT_DIR]/static            | 1 x 1       | 16 x 16                 | 1              | [Wiki](https://en.wikipedia.org/wiki/Favicon) |
| Site        | default-banner.jpg              | [PROJECT_DIR]/content/assets    | 16 x 8.1    | 1920 x 972              |
| OpenGraph   | og-banner-{locale}.jpg          | [PROJECT_DIR]/static/assets     | 1.9 x 1     | 1200 x 630 or 600 x 315 | 1 на 1 язык    | красивая картинка с наложенным лого           |
| Twitter     | twitter-banner-2x1-{locale}.jpg | [PROJECT_DIR]/static/assets     | 2 x 1       | 600 x 300               | 1 на 1 язык    | красивая картинка с наложенным лого           |
| Twitter     | twitter-banner-1x1-{locale}.jpg | [PROJECT_DIR]/static/assets     | 1 x 1       | 450 x 450               | 1 на 1 язык    | красивая картинка с наложенным лого           |
| schema.org  | business-photo.jpg              | [PROJECT_DIR]/static/assets     |             |                         | 1-3            | фото презентующее ваш бизнес                  |
| schema.org  | logo.svg                        | [PROJECT_DIR]/static/assets     |             |                         | 1              |
| webmainfest | icon.png                        | [PROJECT_DIR]/src/assets/images | 1 x 1       | > 512 x 512             | 1

*Установите, если надо, свои размеры изображений для OpenGraph и Twitter в файле `[PROJECT_DIR]/config/website.js`*

**{locale} = язык, `ua` или `ru`*


## Ссылки

Ссылки на _внешние сайты_ потенциально небезопасны и ухудшают SEO.
Чтобы защитить ваш сайт и улучшите ваш SEO всегда добавляйте атрибут `rel="nofollow noreferrer noopener"` к ссылке на внешний сайт.
А добавление аттрибута `target="_blank"` заставит браузер открыть сторонний сайт в новой вкладке, а не просто уведет пользовотеля с вашего сайта.

плохо:

```html
<a href="http://rada.com.ua/rus/catalog/62609/">Компания "Снежный Барс"</a>
```

хорошо:

```html
<a href="http://rada.com.ua/rus/catalog/62609/" target="_blank" rel="nofollow noreferrer noopener">Компания "Снежный Барс"</a>
```

## Настройки

Настройки сайта находятся в двух JavaScript-файлах:

- `[PROJECT_DIR]\config\locales.js`
- `[PROJECT_DIR]\config\website.js`

Для настройки привлекайте программиста!

### Общие

Файл: `[PROJECT_DIR]\config\website.js`
Обязательные поля:

- siteUrl
Измените это `https://s-bars.netlify.app` на действительный адрес сайта (БЕЗ СЛЭША В КОНЦЕ!).


Оставьте значения переменных пустыми, если вы не используете или Google Analytics или Facebook App или Twitter:

- `googleAnalyticsID`
- `fbAppID`
- `twitterSite`
- `twitterCreator`

### Язык

Файл: `[PROJECT_DIR]\src\config\locales.js`

### Индексирование

Файл: `[PROJECT_DIR]\static\robots.txt`
По умолчанию индексирование поисковиками запрещено.

```env
User-agent: *
Disallow: /

sitemap: https://s-bars.netlify.app/sitemap.xml
```

Если вы хотите, что бы ваш сайт был проиндексирован **Google** уберите бэк-слэш после Disallow:

```env
User-agent: *
Disallow:

sitemap: https://your-actual-site-address/sitemap.xml
```


### Компиляция

#### Режим разработки

Компилятор в режиме разработки использует файл переменных окружения `[PROJECT_DIR]\.env.development`.


В файле хранятся три переменных:

```env
LOCALES = ua ru
ONLY = / /inquiry
WARNINGS = true
```

В `LOCALES` указываются языки для которых будет генерироваться сайт.
Переменная `ONLY` позволяет ограничить количество создаваемых страниц.
`WARNINGS` выдает или подавляет сообщения во время генерации страниц.
Формат `LOCALES` и `ONLY` список значений, в качестве разделителя используется пробел.
`WARNINGS` - логическая: `true` или `false`.


Для указанной выше конфигурации окружения сайт будет скомпилирован для двух языков `ua` и `ru`. Будут созданы четыре страницы с адресами `/`, `/inquiry`, `/ru/`, `/ru/inquiry`. Во время генерации будут отображаться предупреждения, если есть.


Список языков `LOCALES` будет сопоставлен со списком доступных языков из `[PROJECT_DIR]\config\locales.js`.

#### Режим продакшн

Во время компиляции будут созданы страницы для всех языков согласно списка из `[PROJECT_DIR]\config\locales.js`.

Язык по умолчанию должен иметь свойство `default = true`.
Если не найдено свойство `default = true` ни для одного языка, то первый язык из списка будет принят как язвк по умолчанию.

## Содержимое сайта

Все исходные данные сайта находятся в папке `[PROJECT_DIR]\content`.

Вспомогательные данные хранятся в формате YAML в папке `[PROJECT_DIR]\content\data`. Из вспомогательных данных генерируются элементы страниц: меню, списки телефонов, переводы, адрес и тп.

Исходные данные для создания самих страниц храняться в файлах с расширением `.md` Markdown.

Предлагается следующая организация хранения файлов.
Для каждой страницы создается отдельная папка. В ней файлы с содержимым страниц. Подпапка `\images` для хранения изображений.

Шаблон имени:
`{ИМЯ-ФАЙЛА}.{ЯЗЫК}.md`

ИМЯ-ФАЙЛА: английский алфавит в нижнем регистре, без пробелов, точек или подчеркиваний.
Специальное имя **index** (объяснение в разделе **Правила формирования путей**) .

ЯЗЫК: **uk** или **ru**.

Пример правильно именованных файлов:

```
index.ru.md
home.uk.md
```

## Устройство файла

Внутри файл состоит из двух главных компонентов:

1. Frontmatter - начальная область, обрамленная тремя тире в начале и в конце. Frontmatter хранит внутри себя структурированные данные в формате YAML. В зависимости от назначения файла структура содержимого frontmatter будет отличаться.
2. После замыкающих трех тире идет собственно основной текст в формате Markdown.

### Описание frontmatter

Представленные ниже поля frontmatter являются общими для всех документов сайта

```yaml
---
title: Заголовок страницы. Обязательное поле. По возможности в одно короткое предложение.
description: Описание страницы. Необязательное поле. 1-2 предложения.
metaTitle: для SEO, до 60 сиволов. Если отсутствует, то поле "title" будет использовано.
metaDescription: for SEO, до 50-160 сиволов. Если отсутствует, то поле "description" будет использовано.

cover:
  sm: ФАЙЛ-ИЗОБРАЖЕНИЯ-ДЛЯ-ВАШЕГО-ДОКУМЕНТА.jpg
  xl: НЕОБЯЗАТЕЛЬНЫЙ-ФАЙЛ-ИЗОБРАЖЕНИЯ-ДЛЯ-БОЛЬШИХ-ЭКРАНОВ.jpg
  alt: для SEO, до 125 символов. Текстовая информация отображается при отключенной загрузке графики в браузере.


slug: путь на латиннице, начинающийся с обратного слэша
template: имя JavaScript-файла без расширения, который используется, как шаблон во время компиляции сайта
noindex: "true" или "false" - показать или спрятать документ для поисковых роботов
---
```

### Правила формирования путей

Во время компиляции сайта применяется следующий алгоритм формрования пути:

1. Frontmatter содержит поле **slug**  -> **slug** будет использован в качестве пути
2. Frontmatter не содержит поле **slug** и имя самого файла не начинается со слова **index** -> имя файла будет использовано в качестве пути
3. Frontmatter не содержит поле **slug**, а имя файла начинается со слова **index** -> название родительской папки будет использовано в качестве пути

### Услуги

Папка `[PROJECT_DIR]\content\services`

### Типов объектов

Папка: `[PROJECT_DIR]\content\object-types`


### Посты

Папка: `[PROJECT_DIR]\content\posts`

В frontmatter появляются два дополнительных поля

```yaml
---

publishedDate: 2019-05-01T16:22:00Z
state: published    
---
```

Необязательное поле **publishedDate** c датой и временем публикации поста в формате ISO 8601. Посты сортируются в порядке убывания даты публикации, т.е. сначала показываются более новые.


Необязательное поле **state**. Если поле отсутствует или значение отлично от `published`, то пост будет исключен из сайта.

### Страницы

Папка: `[PROJECT_DIR]\content\pages`

Страницы имеют индивидуальное оформление. Для решения этой задачи содержимое страницы разбито на секции. Каждая секция состоит из заголовка, подзаголовка, текста, изображения и массива элементов. В свою очередь элемент может состоять из заголовка, подзаголовка, текста, изображения, имени иконки и адреса ссылки. Эта структура хранится в frontmatter. 

Для каждого типа страниц на javaScript написан индивидуальный шаблон для вывода этих структурированных данных на экран.

```yaml
---
title: Заголовок страницы
description: Описание страницы
metaTitle: Заголовок для поисковика
metaDescription: Описание для поисковика

sections:
  
  - title: Заголовок секции 1
    subtitle: Подзаголовок секции 1
    text: Текст 1. Может содержать в себе разметку HTML
    
    items:
      - title: Заголовок элемента 1
        subtitle: Подзаголовок элемента 1
        text: Текст элемента 1. Может содержать в себе разметку HTML
        to: Ссылка 
        icon: Имя иконки 
      - image:
          sm: ИЗОБРАЖЕНИЕ.jpg
          xl: ИЗОБРАЖЕНИЕ-ДЛЯ-БОЛЬШОГО-ЭКРНА.jpg
          alt: альтернативный текст

      - title: Заголовок элемента 2
         ...

  - title: Заголовок секции 2
         ...
```

Формируются из первого и второго пункта главного меню соответственно.

### Вспомогательные данные

| What         | Folder                                  | File Name             | Note                            |
| ------------ | --------------------------------------- | --------------------- | ------------------------------- |
| Main Menu    | [PROJECT_DIR]\content\data              | main-nav-items.yaml   |
| Footer Menu  |                                         | footer-nav-items.yaml |
| Social Links |                                         | social-links.yaml     | Facebook, Intagram etc          |
| Contacts     |                                         | contacts.yaml         | Phone, Skype, Viber, E-mail etc |
| Address      | [PROJECT_DIR]\content\data\address      | address.uk.yaml       | Company Name, Legal Address     |
|              |                                         | address.ru.yaml       |
| Translations | [PROJECT_DIR]\content\data\translations | translations.uk.yaml  |
|              |                                         | translations.ru.yaml  |

### Translations

More convenient way to edit translations.

- Edit `JSON` files in `[PROJECT_DIR]\content\data\translations\src`.
- Run command `npm run translations:j2y`.
  It fires script which transform json-source to yaml.




| View    | Ratio    | Size in px |
| ------- | -------- | ---------- |
| Слайдер | 16 x 8.1 | 1240 x 450 |
| Mobile  | 1 x 1    | 600 x 600  |



Videos and extra text could be inserted to body part.

Sample how to embed video:

```
<iframe src="https://www.youtube.com/embed/2Y-LqBD2HN8" width="600" height="400"></iframe>
```

## TO-DO

- [ ] detect language
- [ ] Lerna or workspaces
- [ ] add firebase project and readne
- [ ] TS
- [ ] Storybook
- [ ] gatsby-plugin-google-analytics
- [ ] gatsby-plugin-offline
- [ ] link - it has no styles in the text (displays properly in Contacts, but not in Services)
- [ ] contact form - modal - add real Abort handler
- [ ] logo is black in 'Dark Mode'

## Known Issues

- **warn Query takes too long** during **build**.
  **Develop** is OK.
  By Gatsby official advice the schema customization for **SitePage** was added.
  Now it's Ok on **build**, but warn still present during build with **GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES**.

GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES

- "The result of this StaticQuery could not be fetched" with `useStaticQuery` in browser after successful build. Development mode has no any errors.
  Two solutions:
  - `useStaticQuery` -> `StaticQuery`
  - move query to `create-pages.js` or to templates as subquery
    I used the second.
- `.production.env` vars are undefined in PROD, but `.development.env` is ok in DEV
- You need CR after <br /> in Markdown
- double space and CR is not New Line
- Art direction

  https://github.com/thadroe/art-direction-images-for-gatsby

  https://www.gitmemory.com/issue/gatsbyjs/gatsby/13164/485425565

  https://github.com/gatsbyjs/gatsby/issues/15189

  https://github.com/gatsbyjs/gatsby/issues/24748

  https://github.com/gatsbyjs/gatsby/pull/21431

- Contact Form
  TextArea font has a bit smaller look, despite the same fontSize and fontFamily.
Special Pages
category
category-list
tag
tag-list
years
year-list
