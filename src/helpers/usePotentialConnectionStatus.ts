import { useSelector } from 'react-redux';
import { getFlattenedConnections } from '../store/selectors/index';
import { RootState } from '../store/reducers';
import { ConnectionStatus, WaveStatus } from '../types';

export const usePotentialConnectionStatus = (user) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const connections = useSelector(getFlattenedConnections || []);

  if (!user) return null;

  const connection: any = connections.find(
    (connection: any) =>
      (connection.receiver.id === user.id || connection.initiator.id === user.id) &&
      currentUser.id !== user.id,
  );

  if (!connection) {
    return WaveStatus.NONE;
  } else if (
    connection.status === ConnectionStatus.PENDING &&
    connection.receiver.id === currentUser.id
  ) {
    return WaveStatus.RECEIVED;
  } else if (
    connection.status === ConnectionStatus.PENDING &&
    connection.initiator.id === currentUser.id
  ) {
    return WaveStatus.SENT;
  } else {
    return connection.status;
  }
};

export const usePotentialConnection = (user) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const connections = useSelector(getFlattenedConnections || []);

  if (!user) return null;

  const connection: any = connections.find(
    (connection: any) =>
      (connection.receiver.id === user.id || connection.initiator.id === user.id) &&
      currentUser.id !== user.id,
  );

  if (!connection) {
    return null;
  } else {
    return connection;
  }
};
