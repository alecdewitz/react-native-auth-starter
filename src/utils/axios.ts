import { getStore } from './../store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Alert } from 'react-native';
import Toast from '../components/Toast';
import Config from '../config';
import authHeader, { authToken, refreshToken } from '../services/auth-header';
import { getToken } from './../store/selectors/index';
import { getDeviceId } from './device';

const instance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 3000,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await authToken();

    console.log('token', accessToken);

    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    config.headers['X-DEVICE_ID'] = await getDeviceId();
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) =>
    new Promise(async (resolve, reject) => {
      console.log('axios-response', response.status, response.data);

      resolve(response);
    }),
  (error) =>
    new Promise(async (resolve, reject) => {
      console.log('axios-response-error', error.response || error);

      if (error.response) {
        if (error.response.status == 401) {
          // try {
          //   const response = await Services.Auth.refreshToken()
          //   await Services.DataManager.setAuthSession({
          //     accessToken: response.data.access.token,
          //     expireAt: response.data.refresh.expires,
          //     refreshToken: response.data.refresh.token
          //   })
          //   resolve(instance.request(error.config))
          // } catch (error) {
          //   console.log('refreshToken-error', error.response)
          //   await Services.DataManager.clearAuthSession()
          // }

          // await services.DataManager.clearAuthSession();
          Toast.showError('Unauthorized access.\nPlease login again.');
        } else if (error.response.status == 500) {
          Toast.showError('Internal server error');
        } else if (error.response.status == 403) {
          Toast.showError('Unable to process required request.');
        } else if (error.response.status == 422) {
          let errorMessage = '';
          error.response.data.errors.map((error, index) => {
            if (index > 0) {
              errorMessage += '\n';
            }

            errorMessage += error.message;
          });
          Alert.alert('Missing information', errorMessage);
        } else if (error.response.status == 400) {
          let errorMessage = '';
          error.response.data.message.map((item, index) => {
            if (index > 0) {
              errorMessage += '\n';
            }

            errorMessage += item;
          });
          Alert.alert('Missing information', errorMessage);
        } else {
          Alert.alert('Failed', error.response.data.message);
        }

        return reject({
          status: error.response.status,
          response: error.response.data,
        });
      }

      reject(error);
    }),
);

const refreshAuthLogic = async (failedRequest: any) => {
  const token = await refreshToken();
  return !token
    ? Promise.reject(failedRequest)
    : axios
        .post(
          '/api/auth/refresh',
          {
            refreshToken: refreshToken(),
          },
          { headers: authHeader() },
        )
        .then(async (response) => {
          console.debug('response.data', response.data);
          const accessToken = await authToken();

          failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return Promise.resolve();
        })
        .catch(async (error) => {
          await AsyncStorage.removeItem('accessToken');
          // getStore().dispatch(logout());
          return Promise.reject(error);
        });
};

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;
