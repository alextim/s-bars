// const purple60 = '#663399';
// const purple30 = '#D9BAE8';

const grey05 = 'rgb(245,245,245)';
// const grey10 = 'rgba(32, 33, 36, 0.01)';
const grey20 = '#78757a';
const grey30 = 'rgba(32, 33, 36, 0.04)';
const grey40 = 'rgba(32, 33, 36, 0.12)';
const grey50 = 'rgba(32, 33, 36, 0.16)';
// const grey60 = 'rgba(32, 33, 36, 0.21)';
const grey70 = '#dadce0';
const grey90 = '#232129';
// const black80 = '#1B1F23';
const black = '#000';
const white = '#fff';
const lightWhite = 'rgba(255, 255, 255, 0.9)';
// const opaqueLightYellow = 'rgba(255, 229, 100, 0.2)';
// const opaqueLightWhite = 'hsla(0, 0%, 100%, 0.2)';
const lightGray = 'hsla(0, 0%, 0%, 0.2)';

const gray20 = '#EBEBEB';
const gray40 = '#dcdcdc';

const red = 'red';

const davisGrey = '#5c5a58';
const jet = '#343332';

// const quickSilver = '#a5a39d';
const nickel = '#7F7D76';
const nickelDark = '#454440';

// const platinum = '#EBEBEB';
// const silver = '#C0C0C0';
// const queenBlue = '#3A6EA5';
// const yaleBlue = '#004E98';

const brand = {
  main: 'rgb(206, 235, 250)',
  secondLight: 'rgb(58, 118, 150)',
  secondLightDarker: 'rgb(28, 88, 120)',
  secondDark: 'rgb(58, 118, 150)',
};

const text = grey90;
const background = white;

const colors = {
  white,
  black,
  text,
  background,
  secondaryBackground: '#f6f8f8',

  primary: brand.secondLight,
  primaryDark: brand.secondLightDarker,
  secondary: nickel,
  secondaryDark: nickelDark,
  muted: lightGray,
  highlight: brand.secondDark,
  heading: grey90,

  error: red,
  brand,

  brands: {
    // skype:    'rgb(0, 175, 240)',
    viber: '#bcaec7',
    whatsapp: '#25d366',
    telegram: '#0088cc',
  },

  header: {
    text,
    bg: background,
    nav: {
      socialLink: grey20,
      item: {
        text,
        borderColor: grey70,
        hoverBg: grey30,
        focusBg: grey40,
        activeBg: grey50,
        boxShadowColor: brand.secondDark,
      },
      submenu: {
        bg: grey05,
      },
      languageSwitch: {
        selected: brand.secondDark,
      },
    },
  },

  footer: {
    text: lightWhite,
    bg: nickel,
    highlight: brand.secondLight,
    colophon: {
      top: {
        bg: davisGrey,
      },
      bottom: {
        bg: jet,
      },
    },
  },

  input: {
    focusBoxShadow: 'red',
  },

  modal: {
    text,
    bg: background,
  },
};

colors.button = {
  text,
  bg: gray20,
  border: gray20,
  hoverBg: gray40,
  hoverBorder: gray40,
  primary: {
    text: white,
    bg: colors.primary,
    border: colors.primary,
    hoverBg: colors.primaryDark,
    hoverBorder: colors.primaryDark,
  },
  secondary: {
    text: white,
    bg: nickel,
    border: nickel,
    hoverBg: colors.secondaryDark,
    hoverBorder: colors.secondaryDark,
  },
};
export default colors;
