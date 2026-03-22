import type { SvgColorProps } from './types';

import { cn } from 'src/lib/utils';

import { svgColorClasses } from './classes';

// ----------------------------------------------------------------------

export function SvgColor({ src, className, ...other }: SvgColorProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 w-6 shrink-0 bg-current',
        cn([svgColorClasses.root, className])
      )}
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      {...other}
    />
  );
}
