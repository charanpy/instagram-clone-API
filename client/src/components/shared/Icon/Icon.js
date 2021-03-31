import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.style';

const IconContainer = ({ fontSize, marginRight, className, active }) => (
  <Icon
    active={active}
    fontSize={fontSize}
    marginRight={marginRight}
    className={className}
  />
);

IconContainer.propTypes = {
  fontSize: PropTypes.number,
  marginRight: PropTypes.number,
  className: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

IconContainer.defaultProps = {
  fontSize: 2.3,
  marginRight: 2.8,
  active: false,
};

export default IconContainer;
