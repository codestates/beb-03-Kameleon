import styled from 'styled-components';

const StockLogoStyle = styled.img`
  /* width: 70px; */
  height: 20px;
  max-width: 60px;
  margin-left: 5px;
  margin-right: 5px;
  @media (max-width: 760px) {
    display: none;
  }
`;

export { StockLogoStyle };
