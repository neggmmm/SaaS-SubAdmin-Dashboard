import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import type { LoginUser } from '../types/LoginUser';

// API call function
const loginUser = async (credentials: LoginUser): Promise<{ token: string; user: LoginUser }> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Custom hook for login
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store the token
      localStorage.setItem('authToken', data.token);
    },
    onError: (error: any) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    },
  });
};
