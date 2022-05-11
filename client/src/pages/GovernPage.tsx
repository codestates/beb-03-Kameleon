import React from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
  GovernPagePollItem,
  GovernPageBar,
} from './GovernPage.styles';

import { createGovernList } from '../utils/dummyCreator';

const GovernPage = () => {
  const governList = createGovernList(10);

  return (
    <GovernPageWrapper>
      <h2>Govern</h2>
      <GovernPageGovernList>
        <div>
          <h1>KMT</h1>
          <div>
            <p>TOTAL STAKED</p>
            <div>47.45M KMT</div>
          </div>
        </div>
        <div>
          <div>
            <p>STAKED</p>
            <div>75.25 KMT</div>
          </div>
          <div>
            <p>STAKABLE</p>
            <div>56.65 KMT</div>
          </div>
          <button>Manage Stake</button>
        </div>
      </GovernPageGovernList>
      <h2>Polls</h2>
      <GovernPagePollList>
        {governList.map((el) => (
          <GovernPagePollItem key={el.id} yes={el.yes} no={el.no}>
            <section>
              <div>
                {el.yes + el.no < 20
                  ? 'IN PROGRESS'
                  : el.yes > el.no
                  ? 'EXECUTED'
                  : 'REJECTED'}
              </div>
              <h2>{el.name}</h2>
            </section>
            <GovernPageBar yes={el.yes} no={el.no}>
              <div></div>
              <div></div>
            </GovernPageBar>
            <p>5 days left</p>
          </GovernPagePollItem>
        ))}
      </GovernPagePollList>
    </GovernPageWrapper>
  );
};

export default GovernPage;
