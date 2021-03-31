import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.saga';
import { profileSagas } from './profile/profile.saga';
import { alertSagas } from './alert/alert.saga';
import { themeSagas } from './theme/theme.saga';
import { groupSagas } from './group/group.saga';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(profileSagas),
    call(alertSagas),
    call(themeSagas),
    call(groupSagas),
  ]);
}
