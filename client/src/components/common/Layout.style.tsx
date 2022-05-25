import styled from 'styled-components';
import mobLogoImage from '../../assets/images/m-logo.png';
import logoImage from '../../assets/images/logo.png';

const HeaderStyle = styled.header`
  width: 100%;
  background-color: var(--dark-green);
  box-shadow: 0px 5px 5px rgba(19, 48, 39, 0.3);

  .layout {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 80px;
  }

  @media only screen and (max-width: 760px) {
    .layout {
      height: 60px;
    }
    .utils {
      display: none;
    }
  }
`;

const LogoStyle = styled.h1`
  width: 140px;
  a {
    display: block;
    padding-top: 80px;
    font-size: 0;
    background-image: url(${logoImage});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
  }

  @media only screen and (max-width: 760px) {
    width: 60px;
    a {
      background-image: url(${mobLogoImage});
      background-size: 70%;
    }
  }
`;

const NavStyle = styled.nav`
  width: calc(100% - 140px);
  height: 100%;

  .menu-list {
    display: flex;
    align-items: center;
    height: 100%;

    & > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 100%;
    }
    li {
      padding: 0 15px;
      a {
        display: block;
        color: #41a58d;
        font-size: 1.3rem;
      }

      transition: all 0.5s;

      &:hover {
        a {
          color: #fff;
        }
      }

      &.on {
        a {
          color: #fff;
          font-weight: 700;
        }
      }
    }
  }

  .utils {
    display: block;
    margin-left: auto;

    & > a,
    & > button {
      display: inline-block;
      padding: 0.4rem 1.5rem;
      min-width: 140px;
      background-color: transparent;
      border: 2px solid var(--green);
      border-radius: 4rem;
      color: var(--green);
      font-size: 0.8rem;
      font-weight: 700;

      & em {
        margin-right: 0.6rem;
      }
    }
  }

  .m-menu {
    display: none;
    margin-left: auto;
    padding: 0.4rem;
    font-size: 1.5rem;
    color: var(--white);
    cursor: pointer;
  }

  .btn-close {
    display: none;
    position: absolute;
    top: 24px;
    right: 24px;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1;
  }

  @media only screen and (max-width: 760px) {
    display: flex;
    align-items: center;
    margin-left: auto;

    .m-menu,
    .btn-close {
      display: block;
    }

    .menu-list {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;

      &.on {
        display: block;
      }

      & > ul {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        padding: 7rem 2rem 3rem;
        text-align: right;
        background-color: var(--deep-green);
      }

      & li {
        margin-top: 1.5rem;

        :first-child {
          margin-top: 0;
        }
      }

      & a {
        color: var(--white);
        font-size: 1.5rem;
      }

      .utils {
        position: absolute;
        top: 8px;
        right: 5%;
        width: 40%;
        margin: auto;
        padding: 1rem 0;
        text-align: left;
        border-bottom: 1px solid var(--white);

        a {
          font-size: 1rem;
        }
      }
    }
  }
`;

const FooterStyle = styled.footer`
  padding: 12px 0;
  width: 100%;
  text-align: center;
  color: #fff;

  a {
    color: #fff;
    margin-left: 5px;
  }

  .m-copyright {
    display: none;
  }

  @media only screen and (max-width: 760px) {
    .copyright {
      display: none;
    }
    .m-copyright {
      display: inline-block;
    }
  }
`;

export { HeaderStyle, LogoStyle, NavStyle, FooterStyle };
