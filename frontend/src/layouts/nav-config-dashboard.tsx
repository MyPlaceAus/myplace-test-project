import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
import type { NavSectionProps } from 'src/components/nav-section';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  dashboard: icon('ic-dashboard'),
  project: icon('ic-project'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      {
        title: 'App',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        info: <Label>v{CONFIG.appVersion}</Label>,
      },
    ],
  },
  /**
   * Services
   */

  {
    subheader: 'Management',
    items: [
      {
        title: 'Projects',
        path: paths.dashboard.project,
        icon: ICONS.project,
      },
    ],
  },
];
