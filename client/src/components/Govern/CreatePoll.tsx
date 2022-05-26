import React, { useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { GovernPageModalContent } from '../../pages/styles/GovernPage.styles';

import ToastPortal from '../portal/ToastPortal';

import { sendContract } from '../../utils/KAS';
import { contractAddressTable } from '../../constants';

const CreatePoll = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const successNotify = () => toast.success('SUCCESS!!!');
  const failNotify = () => toast.error('FAIL!!!');

  const createPollHander = async () => {
    const result = await sendContract({
      contractName: 'Govern',
      contractAddress: contractAddressTable['Govern'],
      methodName: 'createPoll',
      parameters: [title, content, +day],
    });
    console.log(result);
    if (result instanceof Error === false) {
      successNotify();
    } else {
      failNotify();
    }
  };
  return (
    <GovernPageModalContent>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <input id="content" onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label htmlFor="day">Day</label>
        <input id="day" onChange={(e) => setDay(e.target.value)} />
      </div>
      <button onClick={createPollHander}>Create</button>
      <ToastPortal />
    </GovernPageModalContent>
  );
};
export default CreatePoll;
