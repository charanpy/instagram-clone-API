import { createSelector } from 'reselect';

const selectTheme = (state) => state.theme;

// eslint-disable-next-line
export const selectBackground = createSelector(
  [selectTheme],
  (app) => app.theme
);
