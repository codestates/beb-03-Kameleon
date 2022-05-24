import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyle, LogoStyle, NavStyle } from './Layout.style';
import logoImage from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/user';

interface RootState {
  user: {
    isLogin: boolean;
    account: string;
  };
}

const Header = () => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const onConnectWallet = async () => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.isKaikas) {
        const accounts = await window.klaytn.enable();
        dispatch(login(accounts[0]));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
      alert('Kaikas 설치하시기 바랍니다.');
    }
  };

  useEffect(() => {
    const checkUnlocked = async () => {
      const isUnlokced = await window.klaytn._kaikas.isUnlocked();
      if (!isUnlokced) {
        dispatch(logout());
      } else {
        const address = await window.klaytn.selectedAddress;
        if (address !== user.account) {
          dispatch(logout());
        }
      }
    };

    checkUnlocked();
  }, []);

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
              {user.isLogin ? (
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
              {!user.isLogin ? (
                <button type="button" onClick={onConnectWallet}>
                  <em>
                    <FontAwesomeIcon icon={faWallet} />
                  </em>
                  Connect
                </button>
              ) : (
                <button type="button">{user.account.slice(0, 5)}...</button>
              )}
            </span>
          </div>
        </NavStyle>
      </div>
    </HeaderStyle>
  );
};

export default Header;
