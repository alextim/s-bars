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

### Лимиты бесплатных сервисов (на 1 марта 2021 г)

#### Netlify

Предполагается, что сайт попадает под условия беслплатного размещения у компании Netlify.
Конечное решение о возможности бесплатного размещения вашего сайта принимает компания Netlify.
Подробнее [здесь](https://www.netlify.com/tos).

##### Хостинг

Время на построение сайта (build time) - 300 минут в месяц.
/* В среднем этот двуязычный сайт из 8 страниц, 9 услуг, 6 типов объектов и 30 постов строится менее, чем за 4 минуты. Итого вы можете обновить такого объема сайт около 80 раз в месяц или 2-3 раза в сутки.


##### бессерверные функции

- До 125000 вызовов функций в месяц
- До 100 часов времени исполнения в месяц


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

```bush
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

- `weekend-with-family.JPG` - расширение имени файла в верхнем регистре
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
| alt               | до 125 символов | [What is Alt Text?](https://moz.com/learn/seo/alt-text)                                                                                                                         | Поля  **cover** и **image**                                                              |

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

Ссылки разделяются на внутренние и внешние. Внутренние ссылки ведут на ресурсы внутри сайта. Внешние ссылки ведут на ресурсы на чужих сайтах. Ссылки могут быть оформлены как в формате **markdown** так и в формате **html**.

### Внешние ссылки

Ссылки на _внешние сайты_ потенциально небезопасны и могут ухудшить SEO.
Чтобы защитить ваш сайт и не навредить SEO оформляйте ссылки на внешние сайты в формате **html** и всегда добавляйте атрибут `rel="nofollow noreferrer noopener"`.

А добавление аттрибута `target="_blank"` заставит браузер открыть сторонний сайт в новой вкладке, а не просто уведет пользователя с вашего сайта.

плохо:

```html
[Компания "Снежный Барс"](http://rada.com.ua/rus/catalog/62609/)
<a href="http://rada.com.ua/rus/catalog/62609/">Компания "Снежный Барс"</a>
```

хорошо:

```html
<a href="http://rada.com.ua/rus/catalog/62609/" target="_blank" rel="nofollow noreferrer noopener">Компания "Снежный Барс"</a>
```

### Внутренние ссылки

Ссылки без приставки `/ru/` ведут украинскую версию сайта.

```html
[Услуги](/ru/)
<a href="/ru/">Услуги</a>

[нанесения тяжелых материалов](/ru/nanesenie-specialnyx-pokrytij/)
<a href="/ru/nanesenie-specialnyx-pokrytij/">нанесения тяжелых материалов</a>

[Послуги](/)
<a href="/">Послуги</a>

[нанесення важких материалов](/nanesenie-specialnyx-pokrytij/)
<a href="/nanesenie-specialnyx-pokrytij/">нанесення важких материалов</a>
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

Исходные данные для создания самих страниц храняться в файлах с расширением `.md` в формате Markdown.

Предлагается следующая организация хранения файлов.
Для каждой страницы создается отдельная папка. В ней файлы с содержимым страниц. Подпапка `\images` для хранения изображений.

Шаблон имени:
`{ИМЯ-ФАЙЛА}.{ЯЗЫК}.md`

ИМЯ-ФАЙЛА: английский алфавит в нижнем регистре, без пробелов, точек или подчеркиваний.
Специальное имя **index** (объяснение в разделе **Правила формирования путей**).

ЯЗЫК: **uk** или **ru**.

Пример правильно именованных файлов:

```file
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


slug: путь на латиннице, начинающийся с обратного слэша. Язык добавляется к пути во время компиляции сайта.
template: имя JavaScript-файла без расширения, который используется, как шаблон во время компиляции сайта
noindex: "true" или "false" - показать или спрятать документ для поисковых роботов
---
```

### Правила формирования путей

Во время компиляции сайта применяется следующий алгоритм формрования пути:

1. Frontmatter содержит поле **slug**, тогда **slug** будет использован в качестве пути.
2. Frontmatter не содержит поле **slug** и имя самого файла не начинается со слова **index**, тогда имя файла будет использовано в качестве пути.
3. Frontmatter не содержит поле **slug**, а имя файла начинается со слова **index**, тогда название родительской папки будет использовано в качестве пути.

### Услуги

Папка `[PROJECT_DIR]\content\services`

### Типов объектов

Папка: `[PROJECT_DIR]\content\object-types`


### Посты

Папка: `[PROJECT_DIR]\content\posts`

В frontmatter появляются два дополнительных поля

```yaml
---
...

publishedDate: 2019-05-01T16:22:00Z
state: published
featured: false    
---
```

Необязательное поле **publishedDate** c датой и временем публикации поста в формате ISO 8601. Посты сортируются в порядке убывания даты публикации, т.е. сначала показываются более новые.


Необязательное поле **state**. Если поле отсутствует или значение отлично от `published`, то пост будет исключен из сайта во время компиляции.

Необязательное поле **featured**. Значение `false` или `true`. Если `true`, то этот пост будет отабражен в сайдбаре в списке постов.

### Страницы

Папка: `[PROJECT_DIR]\content\pages`

Страницы имеют индивидуальное оформление. Для решения этой задачи содержимое страницы разбивается на секции. Каждая секция состоит из заголовка, подзаголовка, текста, изображения и массива элементов. В свою очередь элемент может состоять из заголовка, подзаголовка, текста, изображения, имени иконки и адреса ссылки. Эта структура хранится в frontmatter в дополнение к общим полям.

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

#### Главная страница

Папка: `[PROJECT_DIR]\content\pages\home`
Файлы: `home.uk.md` и `home.ru.md`


Ниже пример структуры Главной страницы с пояснениями.

```yaml
---
title: Снежный Барс
description: 
metaTitle: Промышленный альпинизм и высотные работы, промальп | Снежный Барс
metaDescription: Услуги промышленного альпинизма по Украине, заказывайте строительные работы на высоте ☎+38 (096) 555-30-92 от компании Снежный Барс.
# slug всегда '/'
slug: /
# template всегда 'home'
template: home

# Всего 6 секций на Главной странице.
# Последовательность секций важна
sections:
  # Секция 1: Слайдер
  - items:
    - title: МЕХАНИЗИРОВАННАЯ ОЧИСТКА
      image:
        sm: ./images/s1.jpg
        alt: 

    - title: ПОКРАСКА КРАНОВ
      image:
        sm: ./images/s2.jpg
        alt: 

    - title: ПРОФЕССИОНАЛЬНЫЙ ПОДХОД
      image:
        sm: ./images/arenda-i-prodazha-oborudovaniya-m.jpg
        alt: 

    - title: МЕХАНИЗИРОВАННАЯ ШПАКЛЕВКА
      image:
        sm: ./images/s4.jpg
        alt: 

    - title: АНТИКОРОЗИОННАЯ ЗАЩИТА
      image:
        sm: ./images/s5.jpg
        alt:
    # title выводится с тэгом H1    
    title: НАШИ УСЛУГИ ВКЛЮЧАЮТ В СЕБЯ ВЕСЬ ЦИКЛ РАБОТ
    text: |
      По покраске и ремонту антикоррозионной защиты конструкций: от восстановления
      <br/>
      поврежденных участков, подготовки и очистки поверхности до нанесения финишного слоя.


  # Секция 2: Типы объектов
  # Список типов объектов формируются автоматически из пунктов подменю "Типы объектов"
  # title выводится с тэгом H2  
  - title: МЫ РАБОТАЕМ С РАЗЛИЧНЫМИ ТИПАМИ ОБЪЕКТОВ
    text: |
      Мы обладаем опытом работы с такими объектами и хорошо знаем специфику работ с ними.
      <br/>
      В каждом случае требуется индивидуальный подход к подбору химии и оборудования.


  # Секция 3: Триптих без заголовка
  - items:
      # title выводится с тэгом H2  
      - title: СОВРЕМЕННЫЕ ТЕХНОЛОГИИ
        text: Современные технологии и оборудование, которые мы используем в работе, дают возможность быстро реализовывать масштабные проекты на любой высоте, независимо от количества объектов и расстояний между ними.
      - image:
          sm: ./images/work.jpg
          alt:
      # title выводится с тэгом H2  
      - title: ВЫСОКАЯ СКОРОСТЬ
        text: |
          <p>
            Это существенно минимизирует время исполнения заказа, и не наносит ущерба качеству работы.
          </p>
          <p>
            Мобильность групп специалистов и высокая скорость развертывания комплекса позволяет нам обслуживать даже несколько объектов на предприятии одновременно.
          </p>
    text: |
      <p>
        Нам не нужны громоздкая подъемная техника, строительные леса и люльки. Мы используем высококлассное альпинистское снаряжение. Это существенно снижает стоимость высотных работ и их длительность. Кроме того, промышленный альпинизм позволяет производить работы в труднодоступных местах и быстро красить сложные поверхности.
      </p>
      <p>
        Мы работаем в три смены и нередко выполняем заказы в нерабочее время. Например, днем ваше предприятие сможет функционировать в обычном режиме. А наши специалисты-высотники проведут ремонтные работы вечером или ночью.
      </p> 


  # Секция 4
  # title выводится с тэгом H2  
  - title: ВСЕ РАБОТЫ ОТ «А» до «Я»
    items:
      # title выводится с тэгом H3
      - title: ОЧИСТКА ПОВЕРХНОСТИ
        text: |
          Аппаратный способ очистки от химических и механических загрязнений – это не только способ придать конструкции опрятный вид. Но и ключевой элемент защиты от коррозионных процессов. Наши промышленные альпинисты используют лучшие аппараты высокого и сверхвысокого давления. Именно благодаря такой очистке поверхности перед нанесением защитного слоя, он будет долго и крепко держаться.
        image:
          sm: ./images/e1.jpg
          alt:
      # title выводится с тэгом H3
      - title: АНТИКОРРОЗИОННАЯ ОБРАБОТКА
        text: |
          При эксплуатации металлоконструкций, местами могут возникать участки коррозии. В этом случае нужно приостановить или замедлить разрушение металла. Поврежденные участки необходимо зачистить и обработать преобразователем ржавчины. Это создает на таких участках металлоконструкции пленку, которая изолирует этот участок от доступа кислорода. И, таким образом, консервирует коррозийные процессы.
        image:
          sm: ./images/e2.jpg
          alt:
      # title выводится с тэгом H3
      - title: ЗАЩИТА ОТ АГРЕССИВНОЙ СРЕДЫ
        text: |
          Механизированная покраска и нанесение защитных покрытий безвоздушным способом оптимальна для многих объектов с агрессивными условиями эксплуатации. Как для сложных металлоконструкций, так и для железобетонных поверхностей, такая технология позволяет качественно покрасить огромные объемы в кратчайшие сроки. А значит – минимизировать потери, связанные с простоем производственных мощностей предприятия.
        image:
          sm: ./images/e3.jpg
          alt:
      # title выводится с тэгом H3
      - title: СПЕЦИАЛЬНЫЕ ПОКРЫТИЯ
        text: |
          Благодаря покрасочным станциям и опыту наших специалистов, мы смогли механизировать процесс нанесения различных тяжелых материалов. Например, гуммирование жидкой резиной, нанесение штукатурки, декоративных покрытий и огнезащиты. А также, покрытие новейшими полимерными промышленными материалами — самые востребованные услуги в нашей сфере.
        image:
          sm: ./images/e4.jpg
          alt:


  # Секция 5
  # title выводится с тэгом H2
  - title: НАС РЕКОМЕНДУЮТ
    subtitle: Наша компания известна десяткам крупных предприятий, как добросовестный и надежный подрядчик.
    items:
      # title выводится с тэгом DIV жирным текстом        
      - title: Гк «Агропросперіс»
        text: Відновлення антикоррозійного захисту<br>металлоконструкций элеваторів — 5420 м2
        image:
          sm: "./images/антикорозійний захист металоконструкцій елеватора.jpg"
          alt:
      # title выводится с тэгом DIV жирным текстом  
      - title: Група компаній «МХП»
        text: Очистка скляного фасада — 1100 м2<br>м. Ладижин, 2016-2020рр.
        image:
          sm: "./images/Мийка скляного фасаду.jpg"
          alt:
      # title выводится с тэгом DIV жирным текстом  
      - title: СМЦ «Метінвест»
        text: Фарбування козлових кранів — 5 шт.<br>м Бровари, 2017р
        image:
          sm: ./images/Фарбування козлого крану.jpg
          alt:


  # Секция 6
  # title выводится с тэгом H2
  - title: НАШЕ КРЕДО
    text: |
      Наши специалисты применяют только самые передовые технологий в области промышленного альпинизма и антикоррозийной защиты. А непрерывное развитие компании гарантирует максимум безопасности и оперативности. Как с клиентами, так и партнерами, мы придерживаемся четырех основных принципов сотрудничества:
    items:
      # title выводится с тэгом H3
      - title: ЧЕСТНОСТЬ
        icon:  thumbsUp
        text: |
          Мы ведем политику «Прозрачного ценообразования». Еще до начала работ, мы честно проведем расчеты по вашему объекту. Вы не столкнетесь со скрытыми доплатами или непредвиденными расходами. Мы сообщим вам конечную стоимость услуги до момента заключения сделки. При необходимости, раскроем и объясним вам все этапы работ по проекту и издержки, связанные с их выполнением.
      # title выводится с тэгом H3    
      - title: КАЧЕСТВО
        icon:  check
        text: |
          Качество работ неразрывно связано с опытом персонала. Наши сотрудники любят свою работу и трудятся с высокой самоотдачей. Именно поэтому, наше предприятие не испытывает текучести кадров. Все сотрудники работают у нас уже много лет. Кроме того, они обладают высокой внутренней мотивацией и чувством ответственности. Мы ориентированы на результат и правильно понимаем ожидания наших клиентов. Вы можете рассчитывать на долгий срок службы обработанных нами объектов.
      # title выводится с тэгом H3
      - title: СКОРОСТЬ
        icon:  plane
        text: |
          Высокая производительность и оперативность выполнения работ – наше главное конкурентное преимущество. Мы ценим время и знаем, как это важно для наших клиентов. При необходимости, мы готовы организовать даже трёхсменную работу на объекте. Кроме того, мы обладаем качественным современным оборудованием. Которое рассчитано на работу с крупными объектами и большими объемами.
      # title выводится с тэгом H3        
      - title: ОТВЕТСТВЕННОСТЬ
        icon:  users
        text: |
          Мы уверены в качестве работы наших сотрудников и надежности используемых материалов. Именно поэтому, мы готовы нести за них ответственность в виде гарантийных сроков эксплуатации. В зависимости от вида работ и типа объекта, мы всегда рассчитываем гарантированный срок службы. В течении которого, все риски покрываются за наш счет.        
---
## Промышленный альпинизм от специалистов «Снежный Барс»

Часто, сооружение строительных лесов и люлек - не совсем целесообразно. В большинстве случаев, это неудобно и занимает много временных и денежных ресурсов. В этом случае, на помощь приходят мастера-высотники. Промышленный альпинизм - очень сложное занятие. И к тому же, достаточно...
```

### Вспомогательные данные

#### Общие на весь сайт

Папка: `[PROJECT_DIR]\content\data\`

| Что         | Папка                                  | Имя файла             | Комментарий                            |
| ------------ | --------------------------------------- | --------------------- | ------------------------------- |
| Контактные данные     |                                         | contacts.yaml         | геогафические координаты, ссылки на Google карты, телефоны, почта, рабочее время, диапазон цен, время основания |

##### Рабочее время (openingHours)

Формат: день недели, время начала рабочего дня, время окончания рабочего дня.

День недели - абревиатура из двух букв на английском языке.

Время - в формате 24 часа.

```yaml
openingHours:
  - ['mo-fr', '09:00', '18:00']
  - ["mo", "10:00", "18:00"]
  - ["tu", "10:00", "18:00"]
  - ["we", "10:00", "18:00"]
  - ["th", "10:00", "18:00"]
  - ["fr", "10:00", "18:00"]
```

Рабочее время с понедельника по пятницу с 10:00 до 18:00 можно записать короче

```yaml
openingHours:
  - ["mo-fr", "10:00", "18:00"]
```

Если в какой-то день вы работаете 24 часа в сутки, то укажите время с `00:00` до `23:59`.

Пример оформления для круглосуточной работы в среду:

```yaml
openingHours:
  - ["we", "00:00", "23:59"]
```

Для выходного дня укажите время начала и окончания `00:00`.

Пример оформления для выходного дня в воскресенье:

```yaml
openingHours:
  - ["su", "00:00", "00:00"]
```

Пример оформления для выходного дня в субботу и воскресенье:

```yaml
openingHours:
  - ["sa, su", "00:00", "00:00"]
```

#### Языкозависимые данные

Папка: `[PROJECT_DIR]\content\data\locales`

| Что         | Папка                                  | Имя файла             | Комментарий                            |
| ------------ | --------------------------------------- | --------------------- | ------------------------------- |
| Главное меню    | \main-nav              | main-nav.uk.yaml     |
|              |                        | main-nav.ru.yaml     |
| Меню в подвале  | \footer-nav            | footer-nav.uk.yaml   |
|              |                        | footer-nav.ru.yaml   |
| Ссылки на соц.сети | \social-links          | social-links.uk.yaml | Facebook, Intagram и тд          |
|              |                        | social-links.ru.yaml |
| Адрес      | \address               | address.uk.yaml      | Официальное название организации, почтовый адрес, подробное описание контактов          |
|              |                        | address.ru.yaml      |
| Переводы | \translations          | translations.uk.yaml |
|              |                        | translations.ru.yaml |

### Главное меню

Предполагается, что первый пункт Главного меню будет **Услуги**, а второй **Типы объектов**.

По подменю пункта **Услуги** создается список услуг для страницы `Услуги` и список услуг для сайдбара.

Соответственно из подменю пункта **Типы объектов** создается список типов объектов для `Главной` страницы, для страницы `Типы объектов` и список типов объектов для сайдбара.

### Переводы

Если вы хотите обновить файлы переводов:

- Отредактируйте соответствующий `JSON` файл в папке `[PROJECT_DIR]\content\data\locales\translations\src\`.
- Зайдите в командную строку, перейдите в папку `[PROJECT_DIR]` и выполните команду `yarn translations:json2yaml`.
  Эта команда запустит javascript-скрипт, который преобразует файл c переводами из формата `JSON` в `YAML` (Вам потребуется предварительно установить **nodejs** и **yarn**).

Для автоматического обновления переводов во время `commit`-a потребуется установить **husky** и **lint-staged**.
