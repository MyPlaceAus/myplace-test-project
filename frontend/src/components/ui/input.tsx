import * as React from 'react';

import { cn } from 'src/lib/utils';

type InputVisualVariant = 'outlined' | 'filled' | 'standard';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  visualVariant?: InputVisualVariant;
}

const inputVariantClasses: Record<InputVisualVariant, string> = {
  outlined:
    'border-input bg-background focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:ring-offset-0',
  filled:
    'border-transparent bg-muted hover:brightness-95 focus-visible:bg-muted focus-visible:brightness-95 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-muted disabled:brightness-93 disabled:text-muted-foreground disabled:placeholder:text-muted-foreground disabled:opacity-100',
  standard:
    'rounded-none border-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-ring',
};

const inputInvalidClasses =
  'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25';

const inputFilledInvalidClasses =
  'aria-invalid:border-transparent aria-invalid:bg-destructive/10 aria-invalid:hover:bg-destructive/15 aria-invalid:focus:bg-destructive/15 aria-invalid:focus-visible:bg-destructive/15 aria-invalid:focus-visible:ring-0';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, visualVariant = 'outlined', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        inputVariantClasses[visualVariant],
        visualVariant === 'filled' ? inputFilledInvalidClasses : inputInvalidClasses,
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
