import { takeLatest, put, all, call } from 'redux-saga/effects';
import PrivateApiRoutes from '../../ApiRoutes/PrivateApi';
import { userActionTypes } from './user.type';
import {
  registerSuccess,
  registerFailure,
  loginFailure,
  loginSuccess,
  loadUserSuccess,
  authError,
  signOutSuccess,
  signOutFailure,
} from './user.action';
import { setUserProfile, emptyUpProfile } from '../profile/profile.action';
import { setAlert } from '../alert/alert.action';
import { generateUniqueId as getUniqueId } from '../../helpers/helpers';

export function* registerAccount(payload) {
  try {
    console.log(payload);
    const {
      payload: { email, password },
    } = payload;
    const res = yield call(
      PrivateApiRoutes,
      'users/signup',
      { email, password },
      'post',
      false,
      false
    );
    console.log(res?.data, 33);
    if (res?.data?.status === 'success') {
      const id = getUniqueId();
      setAlert(id, 'Registred.Please Login!', true);
    }
    yield put(registerSuccess());
  } catch (e) {
    const id = getUniqueId();
    console.log(id);
    console.log(e, e?.response, e?.response?.data);
    yield put(registerFailure());
    yield put(setAlert(id, e.response.data.message));
  }
}

export function* onRegisterStart() {
  yield takeLatest(userActionTypes.REGISTER_START, registerAccount);
}

export function* loadUser() {
  try {
    const response = yield call(
      PrivateApiRoutes,
      'users/me',
      null,
      'get',
      true,
      false
    );
    yield put(loadUserSuccess(response.data.profile));
    yield put(setUserProfile(response.data.profile));
  } catch (e) {
    console.log(e, e.response);
    yield put(authError());
  }
}

export function* onLoadUserStart() {
  yield takeLatest(userActionTypes.LOAD_USER_START, loadUser);
}

export function* onLogin(payload) {
  try {
    console.log(payload);
    const {
      payload: { email, password },
    } = payload;
    const response = yield call(
      PrivateApiRoutes,
      'users/login',
      { email, password },
      'post',
      false,
      false
    );
    console.log(response);
    yield put(loginSuccess(response.data.data.token));
    yield call(loadUser);
  } catch (e) {
    const id = getUniqueId();
    yield put(loginFailure());
    console.log(e);
    yield put(setAlert(id, e.response.data.message));
  }
}

export function* onLoginStart() {
  yield takeLatest(userActionTypes.LOGIN_START, onLogin);
}

export function* onSignOut() {
  try {
    yield put(signOutSuccess());
    yield put(emptyUpProfile());
  } catch (e) {
    yield put(signOutFailure());
  }
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, onSignOut);
}

export function* setAppLoaded() {
  yield put(authError());
}
export function* OnAppLoaded() {
  yield takeLatest(userActionTypes.SET_APP_LOADING_FALSE, setAppLoaded);
}

export function* userSagas() {
  yield all([
    call(onRegisterStart),
    call(onLoginStart),
    call(onLoadUserStart),
    call(onSignOutStart),
    call(OnAppLoaded),
  ]);
}
