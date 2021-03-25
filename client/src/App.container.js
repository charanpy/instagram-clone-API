import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppLoading } from './redux-sagas/user/user.selector';
import { loadUserStart } from './redux-sagas/user/user.action';
import App from './App';
import Spinner from './components/shared/Spinner/SpinnerOverlay';

const AppContainer = ({ loadUserStart: loadUser, appLoading }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return !appLoading ? <App /> : <Spinner />;
};

AppContainer.propTypes = {
  loadUserStart: PropTypes.func.isRequired,
  appLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appLoading: selectAppLoading,
});
const mapDispatchToProps = (dispatch) => ({
  loadUserStart: () => dispatch(loadUserStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
