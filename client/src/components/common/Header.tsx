import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyle, LogoStyle, NavStyle } from './Layout.style';
import logoImage from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faWallet } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [isNav, setIsNav] = useState<boolean>(false);

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
          <span className="m-menu" onClick={() => setIsNav(true)}>
            <FontAwesomeIcon icon={faBars} />
          </span>
          <div className={`menu-list ${isNav ? 'on' : ''}`}>
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
            <span className="btn-close" onClick={() => setIsNav(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
            <span className="utils">
              {!isLogin ? (
                <button type="button" onClick={onConnectWallet}>
                  <em>
                    <FontAwesomeIcon icon={faWallet} />
                  </em>
                  Connect
                </button>
              ) : (
                <button type="button">{account.slice(0, 5)}...</button>
              )}
            </span>
          </div>
        </NavStyle>
      </div>
    </HeaderStyle>
  );
};

export default Header;
