import { takeLatest, put, all, call } from 'redux-saga/effects';
import { themeActionTypes } from './theme.type';
import {
  setTheme,
  setThemeFailure,
  setThemeLight,
  setThemeLightFailure,
} from './theme.action';

export function* setThemeDark() {
  try {
    yield put(setTheme());
  } catch (e) {
    yield put(setThemeFailure());
  }
}

export function* onChangeThemeStart() {
  yield takeLatest(themeActionTypes.SET_COLOR_THEME_START, setThemeDark);
}

export function* setLightTheme() {
  try {
    yield put(setThemeLight());
  } catch (e) {
    yield put(setThemeLightFailure());
  }
}

export function* onChangeThemeLightStart() {
  yield takeLatest(themeActionTypes.SET_COLOR_THEME_LIGHT_START, setLightTheme);
}

export function* themeSagas() {
  yield all([call(onChangeThemeStart), call(onChangeThemeLightStart)]);
}
