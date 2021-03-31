import React from 'react';
// import PropTypes from 'prop-types'
import Icon from '../../shared/Icon/Icon';
import {
  MessageContainer,
  Message as MessageWrap,
  Chat,
  SeenIcon,
} from './Display.style';
/* eslint-disable */
const Display = ({ message: { to, message, seen, sender }, profileId }) => {
  return (
    <MessageContainer position={!(to === profileId)}>
      <MessageWrap>
        <Chat>{message}</Chat>
        {sender === profileId && seen.includes(to) && (
          <SeenIcon>
            <Icon
              marginRight={0}
              className='far fa-check-circle'
              fontSize={1.2}
              active
            />
          </SeenIcon>
        )}
      </MessageWrap>
    </MessageContainer>
  );
};

Display.propTypes = {};

export default Display;
