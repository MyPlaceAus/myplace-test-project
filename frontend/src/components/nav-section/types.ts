// ----------------------------------------------------------------------

/**
 * Item
 */
export type NavItemRenderProps = {
  navIcon?: Record<string, React.ReactNode>;
  navInfo?: (val: string) => Record<string, React.ReactElement>;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
};

export type NavItemSlotProps = {
  className?: string;
  icon?: { className?: string };
  texts?: { className?: string };
  title?: { className?: string };
  caption?: { className?: string };
  info?: { className?: string };
  arrow?: { className?: string };
};

export type NavSlotProps = {
  rootItem?: NavItemSlotProps;
  subItem?: NavItemSlotProps;
  subheader?: { className?: string };
  dropdown?: {
    paper?: { className?: string };
  };
};

export type NavItemOptionsProps = {
  depth?: number;
  hasChild?: boolean;
  externalLink?: boolean;
  enabledRootRedirect?: boolean;
  render?: NavItemRenderProps;
  slotProps?: NavItemSlotProps;
};

export type NavItemDataProps = Pick<NavItemStateProps, 'disabled'> & {
  path: string;
  title: string;
  icon?: string | React.ReactNode;
  info?: string[] | React.ReactNode;
  caption?: string;
  deepMatch?: boolean;
  allowedRoles?: string | string[];
  children?: NavItemDataProps[];
};

export type NavItemProps = React.ComponentProps<'button'> &
  NavItemDataProps &
  NavItemStateProps &
  NavItemOptionsProps;

/**
 * List
 */
export type NavListProps = Pick<
  NavItemProps,
  'render' | 'depth' | 'enabledRootRedirect'
> & {
  cssVars?: Record<string, string | number>;
  data: NavItemDataProps;
  slotProps?: NavSlotProps;
  checkPermissions?: (allowedRoles?: NavItemProps['allowedRoles']) => boolean;
};

export type NavSubListProps = Omit<NavListProps, 'data'> & {
  data: NavItemDataProps[];
};

export type NavGroupProps = Omit<NavListProps, 'data' | 'depth'> & {
  subheader?: string;
  items: NavItemDataProps[];
};

/**
 * Main
 */
export type NavSectionProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'data' | 'depth'> & {
    data: {
      subheader?: string;
      items: NavItemDataProps[];
    }[];
  };
/**
 * Main
 */
export type NavBasicProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'data' | 'depth'> & {
    data: NavItemDataProps[];
  };
