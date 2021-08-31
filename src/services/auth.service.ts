import axios from '../utils/axios';

const API_URL = '/auth/';

const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthDate: Date,
  phone: string,
  type: string,
  alreadyMade: boolean,
) => {
  return axios
    .post(API_URL + 'signup', {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      phone,
      type,
      alreadyMade,
    })
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const alreadyMadeRumi = (
  firstName: string,
  lastName: string,
  email: string,
  birthDate: Date,
  phone: string,
  type: string,
  alreadyMade: boolean,
) => {
  return axios
    .post(API_URL + 'already-made/rumi', {
      firstName,
      lastName,
      email,
      birthDate,
      phone,
      type,
      alreadyMade,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (email: string, password: string) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.status === 200) {
        // localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const authMe = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const verifyAccount = (token) => {
  return axios
    .post(API_URL + 'verify', null, {
      params: {
        token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
      }

      return response.data;
    });
};

const updatePassword = (newPassword: string) => {
  return axios.post(API_URL + 'update-password', {
    newPassword,
  });
};

const checkEmail = (email: string) => {
  return axios.post(API_URL + 'check-email', {
    email,
  });
};

const changeEmail = (newEmail: string) => {
  return axios.post(API_URL + 'change-email', {
    newEmail,
  });
};

const changeEmailVerify = (token) => {
  return axios
    .post(API_URL + 'change-email/verify', null, {
      params: {
        token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
      }

      return response.data;
    });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + `forgot-password`, { email });
};

const checkResetPasswordToken = (token) => {
  return axios.post(API_URL + 'reset-password/token', { token });
};

const resetPassword = (newPassword, token) => {
  return axios.post(API_URL + 'reset-password', { newPassword, token });
};

const resendVerification = (email) => {
  return axios.post(API_URL + 'resend-verification', { email });
};

const alreadyMadeMatchRegister = (caregiver, carereceiver) => {
  return axios.post(API_URL + 'already-made-match-signup', {
    caregiver,
    carereceiver,
  });
};

const authService = {
  register,
  login,
  verifyAccount,
  updatePassword,
  changeEmail,
  changeEmailVerify,
  authMe,
  alreadyMadeMatchRegister,
  checkEmail,
  forgotPassword,
  checkResetPasswordToken,
  resetPassword,
  resendVerification,
  alreadyMadeRumi,
};

export default authService;
