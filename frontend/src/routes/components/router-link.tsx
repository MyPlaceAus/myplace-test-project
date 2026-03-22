import type { LinkProps } from 'react-router';

import { Link } from 'react-router';

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
  ref?: React.RefObject<HTMLAnchorElement | null>;
  className?: string;
}

export function RouterLink({ href, ref, className, ...other }: RouterLinkProps) {
  return (
    <Link ref={ref} to={href} className={className} style={{ textDecoration: 'none' }} {...other} />
  );
}
