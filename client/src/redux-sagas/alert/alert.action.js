import alertActionTypes from './alert.type';

export const setAlertStart = (id) => ({
  type: alertActionTypes.SET_ALERT_START,
  payload: id,
});

export const setAlert = (id, msg, success = false) => ({
  type: alertActionTypes.SET_ALERT,
  payload: { id, msg, success },
});

export const removeAlertStart = (id) => ({
  type: alertActionTypes.REMOVE_ALERT_START,
  payload: id,
});

export const removeAlert = (id) => ({
  type: alertActionTypes.REMOVE_ALERT,
  payload: id,
});
