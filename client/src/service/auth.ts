import axios, { AxiosResponse } from 'axios';
import { AuthResponseDto, UserCredentialsDto } from '../types/types';

const API_URL = '/api/auth';

export const login = async (credentials: UserCredentialsDto) => {

  return axios.post(`${API_URL}/login`, credentials)
    .then((response: AxiosResponse<AuthResponseDto>) => response.data);
};

export const register = async (credentials: UserCredentialsDto) => {

  return axios.post(`${API_URL}/register`, credentials)
    .then((response: AxiosResponse<AuthResponseDto>) => response.data);
};

export const logout = async () => {

  return axios.post('/api/auth/logout');
};