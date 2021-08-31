import { AvailableLanguages, setI18nConfig } from '../../language';
import {
  REMOVE_APP_INITIAL_STEP,
  SET_APP_INITIAL_STEPS,
  SET_APP_LANGUAGE,
  SET_APP_THEME,
} from './types';

export const setTheme = (theme = 'light') => {
  if (theme === 'light' || theme === 'dark') {
    return async (dispatch) => {
      dispatch({
        type: SET_APP_THEME,
        payload: theme,
      });
    };
  }
};

export const setLanguage = (languageTag) => {
  // preferences.setLocalization(languageTag);
  setI18nConfig(languageTag);

  return async (dispatch) => {
    dispatch({
      type: SET_APP_LANGUAGE,
      payload: AvailableLanguages[languageTag] || AvailableLanguages['en'],
    });
  };
};

export const setInitialSteps = (initialSteps) => {
  return async (dispatch) => {
    dispatch({
      type: SET_APP_INITIAL_STEPS,
      payload: initialSteps,
    });
  };
};

export const removeInitialStep = (stepId) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_APP_INITIAL_STEP,
      payload: stepId,
    });
  };
};
