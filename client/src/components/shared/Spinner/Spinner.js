/*eslint-disable */
import React from 'react';
import SpinnerOverlay from './SpinnerOverlay';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <SpinnerOverlay /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
