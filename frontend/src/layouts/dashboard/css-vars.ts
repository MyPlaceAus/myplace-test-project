import type { SettingsState } from 'src/components/settings';

// ----------------------------------------------------------------------

export function dashboardLayoutVars() {
  return {
    '--layout-transition-easing': 'linear',
    '--layout-transition-duration': '120ms',
    '--layout-nav-mini-width': '88px',
    '--layout-nav-vertical-width': '300px',
    '--layout-nav-horizontal-height': '64px',
    '--layout-dashboard-content-pt': '8px',
    '--layout-dashboard-content-pb': '64px',
    '--layout-dashboard-content-px': '40px',
  };
}

// ----------------------------------------------------------------------

export function dashboardNavColorVars(
  navColor: SettingsState['navColor'] = 'integrate',
  navLayout: SettingsState['navLayout'] = 'vertical'
): Record<'layout' | 'section', Record<string, string> | undefined> {
  switch (navColor) {
    case 'integrate':
      return {
        layout: {
          '--layout-nav-bg': 'var(--background)',
          '--layout-nav-horizontal-bg':
            'color-mix(in oklch, var(--background) 80%, transparent)',
          '--layout-nav-border-color': 'var(--border)',
          '--layout-nav-text-primary-color': 'var(--foreground)',
          '--layout-nav-text-secondary-color': 'var(--muted-foreground)',
          '--layout-nav-text-disabled-color':
            'color-mix(in oklch, var(--muted-foreground) 50%, transparent)',
        },
        section: undefined,
      };
    case 'apparent':
      return {
        layout: {
          '--layout-nav-bg': 'var(--background)',
          '--layout-nav-horizontal-bg':
            'color-mix(in oklch, var(--background) 96%, transparent)',
          '--layout-nav-border-color': 'transparent',
          '--layout-nav-text-primary-color': 'var(--foreground)',
          '--layout-nav-text-secondary-color': 'var(--muted-foreground)',
          '--layout-nav-text-disabled-color':
            'color-mix(in oklch, var(--muted-foreground) 60%, transparent)',
        },
        section: {
          '--nav-item-caption-color': 'var(--muted-foreground)',
          '--nav-subheader-color': 'var(--muted-foreground)',
          '--nav-subheader-hover-color': 'var(--foreground)',
          '--nav-item-color': 'var(--muted-foreground)',
          '--nav-item-root-active-color': 'var(--primary)',
          '--nav-item-root-open-color': 'var(--foreground)',
          '--nav-bullet-light-color': 'var(--primary)',
          ...(navLayout === 'vertical' && {
            '--nav-item-sub-active-color': 'var(--foreground)',
            '--nav-item-sub-open-color': 'var(--foreground)',
          }),
        },
      };
    default:
      throw new Error(`Invalid color: ${navColor}`);
  }
}
