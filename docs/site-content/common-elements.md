Папка: `[CONTENT_DIR]/data/`

Файл: `contacts.yaml`

Из этого файла формируются:

- структурированные данные об организации в формате JSON-LD на главной странице основного языка (описание [здесь](https://developers.google.com/search/docs/data-types/local-business?hl=ru));
- время работы и карта на странице Контакты;
- время работы, e-mail и телефоны в футере;
- начальный год копирайта в футере.

## Список полей

|   Поле           | Назначение         | Organization | LocalBusiness | Описание
|---               |---                 |---           |---            |---
| organizationType | SEO                |              |               | [Organization](https://schema.org/Organization), [LocalBusiness](https://schema.org/LocalBusiness)
| geo              | SEO                | нет          | да            | [географические координаты](https://schema.org/geo)
| hasMap           | SEO                | нет          | да            | [ссылка на Google-карты](https://schema.org/hasMap)
| whatsapp         | страница Котнтакты |              |               |
| telegram         | страница Котнтакты |              |               |
| phone            | SEO                | да           | да            | [телефон](https://schema.org/telephone) список цифровых значений, разделитель элементов `,`
| email            | SEO                | да           | да            | [почта](https://schema.org/email) список, разделитель элементов `,`
| openingHours       | страница "Контакты" и SEO | да  | да            | [рабочее время](https://schema.org/openingHours), преобразуется в `OpeningHoursSpecification`
| priceRange         | SEO                       | нет | да            | [диапазон цен](https://schema.org/priceRange), валидные значения: `$`, `$$`, `$$$`, `$$$$`
| currenciesAccepted | SEO                       | нет | да            | [валюты, принимаемые к оплате](https://schema.org/currenciesAccepted)
| paymentAccepted    | SEO                       | нет | да            | [способы оплаты](https://schema.org/paymentAccepted)
| foundingDate     | футер и SEO        | да           | да            | [дата основания организации](https://schema.org/foundingDate) в формате ISO 8601

Поля **e-mail** и **phone** участвуют в структурированных данных для **Organization** или **LocalBusiness**. Используется только первый элемент массива.


:bulb: В номере телефона допустимы только цифры, без плюса спереди, без пробелов, скобок и прочих символов.

Сокращенный пример содержимого:

```yaml
organizationType: LocalBusiness

geo:
  latitude: 49.23454640153842
  longitude: 28.449501642271482

hasMap: "https://www.google.com/maps?cid=9873758708945954150"

embedMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.2160827083967!2d28.447259316468088!3d49.23439227932624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d5b6afddf5ffb%3A0x8906a33b7ca4a566!2z0J_RgNC-0LzRi9GI0LvQtdC90L3Ri9C5INCw0LvRjNC_0LjQvdC40LfQvCAi0KHQvdC10LbQvdGL0Lkg0JHQsNGA0YEi!5e0!3m2!1sru!2sua!4v1612028807248!5m2!1sru!2sua"

phone: [380965553092, 380979705376, 380432573695]

email: [promalp.s.bars@gmail.com, andrey.karpenko7@gmail.com]

openingHours:
  - ["mo-sa", "09:00", "18:00"]
  - ["su", "00:00", "00:00"]

foundingDate: 2009-01-01

```

## Поле **openingHours** (Рабочее время)

Формат поля: список элементов, состоящий из следующей структуры: день недели, время начала рабочего дня, время окончания рабочего дня.

День недели - двухбуквенная аббревиатура на английском языке.

Время - в формате 24 часа.

```yaml
openingHours:
  - ["mo", "10:00", "18:00"]
  - ["tu", "10:00", "18:00"]
  - ["we", "10:00", "18:00"]
  - ["th", "10:00", "18:00"]
  - ["fr", "10:00", "18:00"]
```

Рабочее время с понедельника по пятницу с 10:00 до 18:00 можно записать короче:

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
