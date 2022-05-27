import React from 'react';

import {
  GovernPageWrapper,
  GovernPageGovernList,
  GovernPagePollList,
} from './styles/GovernPage.styles';

import ModalPortal from '../components/portal/ModalPortal';
import useModal from '../hooks/useModal';

import Poll from '../components/Govern/Poll';
import {
  GovernQueryHooks,
  TotalStakedBalanceHooks,
  MyStakeBalanceHooks,
} from '../hooks/QueryHooks/Govern';
import CreatePoll from '../components/Govern/CreatePoll';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onSelectNav } from '../store/user';

interface RootState {
  user: {
    isLogin: boolean;
    account: string;
  };
}
const GovernPage = () => {
  const { isOpen, toggle } = useModal();
  const dispatch = useDispatch();

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
          <Link to={`/myPage`} onClick={() => dispatch(onSelectNav('mypage'))}>
            <button>Manage Stake</button>
          </Link>
        </div>
      </GovernPageGovernList>
      <h4>Polls</h4>
      <GovernPagePollList>
        {governList.map(({ id, ...el }: any, idx: number) => {
          return <Poll key={idx} pollId={id} {...el} />;
        })}
      </GovernPagePollList>
      <ModalPortal
        isOpen={isOpen}
        closeModal={toggle}
        modalContent={<CreatePoll />}
      ></ModalPortal>
    </GovernPageWrapper>
  );
};

export default GovernPage;
