import { orderBy } from 'lodash';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { flatten } from '../../helpers/utils';
import { ConnectionStatus } from '../../models/connectionStatus';
import { ProfileStatus } from '../../types';
import { RootState } from '../reducers';

export const getLoggedInUser = (state: RootState) => state.auth.user;

export const modalIsOpen = (state: RootState) => state.modals.isOpen;

export const getFlattenedFavorites = (state: RootState) =>
  Object.values(state.users.favorites).flat();

export const getFlattenedConnections = (state: RootState) =>
  Object.values(state.connections.connections).flat();

export const getAcceptedConnections = createSelector([getFlattenedConnections], (connections) =>
  connections
    .filter((connection: any) => connection.status === ConnectionStatus.ACCEPTED)
    .sort((a: any, b: any) => {
      const newestEventA =
        a.initiatorLastEvent > a.receiverLastEvent
          ? new Date(a.initiatorLastEvent).getTime()
          : new Date(a.receiverLastEvent).getTime();
      const newestEventB =
        b.initiatorLastEvent > b.receiverLastEvent
          ? new Date(b.initiatorLastEvent).getTime()
          : new Date(b.receiverLastEvent).getTime();

      return newestEventB - newestEventA;
    }),
);

export const getRumiConnections = createSelector([getFlattenedConnections], (connections) =>
  connections
    .filter((connection: any) => connection.status === ConnectionStatus.ADMIN)
    .sort((a: any, b: any) => {
      const newestEventA =
        a.initiatorLastEvent > a.receiverLastEvent
          ? new Date(a.initiatorLastEvent).getTime()
          : new Date(a.receiverLastEvent).getTime();
      const newestEventB =
        b.initiatorLastEvent > b.receiverLastEvent
          ? new Date(b.initiatorLastEvent).getTime()
          : new Date(b.receiverLastEvent).getTime();

      return newestEventB - newestEventA;
    }),
);

export const getPendingConnections = createSelector([getFlattenedConnections], (connections) =>
  connections.filter((connection: any) => connection.status === ConnectionStatus.PENDING),
);

export const getPendingIncomingWaves = createSelector(
  [getFlattenedConnections, getLoggedInUser],
  (connections, user) =>
    connections.filter(
      (connection: any) =>
        connection.status === ConnectionStatus.PENDING &&
        connection.receiver.id === user.id &&
        (connection.initiator.status === ProfileStatus.ACTIVE ||
          connection.initiator.status === ProfileStatus.MIGRATING),
    ),
);

export const getPendingOutgoingWaves = createSelector(
  [getFlattenedConnections, getLoggedInUser],
  (connections, user) =>
    connections.filter(
      (connection: any) =>
        connection.status === ConnectionStatus.PENDING &&
        connection.initiator.id === user.id &&
        (connection.receiver.status === ProfileStatus.ACTIVE ||
          connection.receiver.status === ProfileStatus.MIGRATING),
    ),
);

export const getFlattenedMessages = (state: RootState) =>
  Object.values(state.message.messages).flat();

export const getMessagesForConnection = createSelector(
  [getFlattenedMessages, (state: any, connectionId: number) => connectionId],
  (messages, connectionId) => {
    return messages.filter((message: any) => message.connectionId === connectionId);
  },
);

export const getActiveConnections = createSelector([getFlattenedConnections], (connections: any) =>
  connections.filter((conn: any) => conn.status === ConnectionStatus.ACCEPTED),
);

export const getActiveAndAdminConnections = createSelector(
  [getFlattenedConnections],
  (connections: any) =>
    connections.filter(
      (conn: any) =>
        conn.status === ConnectionStatus.ACCEPTED || conn.status === ConnectionStatus.ADMIN,
    ),
);

export const getConnectionBySlug = createSelector(
  [getActiveAndAdminConnections, (state: any, connectionSlug: string) => connectionSlug],
  (connections, connectionSlug) =>
    connections.find((connection: any) => connection.slug === connectionSlug),
);

export const getConnectionById = createSelector(
  [getActiveAndAdminConnections, (state: any, connectionId: number) => connectionId],
  (connections, connectionId) =>
    connections.find((connection: any) => connection.id === connectionId),
);

export const getAdminConnection = createSelector(
  [
    getActiveConnections,
    (state: any, adminId: number, userId: number) => {
      return [adminId, userId];
    },
  ],
  (connections, adminId, userId) =>
    connections.find(
      (connection: any) => connection.initiatorId === adminId && connection.receiverId === userId,
    ),
);

export const getUnreadConnections = createSelector(
  [getFlattenedConnections, getLoggedInUser],
  (connections, user) => {
    if (!user) {
      return [];
    }
    return connections.filter((connection: any) => {
      if (connection.initiatorId === user.id) {
        return !connection.initiatorReadAt && connection.status === ConnectionStatus.ACCEPTED;
      } else if (connection.receiverId === user.id) {
        return !connection.receiverReadAt && connection.status === ConnectionStatus.ACCEPTED;
      } else {
        return false;
      }
    });
  },
);

export const getUnreadMessages = createSelector(
  [getFlattenedConnections, getLoggedInUser],
  (connections, user) => {
    if (!user) {
      return [];
    }
    return connections.filter((connection: any) => {
      if (connection.initiatorId === user.id) {
        return (
          connection.initiatorReadAt && connection.initiatorReadAt < connection.receiverLastEvent
        );
      } else if (connection.receiverId === user.id) {
        return (
          connection.receiverReadAt && connection.receiverReadAt < connection.initiatorLastEvent
        );
      } else {
        return false;
      }
    });
  },
);

export const getFavorites = (state: RootState) => Object.values(state.users.favorites).flat();

export const hasOwnPlace = (state: RootState) => !!state.auth.user?.profile?.location?.housing;

export const getCurrentUser = (state: RootState) => state.auth?.user;
export const getFlatCurrentUser = (state: RootState) => flatten(state.auth?.user);

export const isProduction = (): boolean => {
  return process.env.REACT_APP_ENVIRONMENT === 'production';
};

export const isStaging = (): boolean => {
  return process.env.REACT_APP_ENVIRONMENT === 'test';
};

export const createLoadingSelector = (actions) => (state) =>
  actions.some((action) => {
    if (!action?.includes('_REQUEST')) return false;
    const normalized = action.replace('_REQUEST', '');
    return get(state, `COMMON.loading.${normalized}`);
  });

export const getToken = (store) => store.auth?.user?.token;
export const getRefreshToken = (store) => store.auth?.user?.refreshToken;
