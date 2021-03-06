import React from 'react';
import { FooterStyle } from './Layout.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <FooterStyle>
      <span className="copyright">
        copyright(c) 2022 All rights reserved by Kameleon |
      </span>
      <span className="m-copyright">copyright(c) 2022 by Kameleon |</span>
      <a href="https://github.com/codestates/beb-03-Kameleon">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </FooterStyle>
  );
};

export default Footer;
