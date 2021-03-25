import { createSelector } from 'reselect';

const selectProfile = (state) => state.profile;

const selectUserPhoto = createSelector(
  [selectProfile],
  (profile) => profile.userProfile?.photo
);

const selectIsLoading = createSelector(
  [selectProfile],
  (profile) => profile.loading
);

const selectIsModalVisible = createSelector(
  [selectProfile],
  (profile) => profile.modal
);

const selectUserProfile = createSelector(
  [selectProfile],
  (profile) => profile.userProfile
);

const selectImageUri = createSelector(
  [selectProfile],
  (profile) => profile.userProfile?.photo
);

const selectFollowersFollowing = createSelector(
  [selectProfile],
  (profile) => `${profile.userProfile?.followers.length}${profile.userProfile?.following.length}`
);

const selectUsername = createSelector(
  [selectProfile],
  (profile) => profile.userProfile?.username
);

export default {
  selectUserPhoto,
  selectIsModalVisible,
  selectUserProfile,
  selectImageUri,
  selectFollowersFollowing,
  selectUsername,
  selectIsLoading
};
