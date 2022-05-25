import React from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
} from './styles/GovernPage.styles';

import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';

import Poll from '../components/Govern/Poll';
import {
  GovernQueryHooks,
  TotalStakedBalanceHooks,
  MyStakeBalanceHooks,
} from '../hooks/QueryHooks/Govern';
import CreatePoll from '../components/Govern/CreatePoll';
import { useSelector } from 'react-redux';

interface RootState {
  user: {
    isLogin: boolean;
    account: string;
  };
}
const GovernPage = () => {
  const { isOpen, toggle } = useModal();

  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const tokenState: any = TotalStakedBalanceHooks({
    key: 'GovernPage',
  });
  const myStakeBalance: any = MyStakeBalanceHooks({
    key: 'GovernPage',
    account: user.account,
  });
  const {
    isLoading,
    isError,
    data: governList,
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
      <h2 className="tit">Govern</h2>
      <GovernPageGovernList>
        <div>
          <h3>KMT</h3>
          <div>
            <p>TOTAL STAKED</p>
            <div>{tokenState?.data} KMT</div>
          </div>
          <button onClick={toggle}>Create Poll</button>
        </div>
        <div>
          <div>
            <p>MY STAKED</p>
            <div>{myStakeBalance?.data?.staked} KMT</div>
          </div>
          <div>
            <p>MY STAKABLE</p>
            <div>{myStakeBalance?.data?.stakable} KMT</div>
          </div>
          <button>Manage Stake</button>
        </div>
      </GovernPageGovernList>
      <h4>Polls</h4>
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
