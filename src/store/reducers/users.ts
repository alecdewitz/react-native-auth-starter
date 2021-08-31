import { GenderPreference, PetsPreference, WheelchairPreference } from '../../types/index';
import {
  ADD_FAVORITE_SUCCESS,
  DELETE_FAVORITE_SUCCESS,
  GET_FAVORITES,
  SET_SEARCH_FILTERS,
} from './../actions/types';

type State = {
  users: any;
  searchFilters: any;
  favorites: any;
};

const initialState = {
  searchFilters: {
    pets: PetsPreference.NO_PREFERENCE,
    gender: GenderPreference.NO_PREFERENCE,
    wheelchair: WheelchairPreference.NO_PREFERENCE,
    ageRange: [18, 99],
    maxDistance: [50],
  },
  users: null,
  favorites: null,
};

const user = (state: State = initialState, action: { type: any; payload: any }): State => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_FILTERS: {
      return {
        ...state,
        searchFilters: payload,
      };
    }

    case GET_FAVORITES: {
      return {
        ...state,
        favorites: payload,
      };
    }

    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.find((fav) => fav.id === payload.id)
          ? state
          : state.favorites.concat(payload),
      };

    case DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id !== payload),
      };

    default:
      return state;
  }
};

export default user;
