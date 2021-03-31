import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentGroupNullStart } from '../../redux-sagas/group/group.action';
import { selectCurrentGroup } from '../../redux-sagas/group/group.selector';
import Message from './Messages';
import { currentGroup } from '../../helpers/helpers';

const MessagesContainer = ({ group, setCurrentGroupNullStart: setNull }) => {
  const history = useHistory();
  useEffect(() => {
    if (!group) {
      history.push('/direct/message');
    }
    return () => {
      setNull();
    };
  }, [group, history, setNull]);
  return group && <Message group={group} />;
};

MessagesContainer.propTypes = {
  group: currentGroup,
  setCurrentGroupNullStart: PropTypes.func.isRequired,
};

MessagesContainer.defaultProps = {
  group: null,
};

const mapStateToProps = createStructuredSelector({
  group: selectCurrentGroup,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGroupNullStart: () => dispatch(setCurrentGroupNullStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
