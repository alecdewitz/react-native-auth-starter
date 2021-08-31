import { AppDispatch } from '../../store';
import { newMessageToast } from '../../helpers/toasts';
import { receivedNewMessage, receivedWave } from './message';
import { hideModal, newConnectionModal, newWaveModal } from './modals';

export const socketEvent =
  (eventName: string, payload: any, currentUser: any) => (dispatch: AppDispatch) => {
    switch (eventName) {
      case 'active':
        // history.go(0);
        break;
      case 'newMessage':
        if (currentUser.id !== payload.message.userId) {
          newMessageToast(payload.message, payload.connection);
        }
        dispatch(receivedNewMessage(payload));
        break;
      case 'wave':
        if (
          currentUser.id !== payload.connection.initiator.id &&
          payload.connection.status === 'PENDING'
        ) {
          dispatch(
            newWaveModal(
              payload.connection.initiator,
              () => {
                // history.push('/profile/' + payload.connection?.initiator?.slug);
                dispatch(hideModal());
              },
              () => {
                dispatch(hideModal());
              },
            ),
          );
        } else if (
          currentUser.id !== payload.connection.receiver.id &&
          payload.connection.status === 'ACCEPTED'
        ) {
          dispatch(
            newConnectionModal(
              payload.connection.receiver,
              () => {
                // history.push('/connections/messages/' + payload.connection?.slug);
                dispatch(hideModal());
              },
              () => {
                dispatch(hideModal());
              },
            ),
          );
        }
        dispatch(receivedWave(payload));
        break;
    }
  };
