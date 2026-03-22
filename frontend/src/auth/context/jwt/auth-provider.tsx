import type { IUser } from 'src/types';
import type { AuthState } from '../../types';

import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import { getStorage } from 'src/utils/local-storage';

import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';
import { JWT_STORAGE_KEY, USER_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = getStorage<string>(JWT_STORAGE_KEY);
      const user = getStorage<IUser>(USER_STORAGE_KEY);
      if (accessToken && user?.id && isValidToken(accessToken)) {
        await setSession(accessToken);
        setState({ user: { ...user, accessToken }, loading: false });
        return;
      }

      await setSession(null);
      setState({ user: null, loading: false });
    } catch (error) {
      console.error(error);
      await setSession(null);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
