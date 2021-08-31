import { getStore } from './../store/index';
import { getRefreshToken, getToken } from './../store/selectors/index';

export async function authToken() {
  const token = getToken(getStore().getState());
  return token;
}

export async function refreshToken() {
  const token = getRefreshToken(getStore().getState());
  return token;
}

export default function authHeader() {
  const token = authToken();
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
