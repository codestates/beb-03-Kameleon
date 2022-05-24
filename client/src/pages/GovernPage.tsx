import React, { useEffect } from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
  GovernPageModalContent,
} from './styles/GovernPage.styles';

import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';

import Poll from '../components/Govern/Poll';
import {
  GovernQueryHooks,
  TotalStakedBalanceHooks,
} from '../hooks/QueryHooks/Govern';
import CreatePoll from '../components/Govern/CreatePoll';

const GovernPage = () => {
  const { isOpen, toggle } = useModal();
  const tokenState = TotalStakedBalanceHooks({
    key: 'GovernPage',
  });
  const {
    isLoading,
    isError,
    error,
    data: governList,
    isSuccess,
  } = GovernQueryHooks({
    key: 'GovernPage',
  });

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
            <div>{tokenState?.data} KMT</div>
          </div>
          <button onClick={toggle}>Create Poll</button>
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
        modalContent={<CreatePoll />}
      ></Modal>
    </GovernPageWrapper>
  );
};

export default GovernPage;
