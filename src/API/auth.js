import axiosClient from './axiosClients';


export const login = (data) => {
  return axiosClient.post('/Users/Login', data);
};

export const register = (data) => {
  return axiosClient.post('/Users/Register', data);
};

export const resetPass = (data) => {
  return axiosClient.post('/Users/Reset', data);
};

export const forgetPass = (data) => {
  return axiosClient.post('/Users/Reset/Request', data);
};

