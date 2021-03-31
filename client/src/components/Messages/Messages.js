import React from 'react';
// import PropTypes from 'prop-types'
import MessagesWrapper from './Messages.style';
import { currentGroup } from '../../helpers/helpers';
import Header from '../MessageHeader/Header';
import MessageInput from './MessageInput/MessageInput.container';
import DisplayMessage from './DisplayMessages/Display.container';

const Messages = ({ group: { photo, name, username, groupId, profileId } }) => {
  console.log('Messages Wrap');

  return (
    <MessagesWrapper>
      <Header
        image={photo?.secure_url || photo}
        name={name || username.split('@')[0]}
      />
      <DisplayMessage id={groupId} />
      <MessageInput groupId={groupId} profileId={profileId} />
    </MessagesWrapper>
  );
};

Messages.propTypes = {
  group: currentGroup.isRequired,
};

export default Messages;
