// change it to actual site URL
const siteUrl = 'https://s-bars.netlify.app'; // No trailing slash!

module.exports = {
  /* Meta */
  siteUrl,

  contactsSlug: '/contacts',

  /**
   * name of content folder
   */
  content: 's-bars.content',

  /**
   * Schema org
   *
   * folder: /static/assets
   *  */
  siteBusinessPhoto: `${siteUrl}/assets/images/business-photo.jpg`, // or array maximum 3 images
  siteLogo: `${siteUrl}/assets/images/logo.svg`,

  /**
   * Open Graph Image
   *
   * meta property="og:image
   * one image per locale
   *
   * Sample file name: og-banner-ru.jpg
   *
   * folder: /static/assets/images
   * */
  ogImage: {
    src: `${siteUrl}/assets/images/og-banner-`,
    width: 1200,
    height: 630,
  },

  /**
   * Twitter Image
   *
   * meta name="twitter:image
   * one image per locale
   *
   * Sample file name: twitter-banner-2x1-ru.jpg
   *
   * folder: /static/assets/images
   *  */
  twitterImage: {
    src: `${siteUrl}/assets/images/twitter-banner-2x1-`,
    width: 600,
    height: 300,
  },

  /**
   * In order to use Facebook Insights you must add the app ID to your page.
   * Insights lets you view analytics for traffic to your site from Facebook.
   *
   * meta property="fb:app_id
   */
  fbAppID: '',

  /**
   * Twitter URL
   *
   * meta name="twitter:site"
   *  */
  twitterSite: '',

  /**
   * Twitter Id
   *
   * meta name="twitter:creator"
   *  */
  twitterCreator: '',

  googleAnalyticsID: '',

  /**
   * webmanifest
   *  */
  // meta name="theme-color"
  themeColor: '#3498DB',
  backgroundColor: '#2e3246',

  POSTS_PATH: '/blog',
  POSTS_PER_PAGE: 12,
  POSTS_PER_ROW: 3,
};
