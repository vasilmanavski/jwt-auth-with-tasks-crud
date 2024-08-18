import { Task } from 'src/modules/task/entity/task';

export interface AuthResponse {
  message?: string;
}

export interface UserInfo {
  id: number;
  email: string;
  tasks: Task[];
}
