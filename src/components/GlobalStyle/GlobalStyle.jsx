import React from 'react';
import { Global, css } from '@emotion/react';

import BODY_PREVENT_SCROLLING from '../../constants/body-prevent-scrolling';

import links from '../../theme/links';
import sizes from '../../theme/sizes';
import colors from '../../theme/colors';
import mq from '../../theme/media-queries';
import { breakpoints } from '../../theme/breakpoints';
import fonts from '../../theme/fonts';
import lineHeights from '../../theme/line-heights';
import { fontSizes } from '../../theme/font-sizes';
import fontWeights from '../../theme/font-weights';
import { space } from '../../theme/space';

const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeSpeed;
        margin: 0;
        padding: 0;
        overflow-wrap: break-word;
        word-wrap: break-word;
      }

      html {
        scroll-padding-top: calc(${sizes.header.sm} + 1.5rem);
        ${mq.lg} {
          scroll-padding-top: calc(${sizes.header.xl} + 1.5rem);
        }
      }

      body {
        margin: 0;
        font-family: ${fonts.body};
        line-height: ${lineHeights.body};
        font-weight: ${fontWeights.body};
      }

      a,
      abbr,
      acronym,
      address,
      applet,
      article,
      aside,
      audio,
      b,
      big,
      blockquote,
      html,
      canvas,
      caption,
      center,
      cite,
      code,
      dd,
      del,
      details,
      dfn,
      div,
      dl,
      dt,
      em,
      embed,
      fieldset,
      figcaption,
      figure,
      footer,
      form,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      header,
      hgroup,
      html,
      i,
      iframe,
      img,
      ins,
      kbd,
      label,
      legend,
      li,
      mark,
      menu,
      nav,
      object,
      ol,
      output,
      p,
      pre,
      q,
      ruby,
      s,
      samp,
      section,
      small,
      span,
      strike,
      strong,
      sub,
      summary,
      sup,
      table,
      thtml,
      td,
      tfoot,
      th,
      thead,
      time,
      tr,
      tt,
      u,
      ul,
      var,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
      }

      article,
      aside,
      footer,
      header,
      main,
      nav,
      section {
        display: block;
      }

      /*
        ol,
        ul {
          list-style-type: none;
          -webkit-padding-start: 0;
        }
        */
      a,
      button {
        cursor: pointer;
      }

      a {
        /* color: inherit; */
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
      }

      /* SHARED */
      *:focus {
        /* outline: 1px solid #3740ff; */
        outline: none;
      }

      /* LINKS */
      a {
        /* color: ${colors.text}; */
        color: ${links.color};
      }
      a,
      :link,
      :visited {
        text-decoration: none;
      }

      a:active,
      :link:focus,
      :link:active,
      :visited:focus,
      :visited:active {
        /* outline: 1px solid #3740ff; */
        outline: none;
      }

      a:focus,
      a:active,
      a:hover,
      :link:focus,
      :link:active,
      :link:hover,
      :visited:focus,
      :visited:active,
      :visited:hover {
        text-decoration: underline;
        /* text-decoration: none; */
      }

      a:hover: {
        color: ${colors.highlight};
      }

      /* BUTTONS */
      button {
        min-width: 2rem;
      }

      .fa {
        width: 1em;
        height: 1em;
      }

      @media (max-width: ${breakpoints.lg}) {
        .${BODY_PREVENT_SCROLLING} {
          height: 100%;
          position: fixed;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: ${fonts.heading};
        line-height: ${lineHeights.heading};
        font-weight: ${fontWeights.heading};
      }

      h1 {
        font-size: ${fontSizes[7]};
        ${mq.lg} {
          font-size: ${fontSizes[8]};
        }
      }

      h2 {
        font-size: ${fontSizes[5]};
        /* color: ${colors.brand.secondDark}; */
        margin-bottom: ${space[4]};
        ${mq.lg} {
          font-size: ${fontSizes[6]};
        }
      }

      h3 {
        font-size: ${fontSizes[4]};
        margin-bottom: ${space[2]};
        ${mq.lg} {
          font-size: ${fontSizes[5]};
        }
      }

      h4 {
        font-size: ${fontSizes[2]};
      }

      h5 {
        font-size: ${fontSizes[1]};
      }

      h6 {
        font-size: ${fontSizes[0]};
      }

      ol,
      ul {
        margin: 0 0 1rem 2rem;
      }

      ul {
        list-style: disc outside;
      }

      ol {
        list-style: decimal outside;
      }

      li > ul,
      li > ol {
        margin: 0 0 0 2rem;
      }

      li {
        margin-bottom: 0.5rem;
        &:last-of-type {
          margin-bottom: 0;
        }
      }

      p {
        margin-bottom: 0.75rem;
        /*
          &:last-of-type {
            margin-bottom: 0;
          }
          */
      }

      input,
      select,
      textarea {
        margin: 0;
        color: inherit;
        background-color: transparent;
      }
      input:-internal-autofill-selected {
        background-color: transparent !important;
      }

      input[type='text'],
      input[type='email'],
      input[type='phone'],
      select,
      textarea {
        padding: 0.5rem;
        width: 100%;
        min-width: 0;
        border: 1px solid;
        border-radius: 4px;
        font-family: ${fonts.body};
        font-size: inherit;
        line-height: inherit;
      }

      input[type='text'],
      input[type='email'],
      input[type='phone'],
      textarea {
        appearance: none;
      }

      .grid_2-col {
        display: grid;
        grid-gap: ${space[4]};
        ${mq.lg} {
          grid-template-columns: 2fr 2fr;
        }
      }

      .grid_3-col {
        display: grid;
        grid-gap: ${space[4]};
        ${mq.lg} {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }

      img {
        height: auto;
        width: 100%;
      }

      /**
      * https://google-webfonts-helper.herokuapp.com/fonts
      */

      /* oswald-700 - cyrillic */
      @font-face {
        font-family: 'Oswald';
        font-display: optional;
        font-style: normal;
        font-weight: 700;
        src: local(''), url('/assets/fonts/oswald-v36-cyrillic-700.woff2') format('woff2'); // Chrome 26+, Opera 23+, Firefox 39+
        // url('/assets/fonts/oswald-v36-cyrillic-700.woff') format('woff'); // Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+
      }

      /* open-sans-regular - latin_cyrillic */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local(''),
          url('/assets/fonts/open-sans-v18-latin_cyrillic-regular.woff2') format('woff2'); // Chrome 26+, Opera 23+, Firefox 39+
        // url('/assets/fonts/open-sans-v18-latin_cyrillic-regular.woff') format('woff'); // Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+
      }

      /* open-sans-italic - latin_cyrillic */
      @font-face {
        font-family: 'Open Sans';
        font-style: italic;
        font-weight: 400;
        src: local(''),
          url('/assets/fonts/open-sans-v18-latin_cyrillic-italic.woff2') format('woff2'); // Chrome 26+, Opera 23+, Firefox 39+
        // url('/assets/fonts/open-sans-v18-latin_cyrillic-italic.woff') format('woff'); // Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+
      }

      /* open-sans-700 - latin_cyrillic */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 700;
        src: local(''), url('/assets/fonts/open-sans-v18-latin_cyrillic-700.woff2') format('woff2'); // Chrome 26+, Opera 23+, Firefox 39+
        // url('/assets/fonts/open-sans-v18-latin_cyrillic-700.woff') format('woff'); // Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+
      }
    `}
  />
);

export default GlobalStyle;
