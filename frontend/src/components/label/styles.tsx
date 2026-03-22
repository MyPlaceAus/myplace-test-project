import type { LabelProps } from './types';

import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export function LabelRoot({
  className,
  color = 'default',
  variant = 'filled',
  disabled,
  children,
  startIcon,
  endIcon,
  ...other
}: LabelProps) {
  const colorClasses = {
    default:
      variant === 'filled'
        ? 'bg-black text-white'
        : variant === 'outlined'
          ? 'border-black text-black'
          : 'bg-muted text-foreground',
    primary:
      variant === 'filled'
        ? 'bg-primary text-primary-foreground'
        : variant === 'outlined'
          ? 'border-primary text-primary'
          : variant === 'soft'
            ? 'bg-primary/10 text-primary'
            : 'bg-primary/20 text-primary',
    secondary:
      variant === 'filled'
        ? 'bg-secondary text-secondary-foreground'
        : variant === 'outlined'
          ? 'border-secondary text-secondary'
          : variant === 'soft'
            ? 'bg-secondary/10 text-secondary'
            : 'bg-secondary/20 text-secondary',
    info:
      variant === 'filled'
        ? 'bg-blue-500 text-white'
        : variant === 'outlined'
          ? 'border-blue-500 text-blue-500'
          : variant === 'soft'
            ? 'bg-blue-500/10 text-blue-500'
            : 'bg-blue-500/20 text-blue-500',
    success:
      variant === 'filled'
        ? 'bg-green-500 text-white'
        : variant === 'outlined'
          ? 'border-green-500 text-green-500'
          : variant === 'soft'
            ? 'bg-green-500/10 text-green-500'
            : 'bg-green-500/20 text-green-500',
    warning:
      variant === 'filled'
        ? 'bg-yellow-500 text-white'
        : variant === 'outlined'
          ? 'border-yellow-500 text-yellow-500'
          : variant === 'soft'
            ? 'bg-yellow-500/10 text-yellow-500'
            : 'bg-yellow-500/20 text-yellow-500',
    error:
      variant === 'filled'
        ? 'bg-destructive text-destructive-foreground'
        : variant === 'outlined'
          ? 'border-destructive text-destructive'
          : variant === 'soft'
            ? 'bg-destructive/10 text-destructive'
            : 'bg-destructive/20 text-destructive',
  };

  const variantClasses = {
    filled: '',
    outlined: 'border-2 bg-transparent',
    soft: '',
    inverted: '',
  };

  return (
    <span
      className={cn(
        'inline-flex min-h-6 min-w-6 shrink-0 cursor-default items-center justify-center gap-1.5 rounded-md px-1.5 text-xs leading-4.5 font-bold whitespace-nowrap',
        variantClasses[variant],
        colorClasses[color],
        disabled && 'pointer-events-none opacity-48',
        className
      )}
      {...other}
    >
      {startIcon && (
        <span className="inline-flex h-3 w-3 shrink-0 self-center items-center justify-center leading-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full">
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span className="inline-flex h-3 w-3 shrink-0 self-center items-center justify-center leading-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full">
          {endIcon}
        </span>
      )}
    </span>
  );
}

export const LabelIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      'inline-flex h-3 w-3 shrink-0 self-center items-center justify-center leading-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full',
      className
    )}
  >
    {children}
  </span>
);
