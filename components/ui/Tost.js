import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Snackbar = () => {
  return <ToastContainer />;
};

const snack = (message, { position, time }) =>
  toast(message, {
    position: position,
    autoClose: time,
    hideProgressBar: true,
  });

const infosnack = (message, { position, time }) =>
  toast.info(message, {
    position: position,
    autoClose: time,
    hideProgressBar: true,
  });

const warnsnack = (message, { position, time }) =>
  toast.warn(message, {
    position: position,
    autoClose: time,
    hideProgressBar: true,
  });

const successsnak = (message, { position, time }) =>
  toast.success(message, {
    position: position,
    autoClose: time,
    hideProgressBar: true,
  });

const errorsnak = (message, { position, time }) =>
  toast.error(message, {
    position: position,
    autoClose: time,
    hideProgressBar: true,
  });

export { Snackbar, errorsnak, snack, infosnack, warnsnack, successsnak };
