import { createSelector } from 'reselect';

const selectProfile = (state) => state.profile;

export const selectUserPhoto = createSelector(
  [selectProfile],
  (profile) => profile.userProfile?.photo
);

export const selectProfileId = createSelector(
  [selectProfile],
  // eslint-disable-next-line
  (profile) => profile.userProfile?._id
);

export const selectIsLoading = createSelector(
  [selectProfile],
  (profile) => profile.loading
);

export const selectIsModalVisible = createSelector(
  [selectProfile],
  (profile) => profile.modal
);

export const selectUserProfile = createSelector([selectProfile], (profile) => {
  const { name, photo, user, _id, username } = profile?.userProfile;
  return {
    name,
    photo,
    user,
    _id,
    username,
  };
});

const selectImageUri = createSelector(
  [selectProfile],
  (profile) => profile.userProfile?.photo
);

const selectFollowersFollowing = createSelector(
  [selectProfile],
  (profile) =>
    `${profile.userProfile?.followers.length}${profile.userProfile?.following.length}`
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
  selectIsLoading,
};
