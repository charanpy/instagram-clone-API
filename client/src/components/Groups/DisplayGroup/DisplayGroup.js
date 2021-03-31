import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Group } from '../../../helpers/helpers';
import ProfileImage from '../../shared/ProfileImage/ProfileImage';
import {
  DisplayGroupContainer,
  ChatDetail,
  GroupName,
  CreateButton,
} from './DisplayGroup.style';
import { SocketContext } from '../../../context/socket';
import Notification from '../../Notification/Notification';

const DisplayGroup = ({
  group: { users },
  notification,
  onClick,
  type,
  groupId,
}) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (type === 'get') {
      socket.emit('join room', groupId);
    }
  }, [type, groupId, socket]);
  console.log('Display group', type);
  return (
    <CreateButton type='button' onClick={onClick}>
      <DisplayGroupContainer>
        <ProfileImage
          height={5}
          chatProfile={
            users && (users[0]?.photo?.secure_url || users[0]?.photo)
          }
        />
        <ChatDetail>
          <GroupName>
            {users && (users[0]?.name || users[0]?.username.split('@')[0])}
          </GroupName>

          {notification && <Notification groupId={groupId} />}
        </ChatDetail>
      </DisplayGroupContainer>
    </CreateButton>
  );
};

DisplayGroup.propTypes = {
  group: Group,
  notification: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  groupId: PropTypes.string,
};

DisplayGroup.defaultProps = {
  group: {},
  notification: false,
  type: 'get',
  groupId: null,
};

export default DisplayGroup;
