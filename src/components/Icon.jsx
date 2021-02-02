/** @jsx jsx */
import { jsx } from '@emotion/react';

import FaFacebookF from '../assets/fa/brand/facebook-f.svg';
import FaInstagram from '../assets/fa/brand/instagram.svg';
import FaLink from '../assets/fa/solid/link.svg';
import FaPhone from '../assets/fa/solid/phone.svg';
import FaEnvelope from '../assets/fa/solid/envelope.svg';
import FaExclamationTriangle from '../assets/fa/solid/exclamation-triangle.svg';
import FaCheckCircle from '../assets/fa/solid/check-circle.svg';
import FaThumbsUp from '../assets/fa/regular/thumbs-up.svg';
import FaCheck from '../assets/fa/solid/check.svg';
import FaPlane from '../assets/fa/solid/plane.svg';
import FaUsers from '../assets/fa/solid/users.svg';

// import { FaTelegram } from 'react-icons/fa';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FaViber } from 'react-icons/fa';
// import { FaSkype } from 'react-icons/fa';

const Icon = ({ name, extraStyle }) => {
  if (!name) {
    return null;
  }
  const icons = {
    facebook: <FaFacebookF css={extraStyle} />,
    instagram: <FaInstagram css={extraStyle} />,
    link: <FaLink css={extraStyle} />,
    phone: <FaPhone css={extraStyle} />,
    envelope: <FaEnvelope css={extraStyle} />,
    exclamationTriangle: <FaExclamationTriangle css={extraStyle} />,
    checkCircle: <FaCheckCircle css={extraStyle} />,
    thumbsUp: <FaThumbsUp css={extraStyle} />,
    check: <FaCheck css={extraStyle} />,
    plane: <FaPlane css={extraStyle} />,
    users: <FaUsers css={extraStyle} />,
    // whatsapp: <FaWhatsapp />,
    // telegram: <FaTelegram />,
    // viber: <FaViber />,
    // skype: <FaSkype />,
  };
  if (!icons[name]) {
    return `Pls, provide icon "${name}"`;
  }
  // const Comp = icons[name];
  // return <Comp css={extraStyle} />;
  return icons[name];
};

export default Icon;
