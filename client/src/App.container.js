import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  getRealtimeMessageStart,
  getNotificationStart,
} from './redux-sagas/group/group.action';
import { selectAppLoading } from './redux-sagas/user/user.selector';
import {
  loadUserStart,
  setAppLoadingFalse,
} from './redux-sagas/user/user.action';
import { setThemeLightStart } from './redux-sagas/theme/theme.action';
import { selectBackground } from './redux-sagas/theme/theme.selector';
import { SocketContext } from './context/socket';
import UseAuth from './helpers/hooks/UseAuth';
import UseTheme from './helpers/hooks/UseTheme';
import UseSocket from './helpers/hooks/UseSocket';
import App from './App';
import Spinner from './components/shared/Spinner/SpinnerOverlay';

const AppContainer = ({
  loadUserStart: loadUser,
  appLoading,
  setAppLoadingFalse: setAuth,
  history,
  setThemeLightStart: setThemeLight,
  AppTheme: theme,
  getRealtimeMessageStart: getMessage,
  getNotificationStart: getNotification,
}) => {
  const { socket } = useContext(SocketContext);
  UseAuth(loadUser, setAuth, history, getNotification);
  UseSocket(socket, getMessage);
  UseTheme(setThemeLight);
  return !appLoading ? <App theme={theme} /> : <Spinner />;
};

AppContainer.propTypes = {
  loadUserStart: PropTypes.func.isRequired,
  appLoading: PropTypes.bool.isRequired,
  setAppLoadingFalse: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setThemeLightStart: PropTypes.func.isRequired,
  AppTheme: PropTypes.string.isRequired,
  getRealtimeMessageStart: PropTypes.func.isRequired,
  getNotificationStart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appLoading: selectAppLoading,
  AppTheme: selectBackground,
});
const mapDispatchToProps = (dispatch) => ({
  loadUserStart: () => dispatch(loadUserStart()),
  setAppLoadingFalse: () => dispatch(setAppLoadingFalse()),
  setThemeLightStart: () => dispatch(setThemeLightStart()),
  getRealtimeMessageStart: (groupId, message, socket) =>
    dispatch(getRealtimeMessageStart(groupId, message, socket)),
  getNotificationStart: () => dispatch(getNotificationStart()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
