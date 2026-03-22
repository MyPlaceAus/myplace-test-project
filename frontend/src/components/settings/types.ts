import type { ThemeColorPreset } from 'src/types';

// ----------------------------------------------------------------------

export type SettingsState = {
  version: string;
  fontSize: number;
  fontFamily: string;
  compactLayout: boolean;
  contrast: 'default' | 'hight';
  primaryColor: ThemeColorPreset;
  mode: 'light' | 'dark' | null;
  navColor: 'integrate' | 'apparent';
  direction: 'ltr' | 'rtl';
  navLayout: 'vertical' | 'horizontal' | 'mini';
};

export type SettingsContextValue = {
  state: SettingsState;
  canReset: boolean;
  onReset: () => void;
  setState: (updateValue: Partial<SettingsState>) => void;
  setField: (name: keyof SettingsState, updateValue: SettingsState[keyof SettingsState]) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  defaultSettings: SettingsState;
  children: React.ReactNode;
  storageKey?: string;
};

export type SettingsDrawerProps = {
  className?: string;
  defaultSettings: SettingsState;
};
