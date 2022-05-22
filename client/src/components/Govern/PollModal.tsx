import React, { useState, useCallback, useEffect } from 'react';
import { WithdrawableBalanceQueryHooks } from '../../hooks/QueryHooks/Govern';
import useModal from '../../hooks/useModal';
import { GovernPageModalContent } from '../../pages/styles/GovernPage.styles';
import { sendContract } from '../../utils/KAS';
import GovernInput from '../Input/GovernInput';
interface LayoutProps {
  key: any;
  pollId: string;
  title: string;
  agree: number;
  disagree: number;
  createdTime: string;
  content: string;
  creator: string;
  endTime: string;
  expired: boolean;
  totalSupply: string;
}
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
}: LayoutProps) => {
  const [yes, no] = [+agree, +disagree];
  console.log('yes or no ', yes, no);
  const now = new Date().getTime();
  const sTime = new Date(+createdTime * 1000).toISOString().slice(0, -5);
  const eTime = new Date(+endTime * 1000).toISOString().slice(0, -5);
  console.log(expired, 'expired');

  const isNotExpired = now < +endTime * 1000 || expired === false;

  const { isSuccess, data }: { data: number | undefined; isSuccess: boolean } =
    WithdrawableBalanceQueryHooks({
      key: pollId,
      pollId,
    });

  const withdrawBalanceHander = async () => {
    const result = await sendContract({
      contractName: 'Govern',
      contractAddress: '0x105FFb98CAA6436A753711D05FB2252Fc7d76620',
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
            {sTime} ~ {eTime}
          </div>
        </div>
        <div>
          <label htmlFor="vote">투표하기</label>
          <GovernInput pollId={pollId}>AMOUNT</GovernInput>
        </div>
        {isSuccess && (
          <>
            <div>회수가능한 토큰: {data}</div>
            <div>
              <button onClick={withdrawBalanceHander}>회수하기</button>
            </div>
          </>
        )}
      </GovernPageModalContent>
    </>
  );
};

export default PollModal;
