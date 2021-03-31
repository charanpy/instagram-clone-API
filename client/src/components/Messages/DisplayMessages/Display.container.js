import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { MessagePropType } from '../../../helpers/helpers';
import { selectProfileId } from '../../../redux-sagas/profile/profile.selector';
import { selectMessages } from '../../../redux-sagas/group/group.selector';
import Display from './Display';
import { ChatContainer } from './Display.style';

/* eslint-disable */
const DisplayContainer = ({ messages, id, profileId }) => {
  const messageEndRef = useRef(null);
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
};

DisplayContainer.defaultProps = {
  messages: [],
};
const mapStateToProps = (state, ownProps) => ({
  messages: selectMessages(ownProps.id)(state),
  profileId: selectProfileId(state),
});

export default connect(mapStateToProps)(DisplayContainer);
