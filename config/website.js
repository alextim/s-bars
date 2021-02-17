// change it to actual site URL
const siteUrl = 'https://s-bars.netlify.app'; // No trailing slash!

module.exports = {
  /* Meta */
  siteUrl,

  /* Schema org */
  siteBusinessPhoto: `${siteUrl}/assets/business-photo.jpg`, // or array maximum 3 images
  siteLogo: `${siteUrl}/assets/logo.svg`,

  // Open Graph Image
  // meta property="og:image
  ogImage: {
    src: `${siteUrl}/assets/og-banner-`,
    width: 1200,
    height: 630,
  },

  // Twitter Image
  // meta name="twitter:image
  twitterImage: {
    src: `${siteUrl}/assets/twitter-banner-2x1-`,
    width: 600,
    height: 300,
  },

  // meta property="fb:app_id
  fbAppID: '',
  // Twitter URL
  // meta name="twitter:site"
  twitterSite: '',
  // Twitter Id
  // meta name="twitter:creator"
  twitterCreator: '',

  googleAnalyticsID: '',

  // webmanifest
  // meta name="theme-color"
  themeColor: '#3498DB',
  // webmanifest
  backgroundColor: '#2e3246',

  POSTS_PATH: '/blog',
  POSTS_PER_PAGE: 12,
  POSTS_PER_ROW: 3,
};
