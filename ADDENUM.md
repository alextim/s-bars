


| View    | Ratio    | Size in px |
| ------- | -------- | ---------- |
| Слайдер | 16 x 8.1 | 1240 x 450 |
| Mobile  | 1 x 1    | 600 x 600  |



Videos and extra text could be inserted to body part.

Sample how to embed video:

```html
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
- You need CR after `<br />` in Markdown
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
