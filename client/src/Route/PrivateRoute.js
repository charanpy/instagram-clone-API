/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectIsAuthenticated } from '../redux-sagas/user/user.selector';

const PrivateRoute = ({
  component: Component,
  routeName = null,
  isAuthenticated,
  ...rest
}) => {
  console.log(routeName);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/auth' />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
