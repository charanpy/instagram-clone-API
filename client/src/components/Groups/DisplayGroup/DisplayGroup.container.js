import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentGroupStart } from '../../../redux-sagas/group/group.action';
import { selectAllGroup } from '../../../redux-sagas/group/group.selector';
import DisplayGroup from './DisplayGroup';
import { GroupPropTypes } from '../../../helpers/helpers';

const DisplayGroupContainer = ({ groups, setCurrentGroupStart: setGroup }) => {
  const history = useHistory();
  const handleClick = (group, groupId) => {
    const { _id: id, users } = group;
    const { name, username, photo, _id } = users[0];
    const currentGroup = {
      groupId: id,
      name,
      username,
      photo,
      profileId: _id,
    };
    setGroup(currentGroup);
    history.push(`/message/${groupId}`);
  };
  return Object.keys(groups).map((group) => (
    <DisplayGroup
      group={groups[group]}
      key={group}
      groupId={group}
      notification
      onClick={() => handleClick(groups[group], group)}
    />
  ));
};

DisplayGroupContainer.propTypes = {
  groups: GroupPropTypes,
  setCurrentGroupStart: PropTypes.func.isRequired,
};

DisplayGroupContainer.defaultProps = {
  groups: {},
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentGroupStart: (group) => dispatch(setCurrentGroupStart(group)),
});

const mapStateToProps = createStructuredSelector({
  groups: selectAllGroup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayGroupContainer);
