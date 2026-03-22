import type { Props, Value, Country } from 'react-phone-number-input/input';

// ----------------------------------------------------------------------

export type PhoneInputProps = Omit<
  Props<React.InputHTMLAttributes<HTMLInputElement>>,
  'onChange' | 'value' | 'country' | 'defaultCountry'
> & {
  value?: Value;
  onChange: (value: Value) => void;
  country?: Country;
  defaultCountry?: Country;
  hideSelect?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  label?: React.ReactNode;
  size?: 'small' | 'medium';
  className?: string;
  inputClassName?: string;
};

export type PhoneValue = Value;
export type PhoneCountry = Country;

export type CountryOption = {
  label: string;
  code: string;
  phone: string;
};

export type CountryListProps = {
  className?: string;
  disabled?: boolean;
  searchCountry: string;
  selectedCountry?: Country;
  onSearchCountry: (inputValue: string) => void;
  onSelectedCountry: (inputValue: Country) => void;
};
