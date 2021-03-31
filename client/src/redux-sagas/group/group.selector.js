import { createSelector } from 'reselect';

const selectGroup = (state) => state.group;

export const selectIsLoading = createSelector(
  [selectGroup],
  (group) => group.loading
);

export const selectAllGroup = createSelector(
  [selectGroup],
  (group) => group.groups
);

export const selectCurrentGroup = createSelector(
  [selectGroup],
  (group) => group.currentGroup
);

export const selectChannelLoading = createSelector(
  [selectGroup],
  (group) => group.channelLoading
);

export const selectMessages = (groupId) =>
  createSelector(
    [selectGroup],
    (msg) => msg.messages[groupId] && msg.messages[groupId]?.messages
  );

export const selectNotificationNumber = createSelector(
  [selectGroup],
  (msg) => Object.keys(msg.notifications).length
);

export const selectNotification = (groupId) =>
  createSelector(
    [selectGroup],
    (msg) =>
      msg.notifications[groupId] &&
      msg.notifications[groupId]?.message &&
      msg.notifications[groupId]?.message[
        msg.notifications[groupId]?.message?.length - 1
      ]?.message
  );
