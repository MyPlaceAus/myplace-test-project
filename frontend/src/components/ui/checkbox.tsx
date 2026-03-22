import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { Label } from 'src/components/ui/label';

const checkboxVariants = cva(
  'peer shrink-0 cursor-pointer rounded-sm border ring-offset-background transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-100 disabled:border-border disabled:data-[state=checked]:border-border disabled:data-[state=checked]:bg-muted-foreground/60 disabled:data-[state=checked]:text-background disabled:data-[state=indeterminate]:border-border disabled:data-[state=indeterminate]:bg-muted-foreground/60 disabled:data-[state=indeterminate]:text-background',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-4.5 w-4.5',
      },
      color: {
        default:
          'border-muted-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background data-[state=indeterminate]:bg-foreground data-[state=indeterminate]:text-background',
        primary:
          'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        secondary:
          'border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:text-secondary-foreground',
        info: 'border-info data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=indeterminate]:bg-info data-[state=indeterminate]:text-info-foreground',
        success:
          'border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:bg-success data-[state=indeterminate]:text-success-foreground',
        warning:
          'border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:bg-warning data-[state=indeterminate]:text-warning-foreground',
        error:
          'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:text-destructive-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

type CheckboxRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'color'
> &
  VariantProps<typeof checkboxVariants> & {
    variant?: 'default' | 'icon';
    disableHoverEffect?: boolean;
    disableRipple?: boolean;
    indeterminate?: boolean;
    icon?: React.ReactNode;
    checkedIcon?: React.ReactNode;
    indeterminateIcon?: React.ReactNode;
    indicatorClassName?: string;
  };

type CheckboxProps = Omit<CheckboxRootProps, 'onCheckedChange'> & {
  id: string;
  label?: React.ReactNode;
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  containerClassName?: string;
  labelClassName?: string;
  onCheckedChange?: (checkedValue: boolean) => void;
};

const CheckboxRoot = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxRootProps
>(
  (
    {
      className,
      size = 'md',
      color,
      variant = 'default',
      disableHoverEffect = false,
      disableRipple = false,
      indeterminate = false,
      icon,
      checkedIcon,
      indeterminateIcon,
      indicatorClassName,
      checked,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<
      Array<{ id: number; x: number; y: number; size: number; active: boolean }>
    >([]);
    const rippleIdRef = React.useRef(0);

    const iconSizeClass = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';
    const iconButtonSizeClass = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
    const iconGlyphSizeClass =
      size === 'sm'
        ? '[&_svg]:size-4'
        : size === 'lg'
          ? '[&_svg]:size-[22px]'
          : '[&_svg]:size-[18px]';
    const interactionCircleSizeClass =
      variant === 'icon'
        ? size === 'sm'
          ? 'h-6 w-6'
          : size === 'lg'
            ? 'h-10 w-10'
            : 'h-8 w-8'
        : size === 'sm'
          ? 'h-7 w-7'
          : size === 'lg'
            ? 'h-9 w-9'
            : 'h-8 w-8';
    const interactionCircleSize =
      variant === 'icon'
        ? size === 'sm'
          ? 24
          : size === 'lg'
            ? 40
            : 32
        : size === 'sm'
          ? 28
          : size === 'lg'
            ? 36
            : 32;

    const checkedState: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>['checked'] =
      indeterminate ? 'indeterminate' : checked;
    const isIndeterminate = checkedState === 'indeterminate';

    const currentCheckedIcon = isIndeterminate
      ? (indeterminateIcon ?? checkedIcon ?? <Minus className={iconSizeClass} />)
      : (checkedIcon ?? <Check className={iconSizeClass} />);

    const iconVariantBaseClass =
      variant === 'icon'
        ? cn(
            iconButtonSizeClass,
            'cursor-pointer rounded-full border-transparent bg-transparent text-muted-foreground transition-colors disabled:cursor-not-allowed data-[state=checked]:border-transparent data-[state=checked]:bg-transparent data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-transparent'
          )
        : '';

    const iconVariantColorClass =
      variant === 'icon'
        ? {
            default:
              'data-[state=checked]:text-foreground data-[state=indeterminate]:text-foreground',
            primary: 'data-[state=checked]:text-primary data-[state=indeterminate]:text-primary',
            secondary:
              'data-[state=checked]:text-secondary data-[state=indeterminate]:text-secondary',
            info: 'data-[state=checked]:text-info data-[state=indeterminate]:text-info',
            success: 'data-[state=checked]:text-success data-[state=indeterminate]:text-success',
            warning: 'data-[state=checked]:text-warning data-[state=indeterminate]:text-warning',
            error:
              'data-[state=checked]:text-destructive data-[state=indeterminate]:text-destructive',
          }[color ?? 'primary']
        : '';

    const hoverOverlayColorClass = {
      default: 'bg-foreground/10',
      primary: 'bg-primary/15',
      secondary: 'bg-secondary/15',
      info: 'bg-info/15',
      success: 'bg-success/15',
      warning: 'bg-warning/20',
      error: 'bg-destructive/15',
    }[color ?? 'primary'];

    const handlePointerDown: React.PointerEventHandler<HTMLButtonElement> = (event) => {
      onPointerDown?.(event);

      if (disableRipple || props.disabled || event.defaultPrevented) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const circleLeft = rect.left + (rect.width - interactionCircleSize) / 2;
      const circleTop = rect.top + (rect.height - interactionCircleSize) / 2;
      const sizeValue = interactionCircleSize * 1.8;
      const x = event.clientX - circleLeft - sizeValue / 2;
      const y = event.clientY - circleTop - sizeValue / 2;
      const id = ++rippleIdRef.current;

      setRipples((prev) => [...prev, { id, x, y, size: sizeValue, active: false }]);

      requestAnimationFrame(() => {
        setRipples((prev) =>
          prev.map((item) => (item.id === id ? { ...item, active: true } : item))
        );
      });

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, 450);
    };

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'group/checkbox relative inline-flex items-center justify-center overflow-visible',
          checkboxVariants({ size, color }),
          iconVariantBaseClass,
          iconVariantColorClass,
          className
        )}
        checked={checkedState}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {!disableHoverEffect ? (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-200',
              interactionCircleSizeClass,
              hoverOverlayColorClass,
              'group-hover/checkbox:opacity-100 group-active/checkbox:opacity-100 group-data-disabled/checkbox:opacity-0'
            )}
          />
        ) : null}

        {!disableRipple ? (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full',
              interactionCircleSizeClass
            )}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full bg-current/25"
                style={{
                  width: ripple.size,
                  height: ripple.size,
                  left: ripple.x,
                  top: ripple.y,
                  transform: ripple.active ? 'scale(1)' : 'scale(0)',
                  opacity: ripple.active ? 0 : 0.35,
                  transition: 'transform 420ms ease-out, opacity 420ms ease-out',
                }}
              />
            ))}
          </span>
        ) : null}

        {icon ? (
          <span
            className={cn(
              'pointer-events-none absolute inset-0 flex items-center justify-center text-current transition-[opacity,transform] duration-200 ease-out',
              iconGlyphSizeClass,
              'group-data-[state=checked]/checkbox:scale-75 group-data-[state=checked]/checkbox:opacity-0 group-data-[state=indeterminate]/checkbox:scale-75 group-data-[state=indeterminate]/checkbox:opacity-0'
            )}
            aria-hidden
          >
            <span className="flex items-center justify-center leading-none">{icon}</span>
          </span>
        ) : null}

        <CheckboxPrimitive.Indicator
          className={cn(
            'flex items-center justify-center leading-none text-current transition-[opacity,transform] duration-200 ease-out group-data-[state=unchecked]/checkbox:scale-75 group-data-[state=unchecked]/checkbox:opacity-0 group-data-[state=checked]/checkbox:scale-100 group-data-[state=checked]/checkbox:opacity-100 group-data-[state=indeterminate]/checkbox:scale-100 group-data-[state=indeterminate]/checkbox:opacity-100',
            variant === 'icon' && iconGlyphSizeClass,
            indicatorClassName
          )}
        >
          <span className="flex items-center justify-center leading-none">
            {currentCheckedIcon}
          </span>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
CheckboxRoot.displayName = CheckboxPrimitive.Root.displayName;

function Checkbox({
  id,
  label,
  labelPlacement = 'end',
  variant = 'default',
  className,
  labelClassName,
  containerClassName,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const placementClass =
    (labelPlacement === 'top' && 'flex-col-reverse') ||
    (labelPlacement === 'bottom' && 'flex-col') ||
    (labelPlacement === 'start' && 'flex-row-reverse') ||
    'flex-row';

  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'icon' ? 'gap-0.5' : 'gap-2',
        placementClass,
        containerClassName
      )}
    >
      <CheckboxRoot
        id={id}
        variant={variant}
        className={className}
        onCheckedChange={(next) => onCheckedChange?.(next === true)}
        {...props}
      />
      {label ? (
        <Label
          htmlFor={id}
          className={cn(
            'text-sm',
            props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            labelClassName
          )}
        >
          {label}
        </Label>
      ) : null}
    </div>
  );
}

const CheckboxField = Checkbox;

export { Checkbox, CheckboxRoot, CheckboxField, checkboxVariants };
export type { CheckboxProps, CheckboxRootProps };
