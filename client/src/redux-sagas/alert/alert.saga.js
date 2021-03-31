import { takeLatest, put, all, call } from 'redux-saga/effects';
import { removeAlert, setAlert } from './alert.action';
import alertTypes from './alert.type';
import { generateUniqueId } from '../../helpers/helpers';

export function* removeAlertMessage({ payload }) {
  yield put(removeAlert(payload));
}
export function* OnRemoveAlert() {
  yield takeLatest(alertTypes.REMOVE_ALERT_START, removeAlertMessage);
}

export function* setAlertMessage({ payload }) {
  const id = generateUniqueId();
  console.log(id, payload);
  yield put(setAlert(id, payload));
}
export function* OnSetAlert() {
  yield takeLatest(alertTypes.SET_ALERT_START, setAlertMessage);
}

export function* alertSagas() {
  yield all([call(OnRemoveAlert), call(OnSetAlert)]);
}
