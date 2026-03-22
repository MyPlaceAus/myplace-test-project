import type { SettingsState } from './types';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY: string = 'app-settings';

export const defaultSettings: SettingsState = {
  mode: 'light', // themeConfig.defaultMode,
  direction: 'ltr', // themeConfig.direction,
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'default',
  navColor: 'integrate',
  compactLayout: true,
  fontSize: 16,
  fontFamily: 'Public Sans Variable', // themeConfig.fontFamily.primary,
  version: CONFIG.appVersion,
};
