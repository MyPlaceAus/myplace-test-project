import { useId, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

import { FieldError, FieldDescription } from '../ui/field';

// ----------------------------------------------------------------------

type NumberInputSlotProps = {
  wrapper?: React.ComponentProps<'div'>;
  input?: React.ComponentProps<typeof Input>;
  button?: React.ComponentProps<typeof Button>;
  inputWrapper?: React.ComponentProps<'div'>;
  captionText?: React.ComponentProps<'span'>;
  helperText?: { className?: string };
};

type EventHandler =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.ChangeEvent<HTMLInputElement>;

export type NumberInputProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  min?: number;
  max?: number;
  error?: boolean;
  disabled?: boolean;
  value?: number | null;
  hideDivider?: boolean;
  hideButtons?: boolean;
  disableInput?: boolean;
  helperText?: React.ReactNode;
  captionText?: React.ReactNode;
  slotProps?: NumberInputSlotProps;
  onChange?: (event: EventHandler, value: number) => void;
};

export function NumberInput({
  className,
  error,
  value,
  onChange,
  disabled,
  slotProps,
  helperText,
  captionText,
  hideDivider,
  hideButtons,
  disableInput,
  min = 0,
  max = 9999,
  ...other
}: NumberInputProps) {
  const uniqueId = useId();

  const currentValue = value ?? 0;

  const isDecrementDisabled = currentValue <= min || disabled;
  const isIncrementDisabled = currentValue >= max || disabled;

  const handleDecrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!isDecrementDisabled) {
        onChange?.(event, currentValue - 1);
      }
    },
    [isDecrementDisabled, onChange, currentValue]
  );

  const handleIncrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!isIncrementDisabled) {
        onChange?.(event, currentValue + 1);
      }
    },
    [isIncrementDisabled, onChange, currentValue]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const transformedValue = transformNumberOnChange(event.target.value, {
        min,
        max,
      });
      onChange?.(event, transformedValue);
    },
    [max, min, onChange]
  );

  return (
    <div {...slotProps?.wrapper}>
      <div
        className={cn('border-border flex overflow-hidden rounded-md border', className)}
        {...other}
      >
        {!hideButtons && (
          <Button
            type="button"
            variant="text"
            size="icon"
            className="h-10 w-8 shrink-0 rounded-none"
            disabled={isDecrementDisabled}
            onClick={handleDecrement}
            {...slotProps?.button}
          >
            <Minus size={16} />
          </Button>
        )}

        <div
          className={cn(
            'border-border bg-muted/40 flex flex-1 flex-col items-center justify-center border-x',
            hideDivider && 'border-x-transparent'
          )}
          {...slotProps?.inputWrapper}
        >
          <Input
            name={uniqueId}
            type="number"
            disabled={disabled || disableInput}
            value={currentValue}
            onChange={handleChange}
            aria-invalid={error || undefined}
            className="h-6 appearance-none rounded-none border-0 bg-transparent px-0 py-0 text-center text-sm font-medium shadow-none [-moz-appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...slotProps?.input}
          />

          {captionText && (
            <span
              className="text-muted-foreground -mt-0.5 flex w-full items-center justify-center gap-1 px-2 pb-1 text-center text-[11px]"
              {...slotProps?.captionText}
            >
              {captionText}
            </span>
          )}
        </div>

        {!hideButtons && (
          <Button
            type="button"
            variant="text"
            size="icon"
            className="h-10 w-8 shrink-0 rounded-none"
            disabled={isIncrementDisabled}
            onClick={handleIncrement}
            {...slotProps?.button}
          >
            <Plus size={16} />
          </Button>
        )}
      </div>

      {helperText && (
        <>
          {error ? (
            <FieldError className={cn('mt-1', slotProps?.helperText?.className)}>
              {helperText}
            </FieldError>
          ) : (
            <FieldDescription className={cn('mt-1', slotProps?.helperText?.className)}>
              {helperText}
            </FieldDescription>
          )}
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------

function transformNumberOnChange(value: string, options?: { min?: number; max?: number }): number {
  const { min = 0, max = 9999 } = options ?? {};

  if (!value || value.trim() === '') {
    return 0;
  }

  const numericValue = Number(value.trim());

  if (!Number.isNaN(numericValue)) {
    // Clamp the value between min and max
    return Math.min(Math.max(numericValue, min), max);
  }

  return 0;
}
