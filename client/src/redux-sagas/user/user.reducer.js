import { userActionTypes } from './user.type';

const initialState = {
  user: null,
  isAuthenticated: false,
  success: false,
  loading: false,
  appLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_START:
    case userActionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case userActionTypes.LOAD_USER_START:
      return {
        ...state,
        loading: true,
        success: false,
        appLoading: true,
      };
    case userActionTypes.REGISTER_FAILURE:
    case userActionTypes.LOGIN_FAILURE:
    case userActionTypes.AUTH_ERROR:
    case userActionTypes.SIGN_OUT_SUCCESS:
    case userActionTypes.SIGN_OUT_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        success: false,
        isAuthenticated: false,
        user: null,
        appLoading: false,
      };
    case userActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        appLoading: false,
      };

    case userActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case userActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        success: true,
        loading: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
