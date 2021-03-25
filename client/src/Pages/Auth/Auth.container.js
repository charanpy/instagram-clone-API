import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { loginStart } from '../../redux-sagas/user/user.action';
import {
  selectIsAuthenticated,
  selectIsLoading,
} from '../../redux-sagas/user/user.selector';
import Auth from './Auth';
import validate from './helper';
import Spinner from '../../components/shared/Spinner/SpinnerOverlay';

const AuthContainer = ({ loginStart: login, isAuthenticated, isLoading }) => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [signIn, setSignIn] = useState(true);

  const setInputNull = () => {
    email.current.value = null;
    password.current.value = null;
    if (confirmPassword?.current) confirmPassword.current.value = null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate({ email, password, confirmPassword }, signIn);
    if (!isValid.valid) {
      setInputNull();
      alert(isValid.message);
      return false;
    }
    if (signIn) {
      login(email?.current?.value, password?.current?.value);
      setInputNull();
      return true;
    }
    setInputNull();
    return true;
  };

  const setAuthForm = () => {
    setSignIn((sign) => !sign);
    setInputNull();
  };

  return isLoading ? (
    <Spinner text='Logging In' />
  ) : (
    <Auth
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      signIn={signIn}
      handleSubmit={handleSubmit}
      setAuthForm={setAuthForm}
    />
  );
};

AuthContainer.propTypes = {
  loginStart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  isLoading: selectIsLoading,
});
const mapDispatchToProps = (dispatch) => ({
  loginStart: (email, password) => dispatch(loginStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
