export const isUnread = (connection, currentUserId) => {
  return connection.initiatorId === currentUserId
    ? !connection.initiatorReadAt || connection.initiatorReadAt < connection.receiverLastEvent
    : connection.receiverId === currentUserId
    ? !connection.receiverReadAt || connection.receiverReadAt < connection.initiatorLastEvent
    : false;
};
