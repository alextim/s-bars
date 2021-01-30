const siteUrl = 'https://s-bars.netlify.app'; // No trailing slash!

module.exports = {
  /* Meta */
  siteUrl,

  /* Schema org */
  siteBusinessPhoto: `${siteUrl}/assets/business-photo.jpg`, // or array maximum 3 images
  siteLogo: `${siteUrl}/assets/logo.svg`,

  /* Open Graph Image */
  ogImage: {
    src: `${siteUrl}/assets/og-banner-`,
    width: 1200,
    height: 630,
  },

  /* Twitter Image */
  twitterImage: {
    src: `${siteUrl}/assets/twitter-banner-2x1-`,
    width: 600,
    height: 300,
  },

  fbAppID: '',
  /* Twitter Url */
  twitterSite: '',
  /* Twitter Id */
  twitterCreator: '',

  googleAnalyticsID: '',

  /* Manifest */
  themeColor: '#3498DB',
  backgroundColor: '#2e3246',
};
