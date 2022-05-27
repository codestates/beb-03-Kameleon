import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastPortal = () => {
  const toast = (
    <>
      <ToastContainer icon={false} />
    </>
  );

  return ReactDOM.createPortal(toast, document.body);
};

export default ToastPortal;
