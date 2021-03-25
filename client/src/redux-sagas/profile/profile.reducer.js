import { profileActionTypes } from './profile.type';

const initialStateProfile = {
  loading: null,
  success: false,
  profile: null,
  userProfile: null,
  modal: false
};

const storeProfile = (profile) => {
  const { photo } = profile;
  if (photo?.secure_url) {
    const modifiedPhoto = { ...profile };
    modifiedPhoto.photo = photo.secure_url;
    return modifiedPhoto;
  }
  return profile;
};
// const storeImage = (profile) => {
//   console.log(profile, 'reducer');
//   const { photo } = profile;
//   if (photo?.secure_url) {
//     return photo.secure_url;
//   }
//   return photo;
// };

const profileReducer = (state = initialStateProfile, action) => {
  switch (action.type) {
    case profileActionTypes.GET_PROFILE_START:
      return {
        loading: true,
        success: false,
        profile: null,
        userProfile: null,
      };

    case profileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };

    case profileActionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        profile: null,
      };

    case profileActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: storeProfile(action.payload),
      };
    case profileActionTypes.SET_MODAL_VISIBLE:
      return {
        ...state,
        modal: !state.modal
      };
    case profileActionTypes.EMPTY_UP_PROFILE:
      return initialStateProfile;
    case profileActionTypes.UPLOAD_IMAGE_START:
    case profileActionTypes.EDIT_PROFILE_START:
      return {
        ...state,
        success: false,
        loading: true
      };
    case profileActionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userProfile: {
          ...state.userProfile,
          photo: action.payload
        }
      };
    case profileActionTypes.UPLOAD_IMAGE_FAILURE:
    case profileActionTypes.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case profileActionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userProfile: {
          ...state.userProfile,
          [action.payload.label]: action.payload.value
        }
      };
    default:
      return state;
  }
};

export default profileReducer;
