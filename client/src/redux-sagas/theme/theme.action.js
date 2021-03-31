import { themeActionTypes } from './theme.type';

export const setThemeStart = () => ({
  type: themeActionTypes.SET_COLOR_THEME_START,
});

export const setTheme = () => ({
  type: themeActionTypes.SET_COLOR_THEME,
});

export const setThemeFailure = () => ({
  type: themeActionTypes.SET_COLOR_THEME_FAILURE,
});

export const setThemeLightStart = () => ({
  type: themeActionTypes.SET_COLOR_THEME_LIGHT_START,
});

export const setThemeLight = () => ({
  type: themeActionTypes.SET_COLOR_THEME_LIGHT,
});

export const setThemeLightFailure = () => ({
  type: themeActionTypes.SET_COLOR_THEME_LIGHT_FAILURE,
});
