import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const options = {
  type: toast.POSITION.TOP_CENTER,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
};

const Toaster = ({ message, success }) => {
  useEffect(() => {
    toast.configure();
    if (success) {
      toast.success(message, options);
      return true;
    }
    toast.error(message, options);
    return true;
  }, [message, success]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

Toaster.defaultProps = {
  success: false,
};

export default Toaster;
