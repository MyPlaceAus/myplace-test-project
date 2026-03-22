import { Controller, useFormContext } from 'react-hook-form';

import { cn } from 'src/lib/utils';
import { Label } from 'src/components/ui/label';
import { Autocomplete } from 'src/components/ui/autocomplete';
import type { AutocompleteOption } from 'src/components/ui/autocomplete';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: AutocompleteOption[];
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  getOptionLabel?: (option: AutocompleteOption) => string;
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
};

export function RHFAutocomplete({
  name,
  label,
  helperText,
  placeholder,
  options,
  multiple = false,
  disabled = false,
  className,
  getOptionLabel,
  filterOptions,
}: RHFAutocompleteProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('w-full space-y-2', className)}>
          {label && (
            <Label htmlFor={`${name}-autocomplete`} className="text-xs text-gray-400">
              {label}
            </Label>
          )}
          <Autocomplete
            options={options}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            multiple={multiple}
            placeholder={placeholder}
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            className={cn(error && 'border-destructive')}
          />
          <HelperText errorMessage={error?.message} helperText={helperText} />
        </div>
      )}
    />
  );
}
