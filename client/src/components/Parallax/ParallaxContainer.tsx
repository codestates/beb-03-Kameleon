import React, { useEffect } from 'react';
import Styled from 'styled-components';
import Parallax from 'parallax-js';

import astronautImage from './../../assets/astronaut.png';
import planet1Image from './../../assets/planet1.png';
import planet2Image from './../../assets/planet2.png';
import rocketImage from './../../assets/rocket.png';
import backgroundKameleon from './../../assets/backgroundKameleon.svg';
import kameleon from './../../assets/Kameleon.svg';
import line from './../../assets/Line.svg';
import mosquito from './../../assets/Mosquito.svg';
import { ParallaxContainerWrapper } from './styles/ParallaxContainer.styles';

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
  // {
  //   name: 'astronaut',
  //   image: astronautImage,
  //   dataDepth: '2',
  // },
  // {
  //   name: 'planet1',
  //   image: planet1Image,
  //   dataDepth: '1',
  // },
  // {
  //   name: 'planet2',
  //   image: planet2Image,
  //   dataDepth: '-1',
  // },
  // {
  //   name: 'rocket',
  //   image: rocketImage,
  //   dataDepth: '10',
  // },
];

const ParallaxImagesContainer = () => {
  useEffect(() => {
    const scene = document.getElementById('scene') as HTMLElement;
    new Parallax(scene);
  });

  return (
    <ParallaxContainerWrapper>
      <span id="scene">
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
    </ParallaxContainerWrapper>
  );
};
export default ParallaxImagesContainer;
