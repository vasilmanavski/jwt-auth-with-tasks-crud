export interface Task {
  id: number;
  title?: string;
  userId: number;
}

export interface TaskDto {
  title?: string;
  userId?: number;
}

export interface User {
  id?: number;
  email: string;
  password?: string;
}

export interface UserCredentialsDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  access_token: string;
}