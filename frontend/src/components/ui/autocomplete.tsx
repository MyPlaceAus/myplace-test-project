import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  fullWidth?: boolean;
  limitTags?: number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  className?: string;
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  renderSelectedOption?: (option: AutocompleteOption) => React.ReactNode;
  getOptionLabel?: (option: AutocompleteOption) => string;
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
}

const defaultFilterOptions = (options: AutocompleteOption[], inputValue: string) => {
  if (!inputValue) return options;
  const lowerInput = inputValue.toLowerCase();
  return options.filter((option) => option.label.toLowerCase().includes(lowerInput));
};

export function Autocomplete({
  options,
  value,
  onChange,
  multiple = false,
  fullWidth = true,
  limitTags,
  placeholder = 'Select...',
  disabled = false,
  readOnly = false,
  variant = 'outlined',
  className,
  renderOption,
  renderSelectedOption,
  getOptionLabel = (option) => option.label,
  filterOptions = defaultFilterOptions,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    if (multiple && Array.isArray(value)) return value;
    if (!multiple && typeof value === 'string') return [value];
    return [];
  });

  const filteredOptions = React.useMemo(
    () => filterOptions(options, inputValue),
    [options, inputValue, filterOptions]
  );

  const triggerVariant = React.useMemo(() => {
    if (variant === 'filled') return 'contained';
    if (variant === 'standard') return 'text';
    return 'outline';
  }, [variant]);

  const handleSelect = (optionValue: string) => {
    if (disabled || readOnly) {
      return;
    }

    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues([optionValue]);
      onChange?.(optionValue);
      setOpen(false);
      setInputValue('');
    }
  };

  const handleRemove = (optionValue: string) => {
    if (disabled || readOnly) {
      return;
    }

    const newValues = selectedValues.filter((v) => v !== optionValue);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const displayValue = React.useMemo(() => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find((opt) => opt.value === selectedValues[0]);
        return option ? getOptionLabel(option) : placeholder;
      }
      return `${selectedValues.length} selected`;
    } else {
      if (selectedValues.length === 0) return placeholder;
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option ? getOptionLabel(option) : placeholder;
    }
  }, [selectedValues, options, multiple, placeholder, getOptionLabel]);

  const visibleSelectedValues = React.useMemo(() => {
    if (!multiple) {
      return selectedValues;
    }

    if (typeof limitTags !== 'number' || limitTags < 0) {
      return selectedValues;
    }

    return selectedValues.slice(0, limitTags);
  }, [limitTags, multiple, selectedValues]);

  const hiddenTagsCount = React.useMemo(() => {
    if (!multiple) {
      return 0;
    }

    if (typeof limitTags !== 'number' || limitTags < 0) {
      return 0;
    }

    return Math.max(selectedValues.length - visibleSelectedValues.length, 0);
  }, [limitTags, multiple, selectedValues.length, visibleSelectedValues.length]);

  const firstSelectedOption = React.useMemo(
    () => options.find((opt) => opt.value === selectedValues[0]),
    [options, selectedValues]
  );

  React.useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedValues(value);
    } else if (!multiple && typeof value === 'string') {
      setSelectedValues([value]);
    } else if (!value) {
      setSelectedValues([]);
    }
  }, [value, multiple]);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (readOnly) {
          return;
        }
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={triggerVariant}
          role="combobox"
          aria-expanded={open}
          className={cn(
            fullWidth ? 'w-full' : 'w-auto',
            'justify-between',
            multiple && 'h-auto min-h-11 py-1.5',
            multiple && selectedValues.length > 0 && 'items-start',
            className
          )}
          disabled={disabled || readOnly}
        >
          <div className="flex min-w-0 flex-1 flex-wrap gap-1">
            {multiple && selectedValues.length > 0 ? (
              visibleSelectedValues.map((val) => {
                const option = options.find((opt) => opt.value === val);
                if (!option) return null;
                return (
                  <Badge
                    key={val}
                    variant="info"
                    className="mr-1 max-w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                  >
                    <div className="max-w-56 min-w-0 overflow-hidden">
                      {renderSelectedOption ? (
                        renderSelectedOption(option)
                      ) : (
                        <span className="block truncate">{getOptionLabel(option)}</span>
                      )}
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="text"
                      color="black"
                      className="ml-1 h-5 w-5 rounded-full"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                    >
                      ×
                    </Button>
                  </Badge>
                );
              })
            ) : (
              <span className={cn(selectedValues.length === 0 && 'text-muted-foreground')}>
                {firstSelectedOption && renderSelectedOption
                  ? renderSelectedOption(firstSelectedOption)
                  : displayValue}
              </span>
            )}

            {multiple && hiddenTagsCount > 0 && (
              <Badge variant="secondary" className="mr-1 shrink-0">
                +{hiddenTagsCount}
              </Badge>
            )}
          </div>
          <ChevronsUpDown
            className={cn(
              'ml-2 h-4 w-4 shrink-0 opacity-50',
              multiple && selectedValues.length > 0 && 'mt-1 self-start'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-2000 overflow-hidden p-0"
        align="start"
        side="bottom"
        sideOffset={6}
        style={{
          width: 'var(--radix-popover-trigger-width)',
          maxHeight: 'min(22rem, var(--radix-popover-content-available-height, 22rem))',
        }}
      >
        <div className="max-h-inherit flex min-h-0 flex-col">
          <div className="border-b p-2">
            <Input
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => {
                if (readOnly) {
                  return;
                }
                setInputValue(e.target.value);
              }}
              readOnly={readOnly}
              className="h-9"
            />
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1"
            style={{
              maxHeight:
                'min(18rem, calc(var(--radix-popover-content-available-height, 22rem) - 3rem))',
            }}
            onWheelCapture={(event) => event.stopPropagation()}
          >
            {filteredOptions.length === 0 ? (
              <div className="text-muted-foreground py-6 text-center text-sm">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      'relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-foreground/5 hover:text-foreground',
                      isSelected && 'bg-foreground/9 hover:bg-foreground/9 text-foreground'
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                    {renderOption ? renderOption(option) : getOptionLabel(option)}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
