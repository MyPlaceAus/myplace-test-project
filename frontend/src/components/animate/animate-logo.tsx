import type { LogoProps } from '../logo';

import { m } from 'framer-motion';
import { cn } from 'src/lib/utils';

import { Logo } from '../logo';

// ----------------------------------------------------------------------

export type AnimateLogoProps = React.ComponentProps<'div'> & {
  logo?: React.ReactNode;
  slotProps?: {
    logo?: LogoProps;
  };
};

export function AnimateLogoZoom({ logo, slotProps, className, ...other }: AnimateLogoProps) {
  return (
    <LogoZoomRoot className={className} {...other}>
      <m.span
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {logo ?? <Logo disabled {...slotProps?.logo} className="h-16 w-16" />}
      </m.span>

      <LogoZoomPrimaryOutline
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />

      <LogoZoomSecondaryOutline
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />
    </LogoZoomRoot>
  );
}

const LogoZoomRoot = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'relative inline-flex h-[120px] w-[120px] items-center justify-center',
      className
    )}
    {...props}
  />
);

const LogoZoomPrimaryOutline = ({ className, ...props }: React.ComponentProps<typeof m.span>) => (
  <m.span
    className={cn('absolute h-[calc(100%-20px)] w-[calc(100%-20px)]', className)}
    style={{
      border: 'solid 3px hsl(var(--primary-dark) / 0.24)',
    }}
    {...props}
  />
);

const LogoZoomSecondaryOutline = ({ className, ...props }: React.ComponentProps<typeof m.span>) => (
  <m.span
    className={cn('absolute h-full w-full', className)}
    style={{
      border: 'solid 8px hsl(var(--primary-dark) / 0.24)',
    }}
    {...props}
  />
);

// ----------------------------------------------------------------------

export function AnimateLogoRotate({ logo, slotProps, className, ...other }: AnimateLogoProps) {
  return (
    <LogoRotateRoot className={className} {...other}>
      {logo ?? <Logo {...slotProps?.logo} className="z-[9] h-10 w-10" />}

      <LogoRotateBackground
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      />
    </LogoRotateRoot>
  );
}

const LogoRotateRoot = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    className={cn('relative inline-flex h-24 w-24 items-center justify-center', className)}
    {...props}
  />
);

const LogoRotateBackground = ({ className, ...props }: React.ComponentProps<typeof m.span>) => (
  <m.span
    className={cn(
      'absolute h-full w-full rounded-full transition-opacity duration-200 ease-in-out',
      className
    )}
    style={{
      opacity: 0.16,
      backgroundImage: 'linear-gradient(135deg, transparent 50%, hsl(var(--primary)) 100%)',
    }}
    {...props}
  />
);
