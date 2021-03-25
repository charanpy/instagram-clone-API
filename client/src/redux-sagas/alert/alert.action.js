import alertActionTypes from './alert.type';

export const setAlert = (id, msg) => ({
  type: alertActionTypes.SET_ALERT,
  payload: { id, msg },
});

export const removeAlert = (id) => ({
  type: alertActionTypes.REMOVE_ALERT,
  payload: id,
});
