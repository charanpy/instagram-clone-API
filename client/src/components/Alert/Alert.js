import React from 'react';
import {} from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../redux-sagas/alert/alert.selector';
import Toaster from './Toaster';

const Alert = ({ alert }) =>
  // eslint-disable-next-line
  alert &&
  alert.map(({ id, msg }) => (
    <div key={id}>
      <Toaster message={msg} />
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
    })
  ),
};

Alert.defaultProps = {
  alert: [],
};
const mapStateToProps = createStructuredSelector({
  alert: selectAlertMessage,
});
export default connect(mapStateToProps)(Alert);
