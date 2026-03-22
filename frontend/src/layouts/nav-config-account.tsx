import type { AccountDrawerProps } from './components/account-drawer';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps['data'] = [
  {
    label: 'Dashboard',
    href: paths.dashboard.root,
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },
  // {
  //   label: 'Profile',
  //   href: '#',
  //   icon: <Iconify icon="custom:profile-duotone" />,
  // },
  // {
  //   label: 'Projects',
  //   href: paths.dashboard.projects.all,
  //   icon: <Iconify icon="mdi:floor-plan" />,
  //   // info: '3',
  // },
  // {
  //   label: 'Global Preferences',
  //   href: paths.dashboard.globalPreferences.root,
  //   icon: <Iconify icon="material-symbols:room-preferences-rounded" />,
  // },
  // {
  //   label: 'Settings',
  //   href: paths.dashboard.settings,
  //   icon: <Iconify icon="solar:settings-bold-duotone" />,
  // },
];
