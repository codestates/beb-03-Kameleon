import React from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import PollModal from './PollModal';
import {
  GovernPagePollItem,
  GovernPageBar,
  GoverQuorum,
} from './../../pages/styles/GovernPage.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckToSlot,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { IGovernPropsType } from '../../types/components/Govern.types';

const Poll = (props: IGovernPropsType) => {
  const {
    title,
    agree,
    disagree,
    totalSupply,
    endTime,
    expired,
  }: IGovernPropsType = props;

  const { isOpen, toggle } = useModal();

  const [yes, no] = [+agree, +disagree];
  console.log('yes or no ', yes, no);
  const now = new Date().getTime();
  const eTime = new Date(+endTime * 1000);

  const isExpired = now > +endTime * 1000 || expired === true;
  const isNotExpired = !isExpired;
  const enoughQuorum = (yes + no) / +totalSupply > 0.2;
  return (
    <>
      <GovernPagePollItem
        onClick={toggle}
        yes={yes}
        no={no}
        isExpired={isExpired}
        enoughQuorum={enoughQuorum}
      >
        <section>
          <div>
            {isNotExpired ? (
              <>
                <FontAwesomeIcon icon={faCheckToSlot} /> IN PROGRESS
              </>
            ) : yes > no && enoughQuorum ? (
              <>
                <FontAwesomeIcon icon={faCheck} /> EXECUTED
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faXmark} /> REJECTED
              </>
            )}
          </div>
          <span>
            <b>TITLE :</b>
            <em>{title}</em>
          </span>
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

        <div>
          {`투표 마감 시간 : ${eTime.toLocaleString('ko')} ( `}
          <Moment fromNow style={{ fontSize: '0.8rem' }}>
            {+endTime * 1000}
          </Moment>
          {')'}
        </div>
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
