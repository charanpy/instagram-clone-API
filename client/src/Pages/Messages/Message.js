import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessageStart } from '../../redux-sagas/group/group.action';
import MessageContainer from './Messages.style';
import MessagesWrapper from '../../components/Messages/Messages.container';

const Message = ({
  match: {
    params: { id },
  },
  getMessageStart: getMessage,
}) => {
  useEffect(() => {
    if (id) {
      getMessage(id);
    }
  }, [getMessage, id]);
  return (
    <MessageContainer>
      <MessagesWrapper />
    </MessageContainer>
  );
};

Message.propTypes = {
  getMessageStart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getMessageStart: (groupId) => dispatch(getMessageStart(groupId)),
});

export default connect(null, mapDispatchToProps)(Message);
