import React from 'react';
import PropTypes from 'prop-types';
import { Container as AuthContainer } from '../../helpers/CommonStyles';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Brand from '../../components/shared/Brand/Brand';
import Footer from './Footer/Footer';
import { FormWrapper } from './Footer/Footer.style';

const Auth = ({
  email,
  password,
  confirmPassword,
  handleSubmit,
  signIn,
  setAuthForm,
}) => {
  console.log('Login');
  return (
    <>
      <AuthContainer>
        <Brand />
        <FormWrapper method='POST' onSubmit={handleSubmit}>
          <Input type='email' name='email' placeholder='email' ref={email} />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            ref={password}
            minlength={8}
          />
          {!signIn && (
            <Input
              type='password'
              name='ConfirmPassword'
              placeholder='Confirm Password'
              ref={confirmPassword}
              minlength={8}
            />
          )}
          <Button
            text={signIn ? 'LOGIN' : 'REGISTER'}
            handleSubmit={handleSubmit}
            type='submit'
          />
        </FormWrapper>
        <Footer
          text={
            signIn
              ? "Don't have an account? Register"
              : 'Have an account? Login'
          }
          handleClick={setAuthForm}
        />
      </AuthContainer>
    </>
  );
};

Auth.propTypes = {
  email: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: null }),
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  password: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: null }),
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  confirmPassword: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: null }),
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  signIn: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setAuthForm: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  email: null,
  password: null,
  confirmPassword: null,
};

export default Auth;
