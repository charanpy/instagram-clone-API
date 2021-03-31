import React from 'react';
import GroupContainer from './Group.style';
import Header from '../MessageHeader/Header';
import DisplayGroup from './DisplayGroup/Group.loader';
import { ProfilePropTypes } from '../../helpers/helpers';

const Group = ({ profile: { photo, name, username } }) => {
  console.log('Group');
  return (
    <GroupContainer>
      <Header
        image={photo}
        name={name || username.split('@')[0]}
        iconName='fas fa-user-plus'
      />
      <DisplayGroup />
    </GroupContainer>
  );
};

Group.propTypes = {
  profile: ProfilePropTypes.isRequired,
};

export default Group;
