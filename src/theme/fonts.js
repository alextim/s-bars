/**
 * https://simonhearne.com/2021/layout-shifts-webfonts/
 * https://meowni.ca/font-style-matcher/
 *
 * Microsoft
 * Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif
 *
 * Medium
 * medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
 *
 * Booking.com
 * BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif
 *
 * wordpress.com
 * -apple-system,BlinkMacSystemFont,"Segoe UI", Roboto,"Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif
 */
const webSafeFont =
  'BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
const fonts = {
  // body: '"Open Sans", fallback-body-font, sans-serif',
  body: webSafeFont,
  heading: 'Oswald, fallback-heading-font, sans-serif',
  monospace: 'Menlo, monospace',
};

export default fonts;
