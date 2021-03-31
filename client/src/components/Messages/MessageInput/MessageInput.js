import React from 'react';
import PropTypes from 'prop-types';
import { Footer, SendMessage, Message as Input } from './MessageInput.style';
import Icon from '../../shared/Icon/Icon';

const MessageInput = ({ message, handleSubmit }) => {
  console.log('Input');
  return (
    <Footer>
      <Icon as='button' className='far fa-laugh' />
      <label htmlFor='send_file'>
        <Icon className='fas fa-paperclip' />
        <input id='send_file' type='file' />
      </label>
      <Input
        name='message'
        placeholder='Type a message'
        ref={message}
        autoComplete='off'
      />
      <SendMessage onClick={handleSubmit}>
        <Icon className='fas fa-paper-plane' />
      </SendMessage>
    </Footer>
  );
};

MessageInput.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: null }),
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  handleSubmit: PropTypes.func.isRequired,
};

MessageInput.defaultProps = {
  message: null,
};

export default MessageInput;
