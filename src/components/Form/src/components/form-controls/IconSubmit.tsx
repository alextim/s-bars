import React from 'react';
import styled from '@emotion/styled';

import { Button } from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';

const TitleWrap = styled.span`
  margin-left: 0.4em;
`;

type Props = {
  title: string;
  icon: IconName | [IconPrefix, IconName];
};
const IconSubmit = ({ title, icon }: Props) => (
  <Button type="submit">
    <FontAwesomeIcon icon={icon} />
    <TitleWrap>{title}</TitleWrap>
  </Button>
);

export default IconSubmit;
