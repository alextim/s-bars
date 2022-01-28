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
// import FaHome from '../assets/fa/solid/home.svg';
import AntHome from '../assets/ant-design-icons/outlined/home.svg';

// import { FaTelegram } from 'react-icons/fa';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FaViber } from 'react-icons/fa';
// import { FaSkype } from 'react-icons/fa';

const styleDefault = {
  width: '1em',
  height: '1em',
};

const Icon = ({ name, css = {}, ...rest }) => {
  if (!name) {
    return null;
  }
  const style = { ...styleDefault, ...css };
  const icons = {
    facebook: <FaFacebookF css={style} {...rest} />,
    instagram: <FaInstagram css={style} {...rest} />,
    link: <FaLink css={style} {...rest} />,
    phone: <FaPhone css={style} {...rest} />,
    envelope: <FaEnvelope css={style} {...rest} />,
    exclamationTriangle: <FaExclamationTriangle css={style} {...rest} />,
    checkCircle: <FaCheckCircle css={style} {...rest} />,
    thumbsUp: <FaThumbsUp css={style} {...rest} />,
    check: <FaCheck css={style} {...rest} />,
    plane: <FaPlane css={style} {...rest} />,
    users: <FaUsers css={style} {...rest} />,
    home: <AntHome css={style} {...rest} />,
    // whatsapp: <FaWhatsapp css={style} />,
    // telegram: <FaTelegram css={style} />,
    // viber: <FaViber css={style} />,
    // skype: <FaSkype css={style} />,
  };
  if (!icons[name]) {
    return `Pls, provide icon "${name}"`;
  }
  // const Comp = icons[name];
  // return <Comp css={extraStyle} />;
  return icons[name];
};

export default Icon;
