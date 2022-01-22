import React, { useState } from 'react';

import mq from '@/theme/media-queries';
import BODY_PREVENT_SCROLLING from '@/constants/body-prevent-scrolling';
import useMainNavItems from '@/hooks/useMainNavtems';

import Hamburger from '../Hamburger';
import Logo from '../Logo';

import { Left, Right } from './styled';
import Menu from './Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = useMainNavItems();

  const setIsMenuOpenWrap = (value) => {
    const list = document.body.classList;
    const hasClass = list.contains(BODY_PREVENT_SCROLLING);
    if (value) {
      if (!hasClass) {
        list.add(BODY_PREVENT_SCROLLING);
      }
    } else if (hasClass) {
      list.remove(BODY_PREVENT_SCROLLING);
    }
    setIsMenuOpen(value);
  };

  const toggleOpen = () => setIsMenuOpenWrap(!isMenuOpen);
  const close = () => setIsMenuOpenWrap(false);

  //    <Menu menuData={menuData} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpenWrap} />
  return (
    <React.Fragment>
      <Left>
        <Logo onClick={close} />
      </Left>
      <Menu navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpenWrap} />
      <Right>
        <Hamburger open={isMenuOpen} bp={mq.lg} onClick={toggleOpen} />
      </Right>
    </React.Fragment>
  );
};

export default Navbar;
