import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { MainLayout } from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const Page404 = lazy(() => import('src/sections/error/not-found-view'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    /**
     * @skip homepage
     * import { Navigate } from "react-router";
     * import { CONFIG } from 'src/global-config';
     *
     * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
     * and remove the element below:
     */
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <MainLayout>
            <HomePage />
          </MainLayout>
        </GuestGuard>
      </Suspense>
    ),
  },

  // Auth
  ...authRoutes,

  // Dashboard
  ...dashboardRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
