import { createSelector } from 'reselect';

const selectAlert = (state) => state.alert;
// eslint-disable-next-line
export const selectAlertMessage = createSelector(
  [selectAlert],
  (alert) => alert
);
