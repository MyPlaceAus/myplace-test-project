import type { IconProps } from '@iconify/react';
import type { IconifyName } from './register-icons';

import { useId } from 'react';
import { Icon } from '@iconify/react';

import { cn } from 'src/lib/utils';

import { allIconNames, registerIcons } from './register-icons';

// ----------------------------------------------------------------------

export type IconifyProps = Omit<IconProps, 'icon'> & {
  icon: IconifyName;
  className?: string;
  width?: number;
  height?: number;
};

export function Iconify({
  className,
  icon,
  width = 20,
  height,
  ...props
}: IconifyProps) {
  const uniqueId = useId();

  if (!allIconNames.includes(icon)) {
    console.warn(
      [
        `Icon "${icon}" is currently loaded online, which may cause flickering effects.`,
        `To ensure a smoother experience, please register your icon collection for offline use.`,
        `More information is available at: https://docs.minimals.cc/icons/`,
      ].join('\n')
    );
  }

  registerIcons();

  return (
    <Icon
      {...props}
      ssr
      id={uniqueId}
      icon={icon}
      className={cn('inline-flex shrink-0', className)}
      style={{
        width,
        height: height ?? width,
      }}
    />
  );
}
