import React from 'react';
// import PropTypes from 'prop-types';
import { HomeContainer as ChatWrapper } from '../Home/Home.style';
import { InboxContainer } from './Chat.style';
import Group from '../../components/Groups/Group.container';
import CreateGroup from '../../components/CreateGroup/CreateGroup';

const Chat = () => {
  console.log('Chat');
  return (
    <ChatWrapper>
      <InboxContainer>
        <Group />
        <CreateGroup />
      </InboxContainer>
    </ChatWrapper>
  );
};

Chat.propTypes = {};

export default Chat;
