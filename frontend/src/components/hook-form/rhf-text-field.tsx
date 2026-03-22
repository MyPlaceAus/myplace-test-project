import { Controller, useFormContext } from 'react-hook-form';
import {
  transformValue,
  transformValueOnBlur,
  transformValueOnChange,
} from 'src/utils/transform-number';
import { cn } from 'src/lib/utils';
import { Field, FieldLabel, FieldError, FieldContent } from 'src/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from 'src/components/ui/input-group';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  helperText?: React.ReactNode;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
  /** Disables the focus-visible ring on the surrounding InputGroup wrapper. */
  disableFocusRing?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  slotProps?: {
    inputLabel?: { shrink?: boolean };
    input?: {
      endAdornment?: React.ReactNode;
      startAdornment?: React.ReactNode;
    };
  };
} & React.InputHTMLAttributes<HTMLInputElement>;

export function RHFTextField({
  name,
  label,
  helperText,
  slotProps,
  type = 'text',
  className,
  fieldClassName,
  inputClassName,
  disableFocusRing,
  startIcon,
  endIcon,
  placeholder,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  const isNumberType = type === 'number';
  const hasStartIcon = startIcon || slotProps?.input?.startAdornment;
  const hasEndIcon = endIcon || slotProps?.input?.endAdornment;

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
            <InputGroup
              className={cn(
                'has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/25',
                'has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive',
                'has-[[data-slot=input-group-control][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]:focus-visible]:ring-destructive/25',
                error && 'border-destructive',
                disableFocusRing &&
                  'has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-transparent',
                className
              )}
            >
              {hasStartIcon && (
                <InputGroupAddon align="inline-start">
                  {startIcon || slotProps?.input?.startAdornment}
                </InputGroupAddon>
              )}
              <InputGroupInput
                {...field}
                id={name}
                value={isNumberType ? transformValue(field.value) : (field.value ?? '')}
                onChange={(event) => {
                  const transformedValue = isNumberType
                    ? transformValueOnChange(event.target.value)
                    : event.target.value;

                  field.onChange(transformedValue);
                }}
                onBlur={(event) => {
                  const transformedValue = isNumberType
                    ? transformValueOnBlur(event.target.value)
                    : event.target.value;

                  field.onChange(transformedValue);
                }}
                type={isNumberType ? 'text' : type}
                placeholder={placeholder}
                className={inputClassName}
                inputMode={isNumberType ? 'decimal' : undefined}
                pattern={isNumberType ? '[0-9]*\\.?[0-9]*' : undefined}
                autoComplete="new-password"
                aria-invalid={!!error}
                {...other}
              />
              {hasEndIcon && (
                <InputGroupAddon align="inline-end">
                  {endIcon || slotProps?.input?.endAdornment}
                </InputGroupAddon>
              )}
            </InputGroup>
            {error && <FieldError errors={[error]} />}
            {helperText && !error && <HelperText helperText={helperText} disableGutters />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
