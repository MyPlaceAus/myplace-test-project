import * as React from 'react';
import { cn } from 'src/lib/utils';

type TextareaVisualVariant = 'outlined' | 'filled' | 'standard';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  visualVariant?: TextareaVisualVariant;
}

const textareaVariantClasses: Record<TextareaVisualVariant, string> = {
  outlined:
    'border-input bg-background focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:ring-offset-0',
  filled:
    'border-transparent bg-muted hover:brightness-95 focus-visible:bg-muted focus-visible:brightness-95 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-muted disabled:brightness-93 disabled:text-muted-foreground disabled:placeholder:text-muted-foreground disabled:opacity-100',
  standard:
    'rounded-none border-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-ring',
};

const textareaInvalidClasses =
  'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25';

const textareaFilledInvalidClasses =
  'aria-invalid:border-transparent aria-invalid:bg-destructive/10 aria-invalid:hover:bg-destructive/15 aria-invalid:focus:bg-destructive/15 aria-invalid:focus-visible:bg-destructive/15 aria-invalid:focus-visible:ring-0';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, visualVariant = 'outlined', ...props }, ref) => (
    <textarea
      className={cn(
        'placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-15 w-full rounded-md border px-3 py-2 text-base shadow-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        textareaVariantClasses[visualVariant],
        visualVariant === 'filled' ? textareaFilledInvalidClasses : textareaInvalidClasses,
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export { Textarea };
