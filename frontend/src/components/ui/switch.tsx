import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { Label } from './label';

const switchVariants = cva(
  'peer focus-visible:ring-ring focus-visible:ring-offset-background inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'h-4 w-7',
        medium: 'h-5 w-9',
        large: 'h-6 w-11',
      },
      color: {
        inherit: 'data-[state=checked]:bg-foreground data-[state=unchecked]:bg-input',
        default: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        primary: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        secondary: 'data-[state=checked]:bg-secondary data-[state=unchecked]:bg-input',
        info: 'data-[state=checked]:bg-info data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-success data-[state=unchecked]:bg-input',
        warning: 'data-[state=checked]:bg-warning data-[state=unchecked]:bg-input',
        error: 'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  }
);

const thumbVariants = cva(
  'bg-background pointer-events-none block rounded-full shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        small: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        medium: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        large: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  VariantProps<typeof switchVariants> & {
    label?: React.ReactNode;
    labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
    labelClassName?: string;
    wrapperClassName?: string;
  };

const labelPlacementClassMap: Record<NonNullable<SwitchProps['labelPlacement']>, string> = {
  top: 'flex-col-reverse',
  start: 'flex-row-reverse',
  bottom: 'flex-col',
  end: 'flex-row',
};

const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  (
    {
      className,
      size,
      color,
      id,
      disabled,
      label,
      labelPlacement = 'end',
      labelClassName,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;

    const switchControl = (
      <SwitchPrimitives.Root
        id={switchId}
        disabled={disabled}
        className={cn(switchVariants({ size, color }), className)}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))} />
      </SwitchPrimitives.Root>
    );

    if (!label) {
      return switchControl;
    }

    return (
      <div
        className={cn(
          'inline-flex items-center gap-2',
          labelPlacementClassMap[labelPlacement],
          disabled && 'cursor-not-allowed opacity-50',
          wrapperClassName
        )}
      >
        {switchControl}
        <Label
          htmlFor={switchId}
          className={cn(
            'font-normal capitalize',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            labelClassName
          )}
        >
          {label}
        </Label>
      </div>
    );
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
