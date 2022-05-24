import React from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
  GovernPageModalContent,
} from './styles/GovernPage.styles';

import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';

import Poll from '../components/Govern/Poll';
import { GovernQueryHooks } from '../hooks/QueryHooks/Govern';

const GovernPage = () => {
  const { isOpen, toggle } = useModal();
  const {
    isLoading,
    isError,
    error,
    data: governList,
    isSuccess,
  } = GovernQueryHooks({
    key: 'test',
  });

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
  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError) {
    return <div>isError</div>;
  }

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
        {governList.map(({ id, ...el }: any, idx: number) => {
          return <Poll key={idx} pollId={id} {...el} />;
        })}
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
