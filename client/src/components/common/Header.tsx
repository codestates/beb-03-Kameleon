import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/images/logo.png';

const HeaderStyle = styled.header`
  width: 100%;
  background-color: #276955;

  .layout {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 80px;
  }

  .utils {
    display: block;
    margin-right: auto;
  }
`;

const LogoStyle = styled.h1`
  width: 140px;
  a {
    display: block;
    padding: 9px 0;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const NavStyle = styled.nav`
  width: 80%;
  height: 100%;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  li {
    padding: 0 15px;
    a {
      display: block;
      color: #fff;
      font-size: 1.3rem;
    }
  }
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onConnectWallet = async () => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.isKaikas) {
        const accounts = await window.klaytn.enable();
        const account = accounts[0];

        setIsLogin(true);
      }
    } else {
      alert('Kaikas 설치하시기 바랍니다.');
    }
  };

  return (
    <HeaderStyle>
      <div className="layout">
        <LogoStyle>
          <Link to="/">
            <img src={logoImage} alt="logo" />
          </Link>
        </LogoStyle>
        <NavStyle>
          <ul>
            <li>
              <Link to="/swap">Swap</Link>
            </li>
            <li>
              <Link to="/pool">Pool</Link>
            </li>
            <li>
              <Link to="/mint">Mint&Burn</Link>
            </li>
            <li>
              <Link to="/govern">Govern</Link>
            </li>
          </ul>
        </NavStyle>
        <span className="utils">
          {!isLogin ? (
            <button type="button" onClick={onConnectWallet}>
              Connect
            </button>
          ) : (
            <button type="button">MyPage</button>
          )}
        </span>
      </div>
    </HeaderStyle>
  );
};

export default Header;
