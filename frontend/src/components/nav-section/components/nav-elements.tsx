import { cn } from 'src/lib/utils';

import { navSectionClasses } from '../styles';

// ----------------------------------------------------------------------

export const Nav = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav className={className} {...props} />
);

// ----------------------------------------------------------------------

type NavLiProps = React.ComponentProps<'li'> & {
  disabled?: boolean;
};

export const NavLi = ({ disabled, className, ...props }: NavLiProps) => (
  <li
    className={cn(
      'block w-full',
      disabled && 'cursor-not-allowed',
      cn([navSectionClasses.li, className])
    )}
    {...props}
  />
);

// ----------------------------------------------------------------------

type NavUlProps = React.ComponentProps<'ul'>;

export const NavUl = ({ className, ...props }: NavUlProps) => (
  <ul className={cn('flex flex-col', cn([navSectionClasses.ul, className]))} {...props} />
);
