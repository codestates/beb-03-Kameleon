import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderStyle, LogoStyle, NavStyle } from './Layout.style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faWallet,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
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
  const [nav, setNav] = useState<string>('home');
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
          <Link to="/">Kameleon</Link>
        </LogoStyle>
        <NavStyle>
          <span className="m-menu" onClick={() => setIsNav(true)}>
            <FontAwesomeIcon icon={faBars} />
          </span>
          <div className={`menu-list ${isNav ? 'on' : ''}`}>
            <ul>
              <li
                className={nav === 'home' ? 'on' : ''}
                onClick={() => setNav('home')}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={nav === 'swap' ? 'on' : ''}
                onClick={() => setNav('swap')}
              >
                <Link to="/swap">Swap</Link>
              </li>
              <li
                className={nav === 'pool' ? 'on' : ''}
                onClick={() => setNav('pool')}
              >
                <Link to="/pool">Pool</Link>
              </li>
              <li
                className={nav === 'mint' ? 'on' : ''}
                onClick={() => setNav('mint')}
              >
                <Link to="/mint">Mint&Burn</Link>
              </li>
              <li
                className={nav === 'govern' ? 'on' : ''}
                onClick={() => setNav('govern')}
              >
                <Link to="/govern">Govern</Link>
              </li>
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
                <>
                  <Link to="/mypage">
                    <em>
                      <FontAwesomeIcon icon={faUser} />
                    </em>
                    {user.account.slice(0, 5)}...
                  </Link>
                </>
              )}
            </span>
          </div>
        </NavStyle>
      </div>
    </HeaderStyle>
  );
};

export default Header;
