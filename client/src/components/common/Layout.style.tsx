import styled from 'styled-components';

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

export { HeaderStyle, LogoStyle, NavStyle, FooterStyle };
