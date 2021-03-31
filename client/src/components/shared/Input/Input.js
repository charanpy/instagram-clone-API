import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './Input.style';

const Input = React.forwardRef(
  ({ name, placeholder, type, minlength }, ref) => (
    <TextInput
      name={name}
      type={type}
      required='required'
      placeholder={placeholder}
      ref={ref}
      minLength={minlength}
    />
  )
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  minlength: PropTypes.number,
};

Input.defaultProps = {
  minlength: null,
};

export default Input;
