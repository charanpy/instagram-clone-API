import { groupActionTypes } from './group.type';

export const displayGroupStart = (userId) => ({
  type: groupActionTypes.GET_GROUP_START,
  payload: userId,
});

export const displayGroupSuccess = (groups) => ({
  type: groupActionTypes.GET_GROUP_SUCCESS,
  payload: groups,
});

export const displayGroupFailure = () => ({
  type: groupActionTypes.GET_GROUP_START,
});

export const createGroupStart = (profileId, userId) => ({
  type: groupActionTypes.CREATE_GROUP_START,
  payload: { profileId, userId },
});

export const createGroupSuccess = (group) => ({
  type: groupActionTypes.CREATE_GROUP_SUCCESS,
  payload: group,
});

export const createGroupFailure = () => ({
  type: groupActionTypes.CREATE_GROUP_FAILURE,
});

export const setCurrentGroupStart = (group) => ({
  type: groupActionTypes.SET_CURRENT_GROUP_START,
  payload: group,
});

export const setCurrentGroupSuccess = (group) => ({
  type: groupActionTypes.SET_CURRENT_GROUP_SUCCESS,
  payload: group,
});

export const setCurrentGroupFailure = () => ({
  type: groupActionTypes.SET_CURRENT_GROUP_FAILURE,
});

export const setCurrentGroupNullStart = () => ({
  type: groupActionTypes.SET_CURRENT_GROUP_NULL_START,
});

export const setCurrentGroupNull = () => ({
  type: groupActionTypes.SET_CURRENT_GROUP_NULL,
});

export const sendMessageStart = (
  groupId,
  message,
  createdBy = false,
  socket,
  profileId
) => ({
  type: groupActionTypes.SEND_MESSAGE_START,
  payload: { groupId, message, createdBy, socket, profileId },
});

export const sendMessageSuccess = (message) => ({
  type: groupActionTypes.SEND_MESSAGE_SUCCESS,
  payload: message,
});

export const sendMessageFailure = () => ({
  type: groupActionTypes.SEND_MESSAGE_FAILURE,
});
export const getMessageStart = (groupId) => ({
  type: groupActionTypes.GET_MESSAGE_START,
  payload: groupId,
});

export const getMessageSuccess = (message) => ({
  type: groupActionTypes.GET_MESSAGE_SUCCESS,
  payload: message,
});

export const getMessageFailure = () => ({
  type: groupActionTypes.GET_MESSAGE_FAILURE,
});

export const getRealtimeMessageStart = (groupId, message) => ({
  type: groupActionTypes.GET_REALTIME_MESSAGE_START,
  payload: { groupId, message },
});

export const getRealtimeMessageSuccess = (message) => ({
  type: groupActionTypes.GET_REALTIME_MESSAGE_SUCCESS,
  payload: message,
});

export const getNotificationStart = () => ({
  type: groupActionTypes.GET_NOTIFICATION_START,
});

export const getNotificationSuccess = (notification) => ({
  type: groupActionTypes.GET_NOTIFICATION_SUCCESS,
  payload: notification,
});

export const getNotificationFailure = () => ({
  type: groupActionTypes.GET_NOTIFICATION_FAILURE,
});

// export const setMessageSeenStart = (groupId) => ({
//   type: groupActionTypes.SET_MESSAGE_SEEN_START,
//   payload: groupId,
// });

// export const setMessageSeenSuccess = (groupId) => ({
//   type: groupActionTypes.SET_MESSAGE_SEEN_SUCCESS,
//   payload: groupId,
// });

// export const setMessageSeenFailure = () => ({
//   type: groupActionTypes.SET_MESSAGE_SEEN_FAILURE,
// });
