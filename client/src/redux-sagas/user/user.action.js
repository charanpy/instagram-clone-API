import { userActionTypes } from './user.type';

export const registerStart = (password) => ({
  type: userActionTypes.REGISTER_START,
  payload: password,
});

export const registerSuccess = () => ({
  type: userActionTypes.REGISTER_SUCCESS,
});

export const registerFailure = () => ({
  type: userActionTypes.REGISTER_SUCCESS,
});

export const loginStart = (emailAndPassword) => ({
  type: userActionTypes.LOGIN_START,
  payload: emailAndPassword,
});

export const loginSuccess = (token) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = () => ({
  type: userActionTypes.LOGIN_FAILURE,
});

export const loadUserStart = () => ({
  type: userActionTypes.LOAD_USER_START,
});

export const loadUserSuccess = (userInfo) => ({
  type: userActionTypes.LOAD_USER_SUCCESS,
  payload: userInfo,
});

export const authError = () => ({
  type: userActionTypes.AUTH_ERROR,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
});

export const setAppLoadingFalse = () => ({
  type: userActionTypes.SET_APP_LOADING_FALSE,
});
