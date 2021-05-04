[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)[![Netlify Status](https://api.netlify.com/api/v1/badges/a46e91d7-e8d8-4d7f-8223-40d142c0cb46/deploy-status)](https://app.netlify.com/sites/s-bars-dev/deploys)


Этот сайт создан по технологии [JAMStack](https://jamstack.org/).

Для хранения данных используются форматы [YAML](https://yaml.org/) и [Markdown](https://daringfireball.net/projects/markdown/).

Исходные файлы сайта создаются, хранятся и редактируются на локальном компьютере.
Изменения данных отслеживаются распределенной системой контроля версий [Git](https://git-scm.com/).

По команде пользователя система контроля версий [Git](https://git-scm.com/) синхронизирует изменения данных на локальном компьютере с облачным репозиторием [GitHub](https://github.com/).

В облачном репозитории [GitHub](https://github.com/) настроена система CI/CD, которая отслеживает обновления данных, автоматически запускает генератор статических сайтов [Gatsby](https://www.gatsbyjs.com/), компилирует и публикует обновленную версию сайта у облачного провайдера [Netlify](https://netlify.com).

Для обработки форм и отправки почты используются [бессерверные функции](https://docs.netlify.com/functions/overview/) провайдера и облачный почтовый сервер [SendGrid](https://sendgrid.com/).

Уведомления об обновлении сайта и отправке формы приходят в Telegram-канал.

Технология JAMStack в комлексе с бессерверными вычислениями позволяют не разворачивать собственный сервер, избежать затрат на хостинг и обслуживание. Статический сайт безопасен, устойчив к атакам и вирусам, обладает хорошим быстродействием.





## Аббревиатуры

- `[CONTENT_DIR]` - имя папки на локальном компьютере с данными сайта.
- `[PROJECT_DIR]` - имя папки на локальном компьютере с кодом сайта.
- `{locale}` - язык: `uk` или `ru`.

## Поддержка

Создайте <a href="https://github.com/alextim/s-bars/issues" target="_blank" rel="noopener">GitHub issue</a> для выявленных ошибок, пожеланий или вопросов.

## Лицензия

Этот проект Open Source и доступен под лицезией [MIT](https://github.com/alextim/s-bars/blob/main/LICENSE).

Copyright (c) Oleksii Tymoshenko
