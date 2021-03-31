import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import alertReducer from './alert/alert.reducer';
import profileReducer from './profile/profile.reducer';
import themeReducer from './theme/theme.reducer';
import groupReducer from './group/group.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  profile: profileReducer,
  theme: themeReducer,
  group: groupReducer,
});

export default rootReducer;
