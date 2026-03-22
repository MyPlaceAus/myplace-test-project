import type { PhoneValue, PhoneCountry, PhoneInputProps } from './types';

import { X } from 'lucide-react';
import { useId, useMemo, useState, startTransition } from 'react';
import PhoneNumberInput, { parsePhoneNumber } from 'react-phone-number-input/input';

import { cn } from 'src/lib/utils';

import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

import { CountryListPopover } from './list-popover';

// ----------------------------------------------------------------------

export function PhoneInput({
  size,
  error,
  label,
  placeholder,
  fullWidth = true,
  /********/
  value,
  country,
  onChange,
  defaultCountry,
  /********/
  hideSelect,
  className,
  inputClassName,
  id,
  ...other
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const normalizedValue = value ? (value.trim().replace(/[\s-]+/g, '') as PhoneValue) : undefined;

  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountry | undefined>(
    parseCountryFromPhone(normalizedValue) ?? country ?? defaultCountry
  );

  const isCountryLocked = !!country;

  const activeCountry = useMemo(() => {
    const parsedCountry = parseCountryFromPhone(normalizedValue);
    return parsedCountry ?? country ?? selectedCountry ?? defaultCountry;
  }, [country, selectedCountry, normalizedValue, defaultCountry]);

  const handleChangeInput = (inputValue: PhoneValue) => {
    startTransition(() => {
      onChange(inputValue);
    });
  };

  const handleClearInput = () => {
    handleChangeInput('' as PhoneValue);
  };

  const inputSizeClass = size === 'small' ? 'h-9 text-xs' : 'h-10';

  return (
    <div className={cn('relative', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-xs text-gray-400">
          {label}
        </label>
      )}

      {!hideSelect && (
        <CountryListPopover
          searchCountry={searchCountry}
          selectedCountry={activeCountry}
          onSearchCountry={setSearchCountry}
          onSelectedCountry={(countryCode) => {
            setSearchCountry('');
            handleClearInput();
            setSelectedCountry(countryCode);
          }}
          disabled={isCountryLocked}
          className={cn(label && 'top-[calc(50%+10px)]')}
        />
      )}

      <PhoneNumberInput
        {...other}
        id={inputId}
        aria-invalid={error || undefined}
        value={normalizedValue}
        onChange={handleChangeInput}
        placeholder={placeholder ?? 'Enter phone number'}
        inputComponent={CustomInput}
        inputClassName={cn(
          inputSizeClass,
          !hideSelect && 'pl-14',
          normalizedValue && 'pr-10',
          error && 'border-destructive focus-visible:ring-destructive/25',
          inputClassName
        )}
        {...(isCountryLocked ? { country: activeCountry } : { defaultCountry: activeCountry })}
      />

      {!!normalizedValue && (
        <Button
          type="button"
          variant="text"
          color="inherit"
          size="icon"
          onClick={handleClearInput}
          className={cn(
            'absolute right-1 z-10 h-8 w-8 text-muted-foreground hover:text-foreground',
            label ? 'top-[calc(50%+10px)] -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
          )}
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string;
};

const CustomInput = ({ inputClassName, ...other }: CustomInputProps) => (
  <Input {...other} className={cn(inputClassName, other.className)} />
);

// ----------------------------------------------------------------------

function parseCountryFromPhone(inputValue?: PhoneInputProps['value']): PhoneCountry | undefined {
  const parsed = inputValue ? parsePhoneNumber(inputValue) : undefined;
  return parsed?.country ?? undefined;
}
