import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

type DateInput = Date | string | number | null | undefined;

function formatDateForInput(value: DateInput, type: 'date' | 'time' | 'datetime-local'): string {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return '';

  if (type === 'date') {
    return date.toISOString().split('T')[0];
  }

  if (type === 'time') {
    return date.toTimeString().slice(0, 5);
  }

  // datetime-local
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

function parseDateFromInput(
  value: string,
  type: 'date' | 'time' | 'datetime-local'
): string | null {
  if (!value) return null;

  if (type === 'date') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : dayjs(date).format();
  }

  if (type === 'time') {
    const today = new Date();
    const [hours, minutes] = value.split(':');
    today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return dayjs(today).format();
  }

  // datetime-local
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : dayjs(date).format();
}

// ----------------------------------------------------------------------

export type RHFDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function RHFDatePicker({
  name,
  label,
  placeholder,
  helperText,
  disabled = false,
  className,
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('w-full space-y-2', className)}>
          {label && (
            <Label htmlFor={`${name}-date`} className="text-xs text-gray-400">
              {label}
            </Label>
          )}
          <Input
            id={`${name}-date`}
            type="date"
            value={formatDateForInput(field.value, 'date')}
            onChange={(e) => {
              const value = parseDateFromInput(e.target.value, 'date');
              field.onChange(value);
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && 'border-destructive')}
          />
          <HelperText errorMessage={error?.message} helperText={helperText} />
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export type RHFTimePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function RHFTimePicker({
  name,
  label,
  placeholder,
  helperText,
  disabled = false,
  className,
}: RHFTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('w-full space-y-2', className)}>
          {label && <Label htmlFor={`${name}-time`}>{label}</Label>}
          <Input
            id={`${name}-time`}
            type="time"
            value={formatDateForInput(field.value, 'time')}
            onChange={(e) => {
              const value = parseDateFromInput(e.target.value, 'time');
              field.onChange(value);
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && 'border-destructive')}
          />
          <HelperText errorMessage={error?.message} helperText={helperText} />
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export type RHFDateTimePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function RHFDateTimePicker({
  name,
  label,
  placeholder,
  helperText,
  disabled = false,
  className,
}: RHFDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('w-full space-y-2', className)}>
          {label && <Label htmlFor={`${name}-datetime`}>{label}</Label>}
          <Input
            id={`${name}-datetime`}
            type="datetime-local"
            value={formatDateForInput(field.value, 'datetime-local')}
            onChange={(e) => {
              const value = parseDateFromInput(e.target.value, 'datetime-local');
              field.onChange(value);
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && 'border-destructive')}
          />
          <HelperText errorMessage={error?.message} helperText={helperText} />
        </div>
      )}
    />
  );
}
