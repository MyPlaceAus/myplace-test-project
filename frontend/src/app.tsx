import './global.css';
import { useEffect } from 'react';
import { usePathname } from 'src/routes/hooks';
import { Snackbar } from 'src/components/snackbar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { defaultSettings, SettingsProvider } from 'src/components/settings';
import { AuthProvider } from './auth/context/jwt';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();
  return (
    <AuthProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
        <Snackbar />
        <MotionLazy>{children}</MotionLazy>
      </SettingsProvider>
    </AuthProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
