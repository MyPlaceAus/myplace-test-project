import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from 'src/lib/utils';

const avatarShapeClass = {
  circular: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
} as const;

type AvatarVariant = keyof typeof avatarShapeClass;
type AvatarTone = 'filled' | 'soft';
type AvatarColor =
  | 'default'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'black'
  | 'white';

const fallbackColorClasses: Record<AvatarTone, Record<AvatarColor, string>> = {
  filled: {
    default: 'bg-muted text-foreground',
    inherit: 'bg-muted text-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    info: 'bg-info text-info-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-destructive-hover text-destructive-foreground',
    black: 'bg-foreground text-background',
    white: 'bg-background text-foreground border border-input',
  },
  soft: {
    default: 'bg-muted text-foreground',
    inherit: 'bg-muted text-foreground',
    primary: 'bg-primary/15 text-primary',
    secondary: 'bg-secondary/15 text-secondary',
    info: 'bg-info/15 text-info',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-destructive/20 text-destructive-hover',
    black: 'bg-foreground/15 text-foreground',
    white: 'bg-background text-foreground border border-input',
  },
};

const getFallbackTextSizeClass = (size: number) => {
  if (size <= 24) return 'text-[10px]';
  if (size <= 32) return 'text-xs';
  if (size <= 40) return 'text-sm';
  if (size <= 56) return 'text-base';
  return 'text-lg';
};

const AvatarRoot = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'bg-muted flex h-full w-full items-center justify-center rounded-full text-3xl',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

type AvatarProps = Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, 'children'> & {
  alt: string;
  src?: string;
  size?: number;
  variant?: AvatarVariant;
  color?: AvatarColor;
  tone?: AvatarTone;
  imageClassName?: string;
  fallbackClassName?: string;
  fallback?: string;
  children?: React.ReactNode;
};

function Avatar({
  alt,
  src,
  size = 40,
  variant = 'circular',
  color = 'default',
  tone = 'filled',
  className,
  imageClassName,
  fallbackClassName,
  fallback,
  children,
  style,
  ...other
}: AvatarProps) {
  return (
    <AvatarRoot
      className={cn('border border-border', avatarShapeClass[variant], className)}
      style={{ width: size, height: size, ...style }}
      {...other}
    >
      {src ? <AvatarImage src={src} alt={alt} className={imageClassName} /> : null}
      <AvatarFallback
        className={cn(
          'font-semibold uppercase select-none [&_svg]:h-[55%] [&_svg]:w-[55%]',
          getFallbackTextSizeClass(size),
          fallbackColorClasses[tone][color],
          avatarShapeClass[variant],
          fallbackClassName
        )}
      >
        {children ?? (fallback ?? alt).charAt(0).toUpperCase()}
      </AvatarFallback>
    </AvatarRoot>
  );
}

export { Avatar, AvatarRoot, AvatarImage, AvatarFallback };
