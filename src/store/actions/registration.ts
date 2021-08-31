// Signup: auth actions...
import { UPDATE_SIGNUP_FORM, RESET_SIGNUP_FORM } from './types';

export const updateRegistrationForm = (type, field) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_SIGNUP_FORM,
      payload: {
        type: type,
        field: field,
      },
    });
  };
};

export const resetRegistrationForm = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_SIGNUP_FORM,
    });
  };
};
