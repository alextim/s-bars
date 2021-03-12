import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import fonts from '../../theme/fonts';
import { fontSizes } from '../../theme/font-sizes';
import fontWeights from '../../theme/font-weights';

export const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const styleTitle = {
  marginBottom: space[2],
  fontSize: fontSizes[4],
  fontFamily: fonts.heading,
  fontWeight: fontWeights.heading,
  [mq.lg]: {
    fontSize: fontSizes[5],
  },
};

export const styleSubtitle = {
  marginBottom: space[4],
};

export const styleImg = {
  marginBottom: space[2],
};

export const styleText = {
  textAlign: 'center',
};
