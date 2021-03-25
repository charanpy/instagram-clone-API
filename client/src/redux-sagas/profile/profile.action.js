import { profileActionTypes } from './profile.type';

export const getProfileStart = (userId) => ({
  type: profileActionTypes.GET_PROFILE_START,
  payload: userId
});

export const getProfileSuccess = (profile) => ({
  type: profileActionTypes.GET_PROFILE_SUCCESS,
  payload: profile
});

export const getProfileFailure = () => ({
  type: profileActionTypes.GET_PROFILE_FAILURE,
});

export const setUserProfile = (userProfile) => ({
  type: profileActionTypes.SET_USER_PROFILE,
  payload: userProfile
});

export const setModalVisible = () => ({
  type: profileActionTypes.SET_MODAL_VISIBLE
});

export const emptyUpProfile = () => ({
  type: profileActionTypes.EMPTY_UP_PROFILE
});

export const uploadImageStart = (data, type) => ({
  type: profileActionTypes.UPLOAD_IMAGE_START,
  payload: { data, type }
});

export const uploadImageSuccess = (profile) => ({
  type: profileActionTypes.UPLOAD_IMAGE_SUCCESS,
  payload: profile
});

export const uploadImageFailure = () => ({
  type: profileActionTypes.UPLOAD_IMAGE_FAILURE
});

export const editProfileStart = (data) => ({
  type: profileActionTypes.EDIT_PROFILE_START,
  payload: data
});

export const editProfileSuccess = (label, value) => ({
  type: profileActionTypes.EDIT_PROFILE_SUCCESS,
  payload: { label, value }
});

export const editProfileFailure = () => ({
  type: profileActionTypes.EDIT_PROFILE_FAILURE
});
