import type { ReactNode } from 'react';
import type { MainSectionProps, HeaderSectionProps } from '../core';
import React, { useMemo } from 'react';
import { PanelLeft, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { getInitials } from 'src/utils/initials';
import { isActiveLink } from 'src/utils/active-link';

import { cn } from 'src/lib/utils';
import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import type { NavItemProps, NavSectionProps } from 'src/components/nav-section';
import { AvatarRoot, AvatarImage, AvatarFallback } from 'src/components/ui/avatar';

import { useAuthContext } from 'src/auth/hooks';

import { _account } from '../nav-config-account';
import { Searchbar } from '../components/searchbar';
import { AccountDrawer } from '../components/account-drawer';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';

// ----------------------------------------------------------------------

// Sidebar Context
interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | null>(null);

export const useSidebar = (): SidebarContextType => {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
};

// Sidebar Provider
interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultOpen = true,
}: SidebarProviderProps) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggleSidebar = () => setOpen(!open);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Sidebar Components
interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => {
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        'h-screen shrink-0 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
        open ? 'w-64' : 'w-16',
        className
      )}
    >
      <div className="flex h-full flex-col">{children}</div>
    </aside>
  );
};

export const SidebarHeader: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <div className={cn('flex h-16 shrink-0 items-center border-b border-gray-200 px-2', className)}>
    {children}
  </div>
);

export const SidebarContent: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <div className={cn('flex-1 overflow-auto py-2', className)}>{children}</div>
);

export const SidebarFooter: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <div className={cn('shrink-0 border-t border-gray-200 p-2', className)}>{children}</div>
);

export const SidebarGroup: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <div className={cn('px-2 py-2', className)}>{children}</div>
);

export const SidebarGroupLabel: React.FC<SidebarProps> = ({
  children,
  className,
}: SidebarProps) => {
  const { open } = useSidebar();
  return open ? (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-semibold tracking-wider text-gray-500 uppercase',
        className
      )}
    >
      {children}
    </div>
  ) : null;
};

export const SidebarGroupContent: React.FC<SidebarProps> = ({
  children,
  className,
}: SidebarProps) => <div className={cn('space-y-0.5', className)}>{children}</div>;

export const SidebarMenu: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <nav className={cn('space-y-0.5', className)}>{children}</nav>
);

export const SidebarMenuItem: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <div className={className}>{children}</div>
);

interface SidebarMenuButtonProps {
  children: ReactNode;
  asChild?: boolean;
  size?: 'default' | 'lg';
  className?: string;
  onClick?: () => void;
}

interface SidebarMenuSubProps {
  children: ReactNode;
  className?: string;
}

interface SidebarMenuSubButtonProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

