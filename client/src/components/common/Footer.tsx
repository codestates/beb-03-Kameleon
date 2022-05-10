import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterStyle = styled.footer`
  padding: 12px 0;
  width: 100%;
  text-align: center;
  color: #fff;

  a {
    color: #fff;
    margin-left: 5px;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      copyright(c) 2022 All rights reserved by Kameleon |
      <a href="https://github.com/codestates/beb-03-Kameleon">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </FooterStyle>
  );
};

export default Footer;
