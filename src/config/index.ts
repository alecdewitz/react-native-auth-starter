export default Object.freeze({
  SERVER_URL: 'https://atlas-stack.herokuapp.com',
  FB_APP_ID: '603211480544135',
  GOOGLE_IOS_CLIENT_ID: '134336909480-d1icknn4q1eqd7g5522ik5gfrdkb9tlb.apps.googleusercontent.com',
  GOOGLE_WEB_CLIENT_ID: '134336909480-lk3ba11geea3lccbogh3n3ap41l9pp33.apps.googleusercontent.com',
  BASE_URL: __DEV__ ? `http://localhost:8080` : 'https://app.example.com/api',
  API: {
    V1: '/api/',
  },
});
