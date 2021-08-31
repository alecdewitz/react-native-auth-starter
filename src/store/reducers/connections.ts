import { merge, omit } from 'lodash';
import { groupById } from '../../helpers/groupBy';
import { ConnectionStatus } from '../../models/connectionStatus';
import {
  RECEIVED_WAVE,
  SET_CONNECTION,
  SET_WAVE_REQUESTS_SUCCESS,
  UNMATCH_CONNECTION,
} from '../actions/types';

type State = {
  connections: any;
  waves: any;
};

const initialState = {
  connections: {},
  waves: {},
};

const connections = (state: State = initialState, action: { type: any; payload: any }): State => {
  const { type, payload } = action;

  switch (type) {
    case SET_WAVE_REQUESTS_SUCCESS: {
      const connections = groupById(payload);
      console.log(connections);
      return {
        ...state,
        connections,
      };
    }
    case RECEIVED_WAVE: {
      const { connection, ...wave } = payload;

      if (connection.status === ConnectionStatus.IGNORED) {
        return state;
      }

      return {
        ...state,
        connections: {
          ...state.connections,
          [connection.id]: connection,
        },
        waves: {
          ...state.waves,
          [wave.id]: wave,
        },
      };
    }

    case SET_CONNECTION: {
      return {
        ...state,
        connections: merge({}, state.connections, { [payload.id]: payload }),
      };
    }

    case UNMATCH_CONNECTION:
      return {
        ...state,
        connections: omit(state.connections, payload.id),
      };
    default:
      return state;
  }
};

export default connections;
