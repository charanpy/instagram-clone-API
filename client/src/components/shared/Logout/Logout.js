import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutStart } from '../../../redux-sagas/user/user.action';
import { LogoutContainer, Logout as LogoutButton } from './Logout.styles';

const Logout = ({ signOutStart: logout }) => (
  <>
    <LogoutContainer>
      <LogoutButton
        danger
        text='LOGOUT'
        handleSubmit={logout}
        style={{ margin: 0 }}
      />
    </LogoutContainer>
  </>
);

Logout.propTypes = {
  signOutStart: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Logout);
