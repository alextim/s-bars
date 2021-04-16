# Инсталляция. Пошаговая инструкция

## Настройка **Git** для работы с подмодулями

1. Запустите командную строку на вашем компьютере.  
   Для Windows это будет так: `Start` -> `Windows System` -> `Command Prompt`.
1. Запустите команду:

```sh
git config --global submodule.recurse true
```

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

## Установка вашего адреса в Git Actions

1. Зайдите в папку с данными на локальном компьютере `s-bars.content`
2. Откройте файл `.github/workflows/trigger-submodule-update.yml` в текстовом редакторе
3. Найдите строку

   ```yaml
      https://api.github.com/repos/alextim/s-bars/actions/workflows/submodule-update.yml/dispatches \
   ```

4. Замените `alextim` на `ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ` в Github.
5. Сохраните файл и обновите репозитории.

   ```sh
   git commit -am "action update"
   git push
   ```

## Клонирование кода сайта из публичного репозитория-источника

1. Откройте браузером публичный репозиторий-источник с кодом сайта по [этой ссылке](https://github.com/alextim/s-bars).
1. Создайте fork из репозитория-источника - нажмите кнопку **Fork** (правый верхний угол страницы).
1. После завершения процесса нажмите кнопку **Code**.
1. Скопируйте URL вашего репозитория.  
   Адрес будет выглядеть, как здесь: `https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.git`.
1. Запустите командную строку на вашем компьютере.  
1. Перейдите в желаемую папку при помощи команды `cd` (change directory).
1. Клонируйте ваш репозиторий-fork в выбранную папку следующей командой:

```cmd
git clone --recurse-submodules https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.git
```

## Настройка локального репозитория для работы с защищенным репозиторием

Откройте текстовым редактором файл `[PROJECT_DIR]/.gitmodules`.

Его содержимое должно выглядеть так:

```text
[submodule "s-bars.content"]
  path = s-bars.content
  url = git@github.com:ИМЯ-ВАШЕГО-РЕПОЗИТОРИЯ/s-bars.content.git
```

Если это не так, то отредактируйте его.

## Создание токенов

1. Зайдите в вашу учетную запись на [Github](https://github.com).
2. Settings -> Developer settings -> Personal access tokens
3. Сгенерируйте два токена и скопируйте их значения
   - API_TOKEN (права: repo, read:repo_hook)
   - ACCESS_TOKEN (права: repo, read:repo_hook)
4. Перейдите в репозиторий `[ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ]/s-bars.content` -> Settings -> Secrets
   Добавьте **API_TOKEN**.
5. Перейдите в репозиторий `[ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ]/s-bars` -> Settings -> Secrets
   Добавьте **ACCESS_TOKEN**.


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
8. Дайте Netlify доступ к вашему защищенному репозиторию на GitHub
   - Перейдите в раздел **Deploy key**.
   - Нажмите кнопку **Generate public deploy key**
   - Скопируйте в буфер обмена значение только что сгененерированного ключа.
   - Откройте в новой вкладке браузера защищенный репозиторий с данными сайта `https://github.com/ИМЯ-ВАШЕЙ-УЧЕТНОЙ-ЗАПИСИ/s-bars.content.git`.
   - Зайдите в **Settings** -> **Deploy keys**
   - Нажмите кнопку **Add deploy key**
   - В поле **Title** напишите `Netlify`, в поле **Key** вставьте из буфера обмена ключ, **Allow write access** оставьте невыбранным
   - Нажмите кнопку **Add key**, после чего Netlify получит доступ к вашему защищенному репозиторию с данными
9. Вернитесь обратно на сайт Netlify. Нажмите кнопку **Deploy site**.
   Netlify начнет компиляцию сайта. Через несколько минут ваш сайт будет on-line!

## Если код сайта в **private** репозитории на GitHub

Полезные ресурсы для принятия решений:

- [Repository permissions and linking](https://docs.netlify.com/configure-builds/repo-permissions-linking/)
- [Creating a personal access token](https://docs.github.com/en/enterprise-server@3.0/github/authenticating-to-github/creating-a-personal-access-token)
- [[Support Guide] How do I access private repositories in the build environment?](https://answers.netlify.com/t/support-guide-how-do-i-access-private-repositories-in-the-build-environment/723)
- [[Support Guide] Using an SSH key via environment variable during build](https://answers.netlify.com/t/support-guide-using-an-ssh-key-via-environment-variable-during-build/2457)
- [[Support Guide] Linking a repository via API](https://answers.netlify.com/t/support-guide-linking-a-repository-via-api/121)
- [Accessing private Github package registry](https://answers.netlify.com/t/accessing-private-github-package-registry/17199)
