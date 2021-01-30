import React from 'react';
import { useTheme } from '@emotion/react';

import Utils from '../../lib/utils';

import IconLink from '../IconLink';
import extraPadding from './extraPadding';

const extraStyle = {
  ...extraPadding,
};
const OrganizationCloudPhones = ({ voice }) => {
  const theme = useTheme();

  const { whatsapp, viber, telegram } = theme.colors.brands;

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
          extraStyle={extraStyle}
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
