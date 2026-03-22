import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errorMessage?: string;
  disableGutters?: boolean;
  helperText?: React.ReactNode;
};

export function HelperText({
  className,
  helperText,
  errorMessage,
  disableGutters = false,
  ...other
}: HelperTextProps) {
  const message = errorMessage ?? helperText;

  if (!message) {
    return null;
  }

  return (
    <p
      className={cn(
        'text-sm',
        errorMessage ? 'text-destructive' : 'text-muted-foreground',
        !disableGutters && 'mx-1.5',
        className
      )}
      {...other}
    >
      {errorMessage || helperText}
    </p>
  );
}
