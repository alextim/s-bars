import React from 'react';

import utils from '@alextim/utils';

import colors from '../../theme/colors';

import IconLink from '../IconLink';

const OrganizationCloudPhones = ({ voice }) => {
  const { whatsapp, viber, telegram } = colors.brands;
  return (
    <>
      {voice.whatsapp && (
        <IconLink
          icon="whatsapp"
          color={whatsapp}
          to={utils.whatsappUrl(voice.whatsapp)}
          title="WhatsApp"
          target="_blank"
          rel="noindex noopener noreferrer"
        >
          {utils.formatPhone(voice.whatsapp)}
        </IconLink>
      )}

      {voice.telegram && (
        <IconLink
          icon="telegram"
          color={telegram}
          to={utils.telegramUrl(voice.telegram)}
          title="Telegram"
          target="_blank"
          rel="noindex noopener noreferrer"
        >
          {voice.telegram}
        </IconLink>
      )}

      {voice.viber && (
        <IconLink
          icon="viber"
          color={viber}
          to={utils.viberUrl(voice.viber)}
          title="Viber"
          target="_blank"
          rel="noindex noopener noreferrer"
        >
          {utils.formatPhone(voice.viber)}
        </IconLink>
      )}
    </>
  );
};

export default OrganizationCloudPhones;
