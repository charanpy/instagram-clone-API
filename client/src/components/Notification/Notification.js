import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectNotification } from '../../redux-sagas/group/group.selector';
import Notify from './Notification.style';

// eslint-disable-next-line
const Notification = ({ groupId, notification }) => {
  console.log(notification, 44);
  return <Notify>{notification && notification}</Notify>;
};

Notification.propTypes = {
  groupId: PropTypes.string.isRequired,
  notification: PropTypes.string,
};

Notification.defaultProps = {
  notification: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  notification: selectNotification(ownProps.groupId)(state),
});
export default connect(mapStateToProps)(Notification);
