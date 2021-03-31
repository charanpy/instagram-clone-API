import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MessagePropType } from '../../../helpers/helpers';
import { SocketContext } from '../../../context/socket';
import { selectProfileId } from '../../../redux-sagas/profile/profile.selector';
import { selectMessages } from '../../../redux-sagas/group/group.selector';
import Display from './Display';
import { ChatContainer } from './Display.style';

// /* eslint-disable */
const DisplayContainer = ({ messages, id, profileId }) => {
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    socket.on('message', ({ groupId, message }) => {
      if (groupId === id) {
        console.log('Message read', message);
      }
    });
  }, [id, socket]);
  const scrollToBottom = () => {
    messageEndRef?.current?.scrollIntoView({
      behaviour: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  return (
    <ChatContainer>
      {messages.length &&
        messages.map((message) => (
          // eslint-disable-next-line
          <div key={message._id}>
            <Display message={message} profileId={profileId} />
            <div ref={messageEndRef} />
          </div>
        ))}
    </ChatContainer>
  );
};

DisplayContainer.propTypes = {
  id: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  messages: MessagePropType,
};

DisplayContainer.defaultProps = {
  messages: [],
};
const mapStateToProps = (state, ownProps) => ({
  messages: selectMessages(ownProps.id)(state),
  profileId: selectProfileId(state),
});

export default connect(mapStateToProps)(DisplayContainer);
