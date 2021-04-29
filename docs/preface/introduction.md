[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)[![Netlify Status](https://api.netlify.com/api/v1/badges/b08c700d-a97c-4f7d-aa81-76c0d7288b2f/deploy-status)](https://app.netlify.com/sites/s-bars/deploys)


Этот сайт создан по технологии [JAMStack](https://jamstack.org/).

Для хранения данных используются форматы [YAML](https://yaml.org/) и [Markdown](https://daringfireball.net/projects/markdown/).

Исходные файлы сайта создаются, хранятся и редактируются на локальном компьютере.
Изменения данных отслеживаются распределенной системой контроля версий [Git](https://git-scm.com/).

По команде пользователя система контроля версий [Git](https://git-scm.com/) синхронизирует изменения данных на локальном компьютере с облачным репозиторием [GitHub](https://github.com/).

Облачный репозиторий [GitHub](https://github.com/) связан с облачным провайдером [Netlify](https://netlify.com), который подписан на изменения в вашем репозитории.

После каждого изменения провайдер автоматически скачивает обновленные данные из вашего репозитория себе, запускает генератор статических сайтов [Gatsby](https://www.gatsbyjs.com/), компилирует и публикует обновленную версию сайта.

Для обработки форм и отправки почты используются [бессерверные функции](https://docs.netlify.com/functions/overview/) провайдера и облачный почтовый сервер [SendGrid](https://sendgrid.com/).

Технология JAMStack в комлексе с бессерверными вычислениями позволяют не разворачивать собственный сервер, избежать затрат на хостинг и обслуживание. Статический сайт безопасен, устойчив к атакам и вирусам, обладает хорошим быстродействием.


## Аббревиатуры

- `[CONTENT_DIR]` - имя папки на локальном компьютере с данными сайта.
- `[PROJECT_DIR]` - имя папки на локальном компьютере с кодом сайта.
- `{locale}` - язык: `uk` или `ru`.

## Допущения

`[CONTENT_DIR]` и `[PROJECT_DIR]` должны находится в одной родительской папке.

## Поддержка

Создайте <a href="https://github.com/alextim/s-bars/issues" target="_blank" rel="noopener">GitHub issue</a> для выявленных ошибок, пожеланий или вопросов.

## Лицензия

Этот проект Open Source и доступен под лицезией [MIT](https://github.com/alextim/s-bars/blob/main/LICENSE).

Copyright (c) Oleksii Tymoshenko
