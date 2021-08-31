import { dark, light } from '../../common/theme';
import { AvailableLanguages } from '../../language';
import {
  REMOVE_APP_INITIAL_STEP,
  SET_APP_INITIAL_STEPS,
  SET_APP_LANGUAGE,
  SET_APP_THEME,
} from '../actions/types';

const INITIAL_STATE = {
  theme: light,
  language: AvailableLanguages.en,
  initialSteps: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_APP_THEME:
      return { ...state, theme: action.payload === 'light' ? light : dark };
    case SET_APP_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_APP_INITIAL_STEPS:
      return { ...state, initialSteps: action.payload };
    case REMOVE_APP_INITIAL_STEP:
      var _initialSteps = state.initialSteps.filter((value) => {
        return value !== action.payload;
      });
      return { ...state, initialSteps: _initialSteps };
    default:
      return state;
  }
}
