import { useCallback } from 'react';
import { useRouter } from 'src/routes/hooks';
import { cn } from 'src/lib/utils';

import { Button } from 'src/components/ui/button';

import { signOut } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Props = React.ComponentProps<typeof Button> & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, className, ...other }: Props) {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router]);

  return (
    <Button
      variant="destructive"
      size="lg"
      className={cn('w-full', className, 'text-white!')}
      onClick={handleLogout}
      {...other}
    >
      Logout and Delete User
    </Button>
  );
}
