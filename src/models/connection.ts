import { ConnectionStatus } from './connectionStatus';
import { User } from './user';

export type Connection = {
  id: number;
  initiator: User;
  receiver: User;
  status: ConnectionStatus;
};
