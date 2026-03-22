import { useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { getInitials } from 'src/utils/initials';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Button } from 'src/components/ui/button';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateBorder } from 'src/components/animate';
import { AvatarRoot, AvatarImage, AvatarFallback } from 'src/components/ui/avatar';

import { useAuthContext } from 'src/auth/hooks';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

export type AccountDrawerProps = Omit<React.ComponentProps<'button'>, 'onClick'> & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], ...other }: AccountDrawerProps) {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const renderAvatar = () => (
    <AnimateBorder
      className="mb-4 h-24 w-24 rounded-full p-1.5"
      slotProps={{
        primaryBorder: { size: 120, width: '3px' },
      }}
    >
      <AvatarRoot className="h-full w-full">
        <AvatarImage src={user?.photoURL} alt={user?.name} />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </AvatarRoot>
    </AnimateBorder>
  );

  const renderList = () => (
    <ul className="border-border mt-6 border-t border-dashed px-5 py-6">
      {data.map((option) => {
        const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';
        const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

        return (
          <li key={option.label} className="p-0">
            <RouterLink
              href={option.label === 'Home' ? rootHref : option.href}
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground flex w-full items-center p-2 text-sm transition-colors [&_svg]:h-6 [&_svg]:w-6"
            >
              {option.icon}
              <span className="ml-2">{option.label === 'Home' ? rootLabel : option.label}</span>
              {option.info && (
                <Label color="error" className="ml-1">
                  {option.info}
                </Label>
              )}
            </RouterLink>
          </li>
        );
      })}
    </ul>
  );

  if (!open) {
    return (
      <AccountButton
        onClick={onOpen}
        photoURL={user?.photoURL}
        displayName={user?.name}
        {...other}
      />
    );
  }

  return (
    <>
      <AccountButton
        onClick={onOpen}
        photoURL={user?.photoURL}
        displayName={user?.name}
        {...other}
      />

      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/20" onClick={onClose} />

      {/* Drawer */}
      <div
        className="bg-background fixed inset-y-0 right-0 z-50 flex h-screen w-80 flex-col border-l shadow-lg"
        style={{
          animation: 'slideInRight 0.3s ease-out',
        }}
      >
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-3 left-3 z-9">
          <Iconify icon="mingcute:close-line" />
        </Button>

        <Scrollbar
          className="bg-background min-h-0 flex-1"
          fillContent
          slotProps={{
            content: {
              className: 'bg-background',
            },
            wrapper: {
              className: 'bg-background',
            },
          }}
        >
          <div className="bg-background flex flex-col">
            <div className="flex flex-col items-center pt-8">
              {renderAvatar()}

              <p className="mt-2 truncate text-base font-medium">{user?.name}</p>

              <p className="text-muted-foreground mt-0.5 truncate text-sm">{user?.company}</p>
              <p className="text-muted-foreground mt-0.5 truncate text-xs">{user?.email}</p>
            </div>

            {renderList()}
          </div>
        </Scrollbar>

        <div className="bg-background p-5">
          <SignOutButton onClose={onClose} />
        </div>
      </div>
    </>
  );
}
