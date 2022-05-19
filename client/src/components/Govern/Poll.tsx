import React, { useState, useCallback, useEffect } from 'react';
import {
  GovernPagePollItem,
  GovernPageBar,
} from './../../pages/styles/GovernPage.styles';
interface LayoutProps {
  key: any;
  title: string;
  agree: number;
  disagree: number;
  createdTime: string;
  content: string;
  creator: string;
  endTime: string;
  expired: boolean;
}
const Poll = ({ title, agree, disagree }: LayoutProps) => {
  const [yes, no] = [+agree, +disagree];
  console.log('yes or no ', yes, no);
  return (
    <GovernPagePollItem yes={yes} no={no}>
      <section>
        <div>
          {yes + no < +process.env.REACT_APP_MINIMUM_VOTING_PERCENTAGE
            ? 'IN PROGRESS'
            : yes > no
            ? 'EXECUTED'
            : 'REJECTED'}
        </div>
        <h2>{title}</h2>
      </section>
      <GovernPageBar yes={yes} no={no}>
        <div></div>
        <div></div>
      </GovernPageBar>
      <p>5 days left</p>
    </GovernPagePollItem>
  );
};

export default Poll;
