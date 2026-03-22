// ----------------------------------------------------------------------

const bulletColor = { dark: '#282F37', light: '#EDEFF2' };

function colorVars(variant?: 'vertical' | 'mini' | 'horizontal'): Record<string, string> {
  return {
    // text colors
    '--nav-item-color': 'var(--muted-foreground)',
    '--nav-item-hover-bg': 'rgb(145 158 171 / 0.08)',
    '--nav-item-caption-color': 'var(--muted-foreground)',
    // root
    '--nav-item-root-active-color': '--nav-item-root-active-color)',
    '--nav-item-root-active-color-on-dark': 'var(--primary)',
    '--nav-item-root-active-bg': 'rgb(0 167 111 / 0.08)',
    '--nav-item-root-active-hover-bg': 'rgb(0 167 111 / 0.18)',
    '--nav-item-root-open-color': 'var(--foreground)',
    '--nav-item-root-open-bg': 'var(--nav-item-root-open-bg)',
    // sub
    '--nav-item-sub-active-color': 'var(--foreground)',
    '--nav-item-sub-active-bg': 'rgb(145 158 171 / 0.08)',
    '--nav-item-sub-open-color': 'var(--foreground)',
    '--nav-item-sub-open-bg': 'var(--primary)',
    ...(variant === 'vertical' && {
      '--nav-item-sub-active-bg': 'rgb(145 158 171 / 0.08)',
      '--nav-subheader-color': 'var(--muted-foreground)',
      '--nav-subheader-hover-color': 'var(--foreground)',
    }),
  };
}

// ----------------------------------------------------------------------

function verticalVars(): Record<string, string> {
  return {
    ...colorVars('vertical'),
    '--nav-item-gap': '4px',
    '--nav-item-radius': 'calc(var(--radius) - 2px)',
    '--nav-item-pt': '4px',
    '--nav-item-pr': '8px',
    '--nav-item-pb': '4px',
    '--nav-item-pl': '12px',
    // root
    '--nav-item-root-height': '44px',
    // sub
    '--nav-item-sub-height': '36px',
    // icon
    '--nav-icon-size': '24px',
    '--nav-icon-margin': '0 12px 0 0',
    // bullet
    '--nav-bullet-size': '12px',
    '--nav-bullet-light-color': bulletColor.light,
    '--nav-bullet-dark-color': bulletColor.dark,
  };
}

// ----------------------------------------------------------------------

function miniVars(): Record<string, string> {
  return {
    ...colorVars('mini'),
    '--nav-item-gap': '4px',
    '--nav-item-radius': 'calc(var(--radius) - 2px)',
    // root
    '--nav-item-root-height': '56px',
    '--nav-item-root-padding': '8px 4px 6px 4px',
    // sub
    '--nav-item-sub-height': '34px',
    '--nav-item-sub-padding': '0 8px',
    // icon
    '--nav-icon-size': '22px',
    '--nav-icon-root-margin': '0 0 6px 0',
    '--nav-icon-sub-margin': '0 8px 0 0',
  };
}

// ----------------------------------------------------------------------

function horizontalVars(): Record<string, string> {
  return {
    ...colorVars('horizontal'),
    '--nav-item-gap': '6px',
    '--nav-height': '56px',
    '--nav-item-radius': 'calc(var(--radius) * 0.75)',
    // root
    '--nav-item-root-height': '32px',
    '--nav-item-root-padding': '0 6px',
    // sub
    '--nav-item-sub-height': '34px',
    '--nav-item-sub-padding': '0 8px',
    // icon
    '--nav-icon-size': '22px',
    '--nav-icon-sub-margin': '0 8px 0 0',
    '--nav-icon-root-margin': '0 8px 0 0',
  };
}

// ----------------------------------------------------------------------

export const navSectionCssVars = {
  mini: miniVars,
  vertical: verticalVars,
  horizontal: horizontalVars,
};
