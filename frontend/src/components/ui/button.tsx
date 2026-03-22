import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';

import { Spinner } from 'src/components/ui/spinner';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background shadow-sm hover:bg-foreground/90 disabled:bg-border disabled:text-muted-foreground',
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover disabled:bg-border disabled:text-muted-foreground',
        contained:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover disabled:bg-border disabled:text-muted-foreground',
        destructive:
          'bg-destructive-hover text-destructive-foreground shadow-sm hover:bg-destructive disabled:bg-border disabled:text-muted-foreground',
        outline:
          'border bg-background shadow-sm disabled:border-input disabled:bg-muted disabled:text-muted-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover disabled:bg-border disabled:text-muted-foreground',
        soft: 'bg-muted text-foreground shadow-sm hover:bg-muted/80 disabled:bg-border disabled:text-muted-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        text: 'hover:bg-accent/50 disabled:text-muted-foreground disabled:hover:bg-transparent',
        link: 'underline-offset-4 hover:underline disabled:text-muted-foreground disabled:no-underline',
      },
      color: {
        inherit: '',
        primary: '',
        secondary: '',
        info: '',
        success: '',
        warning: '',
        error: '',
        black: '',
        white: '',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-4 text-xs',
        md: 'h-11 px-6 py-2',
        lg: 'h-12 rounded-lg px-8',
        xl: 'h-14 rounded-lg px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'inherit',
        className:
          'bg-foreground text-background shadow-sm hover:bg-foreground/90 disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'primary',
        className:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'secondary',
        className:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'info',
        className:
          'bg-info text-info-foreground shadow-sm hover:bg-info/90 disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'success',
        className:
          'bg-success text-success-foreground shadow-sm hover:bg-success/90 disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'warning',
        className:
          'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'error',
        className:
          'bg-destructive-hover text-destructive-foreground shadow-sm hover:bg-destructive disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'black',
        className:
          'bg-foreground text-background shadow-sm hover:bg-foreground/90 disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'contained',
        color: 'white',
        className:
          'border border-input bg-background text-foreground shadow-sm hover:bg-muted disabled:bg-border disabled:text-muted-foreground',
      },
      {
        variant: 'outline',
        color: 'inherit',
        className:
          'border-input text-foreground hover:border-foreground hover:bg-transparent hover:text-foreground',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-primary text-primary hover:bg-primary/10 hover:text-primary',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'border-info text-info hover:bg-info/10 hover:text-info',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'border-success text-success hover:bg-success/10 hover:text-success',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'border-warning text-warning hover:bg-warning/10 hover:text-warning',
      },
      {
        variant: 'outline',
        color: 'error',
        className:
          'border-destructive-hover text-destructive-hover hover:bg-destructive/10 hover:text-destructive-hover',
      },
      {
        variant: 'outline',
        color: 'black',
        className: 'border-foreground text-foreground hover:bg-foreground/10 hover:text-foreground',
      },
      {
        variant: 'outline',
        color: 'white',
        className: 'border-background text-background hover:bg-background/10 hover:text-background',
      },
      {
        variant: 'soft',
        color: 'inherit',
        className: 'bg-muted text-foreground hover:bg-muted/80',
      },
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-primary/15 text-primary hover:bg-primary/20',
      },
      {
        variant: 'soft',
        color: 'secondary',
        className: 'bg-secondary/15 text-secondary hover:bg-secondary/20',
      },
      {
        variant: 'soft',
        color: 'info',
        className: 'bg-info/15 text-info hover:bg-info/20',
      },
      {
        variant: 'soft',
        color: 'success',
        className: 'bg-success/15 text-success hover:bg-success/20',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'bg-warning/20 text-warning hover:bg-warning/25',
      },
      {
        variant: 'soft',
        color: 'error',
        className: 'bg-destructive/20 text-destructive-hover hover:bg-destructive/25',
      },
      {
        variant: 'soft',
        color: 'black',
        className: 'bg-foreground/15 text-foreground hover:bg-foreground/20',
      },
      {
        variant: 'soft',
        color: 'white',
        className: 'bg-background text-background hover:bg-background/90',
      },
      {
        variant: 'text',
        color: 'inherit',
        className:
          'text-foreground hover:bg-foreground/10 hover:text-foreground active:bg-foreground/15',
      },
      {
        variant: 'text',
        color: 'primary',
        className: 'text-primary hover:bg-primary/15 hover:text-primary active:bg-primary/20',
      },
      {
        variant: 'text',
        color: 'secondary',
        className:
          'text-secondary hover:bg-secondary/15 hover:text-secondary active:bg-secondary/20',
      },
      {
        variant: 'text',
        color: 'info',
        className: 'text-info hover:bg-info/15 hover:text-info active:bg-info/20',
      },
      {
        variant: 'text',
        color: 'success',
        className: 'text-success hover:bg-success/15 hover:text-success active:bg-success/20',
      },
      {
        variant: 'text',
        color: 'warning',
        className: 'text-warning hover:bg-warning/20 hover:text-warning active:bg-warning/25',
      },
      {
        variant: 'text',
        color: 'error',
        className:
          'text-destructive-hover hover:bg-destructive/15 hover:text-destructive-hover active:bg-destructive/20',
      },
      {
        variant: 'text',
        color: 'black',
        className:
          'text-foreground hover:bg-foreground/10 hover:text-foreground active:bg-foreground/15',
      },
      {
        variant: 'text',
        color: 'white',
        className:
          'text-background hover:bg-background/20 hover:text-background active:bg-background/30',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'inherit',
        className: 'rounded-full hover:bg-foreground/10 active:bg-foreground/15',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'black',
        className: 'rounded-full hover:bg-foreground/10 active:bg-foreground/15',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'primary',
        className: 'rounded-full hover:bg-primary/15 active:bg-primary/20',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'secondary',
        className: 'rounded-full hover:bg-secondary/15 active:bg-secondary/20',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'info',
        className: 'rounded-full hover:bg-info/15 active:bg-info/20',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'success',
        className: 'rounded-full hover:bg-success/15 active:bg-success/20',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'warning',
        className: 'rounded-full hover:bg-warning/20 active:bg-warning/25',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'error',
        className: 'rounded-full hover:bg-destructive/15 active:bg-destructive/20',
      },
      {
        variant: 'text',
        size: 'icon',
        color: 'white',
        className: 'rounded-full hover:bg-background/20 active:bg-background/30',
      },
      {
        variant: 'link',
        color: 'inherit',
        className: 'text-foreground',
      },
      {
        variant: 'link',
        color: 'primary',
        className: 'text-primary',
      },
      {
        variant: 'link',
        color: 'secondary',
        className: 'text-secondary',
      },
    ],
    defaultVariants: {
      variant: 'text',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      loading = false,
      icon,
      iconPosition = 'start',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const buttonContent = (
      <>
        {loading && iconPosition === 'start' ? <Spinner size={16} /> : null}
        {!loading && icon && iconPosition === 'start' ? (
          <span className="inline-flex items-center text-current">{icon}</span>
        ) : null}
        {children}
        {!loading && icon && iconPosition === 'end' ? (
          <span className="inline-flex items-center text-current">{icon}</span>
        ) : null}
        {loading && iconPosition === 'end' ? <Spinner size={16} /> : null}
      </>
    );

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<
        React.HTMLAttributes<HTMLElement>
      >;
      const childContent = (
        <>
          {loading && iconPosition === 'start' ? <Spinner size={16} /> : null}
          {!loading && icon && iconPosition === 'start' ? (
            <span className="inline-flex items-center text-current">{icon}</span>
          ) : null}
          {child.props.children}
          {!loading && icon && iconPosition === 'end' ? (
            <span className="inline-flex items-center text-current">{icon}</span>
          ) : null}
          {loading && iconPosition === 'end' ? <Spinner size={16} /> : null}
        </>
      );

      return (
        <Comp
          className={cn(buttonVariants({ variant, color, size }), className)}
          ref={ref}
          disabled={loading || disabled}
          {...props}
        >
          {React.cloneElement(child, { children: childContent })}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size }), className)}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {buttonContent}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
