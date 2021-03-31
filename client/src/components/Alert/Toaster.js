import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { removeAlertStart } from '../../redux-sagas/alert/alert.action';

const options = (close, id) => ({
  toastId: id,
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  onClose: () => close(id),
  newestOnTop: false,
});

const Toaster = ({ message, success, removeAlertStart: removeAlert, id }) => {
  useEffect(() => {
    console.log('Toas');
    if (success) {
      toast.configure();

      toast.success(message, options(removeAlert));
      return true;
    }
    toast.configure();
    toast.error(message, options(removeAlert, id));
    return true;
  }, [message, success, removeAlert, id]);
  return (
    <>
      <div />
    </>
  );
};

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
  removeAlertStart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Toaster.defaultProps = {
  success: false,
};

const mapDispatchToProps = (dispatch) => ({
  removeAlertStart: (id) => dispatch(removeAlertStart(id)),
});

export default connect(null, mapDispatchToProps)(Toaster);
