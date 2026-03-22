import type { AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import { paths } from 'src/routes/paths';

import { getStorage, removeStorage } from 'src/utils/local-storage';

import { JWT_STORAGE_KEY, USER_STORAGE_KEY } from 'src/auth/context/jwt';

const prodAPIUrl =
  'https://colinai-nest-api-test-813927371707.australia-southeast1.run.app/api/v1/';
const devAPIUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/';
// Define the base API URL
const API_BASE_URL = import.meta.env.PROD ? prodAPIUrl : devAPIUrl;
const AUTH_PUBLIC_PATHS = ['/auth/users/signin', '/auth/users/signup', '/auth/login'];

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  params?: Record<string, any>;
  data?: any;
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (param) => param, // Don't encode at all
    serialize: (params) =>
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&'),
  },
});
const createRedirectPath = (currentPath: string) => {
  const pathname = window.location.pathname;
  const queryString = new URLSearchParams({ returnTo: pathname }).toString();
  return `${currentPath}?${queryString}`;
};

const isAuthPublicPath = (url?: string) =>
  !!url && AUTH_PUBLIC_PATHS.some((path) => url.includes(path));

// Helper function to handle authentication errors
const handleAuthError = async () => {
  try {
    // Clear invalid token
    removeStorage(JWT_STORAGE_KEY);
    removeStorage(USER_STORAGE_KEY);

    if (window.location.pathname === paths.auth.jwt.signIn) {
      return;
    }

    const redirectPath = createRedirectPath(paths.auth.jwt.signIn);
    window.location.href = redirectPath;
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = getStorage<string>(JWT_STORAGE_KEY);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Failed to fetch auth session:', error);
      await handleAuthError();
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url as string | undefined;
    const isAuthRequest = isAuthPublicPath(requestUrl);

    // Handle unauthorized errors (401) or forbidden errors (403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (!isAuthRequest) {
        await handleAuthError();
      }
    }

    return Promise.reject(error.response?.data || 'Something went wrong!');
  }
);

// Enhanced fetcher with support for different methods
export const fetcher = {
  // GET method
  get: async (url: string, config?: ExtendedAxiosRequestConfig) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  },

  // POST method
  post: async (url: string, data?: any, config?: ExtendedAxiosRequestConfig) => {
    try {
      const res = await axiosInstance.post(url, data, config);
      return res.data;
    } catch (error) {
      console.error('Failed to post:', error);
      throw error;
    }
  },

  // PUT method
  put: async (url: string, data?: any, config?: ExtendedAxiosRequestConfig) => {
    try {
      const res = await axiosInstance.put(url, data, config);
      return res.data;
    } catch (error) {
      console.error('Failed to put:', error);
      throw error;
    }
  },

  // DELETE method
  delete: async (url: string, config?: ExtendedAxiosRequestConfig) => {
    try {
      const res = await axiosInstance.delete(url, config);
      return res.data;
    } catch (error) {
      console.error('Failed to delete:', error);
      throw error;
    }
  },
};

export const endpoints = {
  auth: {
    jwt: {
      signIn: '/auth/users/signin',
      signUp: '/auth/users/signup',
    },
  },
  user: {
    create: '/users',
    me: (id: string) => `/users/${id}`,
    updateMe: (id: string) => `/users/${id}`,
  },
  projects: {
    base: '/projects',
    byId: (id: string) => `/projects/${id}`,
  },
};
export default axiosInstance;
