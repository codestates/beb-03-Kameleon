import React from 'react';
import { WithdrawableBalanceQueryHooks } from '../../hooks/QueryHooks/Govern';
import { GovernPageModalContent } from '../../pages/styles/GovernPage.styles';
import { sendContract } from '../../utils/KAS';
import GovernInput from '../Input/GovernInput';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { IGovernPropsType } from '../../types/components/Govern.types';
import { contractAddressTable } from '../../constants';

const PollModal = ({
  pollId,
  title,
  content,
  agree,
  disagree,
  totalSupply,
  createdTime,
  endTime,
  expired,
}: IGovernPropsType) => {
  const [yes, no] = [+agree, +disagree];
  console.log('yes or no ', yes, no);
  const now = new Date().getTime();
  console.log(expired, 'expired');

  const isExpired = now > +endTime * 1000 || expired === true;

  const { isSuccess, data }: { data: number | undefined; isSuccess: boolean } =
    WithdrawableBalanceQueryHooks({
      key: pollId,
      pollId,
    });

  const withdrawBalanceHander = async () => {
    const result = await sendContract({
      contractName: 'Govern',
      contractAddress: contractAddressTable['Govern'],
      methodName: 'withdrawBalance',
      parameters: [+pollId],
    });
    console.log(result);
  };
  return (
    <>
      <GovernPageModalContent>
        <div>
          <label htmlFor="pollId">pollId</label>
          <div>{pollId}</div>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <div>{title}</div>
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <div>{content}</div>
        </div>
        <div>
          <label htmlFor="agree">agree</label>
          <div>{+agree / 10 ** 18}</div>
        </div>
        <div>
          <label htmlFor="disagree">disagree</label>
          <div>{+disagree / 10 ** 18}</div>
        </div>
        <div>
          <label htmlFor="totalSupply">totalSupply</label>
          <div>{+totalSupply / 10 ** 18}</div>
        </div>
        <div>
          <label htmlFor="totalSupply">expired</label>
          <div>{expired.toString()}</div>
        </div>
        <div>
          <label htmlFor="time">time</label>
          <div>
            {
              <Moment format="YYYY-MM-DD HH:mm:ss">
                {+createdTime * 1000}
              </Moment>
            }{' '}
            ~ {<Moment format="YYYY-MM-DD HH:mm:ss">{+endTime * 1000}</Moment>}
          </div>
          <div>
            투표 마감 : <Moment fromNow>{+endTime * 1000}</Moment>
          </div>
        </div>
        <div>
          <label htmlFor="vote">투표하기</label>
          <GovernInput pollId={pollId}>AMOUNT</GovernInput>
        </div>
        <br></br>
        {isSuccess && (
          <>
            <div>회수가능한 토큰: {data}</div>
            <div>
              {isExpired && (
                <button onClick={withdrawBalanceHander}>회수하기</button>
              )}
            </div>
          </>
        )}
      </GovernPageModalContent>
    </>
  );
};

export default PollModal;
