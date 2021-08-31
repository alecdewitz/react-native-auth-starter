import { messageOnlyToast } from '../../helpers/toasts';
import { ROLE } from '../../models/roles';
import { AppDispatch } from '../../store';
import axios from '../../utils/axios';
import { setConnection } from './connection';
import {
  FETCH_ADMIN_MESSAGES_SUCCESS,
  FETCH_MESSAGES_SUCCESS,
  RECEIVED_WAVE,
  SET_MESSAGE,
} from './types';

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const sendMessage = (conversationId, message) => async (dispatch: AppDispatch) =>
  await api.post(`/connections/${conversationId}/messages`, { content: message }).catch((error) => {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    messageOnlyToast(errorMessage);

    return Promise.reject(errorMessage);
  });

export const fetchMessages =
  (conversationId: number, currentUser: any) => async (dispatch: AppDispatch) => {
    const { data } = await axios.get(`/connections/${conversationId}/messages`);

    if (currentUser.roles.includes(ROLE.ADMIN)) {
      return dispatch({
        type: FETCH_ADMIN_MESSAGES_SUCCESS,
        payload: data,
      });
    } else {
      return dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data,
      });
    }
  };

export const receivedNewMessage =
  ({ message, connection }) =>
  (dispatch: AppDispatch) => {
    dispatch(setMessage(message));
    dispatch(setConnection(connection));
  };

export const receivedWave = (payload: any) => (dispatch: AppDispatch) =>
  dispatch({ type: RECEIVED_WAVE, payload });
