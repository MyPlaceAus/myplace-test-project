import { Controller, useFormContext } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { Label } from 'src/components/ui/label';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFRadioGroupProps = {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function RHFRadioGroup({
  name,
  label,
  options,
  helperText,
  disabled = false,
  className,
}: RHFRadioGroupProps) {
  const { control } = useFormContext();

  const labelledby = `${name}-radios`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('space-y-2', className)}>
          {label && (
            <Label id={labelledby} className="mb-1 block text-xs font-medium text-gray-400">
              {label}
            </Label>
          )}

          <RadioGroup
            value={field.value ?? ''}
            onValueChange={field.onChange}
            aria-labelledby={labelledby}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${option.value}-radio`}
                  disabled={disabled}
                  aria-label={!option.label ? `${option.value} radio` : undefined}
                />
                <Label
                  htmlFor={`${option.value}-radio`}
                  className={cn(
                    'text-sm font-normal',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  )}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <HelperText disableGutters errorMessage={error?.message} helperText={helperText} />
        </div>
      )}
    />
  );
}
