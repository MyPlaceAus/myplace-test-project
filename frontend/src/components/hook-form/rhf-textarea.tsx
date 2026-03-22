import { Controller, useFormContext } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { Textarea } from 'src/components/ui/textarea';
import { Field, FieldLabel, FieldError, FieldContent } from 'src/components/ui/field';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFTextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
  slotProps?: {
    inputLabel?: { shrink?: boolean };
  };
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function RHFTextArea({
  name,
  label,
  helperText,
  slotProps,
  className,
  fieldClassName,
  inputClassName,
  placeholder,
  rows = 2,
  ...other
}: RHFTextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field data-invalid={!!error} className={fieldClassName}>
          {label && (
            <FieldLabel
              htmlFor={name}
              className={cn(slotProps?.inputLabel?.shrink && 'text-xs', 'text-xs text-gray-400')}
            >
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            <Textarea
              {...field}
              id={name}
              value={field.value ?? ''}
              placeholder={placeholder}
              rows={rows}
              className={cn(
                error && 'border-destructive',
                error && 'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
                'resize-none',
                inputClassName,
                className
              )}
              aria-invalid={!!error}
              {...other}
            />
            {error && <FieldError errors={[error]} />}
            {helperText && !error && <HelperText helperText={helperText} disableGutters />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
