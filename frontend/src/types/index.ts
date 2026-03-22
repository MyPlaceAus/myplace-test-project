// User types
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  email: string;
  company: string;
  id: string;
  name: string;
}
// Auth types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Common types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export type PaletteColorKey =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ThemeColorPreset =
  | 'default'
  | 'preset1'
  | 'preset2'
  | 'preset3'
  | 'preset4'
  | 'preset5';
