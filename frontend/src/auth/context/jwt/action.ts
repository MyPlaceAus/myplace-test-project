import type { IUser } from 'src/types';

import { getStorage, setStorage, removeStorage } from 'src/utils/local-storage';

import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_STORAGE_KEY, USER_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  company: string;
  role?: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.jwt.signIn, params);
    const { accessToken, user } = res.data.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    await setSession(accessToken);
    setStorage<IUser>(USER_STORAGE_KEY, user);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  name,
  company,
  role,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    name,
    company,
    role: role || 'user',
  };

  try {
    const res = await axios.post(endpoints.auth.jwt.signUp, params);

    const { accessToken, user } = res.data?.data ?? {};

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    setStorage<IUser>(USER_STORAGE_KEY, user);
    await setSession(accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  const user = getStorage<IUser>(USER_STORAGE_KEY);

  try {
    if (user?.id) {
      await axios.delete(endpoints.user.me(user.id));
    }

    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
  } finally {
    removeStorage(USER_STORAGE_KEY);
    removeStorage(JWT_STORAGE_KEY);
  }

  // Keep the API consistent for callers: sign out should resolve after local cleanup.
  return Promise.resolve();
};
