import * as React from 'react';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from 'src/lib/utils';

const radioItemVariants = cva(
  'aspect-square rounded-full border shadow transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'h-3.5 w-3.5',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
      },
      color: {
        default: 'border-primary text-primary',
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        info: 'border-info text-info',
        success: 'border-success text-success',
        warning: 'border-warning text-warning',
        error: 'border-destructive text-destructive',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'default',
    },
  }
);

const radioIndicatorVariants = cva('fill-current', {
  variants: {
    size: {
      small: 'h-2.5 w-2.5',
      medium: 'h-3.5 w-3.5',
      large: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioItemVariants>;

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, color, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioItemVariants({ size, color }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className={cn(radioIndicatorVariants({ size }))} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
