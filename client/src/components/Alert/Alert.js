import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../redux-sagas/alert/alert.selector';
import Toaster from './Toaster';

const Alert = ({ alert }) =>
  // eslint-disable-next-line
  alert.length &&
  alert.map(({ id, msg, success }) => (
    <div key={id}>
      <Toaster message={msg} id={id} success={success || false} />
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
