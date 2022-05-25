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
import { login, logout, onSelectNav, selectUser } from '../../store/user';

const Header = () => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nav = user.nav;

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

  console.log('nav', nav);
  return (
    <HeaderStyle>
      <div className="layout">
        <LogoStyle>
          <Link to="/" onClick={() => dispatch(onSelectNav('home'))}>
            Kameleon
          </Link>
        </LogoStyle>
        <NavStyle>
          <span className="m-menu" onClick={() => setIsNav(true)}>
            <FontAwesomeIcon icon={faBars} />
          </span>
          <div className={`menu-list ${isNav ? 'on' : ''}`}>
            <ul>
              <li
                className={nav === 'home' ? 'on' : ''}
                onClick={() => dispatch(onSelectNav('home'))}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={nav === 'swap' ? 'on' : ''}
                onClick={() => dispatch(onSelectNav('swap'))}
              >
                <Link to="/swap">Swap</Link>
              </li>
              <li
                className={nav === 'pool' ? 'on' : ''}
                onClick={() => dispatch(onSelectNav('pool'))}
              >
                <Link to="/pool">Pool</Link>
              </li>
              <li
                className={nav === 'mint' ? 'on' : ''}
                onClick={() => dispatch(onSelectNav('mint'))}
              >
                <Link to="/mint">Mint&Burn</Link>
              </li>
              <li
                className={nav === 'govern' ? 'on' : ''}
                onClick={() => dispatch(onSelectNav('govern'))}
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
                  <Link
                    to="/mypage"
                    className={nav === 'mypage' ? 'on' : ''}
                    onClick={() => dispatch(onSelectNav('mypage'))}
                  >
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
