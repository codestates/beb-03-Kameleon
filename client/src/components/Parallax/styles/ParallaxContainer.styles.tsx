import Styled from 'styled-components';

export const ParallaxContainerWrapper = Styled.span`
  position:fixed;
  bottom:0;
  right:0; 
  margin:130px;
  z-index:0;
  width:10%;
  height:10%;
  & > span {
    width:inherit;
    height:inherit;
  }
`;
