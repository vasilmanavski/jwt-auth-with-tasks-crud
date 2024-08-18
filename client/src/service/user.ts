import axios from 'axios';

export const fetchUserInfo = async (username: string) => {
  try {
    const response = await axios.get(`/api/auth/user-info/${username}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};