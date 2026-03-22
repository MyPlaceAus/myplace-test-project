import { cn } from 'src/lib/utils';

import { navSectionClasses } from '../styles';
import { Iconify, iconifyClasses } from '../../iconify';

// ----------------------------------------------------------------------

export type NavSubheaderProps = React.ComponentProps<'div'> & {
  open?: boolean;
};

export const NavSubheader = ({ open, children, className, ...other }: NavSubheaderProps) => (
  <div
    className={cn(
      'text-[11px] font-medium tracking-wider uppercase',
      'relative inline-flex cursor-pointer items-center gap-4 self-start',
      'text-[var(--nav-subheader-color)]',
      'px-1 py-2 pt-1 pl-1.5',
      'transition-[padding-left] transition-colors duration-300',
      'hover:pl-2 hover:text-[var(--nav-subheader-hover-color)]',
      `[&_.${iconifyClasses.root}]:-left-1 [&_.${iconifyClasses.root}]:opacity-0 [&_.${iconifyClasses.root}]:absolute [&_.${iconifyClasses.root}]:transition-opacity [&_.${iconifyClasses.root}]:duration-300`,
      `hover:[&_.${iconifyClasses.root}]:opacity-100`,
      cn([navSectionClasses.subheader, className])
    )}
    {...other}
  >
    <Iconify
      width={16}
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
    />
    {children}
  </div>
);
