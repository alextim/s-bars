import React from 'react';

import Utils from 'at-utils';

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
          to={Utils.whatsappUrl(voice.whatsapp)}
          title="WhatsApp"
          target="_blank"
          rel="noindex noopener noreferrer"
        >
          {Utils.formatPhone(voice.whatsapp)}
        </IconLink>
      )}

      {voice.telegram && (
        <IconLink
          icon="telegram"
          color={telegram}
          to={Utils.telegramUrl(voice.telegram)}
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
          to={Utils.viberUrl(voice.viber)}
          title="Viber"
          target="_blank"
          rel="noindex noopener noreferrer"
        >
          {Utils.formatPhone(voice.viber)}
        </IconLink>
      )}
    </>
  );
};

export default OrganizationCloudPhones;
