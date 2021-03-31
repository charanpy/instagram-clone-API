import { takeLatest, all, call, put } from 'redux-saga/effects';
import { groupActionTypes } from './group.type';
// import { generateUniqueId as getUniqueId } from '../../helpers/helpers';
// import { setAlert } from '../alert/alert.action';
import {
  displayGroupSuccess,
  displayGroupFailure,
  createGroupSuccess,
  createGroupFailure,
  setCurrentGroupSuccess,
  setCurrentGroupNull,
  sendMessageSuccess,
  sendMessageFailure,
  getMessageSuccess,
  getMessageFailure,
  getRealtimeMessageSuccess,
  getNotificationSuccess,
  getNotificationFailure,
} from './group.action';
import PrivateApiRoute from '../../ApiRoutes/PrivateApi';

const groupObject = (id, groupArray) => {
  if (!groupArray) {
    return {};
  }
  const groups = groupArray.reduce(
    (acc, currentValue) => ({
      ...acc,
      // eslint-disable-next-line
      [currentValue._id]: {
        ...currentValue,
        // eslint-disable-next-line
        users: currentValue.users.filter((user) => user._id !== id),
      },
    }),
    {}
  );
  return groups;
};

export function* getGroup({ payload }) {
  try {
    const response = yield call(
      PrivateApiRoute,
      'group/',
      null,
      'get',
      true,
      false
    );
    console.log(response, payload);
    const group = yield call(groupObject, payload, response.data.groups);
    yield put(displayGroupSuccess(group));
  } catch (error) {
    console.log(error, error?.response, error?.response?.data);
    yield put(displayGroupFailure());
  }
}

export function* OnGetGroupStart() {
  yield takeLatest(groupActionTypes.GET_GROUP_START, getGroup);
}

export function* createGroup({ payload: { profileId, userId } }) {
  try {
    const data = {
      userId: profileId,
    };
    const response = yield call(
      PrivateApiRoute,
      'group/',
      data,
      'post',
      true,
      false
    );
    const group = yield call(groupObject, userId, [response.data.createdGroup]);
    yield put(createGroupSuccess(group));
  } catch (error) {
    console.log(error);
    yield put(createGroupFailure());
  }
}

export function* OnCreateGroupStart() {
  yield takeLatest(groupActionTypes.CREATE_GROUP_START, createGroup);
}

export function* setCurrentGroup({ payload }) {
  try {
    yield put(setCurrentGroupSuccess(payload));
    const res = yield call(
      PrivateApiRoute,
      `group/${payload.groupId}/seen`,
      { id: 1 },
      'patch',
      true,
      false
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export function* OnSetCurrentGroupStart() {
  yield takeLatest(groupActionTypes.SET_CURRENT_GROUP_START, setCurrentGroup);
}

export function* setGroupNull() {
  yield put(setCurrentGroupNull());
}

export function* OnSetCurrentGroupNullStart() {
  yield takeLatest(groupActionTypes.SET_CURRENT_GROUP_NULL_START, setGroupNull);
}

export function* sendMessage({
  payload: { groupId, message, createdBy, socket, profileId },
}) {
  try {
    yield console.log(createdBy);
    const data = {
      message,
      to: profileId,
    };
    const response = yield call(
      PrivateApiRoute,
      `group/${groupId}/message`,
      data,
      'post',
      true,
      false
    );
    console.log(response);
    yield put(sendMessageSuccess(response.data.message));
    socket.emit('message', { groupId, message: response.data.message });
  } catch (error) {
    console.log(error);
    yield put(sendMessageFailure());
  }
}

export function* OnSendMessageStart() {
  yield takeLatest(groupActionTypes.SEND_MESSAGE_START, sendMessage);
}

export function* getMessage({ payload }) {
  try {
    const {
      data: { messages },
    } = yield call(
      PrivateApiRoute,
      `group/${payload}/message`,
      null,
      'get',
      true,
      false
    );
    yield put(getMessageSuccess({ id: payload, messages }));
  } catch (error) {
    console.log(error);
    yield put(getMessageFailure());
  }
}

export function* OnGetMessageStart() {
  yield takeLatest(groupActionTypes.GET_MESSAGE_START, getMessage);
}

export function* getRealtimeMessage({ payload: { groupId, message, socket } }) {
  yield put(getRealtimeMessageSuccess({ groupId, message, socket }));
}

export function* OnGetRealtimeMessageStart() {
  yield takeLatest(
    groupActionTypes.GET_REALTIME_MESSAGE_START,
    getRealtimeMessage
  );
}
const structureNotification = (data) => {
  const notification = data.reduce(
    (acc, { _id: id, message }) => ({
      ...acc,
      // eslint-disable-next-line
      [id]: {
        groupId: id,
        message,
      },
    }),
    {}
  );
  return notification;
};
export function* getNotification() {
  try {
    const res = yield call(
      PrivateApiRoute,
      'group/notifications',
      null,
      'get',
      true,
      false
    );
    const notifications = yield call(
      structureNotification,
      res.data.notifications
    );
    yield put(getNotificationSuccess(notifications));
  } catch (error) {
    console.log(error);
    yield put(getNotificationFailure());
  }
}

export function* OnGetNotificationStart() {
  yield takeLatest(groupActionTypes.GET_NOTIFICATION_START, getNotification);
}

export function* groupSagas() {
  yield all([
    call(OnGetGroupStart),
    call(OnCreateGroupStart),
    call(OnSetCurrentGroupStart),
    call(OnSetCurrentGroupNullStart),
    call(OnSendMessageStart),
    call(OnGetMessageStart),
    call(OnGetRealtimeMessageStart),
    call(OnGetNotificationStart),
  ]);
}
