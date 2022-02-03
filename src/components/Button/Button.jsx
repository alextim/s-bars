/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import colors from '@/theme/colors';
import { space } from '@/theme/space';
import transition from '@/theme/transition';
import fonts from '@/theme/fonts';
import { fontSizes } from '@/theme/font-sizes';
import buttons from '@/theme/buttons';

import Link from '../LocalizedLink';

const semibold = 500;

const styleFocus = {
  outline: 'none',
  boxShadow: `0 0 0 2px ${colors.input.focusBoxShadow}`,
};

const buttonStyles = {
  default: {
    flexShrink: 0,

    display: 'inline-flex',
    alignItems: 'center',

    paddingLeft: space[3],
    paddingRight: space[3],

    height: '3.5rem',
    width: 'fit-content',

    color: colors.button.primary.text,
    backgroundColor: colors.button.primary.bg,
    borderColor: colors.button.primary.border,

    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',

    cursor: 'pointer',

    fontFamily: fonts.body,
    fontWeight: semibold,
    fontSize: fontSizes[2],
    // lineHeight: 'solid',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: '1px',
    textTransform: 'uppercase',

    backgroundSize: `${space[7]} ${space[7]}`,
    transition: `background-color color outline border-color ${transition.default}`,

    ':active': {
      outline: 'none',
      textDecoration: 'none',
    },
    ':hover, :focus': {
      backgroundColor: colors.button.primary.hoverBg,
      borderColor: colors.button.primary.hoverBorder,
      outline: 'none',
      textDecoration: 'none',
    },
    ':focus': {
      ...styleFocus,
    },
    ':after': {
      content: '""',
      display: 'block',
    },
    '& svg': {
      marginLeft: '.2em',
    },
  },
  secondary: {
    color: colors.button.secondary.text,
    backgroundColor: colors.button.secondary.bg,
    borderColor: colors.button.secondary.border,
    ':hover, :focus': {
      backgroundColor: colors.button.secondary.hoverBg,
      borderColor: colors.button.secondary.hoverBorder,
      outline: 'none',
    },
  },
};

const Button = ({ to, target, overrideCSS, icon, children, tag = 'button', secondary, tracking, variant, onClick, ...rest }) => {
  const trackingOnClick = (e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }

    let redirect = true;

    // Slightly modified logic from the gatsby-plugin-google-analytics
    // But this one should work with 'Link' component as well
    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
      redirect = false;
    }

    if (target && target.toLowerCase() !== '_self') {
      redirect = false;
    }

    if (tracking && window.ga) {
      window.ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: `${tracking} - ${to}`,
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

  if (tag === 'link') {
    return (
      <Link css={styles} to={to} onClick={trackingOnClick} {...rest}>
        {children}
        {icon}
      </Link>
    );
  }

  if (tag === 'href') {
    return (
      <a css={styles} href={to} target={target} onClick={trackingOnClick} {...rest}>
        {children}
        {icon}
      </a>
    );
  }

  if (tag === 'button') {
    return (
      <button css={styles} onClick={trackingOnClick} {...rest}>
        {children}
        {icon}
      </button>
    );
  }

  return null;
};

export default Button;
