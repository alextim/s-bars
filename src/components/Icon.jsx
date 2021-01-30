import React from 'react';

import FaFacebookF from '../assets/fa/brand/facebook-f.svg';
import FaInstagram from '../assets/fa/brand/instagram.svg';
import FaLink from '../assets/fa/solid/link.svg';
import FaPhone from '../assets/fa/solid/phone.svg';
import FaEnvelope from '../assets/fa/solid/envelope.svg';
import FaExclamationTriangle from '../assets/fa/solid/exclamation-triangle.svg';
import FaCheckCircle from '../assets/fa/solid/check-circle.svg';

// import { FaTelegram } from 'react-icons/fa';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FaViber } from 'react-icons/fa';
// import { FaSkype } from 'react-icons/fa';

const icons = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  link: <FaLink />,
  phone: <FaPhone />,
  envelope: <FaEnvelope />,
  exclamationTriangle: <FaExclamationTriangle />,
  checkCircle: <FaCheckCircle />,
  // whatsapp: <FaWhatsapp />,
  // telegram: <FaTelegram />,
  // viber: <FaViber />,
  // skype: <FaSkype />,
};

const Icon = ({ name }) => {
  if (!name) {
    return null;
  }
  if (!icons[name]) {
    return `Pls, provide icon "${name}"`;
  }
  // const Comp = icons[name];
  // return <Comp css={css} />;
  return icons[name];
};

export default Icon;
