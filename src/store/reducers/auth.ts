import RaygunClient, { User } from 'raygun4reactnative';
import { isProduction } from '../../helpers/environment';
import {
  FINISH_WALKTHROUGH_TOUR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PAUSE_ACCOUNT,
  READ_NOTIFICATIONS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  START_WALKTHROUGH_TOUR,
  UNPAUSE_ACCOUNT,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from './../actions/types';
declare var heap: any;

const initialState = { isLoggedIn: false, user: null };

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload,
        },
      };
    case UPDATE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      if (isProduction()) {
        const user: User = {
          identifier: payload.user.id,
          isAnonymous: false,
          email: payload.user.email,
          firstName: payload.user.firstName,
          fullName: payload.user.name,
        };
        RaygunClient.setUser(user);

        if (heap) {
          heap.identify(payload.user.id);
          heap.addUserProperties({
            name: payload.user.name,
            email: payload.user.email,
            phone: payload.user.phone,
          });
        }
      }

      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      if (isProduction() && heap) {
        heap.resetIdentity();
      }

      return initialState;
    case PAUSE_ACCOUNT:
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, status: 'PAUSED' } },
      };
    case UNPAUSE_ACCOUNT:
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, status: 'ACTIVE' } },
      };
    case START_WALKTHROUGH_TOUR:
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, walkthrough: false } },
      };

    case READ_NOTIFICATIONS:
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, readTime: new Date() } },
      };
    case FINISH_WALKTHROUGH_TOUR:
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, walkthrough: true } },
      };
    default:
      return state;
  }
};

export default auth;
