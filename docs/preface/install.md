Исходный код сайта выложен в открытый репозиторий под лицензией MIT.

Но сами данные для построения сайта (тексты, посты, страницы, изображения и тп) расположены в отдельном защищенном репозитории, что не позволяет скопировать сайт путем простого клонирования.

## Предварительные условия

1. Учетная запись на [SendGrid](https://sendgrid.com). Необходимо получить API key и верифицировать ваш e-mail (Single Sender).
1. Учетная запись на [GitHub](https://github.com).
1. Учетная запись на [Netlify](https://netlify.com).
1. Установленные на вашем локальном компьютере: 
    - система контроля версий **Git**. Ссылка для скачивания [здесь](https://git-scm.com/download)
    - NodeJs. Ссылка для скачивания [здесь](https://nodejs.dev/download).
3. Права доступа к исходному защищенному репозиторию с данными.


## Установка Netlify-CLI

1. Запустите командную строку в режиме Администратора.
2. Выполните команду:

   ```bash
   npm i -g netlify-cli
   ```
## Созданиме нового сайта на Netlify

1. Запустите командную строку.
2. Выполните команду:

   ```bash
   netlify  sites:create --name ИМЯ-ВАШЕГО-САЙТА
   ```
3. После создания сайта скопируйте с экрана терминала **Site ID**.

## Созданиме токена доступа к сайту на Netlify

1. Зайдите в учетную запись Netlify.
2. User Settings -> Application -> New Access Token.
3. Сгенерируйте токен с именем **NETLIFY_AUTH_TOKEN**.
4. Скопируйте содержимое токена.

:bulb: **Site ID** и **NETLIFY_AUTH_TOKEN** - важная информация. Она не должна попасть к злоумышленникам.


5. После создания сайта скопируйте с экрана терминала **Site ID**.
   
## Клонирование данных сайта из защищенного репозитория-источника

1. Зайдите в вашу учетную запись на [GitHub](https://github.com).
1. Откройте браузером защищенный репозиторий-источник с данными сайта по [этой ссылке](https://github.com/alextim/s-bars.content).
1. Создайте fork из репозитория-источника - нажмите кнопку **Fork** (правый верхний угол страницы).
1. После завершения процесса нажмите кнопку **Code**.
1. Скопируйте URL вашего репозитория.  
   Адрес будет выглядеть, как здесь: `https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.content.git`.
1. Запустите командную строку на вашем компьютере.  
1. Перейдите в желаемую папку при помощи команды `cd` (change directory).
1. Клонируйте ваш репозиторий-fork в выбранную папку следующей командой:

```sh
git clone https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.content.git
```

## Пропишите токен досиупа к генерации 

1. Получите токен (права: repo, read:repo_hook) от поставщика услуги по генерации сайта.
1. Зайдите в вашу учетную запись на [Github](https://github.com).
1. Откройте репозиторий с данными.
1. Settings -> Secrets -> New repository secret.
1. Создайте новый секрет с именем **API_TOKEN** и значением полученного токена.

## Подключение вашего репозитория к хостингу и построение сайта

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

   |  Key                  | Value
   |---                    |---
   | NPM_TOKEN             | GitHub API ключ к private репозиториям с кодом
   | SENDGRID_API_KEY      | ваш SendGrid API ключ
   | SENDGRID_SINGE_SENDER | ваш e-mail, верифицированный SendGrid
   | TO_EMAIL              | e-mail, на который будут приходить сообщения из форм
   | WARNINGS              | true
   | NO_INDEX              | true, если надо запретить индексирование всего сайта

8. Дайте Netlify доступ к вашему защищенному репозиторию на GitHub
   - Перейдите в раздел **Deploy key**.
   - Нажмите кнопку **Generate public deploy key**
   - Скопируйте в буфер обмена значение только что сгененерированного ключа.
   - Откройте в новой вкладке браузера защищенный репозиторий с данными сайта `https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.content.git`.
   - Зайдите в **Settings** -> **Deploy keys**
   - Нажмите кнопку **Add deploy key**
   - В поле **Title** напишите `Netlify`, в поле **Key** вставьте из буфера обмена ключ, **Allow write access** оставьте невыбранным
   - Нажмите кнопку **Add key**, после чего Netlify получит доступ к вашему защищенному репозиторию с данными
9.  Вернитесь обратно на сайт Netlify. Нажмите кнопку **Deploy site**.
   Netlify начнет компиляцию сайта. Через несколько минут ваш сайт будет on-line!

## Если код сайта в **private** репозитории на GitHub

Полезные ресурсы для принятия решений:

- [Repository permissions and linking](https://docs.netlify.com/configure-builds/repo-permissions-linking/)
- [Creating a personal access token](https://docs.github.com/en/enterprise-server@3.0/github/authenticating-to-github/creating-a-personal-access-token)
- [[Support Guide] How do I access private repositories in the build environment?](https://answers.netlify.com/t/support-guide-how-do-i-access-private-repositories-in-the-build-environment/723)
- [[Support Guide] Using an SSH key via environment variable during build](https://answers.netlify.com/t/support-guide-using-an-ssh-key-via-environment-variable-during-build/2457)
- [[Support Guide] Linking a repository via API](https://answers.netlify.com/t/support-guide-linking-a-repository-via-api/121)
- [Accessing private Github package registry](https://answers.netlify.com/t/accessing-private-github-package-registry/17199)
