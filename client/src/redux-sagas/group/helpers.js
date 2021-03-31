export const setMessage = (state, message) => {
  const newMessage = { ...state };
  const selectGroupMessage = newMessage[message.groupId];
  if (selectGroupMessage) {
    console.log(selectGroupMessage, selectGroupMessage?.messages);
    selectGroupMessage.messages = [...selectGroupMessage.messages, message];
    return newMessage;
  }
  newMessage[message.groupId] = {
    groupId: message.groupId,
    messages: [message],
  };
  return newMessage;
};

export const setNotification = (state, id) => {
  const notif = { ...state };
  if (notif[id]) {
    delete notif[id];
    return notif;
  }
  return notif;
};

export const getRealtimeMessage = (state, payload) => {
  const newState = { ...state };
  const message = { ...payload.message, seen: [payload.message.to] };
  if (newState?.currentGroup?.groupId === payload.groupId) {
    const messages = setMessage(newState.messages, message);
    console.log(messages);
    return {
      ...newState,
      messages,
    };
  }
  if (newState.notifications[payload.groupId]) {
    newState.notifications[payload.groupId] = {
      ...newState.notifications[payload.groupId],
      message: [
        ...newState.notifications[payload.groupId].message,
        payload.message,
      ],
    };
    return newState;
  }
  return {
    ...newState,
    notifications: {
      ...newState.notifications,
      [payload.groupId]: [payload],
    },
  };
};
