import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { Badge } from 'src/components/ui/badge';
import { CheckboxRoot } from 'src/components/ui/checkbox';
import { ScrollArea } from 'src/components/ui/scroll-area';
import { Field, FieldLabel, FieldError, FieldContent } from 'src/components/ui/field';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from 'src/components/ui/select';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFSelectProps = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  placeholderClassName?: string;
  labelClassName?: string;
  helperText?: React.ReactNode;
  children?: React.ReactNode;
  options?: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  native?: boolean;
};

export function RHFSelect({
  name,
  label,
  helperText,
  children,
  options,
  disabled = false,
  placeholder = 'Select...',
  placeholderClassName = 'text-gray-400 italic',
  labelClassName = '',
  className,
  triggerClassName,
  native = false,
}: RHFSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-select`;

  const placeholderNode = placeholderClassName ? (
    <span className={placeholderClassName} id="dd">
      {placeholder}
    </span>
  ) : (
    placeholder
  );

  const hasOptions = Array.isArray(options) && options.length > 0;
  const optionCount = hasOptions ? options.length : React.Children.count(children);
  const shouldScrollOptions = optionCount > 8;
  const renderedOptions = hasOptions
    ? options.map((option) => (
        <SelectItem key={option.value} value={option.value} className="truncate">
          {option.label}
        </SelectItem>
      ))
    : children;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field data-invalid={!!error} data-disabled={disabled} className={cn(className)}>
          {label && (
            <FieldLabel htmlFor={labelId} className={cn('text-xs text-gray-400', labelClassName)}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            {native ? (
              <select
                id={labelId}
                {...field}
                disabled={disabled}
                aria-invalid={!!error}
                className={cn(
                  'border-input focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                  error && 'border-destructive',
                  className
                )}
              >
                {placeholder && (
                  <option
                    value=""
                    disabled
                    className={cn('text-xs text-gray-400', placeholderClassName)}
                  >
                    {placeholder}
                  </option>
                )}
                {children}
              </select>
            ) : (
              <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={disabled}>
                <SelectTrigger
                  id={labelId}
                  className={cn(error && 'border-destructive', triggerClassName)}
                >
                  <SelectValue placeholder={placeholderNode} />
                </SelectTrigger>
                <SelectContent
                  className={cn(
                    shouldScrollOptions && 'w-(--radix-select-trigger-width) overflow-hidden'
                  )}
                >
                  {shouldScrollOptions ? (
                    <ScrollArea className="h-60 w-full">
                      <div className="p-1">{renderedOptions}</div>
                    </ScrollArea>
                  ) : (
                    renderedOptions
                  )}
                </SelectContent>
              </Select>
            )}

            {error && <FieldError errors={[error]} />}
            {helperText && !error && <HelperText helperText={helperText} disableGutters />}
          </FieldContent>
        </Field>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export type RHFMultiSelectProps = {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
};

export function RHFMultiSelect({
  name,
  chip = false,
  label,
  options,
  checkbox = false,
  placeholder,
  helperText,
  disabled = false,
  className,
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-multi-select`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];
        const selectedItems = options.filter((item) => selectedValues.includes(item.value));

        const handleSelect = (value: string) => {
          const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
          field.onChange(newValues);
        };

        const shouldScrollOptions = options.length > 8;

        return (
          <Field data-invalid={!!error} data-disabled={disabled} className={cn(className)}>
            {label && <FieldLabel htmlFor={labelId}>{label}</FieldLabel>}
            <FieldContent>
              <Select
                value={selectedValues.length > 0 ? selectedValues[0] : ''}
                onValueChange={handleSelect}
                disabled={disabled}
              >
                <SelectTrigger
                  id={labelId}
                  className={cn(error && 'border-destructive', 'h-auto min-h-10 py-2')}
                >
                  <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
                    {selectedItems.length === 0 ? (
                      <span className="text-muted-foreground">{placeholder || 'Select...'}</span>
                    ) : chip ? (
                      selectedItems.map((item) => (
                        <Badge key={item.value} variant="secondary" className="mr-1">
                          {item.label}
                        </Badge>
                      ))
                    ) : (
                      <span className="truncate">
                        {selectedItems.map((item) => item.label).join(', ')}
                      </span>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent
                  className={cn(
                    shouldScrollOptions && 'w-(--radix-select-trigger-width) overflow-hidden'
                  )}
                >
                  {shouldScrollOptions ? (
                    <ScrollArea className="h-60 w-full">
                      <div className="p-1">
                        {options.map((option) => {
                          const isSelected = selectedValues.includes(option.value);
                          return (
                            <div
                              key={option.value}
                              className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 transition-colors"
                              onClick={() => handleSelect(option.value)}
                            >
                              {checkbox && (
                                <CheckboxRoot
                                  checked={isSelected}
                                  onCheckedChange={() => handleSelect(option.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <span className="flex-1 capitalize">{option.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  ) : (
                    options.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <div
                          key={option.value}
                          className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 transition-colors"
                          onClick={() => handleSelect(option.value)}
                        >
                          {checkbox && (
                            <CheckboxRoot
                              checked={isSelected}
                              onCheckedChange={() => handleSelect(option.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                          <span className="flex-1 capitalize">{option.label}</span>
                        </div>
                      );
                    })
                  )}
                </SelectContent>
              </Select>

              {error && <FieldError errors={[error]} />}
              {helperText && !error && <HelperText helperText={helperText} disableGutters />}
            </FieldContent>
          </Field>
        );
      }}
    />
  );
}
