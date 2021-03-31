import { themeActionTypes } from './theme.type';
import { setTheme } from '../../helpers/helpers';

const initialState = {
  theme: 'dark',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActionTypes.SET_COLOR_THEME:
      setTheme('dark');
      return {
        theme: 'dark',
      };
    case themeActionTypes.SET_COLOR_THEME_LIGHT:
      setTheme('light');
      return {
        theme: 'light',
      };
    case themeActionTypes.SET_COLOR_THEME_FAILURE:
    case themeActionTypes.SET_COLOR_THEME_LIGHT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default themeReducer;
