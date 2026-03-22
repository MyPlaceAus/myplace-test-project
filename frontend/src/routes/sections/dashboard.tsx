import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

// Overview
const OverviewPage = lazy(() => import('src/pages/dashboard/overview'));
const ProjectPage = lazy(() => import('src/pages/dashboard/project'));
const ProjectDetailPage = lazy(() => import('../../pages/dashboard/project/detail'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <OverviewPage /> },
      {
        path: 'projects',
        element: <ProjectPage />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetailPage />,
      },
    ],
  },
];
