import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerOverlay as SpinnerWrapper, LoadingText } from './Spinner.style';
import Spinner from './SpinnerComponent';

const SpinnerOverlay = ({ text }) => (
  <SpinnerWrapper>
    <Spinner />
    <LoadingText>{text}</LoadingText>
  </SpinnerWrapper>
);

SpinnerOverlay.propTypes = {
  text: PropTypes.string,
};

SpinnerOverlay.defaultProps = {
  text: 'Loading',
};

export default SpinnerOverlay;
