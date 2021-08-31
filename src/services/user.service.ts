import { ContactType } from './../types/index';
import axios from '../utils/axios';

const TEST_API_URL = '/content/';
const USER_API_URL = '/users/';
const FAVORITES_API_URL = '/favorites/';

const getPublicContent = () => {
  return axios.get(TEST_API_URL + 'public');
};

const getUserList = (filters?: any) => {
  const params = Object.entries(filters || {}).reduce((memo, [key, value]: [string, any]) => {
    return value ? { ...memo, [key]: value } : memo;
  }, {});
  return axios.get(USER_API_URL, { params });
};

const getFavoritesList = () => {
  return axios.get(FAVORITES_API_URL);
};

const addFavoriteUser = (favoriteUserId: number) => {
  return axios.post(FAVORITES_API_URL, { userId: favoriteUserId });
};

const deleteFavoriteUser = (favoriteId: number) => {
  return axios.delete(FAVORITES_API_URL + favoriteId);
};

const getUserProfileById = (id: any) => {
  return axios.get(USER_API_URL + id);
};

const getModeratorBoard = () => {
  return axios.get(TEST_API_URL + 'mod');
};

const getAdminBoard = () => {
  return axios.get(TEST_API_URL + 'admin');
};

const updateUserImage = (data: FormData) => {
  return axios.put(USER_API_URL + 'image', data);
};

const finishOnboarding = () => {
  return axios.post(USER_API_URL + 'finish-onboarding', null);
};

const setActive = () => {
  return axios.post(USER_API_URL + 'set-active', null);
};

const readNotifications = () => {
  return axios.post(USER_API_URL + 'read-notifications', null);
};

const watchedVideo = () => {
  return axios.post(USER_API_URL + 'watched-video', null);
};

const updateProfile = (data: any) => {
  return axios.put(USER_API_URL + 'profile', data);
};

const updateNotifications = (data: any) => {
  return axios.put(USER_API_URL + 'notifications', data);
};

const viewProfile = (userId: number) => {
  return axios.put(USER_API_URL + userId + '/view', {});
};

const pauseAccount = (reason: string) => {
  return axios.put(USER_API_URL + 'pause', { reason });
};

const unpauseAccount = () => {
  return axios.put(USER_API_URL + 'unpause', null);
};

const finishTour = () => {
  return axios.post(USER_API_URL + 'finish-tour', null);
};

const reportUser = (reason: string, reportedId: number) => {
  return axios.post(USER_API_URL + 'report', { reason, reportedId });
};

const updateContact = (
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  type?: ContactType,
) => {
  return axios.post(USER_API_URL + 'contact', { firstName, lastName, email, phone, type });
};

const userService = {
  getPublicContent,
  getUserList,
  getFavoritesList,
  getUserProfileById,
  getModeratorBoard,
  getAdminBoard,
  updateProfile,
  updateUserImage,
  readNotifications,
  finishOnboarding,
  addFavoriteUser,
  deleteFavoriteUser,
  pauseAccount,
  viewProfile,
  unpauseAccount,
  finishTour,
  reportUser,
  updateNotifications,
  setActive,
  watchedVideo,
  updateContact,
};

export default userService;
