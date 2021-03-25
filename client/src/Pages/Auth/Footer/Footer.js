import React from 'react';
import PropTypes from 'prop-types';
import { FooterText, FooterContainer } from './Footer.style';

const Footer = ({ text, handleClick }) => (
  <FooterContainer>
    <FooterText as='button' onClick={handleClick}>
      {text}
    </FooterText>
  </FooterContainer>
);

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Footer;
