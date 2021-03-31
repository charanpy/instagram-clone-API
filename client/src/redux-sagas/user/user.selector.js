import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectIsLoading = createSelector(
  [selectUser],
  (checkIsLoaded) => checkIsLoaded.loading
);

export const selectAppLoading = createSelector(
  [selectUser],
  (checkIsLoaded) => checkIsLoaded.appLoading
);

export const selectApiCallSuccess = createSelector(
  [selectUser],
  (apiCall) => apiCall.success
);

export const selectApiCallLoading = createSelector(
  [selectUser],
  (apiLoading) => apiLoading.loading
);

export const selectIsVerified = createSelector(
  [selectUser],
  (verifyAccount) => verifyAccount.isVerified
);

export const selectEmail = createSelector(
  [selectUser],
  (emailAccount) => emailAccount.email
);

export const selectStatus = createSelector(
  [selectUser],
  (getStatus) => getStatus.status
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (auth) => auth.isAuthenticated
);

export const selectUserId = createSelector(
  [selectUser],
  (userId) => userId?.user?.user
);

export const selectUserProfile = createSelector(
  [selectUser],
  (userInfo) => userInfo.user
);

export const selectUsername = createSelector(
  [selectUser],
  (userInfo) => userInfo.user?.username
);

export const selectIsUserLoaded = createSelector(
  [selectUser],
  (user) => user.userLoaded
);
