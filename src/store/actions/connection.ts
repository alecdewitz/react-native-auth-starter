import { messageOnlyToast } from '../../helpers/toasts';
import { ROLE } from '../../models/roles';
import WaveService from '../../services/wave.service';
import { AppDispatch } from '../../store';
import axios from '../../utils/axios';
import { hideModal, newConnectionModal } from './modals';
import {
  SET_CONNECTION,
  SET_IGNORE_WAVE_FAIL,
  SET_IGNORE_WAVE_SUCCESS,
  SET_WAVE_REQUESTS_FAIL,
  SET_WAVE_REQUESTS_SUCCESS,
  SET_WAVE_SENT_FAIL,
  SET_WAVE_SENT_SUCCESS,
  UNMATCH_CONNECTION,
} from './types';

export const setConnection = (payload: any) => (dispatch: AppDispatch) => {
  dispatch({ type: SET_CONNECTION, payload });
};

export const sendWave =
  (id: number): any =>
  (dispatch: AppDispatch) => {
    return WaveService.sendWave(id).then(
      (response) => {
        dispatch({
          type: SET_WAVE_SENT_SUCCESS,
          payload: response.data,
        });

        if (response?.data?.connected) {
          dispatch(
            newConnectionModal(
              response.data.initiator,
              () => {
                // history.push(`/connections/messages/${response.data.slug}`);
                dispatch(hideModal());
              },
              () => {
                dispatch(hideModal());
              },
            ),
          );
        }

        return Promise.resolve(response.data);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString() ||
          'Oops, there was an issue. Please try again.';

        dispatch({
          type: SET_WAVE_SENT_FAIL,
        });

        messageOnlyToast(errorMessage);

        return Promise.reject(errorMessage);
      },
    );
  };

export const sendWaveMessage =
  (connectionId: number, message: string): any =>
  (dispatch: AppDispatch) => {
    return WaveService.sendWaveMessage(connectionId, message).then(
      (response) => {
        return Promise.resolve(response.data);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString() ||
          'Oops, there was an issue. Please try again.';

        messageOnlyToast(errorMessage);
        return Promise.reject(errorMessage);
      },
    );
  };

export const ignoreWave =
  (id: number): any =>
  (dispatch: AppDispatch) => {
    return WaveService.ignoreWave(id).then(
      (response) => {
        dispatch({
          type: SET_IGNORE_WAVE_SUCCESS,
          payload: response.data,
        });

        const successMessage = 'Successfully ignored wave.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: SET_IGNORE_WAVE_FAIL,
        });

        messageOnlyToast(errorMessage);

        return Promise.reject(errorMessage);
      },
    );
  };

export const readConnection =
  (connectionId: number, currentUser) => async (dispatch: AppDispatch) => {
    const { data } = await axios.put(`/connections/${connectionId}/read`);
    if (currentUser.roles.includes(ROLE.USER)) {
      setTimeout(() => dispatch(setConnection(data)), 2000);
    }
    return data;
  };

export const getMyConnections = (): any => (dispatch: AppDispatch) => {
  return WaveService.getMyConnections().then(
    (response) => {
      /*
      const connections = response.filter((connection) => connection.status === 'ACCEPTED');
      const requests = response.filter((connection) => connection.status === 'PENDING');
      */

      dispatch({
        type: SET_WAVE_REQUESTS_SUCCESS,
        payload: response,
      });

      return Promise.resolve(response);
    },
    (error) => {
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_WAVE_REQUESTS_FAIL,
        payload: 'Unable to respond.',
      });

      return Promise.reject(errorMessage);
    },
  );
};

export const unmatch =
  (reason: string, connectionId: number): any =>
  async (dispatch: AppDispatch) => {
    await api.put(`/connections/${connectionId}/unmatch`, { reason });
    return dispatch({
      type: UNMATCH_CONNECTION,
      payload: connectionId,
    });
  };
