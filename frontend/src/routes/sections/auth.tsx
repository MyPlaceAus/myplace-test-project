import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { MainLayout } from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/signup')),
};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <MainLayout>
            <Jwt.SignInPage />
          </MainLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <MainLayout>
            <Jwt.SignUpPage />
          </MainLayout>
        </GuestGuard>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];
