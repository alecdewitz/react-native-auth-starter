import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import users from './users';
import connections from './connections';

const rootReducer = combineReducers({
  app,
  auth,
  users,
  connections,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
