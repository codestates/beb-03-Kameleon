import React from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
  GovernPagePollItem,
  GovernPageBar,
  GovernPageModalContent,
} from './styles/GovernPage.styles';

import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';

import { createGovernList } from '../utils/dummyCreator';

const GovernPage = () => {
  const { isOpen, toggle } = useModal();

  const governList = createGovernList(10);

  const modalContent = (
    <GovernPageModalContent>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <input id="content" />
      </div>
      <button>Create</button>
    </GovernPageModalContent>
  );

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
          <button onClick={toggle}>Create Pool</button>
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
      <Modal
        isOpen={isOpen}
        closeModal={toggle}
        modalContent={modalContent}
      ></Modal>
    </GovernPageWrapper>
  );
};

export default GovernPage;
