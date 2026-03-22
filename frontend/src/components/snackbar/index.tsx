import './styles.css';

// snackbar.tsx
import { toast, Toaster } from 'sonner';

import { Iconify } from '../iconify';

export { toast };

export function Snackbar() {
  return (
    <Toaster
      expand
      closeButton
      gap={12}
      offset={16}
      visibleToasts={4}
      position="top-right"
      className="w-75"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'snackbar-toast',
          icon: 'snackbar-icon',
          loader: 'snackbar-loader',
          loading: 'snackbar-loading',
          content: 'snackbar-content',
          title: 'snackbar-title',
          description: 'snackbar-description',
          closeButton: 'snackbar-close-button',
          actionButton: 'snackbar-action-button',
          cancelButton: 'snackbar-cancel-button',
          info: 'snackbar-info',
          error: 'snackbar-error',
          success: 'snackbar-success',
          warning: 'snackbar-warning',
        },
      }}
      icons={{
        loading: <span className="snackbar-loading-icon" />,
        info: <Iconify className="h-6 w-6" icon="solar:info-circle-bold" />,
        success: <Iconify className="h-6 w-6" icon="solar:check-circle-bold" />,
        warning: <Iconify className="h-6 w-6" icon="solar:danger-triangle-bold" />,
        error: <Iconify className="h-6 w-6" icon="solar:danger-bold" />,
      }}
    />
  );
}
