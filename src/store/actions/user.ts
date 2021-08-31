import UserService from '../../services/user.service';
import { AppDispatch } from '../../store';
import { messageOnlyToast } from '../../helpers/toasts';
import { ContactType } from '../../types/index';
import {
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAIL,
  DELETE_FAVORITE_SUCCESS,
  FINISH_WALKTHROUGH_TOUR,
  GET_FAVORITES,
  PAUSE_ACCOUNT,
  READ_NOTIFICATIONS,
  REPORT_USER_FAIL,
  REPORT_USER_SUCCESS,
  SET_SEARCH_FILTERS,
  START_WALKTHROUGH_TOUR,
  UNPAUSE_ACCOUNT,
  UPDATE_CASE_MANAGER_FAIL,
  UPDATE_CASE_MANAGER_SUCCESS,
  UPDATE_NOTIFICATIONS_FAIL,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from './types';

export const updateProfile =
  (data: any): any =>
  (dispatch: AppDispatch) => {
    return UserService.updateProfile(data).then(
      (response) => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: response.data,
        });

        const successMessage = 'Successfully updated profile.';

        return Promise.resolve(successMessage);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: UPDATE_PROFILE_FAIL,
        });

        return Promise.reject(errorMessage);
      },
    );
  };

export const updateContact =
  (
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    type?: ContactType,
  ): any =>
  (dispatch: AppDispatch) => {
    return UserService.updateContact(firstName, lastName, email, phone, type).then(
      (data) => {
        dispatch({
          type: UPDATE_CASE_MANAGER_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: UPDATE_CASE_MANAGER_FAIL,
        });

        return Promise.reject(errorMessage);
      },
    );
  };

export const updateNotifications =
  (data: any): any =>
  (dispatch: AppDispatch) => {
    return UserService.updateNotifications(data).then(
      (response) => {
        dispatch({
          type: UPDATE_NOTIFICATIONS_SUCCESS,
          payload: data,
        });

        // toast.success('Updated notification settings');

        return Promise.resolve();
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        // toast.error('There was an unknown error');

        dispatch({
          type: UPDATE_NOTIFICATIONS_FAIL,
        });

        return Promise.reject(errorMessage);
      },
    );
  };

export const pauseAccount =
  (reason): any =>
  async (dispatch: AppDispatch) => {
    await UserService.pauseAccount(reason);
    return dispatch({
      type: PAUSE_ACCOUNT,
    });
  };

export const unpauseAccount = (): any => async (dispatch: AppDispatch) => {
  await UserService.unpauseAccount();
  return dispatch({
    type: UNPAUSE_ACCOUNT,
  });
};

export const startTour = (): any => async (dispatch: AppDispatch) => {
  return dispatch({
    type: START_WALKTHROUGH_TOUR,
  });
};

export const finishTour = (): any => async (dispatch: AppDispatch) => {
  await UserService.finishTour();
  return dispatch({
    type: FINISH_WALKTHROUGH_TOUR,
  });
};

export const readNotifications = (): any => async (dispatch: AppDispatch) => {
  await UserService.readNotifications();
  return dispatch({
    type: READ_NOTIFICATIONS,
  });
};

export const setSearchFilters =
  (searchFilters: any): any =>
  async (dispatch: AppDispatch) => {
    return dispatch({
      type: SET_SEARCH_FILTERS,
      payload: searchFilters,
    });
  };

export const getMyFavorites = (): any => (dispatch: AppDispatch) => {
  return UserService.getFavoritesList().then(
    (response) => {
      dispatch({
        type: GET_FAVORITES,
        payload: response.data,
      });

      return Promise.resolve(response);
    },
    (error) => {
      const errorMessage = 'Failed to load favorites';
      return Promise.reject(errorMessage);
    },
  );
};

export const addFavoriteUser =
  (user: any): any =>
  (dispatch: AppDispatch) => {
    return UserService.addFavoriteUser(user.id).then(
      (response) => {
        dispatch({
          type: ADD_FAVORITE_SUCCESS,
          payload: user,
        });

        const successMessage = `${user.name} is now added to your favorites list`;

        return Promise.resolve(successMessage);
      },
      (error) => {
        dispatch({
          type: ADD_FAVORITE_FAIL,
        });

        return Promise.reject(error.response.data);
      },
    );
  };

export const deleteFavoriteUser =
  (favoriteId: number): any =>
  (dispatch: AppDispatch) => {
    return UserService.deleteFavoriteUser(favoriteId).then(
      (response) => {
        dispatch({
          type: DELETE_FAVORITE_SUCCESS,
          payload: favoriteId,
        });

        return Promise.resolve(response.data);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: DELETE_FAVORITE_FAIL,
        });

        return Promise.reject(errorMessage);
      },
    );
  };

export const reportUser =
  (reason: string, reportedId: number): any =>
  (dispatch: AppDispatch) => {
    return UserService.reportUser(reason, reportedId).then(
      (response) => {
        dispatch({
          type: REPORT_USER_SUCCESS,
          payload: response.data,
        });

        return Promise.resolve(response.data);
      },
      (error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: REPORT_USER_FAIL,
        });

        messageOnlyToast(errorMessage);

        return Promise.reject(errorMessage);
      },
    );
  };
