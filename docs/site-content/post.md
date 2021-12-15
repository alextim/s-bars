# Страница вида "Пост"

Папка: `[CONTENT_DIR]/blog/posts`

Отдельные подпапки для каждого поста.


Для страницы типа **Пост** в frontmatter добавлено дополнительное поле:

```yaml
---
...

# Поле **featured**, необязательное. 
# Содержит логическое значение `false` или `true`. 
# Если `true`, то этот пост будет отображен в сайдбаре в списке постов
featured: false

# Поле **author**, необязательное.
# Содержит список имен авторов. 
# Используется для SEO в микроразметке schema.org, OpenGraph и Twitter Card
author: 
  - Иванов И.
  - Петров П.
# Альтернативно список может быть оформлен так
# author: ["Иванов И.", "Петров П."]

---
```

Посты сортируются в порядке убывания даты публикации - поле **datePublished**, т.е. сначала показываются более новые.

Если у каких либо постов значение поля **featured** установлено `true`, то сначала выводятся такие посты.

:exclamation: Посты с незаполненной датой публикации ввыводятся первыми!

Требования к зображениям совпадают со страницей вида "Услуга".


Для всех постов создается микроразметка `BlogPosting`.

Поле **headline** в микроразметке выводится в `headline`, а не в `description` в отличие от страниц (WebPage).