import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  getToken = async () => {
    return AsyncStorage.getItem('token');
  };

  connect(): Socket {
    this.socket = io({
      transports: ['websocket'],
      path: '/api/ws',
      reconnectionAttempts: 20,
      timeout: 5000,
      auth: {
        token: this.getToken(),
      },
    });
    return this.socket;
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  isConnected() {
    return this.socket?.connected;
  }
}

export default new SocketService();
