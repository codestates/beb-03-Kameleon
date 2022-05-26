import React, { useEffect } from 'react';
import Styled from 'styled-components';
import Parallax from 'parallax-js';

import tree1 from './../../assets/tree1.svg';
import tree2 from './../../assets/tree2.svg';
import snake1 from './../../assets/snake1.svg';
import snake2 from './../../assets/snake2.svg';
import backgroundKameleon from './../../assets/backgroundKameleon.svg';
import kameleon from './../../assets/Kameleon.svg';
import line from './../../assets/Line.svg';
import mosquito from './../../assets/Mosquito.svg';
import {
  ChameleonContainer,
  ParallaxContainerWrapper,
  SnakeContainer,
} from './styles/ParallaxContainer.styles';

const layers = [
  {
    name: 'astronaut',
    image: backgroundKameleon,
    dataDepth: '-0.05',
    width: '200px',
    height: '200px',
  },
  {
    name: 'planet1',
    image: kameleon,
    dataDepth: '1',
    width: '200px',
    height: '200px',
  },
  {
    name: 'planet2',
    image: line,
    dataDepth: '0.1',
    width: '200px',
    height: '200px',
  },
  {
    name: 'rocket',
    image: mosquito,
    dataDepth: '0.1',
    width: '200px',
    height: '200px',
  },
];

const layers2 = [
  {
    name: 'snake2',
    image: snake2,
    dataDepth: '-1',
    width: '200px',
    height: '200px',
  },
];

const ParallaxImagesContainer = () => {
  useEffect(() => {
    const kameleon = document.getElementById('kameleon') as HTMLElement;
    const snake = document.getElementById('snake') as HTMLElement;
    new Parallax(kameleon);
    new Parallax(snake);
  });

  return (
    <ParallaxContainerWrapper>
      <ChameleonContainer>
        <span id="kameleon">
          {layers.map((l, index) => (
            <img
              key={index}
              data-depth={l.dataDepth}
              src={l.image}
              alt={l.name}
              width={l.width}
              height={l.height}
            />
          ))}
        </span>
      </ChameleonContainer>
      <SnakeContainer>
        <span id="snake">
          {layers2.map((l, index) => (
            <img
              key={index}
              data-depth={l.dataDepth}
              src={l.image}
              alt={l.name}
              width={l.width}
              height={l.height}
            />
          ))}
        </span>
      </SnakeContainer>
    </ParallaxContainerWrapper>
  );
};
export default ParallaxImagesContainer;
