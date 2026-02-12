import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import type { User } from '../types/RegisterUser';

// API call function
const registerUser = async (userData: User): Promise<{ token: string; user: User }> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Custom hook for registration
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the token
      localStorage.setItem('authToken', data.token);
    },
    onError: (error: any) => {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    },
  });
};
