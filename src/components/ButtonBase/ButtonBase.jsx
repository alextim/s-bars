/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';

import colors from '../../theme/colors';
import { space } from '../../theme/space';
import transition from '../../theme/transition';
import buttons from '../../theme/buttons';
import fonts from '../../theme/fonts';
import { fontSizes } from '../../theme/font-sizes';

const semibold = 500;

const focusStyle = {
  outline: 0,
  boxShadow: `0 0 0 2px ${colors.input.focusBoxShadow}`,
};

const components = {
  href: ({ children, ...rest }) => <a {...rest}>{children}</a>,
  // eslint-disable-next-line react/button-has-type
  button: ({ children, ...rest }) => <button {...rest}>{children}</button>,
};

const buttonStyles = {
  default: {
    alignItems: 'center',
    backgroundColor: colors.button.primaryBg,
    borderRadius: 1,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: colors.button.primaryBorder,
    color: colors.button.primaryText,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.heading,
    fontWeight: semibold,
    fontSize: fontSizes[2],
    flexShrink: 0,
    // lineHeight: 'solid',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    paddingLeft: space[3],
    paddingRight: space[3],
    height: '3.5rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    backgroundSize: `${space[7]} ${space[7]}`,
    transition: `background-color color outline border-color ${transition.default}`,
    ':hover, :focus': {
      backgroundColor: colors.brand.secondDark,
      outline: 'none',

      color: colors.white,

      borderColor: colors.brand.secondDark,
    },
    ':focus': {
      ...focusStyle,
      outline: 'none',
    },
    ':after': {
      content: '""',
      display: 'block',
    },
    '& svg': {
      marginLeft: '.2em',
    },
    ':active': {
      outline: 'none',
    },
  },
  secondary: {
    borderColor: colors.button.secondaryBorder,
    backgroundColor: colors.button.secondaryBg,
    color: colors.button.secondaryText,
    fontWeight: semibold,
  },
};

const ButtonBase = ({
  to,
  overrideCSS,
  icon,
  children,
  linkComponent,
  tag,
  secondary,
  tracking,
  variant,
  ...rest
}) => {
  if (tag === 'link') {
    components.link = linkComponent;
  }
  const Tag = components[tag || 'button'];

  const props = {
    to: tag === 'link' ? to : undefined,
    href: tag === 'href' ? to : undefined,
    ...rest,
  };

  const trackingOnClick = (e) => {
    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }

    let redirect = true;

    // Slightly modified logic from the gatsby-plugin-google-analytics
    // But this one should work with 'Link' component as well
    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
      redirect = false;
    }

    if (props.target && props.target.toLowerCase() !== '_self') {
      redirect = false;
    }

    if (tracking && window.ga) {
      window.ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: `${tracking} - ${props.to || props.href}`,
        transport: redirect ? 'beacon' : '',
      });
    }
  };

  const styles = [buttonStyles.default];
  if (secondary) {
    styles.push(buttonStyles.secondary);
  }
  if (variant && buttons[variant]) {
    styles.push(buttons[variant]);
  }
  if (overrideCSS) {
    styles.push(overrideCSS);
  }
  return (
    <Tag css={styles} onClick={trackingOnClick} {...props}>
      {children}
      {icon && <React.Fragment>{icon}</React.Fragment>}
    </Tag>
  );
};

export default ButtonBase;
