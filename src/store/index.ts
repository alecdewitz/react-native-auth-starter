import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';

let store;
let middleware = [thunk as ThunkMiddleware<any, any>];

const config: any = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistReducer(config, rootReducer);

if (__DEV__) {
  const excludedActions = [];
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => excludedActions.indexOf(action.type) < 0,
  });
  middleware = [...middleware, logger];
}

export const getStore = () => store;

export type AppDispatch = typeof store.dispatch;

const configureStore = () => {
  store = createStore(reducer, compose(applyMiddleware(...middleware)));
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
