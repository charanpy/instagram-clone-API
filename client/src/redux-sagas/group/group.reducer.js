import { groupActionTypes } from './group.type';
import { setMessage, setNotification, getRealtimeMessage } from './helpers';

const initialState = {
  groups: {},
  notifications: {},
  loading: false,
  currentGroup: null,
  channelLoading: false,
  fetchNotifications: false,
  fetchMessage: false,
  messages: {},
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupActionTypes.SET_CURRENT_GROUP_START:
      return {
        ...state,
        channelLoading: true,
      };
    case groupActionTypes.SET_CURRENT_GROUP_FAILURE:
      return {
        ...state,
        channelLoading: false,
      };
    case groupActionTypes.GET_GROUP_START:
    case groupActionTypes.CREATE_GROUP_START:
      return {
        ...state,
        loading: true,
      };
    case groupActionTypes.GET_GROUP_FAILURE:
    case groupActionTypes.CREATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case groupActionTypes.GET_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload,
      };
    case groupActionTypes.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: {
          ...state.groups,
          ...action.payload,
        },
      };
    case groupActionTypes.SET_CURRENT_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        currentGroup: action.payload,
        channelLoading: false,
        notifications: setNotification(
          state.notifications,
          action.payload.groupId
        ),
      };
    case groupActionTypes.SET_CURRENT_GROUP_NULL:
      return {
        ...state,
        currentGroup: null,
        messages: {},
      };
    case groupActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: setMessage(state.messages, action.payload),
      };
    case groupActionTypes.GET_MESSAGE_START:
      return {
        ...state,
        fetchMessage: true,
      };
    case groupActionTypes.GET_MESSAGE_FAILURE:
      return {
        ...state,
        fetchMessage: false,
      };
    case groupActionTypes.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.id]: {
            groupId: action.payload.id,
            messages: action.payload.messages,
          },
        },
        fetchMessage: false,
      };
    case groupActionTypes.GET_REALTIME_MESSAGE_SUCCESS:
      return getRealtimeMessage(state, action.payload);
    case groupActionTypes.GET_NOTIFICATION_START:
      return {
        ...state,
        fetchNotifications: true,
      };
    case groupActionTypes.GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        fetchNotifications: false,
      };
    case groupActionTypes.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        fetchNotifications: false,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
