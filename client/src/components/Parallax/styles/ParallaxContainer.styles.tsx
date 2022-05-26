import Styled from 'styled-components';

export const ParallaxContainerWrapper = Styled.span`
  position:absolute;
  top:0;
  left:0; 
`;

export const ChameleonContainer = Styled.div`
  display:block;
  position:fixed;
  margin:40px;
  right:0;
  bottom:0;
  & > span > img{
    width:10rem;
  }
  @media (max-width: 760px) {
    display:none;
  }
`;
export const SnakeContainer = Styled.div`
display:block;
  position:fixed;
  margin:40px;
  left:0;
  bottom:0;
  & > span > img{
    width:10rem;
  }
  @media (max-width: 760px) {
    display:none;
  }
`;
