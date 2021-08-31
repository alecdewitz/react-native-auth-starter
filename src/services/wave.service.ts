import axios from '../utils/axios';

const WAVE_API_URL = '/connections/';

const getConnections = () => {
  return axios.get(WAVE_API_URL + 'all');
};

const getMyConnections = () => {
  return axios.get(WAVE_API_URL).then((response) => {
    return response.data;
  });
};

const sendWave = (userId: number) => {
  return axios.post(WAVE_API_URL + 'wave', {
    userId,
  });
};

const sendWaveMessage = (connectionId: number, message: string) => {
  return axios.post(WAVE_API_URL + 'wave/message', {
    connectionId,
    message,
  });
};

const ignoreWave = (userId: number) => {
  return axios.post(WAVE_API_URL + 'ignore', {
    userId,
  });
};

const waveService = {
  getConnections,
  sendWave,
  sendWaveMessage,
  getMyConnections,
  ignoreWave,
};

export default waveService;
