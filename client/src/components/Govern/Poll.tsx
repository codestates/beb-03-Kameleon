import React, { useState, useCallback, useEffect } from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import PollModal from './PollModal';
import {
  GovernPagePollItem,
  GovernPageBar,
  GoverQuorum,
  GovernPageModalContent,
} from './../../pages/styles/GovernPage.styles';
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
const Poll = (props: LayoutProps) => {
  const {
    pollId,
    title,
    agree,
    disagree,
    totalSupply,
    createdTime,
    endTime,
    expired,
  }: LayoutProps = props;

  const { isOpen, toggle } = useModal();

  const [yes, no] = [+agree, +disagree];
  console.log('yes or no ', yes, no);
  const now = new Date().getTime();
  const sTime = new Date(+createdTime * 1000);
  const eTime = new Date(+endTime * 1000);
  console.log(expired, 'expired');

  const isNotExpired = now < +endTime * 1000 && expired === false;
  return (
    <>
      <GovernPagePollItem onClick={toggle} yes={yes} no={no}>
        <section>
          <div>
            {isNotExpired ? 'IN PROGRESS' : yes > no ? 'EXECUTED' : 'REJECTED'}
          </div>
          <h2>{title}</h2>
        </section>
        <GoverQuorum
          percentage={process.env.REACT_APP_MINIMUM_VOTING_PERCENTAGE}
        >
          <div>
            <span className="Progress_text__1yeph">
              Quorum {process.env.REACT_APP_MINIMUM_VOTING_PERCENTAGE}%
            </span>
          </div>
        </GoverQuorum>
        <GovernPageBar yes={yes} no={no} totalSupply={totalSupply}>
          <div></div>
          <div></div>
        </GovernPageBar>

        {expired === true ? (
          <div>expiredTime : {eTime.toISOString().slice(0, -5)}</div>
        ) : (
          <div>endTime : {eTime.toISOString().slice(0, -5)}</div>
        )}
      </GovernPagePollItem>
      <Modal
        isOpen={isOpen}
        closeModal={toggle}
        width={400}
        modalContent={<PollModal {...props}></PollModal>}
      ></Modal>
    </>
  );
};

export default Poll;
