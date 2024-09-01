import axios, { AxiosResponse } from 'axios';

import { Task, TaskDto } from '../types/types';

const API_URL = '/api/tasks';

export const getTasks = async (email?: string): Promise<Task[]> => {

  return axios.get<Task[]>(`${API_URL}/user/${email}`)
    .then((response: AxiosResponse<Task[]>) => response.data);
};

export const addTask = (task: TaskDto): Promise<Task> => {
  return axios.post(API_URL, task).then(response => response.data);
};

export const updateTask = (id: number, task: TaskDto): Promise<Task> => {
  return axios.patch(`${API_URL}/${id}`, task).then(response => response.data);
};

export const deleteTask = (id: number): Promise<void> => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};
