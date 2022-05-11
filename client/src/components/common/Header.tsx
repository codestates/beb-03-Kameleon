import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyle, LogoStyle, NavStyle } from './Layout.style';
import logoImage from '../../assets/images/logo.png';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = useState('');

  const onConnectWallet = async () => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.isKaikas) {
        const accounts = await window.klaytn.enable();
        setAccount(accounts[0]);

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
            {isLogin ? (
              <li>
                <Link to="/mypage">MyPage</Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </NavStyle>
        <span className="utils">
          {!isLogin ? (
            <button type="button" onClick={onConnectWallet}>
              Connect
            </button>
          ) : (
            <button type="button">{account.slice(0, 5)}...</button>
          )}
        </span>
      </div>
    </HeaderStyle>
  );
};

export default Header;
