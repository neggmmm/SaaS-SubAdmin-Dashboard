import api from './api';
import type { User } from '../types/RegisterUser';

/**
 * Register a new user
 * @param userData - User registration data
 * @returns Promise with token and user data
 */
export const registerUserAPI = async (userData: User): Promise<{ token: string; user: User }> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Check if email already exists
 * @param email - Email to check
 * @returns Promise with boolean
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await api.post('/auth/check-email', { email });
  return response.data.exists;
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Promise with validation result
 */
export const validatePassword = async (password: string): Promise<{ valid: boolean; errors: string[] }> => {
  const response = await api.post('/auth/validate-password', { password });
  return response.data;
};
