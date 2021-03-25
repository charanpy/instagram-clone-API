import React from 'react';
import PropTypes from 'prop-types';
import ButtonContainer from './Button.style';

const Button = ({ text, handleSubmit, type }) => (
  <ButtonContainer onClick={handleSubmit} type={type}>
    {text}
  </ButtonContainer>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'text',
};
export default Button;
