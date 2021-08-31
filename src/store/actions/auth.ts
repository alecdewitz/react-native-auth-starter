import AuthService from '../../services/auth.service';
import socketService from '../../services/socket.service';
import { AppDispatch } from '../../store';
import { getStore } from './../index';
import { getCurrentUser } from './../selectors/index';
import { socketEvent } from './socket';
import {
  ALREADY_MADE_RUMI_REGISTER_FAIL,
  ALREADY_MADE_RUMI_REGISTER_SUCCESS,
  CHECK_EMAIL_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
} from './types';

export const login =
  (email: string, password: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: LOGIN_FAIL,
        });

        return Promise.reject(error);
      },
    );
  };

export const register =
  (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
    phone: string,
    type: string,
    alreadyMade: boolean,
  ): any =>
  (dispatch: AppDispatch) => {
    return AuthService.register(
      firstName,
      lastName,
      email,
      password,
      birthDate,
      phone,
      type,
      alreadyMade,
    ).then(
      (data) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: REGISTER_FAIL,
        });
        return Promise.reject(error.response);
      },
    );
  };

export const alreadyMadeRumi =
  (
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    phone: string,
    type: string,
    alreadyMade: boolean,
  ): any =>
  (dispatch: AppDispatch) => {
    return AuthService.alreadyMadeRumi(
      firstName,
      lastName,
      email,
      birthDate,
      phone,
      type,
      alreadyMade,
    ).then(
      (data) => {
        dispatch({
          type: ALREADY_MADE_RUMI_REGISTER_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve(data);
      },
      (error) => {
        dispatch({
          type: ALREADY_MADE_RUMI_REGISTER_FAIL,
        });
        return Promise.reject(error.response);
      },
    );
  };

export const authMe = (): any => (dispatch: AppDispatch) => {
  return AuthService.authMe().then(
    (data) => {
      const user = getCurrentUser(getStore().getState());
      const userObject = Object.assign(user, data);
      if (!socketService.isConnected()) {
        const socket = socketService.connect();
        socket.onAny((event: string, payload: any) => {
          dispatch(socketEvent(event, payload, userObject));
        });
        socket.on('connect_error', (error) => {
          if (error?.message === 'jwt expired') {
            socket.disconnect();
            dispatch(authMe());
          }
        });
        // socket.on('connect', () => {
        // });
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: userObject },
      });

      return Promise.resolve(userObject);
    },
    (error) => {
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject(errorMessage);
    },
  );
};

export const verifyAccount =
  (emailToken): any =>
  (dispatch: AppDispatch) => {
    return AuthService.verifyAccount(emailToken).then(
      (data) => {
        // account has been verified
        // TODO: set emailVerified to TRUE
        return Promise.resolve();
      },
      (error) => {
        // const errorMessage =
        //   (error.response && error.response.data && error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // TODO: set better error message
        const errorMessage = 'This link probably expired. Please try again later.';

        return Promise.reject(errorMessage);
      },
    );
  };

export const logout =
  (): any =>
  (dispatch: AppDispatch): Promise<void> => {
    socketService.disconnect();

    dispatch({
      type: LOGOUT,
    });

    return Promise.resolve();
  };

export const updatePassword =
  (newPassword: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.updatePassword(newPassword).then(
      (response) => {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
        });

        const successMessage = 'Your password has been changed succesfully.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        // const errorMessage =
        //   (error.response && error.response.data && error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // TODO: set better error message
        const errorMessage = 'Failed to update password';

        return Promise.reject(errorMessage);
      },
    );
  };

export const checkEmail =
  (email: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.checkEmail(email).then(
      (response) => {
        dispatch({
          type: CHECK_EMAIL_SUCCESS,
        });

        return Promise.resolve(response);
      },
      (error) => {
        const errorMessage = 'There was an issue with the connection.';

        return Promise.reject(errorMessage);
      },
    );
  };

export const changeEmail =
  (newEmailAddress: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.changeEmail(newEmailAddress).then(
      (response) => {
        const successMessage =
          'Please check your inbox and click the link to confirm your new email.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        return Promise.reject(errorMessage);
      },
    );
  };

export const changeEmailVerify =
  (emailToken): any =>
  (dispatch: AppDispatch) => {
    return AuthService.changeEmailVerify(emailToken).then(
      (data) => {
        const successMessage = 'Verified new email successfully';

        return Promise.resolve(successMessage);
      },
      (error) => {
        // const errorMessage =
        //   (error.response && error.response.data && error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        const errorMessage = 'This link probably expired. Please try again later.';

        return Promise.reject(errorMessage);
      },
    );
  };

export const forgotPassword =
  (email: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.forgotPassword(email).then(
      (data) => {
        const successMessage = 'Check your email for a link to reset your password.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  };

export const resetPassword =
  (newPassword: string, token: string | null): any =>
  (dispatch: AppDispatch) => {
    return AuthService.resetPassword(newPassword, token).then(
      (res) => Promise.resolve(res.data),
      (error) => Promise.reject(error),
    );
  };

export const resendVerification =
  (email: string): any =>
  (dispatch: AppDispatch) => {
    return AuthService.resendVerification(email).then(
      (data) => {
        const successMessage = 'Resent account verification email.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        const errorMessage =
          'Cannot resend again right now. Please check your inbox and try again later.';

        return Promise.reject(errorMessage);
      },
    );
  };
