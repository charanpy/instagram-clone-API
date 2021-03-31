import React, { useRef, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessageStart } from '../../../redux-sagas/group/group.action';
import { SocketContext } from '../../../context/socket';
import MessageInput from './MessageInput';

const MessageInputContainer = ({
  profileId,
  groupId,
  sendMessageStart: sendMessage,
}) => {
  const inputRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const handleSubmit = () => {
    const message = inputRef?.current?.value;
    if (message) {
      sendMessage(groupId, message, true, socket, profileId);
      inputRef.current.value = '';
    }
  };
  return <MessageInput message={inputRef} handleSubmit={handleSubmit} />;
};

MessageInputContainer.propTypes = {
  groupId: PropTypes.string.isRequired,
  sendMessageStart: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendMessageStart: (groupId, message, createdBy, socket, profileId) =>
    dispatch(sendMessageStart(groupId, message, createdBy, socket, profileId)),
});

export default connect(null, mapDispatchToProps)(MessageInputContainer);
