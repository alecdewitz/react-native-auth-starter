import api from './helper';

export default {
  facebook: (data) => api.post('/api/auth/facebook', data),
  google: (data) => api.post('/api/auth/google', data),
  signIn: (data) => api.post('/api/auth/sign_in', data),
  signUp: (data) => api.post('/api/auth/sign_up', data),
  getUser: () => api.get('/api/users', {}),
};