// Navigation Menu Component for Collapsed State
interface NavigationMenuItemProps {
  children: React.ReactNode;
  item: NavItemProps;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ children, item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {isOpen && item.children && item.children.length > 0 && (
        <div
          className="fixed z-[9999] min-w-[200px] rounded-md border border-gray-200 bg-white py-2 shadow-lg"
          style={{
            left: '64px',
            top: 'auto',
            transform: 'translateY(-50%)',
          }}
        >
          <div className="border-b border-gray-100 px-3 py-2 text-sm font-semibold">
            {item.title}
          </div>
          {(item.children as NavItemProps[])?.map((subItem) => {
            const isSubActive = isActiveLink(pathname, subItem.path, subItem.deepMatch ?? false);

            return (
              <RouterLink
                key={subItem.title}
                href={subItem.path}
                className={cn(
                  'block px-3 py-2 text-sm text-gray-700 no-underline transition-colors hover:bg-gray-100',
                  isSubActive && 'bg-gray-100 font-semibold text-gray-900'
                )}
              >
                {subItem.title}
              </RouterLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Simple wrapper for collapsible items
const CollapsibleMenuItemWrapper: React.FC<{
  item: NavItemProps;
  active: boolean;
}> = ({ item, active }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { open } = useSidebar();
  const pathname = usePathname();

  if (!open && item.children && item.children.length > 0) {
    return (
      <NavigationMenuItem item={item}>
        <SidebarMenuButton className={active ? 'bg-gray-100 font-semibold text-gray-900' : ''}>
          {item.icon && <span className="flex shrink-0 items-center">{item.icon}</span>}
        </SidebarMenuButton>
      </NavigationMenuItem>
    );
  }

  return (
    <>
      <SidebarMenuButton
        onClick={() => setIsOpen(!isOpen)}
        className={active ? 'bg-gray-100 font-semibold text-gray-900' : ''}
      >
        {item.icon && <span className="flex shrink-0 items-center">{item.icon}</span>}
        <span className="truncate">{item.title}</span>
        <ChevronDown
          className={cn(
            'ml-auto h-4 w-4 text-gray-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </SidebarMenuButton>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <SidebarMenuSub>
          {(item.children as NavItemProps[] | undefined)?.map((subItem) => {
            const isSubActive = isActiveLink(pathname, subItem.path, subItem.deepMatch ?? false);

            return (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  className={isSubActive ? 'bg-gray-100 font-semibold text-gray-900' : ''}
                >
                  <RouterLink href={subItem.path} className="no-underline">
                    {subItem.icon && <span className="h-4 w-4 shrink-0">{subItem.icon}</span>}
                    <span className="truncate">{subItem.title}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      </div>
    </>
  );
};

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({
  children,
  asChild,
  size = 'default',
  className = '',
  onClick,
}: SidebarMenuButtonProps) => {
  const { open } = useSidebar();
  const baseClasses =
    'flex items-center rounded-md text-sm font-medium text-gray-700 transition-colors';
  const hoverClass = 'hover:bg-gray-100 hover:text-gray-900';
  const gapClasses = open ? 'gap-3' : '';
  const paddingClasses = open ? 'px-2 w-full' : '';
  const sizeClasses = open
    ? size === 'lg'
      ? 'py-2'
      : 'py-1.5'
    : size === 'lg'
      ? 'h-10 w-10'
      : 'h-9 w-9';
  const justifyClass = !open ? 'justify-center' : '';

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseClasses} ${hoverClass} ${gapClasses} ${paddingClasses} ${sizeClasses} ${justifyClass} ${className}`,
      onClick,
    } as any);
  }

  return (
    <button
      className={`${baseClasses} ${hoverClass} ${gapClasses} ${paddingClasses} ${sizeClasses} ${justifyClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SidebarMenuSub: React.FC<SidebarMenuSubProps> = ({
  children,
  className,
}: SidebarMenuSubProps) => (
  <div className={cn('mt-1 ml-3 space-y-0.5 border-l border-gray-200 pl-3', className)}>
    {children}
  </div>
);

export const SidebarMenuSubItem: React.FC<SidebarProps> = ({
  children,
  className,
}: SidebarProps) => <div className={className}>{children}</div>;

export const SidebarMenuSubButton: React.FC<SidebarMenuSubButtonProps> = ({
  children,
  asChild,
  className = '',
}: SidebarMenuSubButtonProps) => {
  const baseClasses =
    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full';

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseClasses} ${className}`,
    } as any);
  }

  return <button className={`${baseClasses} ${className}`}>{children}</button>;
};

export const SidebarTrigger: React.FC<{ className?: string }> = ({
  className,
}: {
  className?: string;
}) => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-1.5 text-gray-700 transition-colors hover:bg-gray-100',
        className
      )}
    >
      <PanelLeft className="h-4 w-4" />
    </button>
  );
};

export const SidebarInset: React.FC<SidebarProps> = ({ children, className }: SidebarProps) => (
  <main className={cn('flex h-full w-full flex-col overflow-hidden', className)}>{children}</main>
);

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  className?: string;
  cssVars?: Record<string, string | number>;
  children?: React.ReactNode;
  layoutQuery?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

// App Sidebar Component
const AppSidebar: React.FC<{
  navData: NavSectionProps['data'];
  canDisplayItemByRole: (roles?: string[]) => boolean;
  onToggleNav: () => void;
  isNavMini: boolean;
}> = ({ navData, canDisplayItemByRole, onToggleNav, isNavMini }) => {
  const { open } = useSidebar();
  const { user } = useAuthContext();
  const initials = getInitials(user?.name);
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3.5">
              {/* <SidebarMenuButton size="lg"> */}
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-gray-200/50 text-white">
                <Logo className="size-4 h-10 w-10" />
              </div>
              {open && (
                <div className="grid flex-1 items-center text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ColinAI</span>
                  <span className="truncate text-xs text-gray-500">Dashboard</span>
                </div>
              )}
              {/* </SidebarMenuButton> */}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navData?.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            {group.subheader && <SidebarGroupLabel>{group.subheader}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items?.map((item) => {
                  const allowedRoles = Array.isArray(item.allowedRoles)
                    ? item.allowedRoles
                    : item.allowedRoles
                      ? [item.allowedRoles]
                      : undefined;

                  if (!canDisplayItemByRole(allowedRoles)) {
                    return null;
                  }

                  const isItemActive =
                    isActiveLink(pathname, item.path, item.deepMatch ?? !!item.children) ||
                    (item.children ?? []).some((child) =>
                      isActiveLink(pathname, child.path, child.deepMatch ?? false)
                    );

                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.children && item.children.length > 0 ? (
                        <CollapsibleMenuItemWrapper
                          item={item as NavItemProps}
                          active={isItemActive}
                        />
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className={isItemActive ? 'bg-gray-100 font-semibold text-gray-900' : ''}
                        >
                          <RouterLink
                            href={item.path}
                            className="flex w-full items-center no-underline"
                          >
                            {item.icon && (
                              <span className="flex shrink-0 items-center">{item.icon}</span>
                            )}
                            {open && (
                              <>
                                <span className="truncate">{item.title}</span>
                                {item.info && (
                                  <span className="ml-auto text-xs text-gray-500">{item.info}</span>
                                )}
                              </>
                            )}
                          </RouterLink>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={onToggleNav}>
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                <AvatarRoot className="h-12 w-12">
                  <AvatarImage
                    src={
                      user?.photoURL
                      // user?.photoURL ??
                      // 'https://api.dicebear.com/7.x/avataaars/svg?seed=shadcn'
                    }
                    alt={user?.name}
                  />
                  <AvatarFallback className={`text-${initials.length > 1 ? 'md' : 'lg'}`}>
                    {initials}
                  </AvatarFallback>
                </AvatarRoot>
              </div>

              {open && (
                <div className="grid flex-1 items-center text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-gray-500">{user?.email}</span>
                </div>
              )}
              {open && <ChevronsUpDown className="ml-auto size-4 text-gray-500" />}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

// Header Component
const DashboardHeader: React.FC<{
  navData: NavSectionProps['data'];
  canDisplayItemByRole: (roles?: string[]) => boolean;
}> = ({ navData }) => (
  <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4">
    <SidebarTrigger />
    <div className="h-4 w-px bg-gray-200" />
    <Searchbar data={navData} />
    <div className="ml-auto flex items-center gap-2">
      <AccountDrawer data={_account} />
    </div>
  </header>
);

export function DashboardLayout({
  className,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const { user } = useAuthContext();
  const settings = useSettingsContext();

  const navVars = useMemo(
    () => dashboardNavColorVars(settings.state.navColor, settings.state.navLayout),
    [settings.state.navColor, settings.state.navLayout]
  );

  const layoutCssVars = useMemo(
    () => ({
      ...dashboardLayoutVars(),
      ...navVars.layout,
      ...cssVars,
    }),
    [navVars.layout, cssVars]
  );

  const navData = slotProps?.nav?.data ?? dashboardNavData;
  const isNavMini = settings.state.navLayout === 'mini';

  const canDisplayItemByRole = (allowedRoles: NavItemProps['allowedRoles']): boolean =>
    !allowedRoles?.includes(user?.role);

  return (
    <SidebarProvider defaultOpen={!isNavMini}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <AppSidebar
          navData={navData}
          canDisplayItemByRole={canDisplayItemByRole}
          onToggleNav={() =>
            settings.setField(
              'navLayout',
              settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
            )
          }
          isNavMini={isNavMini}
        />

        <SidebarInset>
          <DashboardHeader navData={navData} canDisplayItemByRole={canDisplayItemByRole} />

          <div
            className="flex min-h-0 flex-1 justify-center overflow-auto pt-4"
            style={layoutCssVars as any}
          >
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
