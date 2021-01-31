import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

import BODY_PREVENT_SCROLLING from '../../constants/body-prevent-scrolling';

const GlobalStyle = () => {
  const theme = useTheme();
  const { sizes, mq, colors, breakpoints } = theme;
  return (
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
          font-family: ${theme.fonts.body};
          line-height: ${theme.lineHeights.body};
          font-weight: ${theme.fontWeights.body};
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
          color: inherit;
          background-color: transparent;
          -webkit-text-decoration-skip: objects;
        }

        /* SHARED */
        *:focus {
          /* outline: 1px solid #3740ff; */
          outline: none;
        }

        /* LINKS */
        a,
        :link,
        :visited {
          /* color: ${colors.text}; */
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
          /* text-decoration: underline; */
          text-decoration: none;
        }

        a:hover: {
          color: ${colors.highlight};
        }

        /* BUTTONS */
        button {
          min-width: 2rem;
        }

        .fa {
          width: 1rem;
          height: 1rem;
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
          font-family: ${theme.fonts.heading};
          line-height: ${theme.lineHeights.heading};
          font-weight: ${theme.fontWeights.heading};
        }

        h1 {
          font-size: ${theme.fontSizes[5]};
        }

        h2 {
          font-size: ${theme.fontSizes[4]};
          color: ${colors.brand.main};
        }

        h3 {
          font-size: ${theme.fontSizes[3]};
        }

        h4 {
          font-size: ${theme.fontSizes[2]};
        }

        h5 {
          font-size: ${theme.fontSizes[1]};
        }

        h6 {
          font-size: ${theme.fontSizes[0]};
        }

        ol,
        ul {
          list-style: disc outside;
          margin: 0 0 1rem 2rem;
        }

        p {
          margin-bottom: 0.5rem;
          &:last-of-type {
            margin-bottom: 0;
          }
        }

        input,
        textarea {
          margin: 0;
          padding: 0.5rem;
          width: 100%;
          min-width: 0;
          appearance: none;
          border: 1px solid;
          border-radius: 4px;
          color: inherit;
          background-color: transparent;
          font-family: ${theme.fonts.body};
          font-size: inherit;
          line-height: inherit;
        }
      `}
    />
  );
};

export default GlobalStyle;
