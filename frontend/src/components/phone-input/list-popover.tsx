import type { PhoneCountry, CountryOption, CountryListProps } from './types';

import { useMemo, useState } from 'react';
import { X, Check, Search, ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';

import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { ScrollArea } from 'src/components/ui/scroll-area';
import { SearchNotFound } from 'src/components/search-not-found';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';

// ----------------------------------------------------------------------

const COUNTRY_OPTIONS = [
  { label: 'Australia', code: 'AU', phone: '61' },
  { label: 'New Zealand', code: 'NZ', phone: '64' },
  { label: 'United States', code: 'US', phone: '1' },
  { label: 'Canada', code: 'CA', phone: '1' },
  { label: 'United Kingdom', code: 'GB', phone: '44' },
  { label: 'Singapore', code: 'SG', phone: '65' },
  { label: 'Japan', code: 'JP', phone: '81' },
  { label: 'Germany', code: 'DE', phone: '49' },
  { label: 'France', code: 'FR', phone: '33' },
  { label: 'India', code: 'IN', phone: '91' },
  { label: 'China', code: 'CN', phone: '86' },
] as const;

export function CountryListPopover({
  className,
  disabled,
  searchCountry,
  selectedCountry,
  onSearchCountry,
  onSelectedCountry,
}: CountryListProps) {
  const [open, setOpen] = useState(false);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: COUNTRY_OPTIONS,
        query: searchCountry,
      }),
    [searchCountry]
  );

  const notFound = dataFiltered.length === 0 && !!searchCountry;
  const selected = COUNTRY_OPTIONS.find((country) => country.code === selectedCountry);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          onSearchCountry('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="text"
          color="inherit"
          size="sm"
          disabled={disabled}
          className={cn(
            'absolute left-1 top-1/2 z-10 h-8 -translate-y-1/2 px-2 text-xs text-muted-foreground',
            className
          )}
        >
          <span className="inline-flex w-6 items-center justify-center text-base leading-none">
            {countryCodeToFlag(selected?.code)}
          </span>

          {!disabled && <ChevronDown size={12} className="opacity-70" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="z-2000 w-80 p-0" align="start" sideOffset={8}>
        <div className="border-b p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

            <Input
              autoFocus
              value={searchCountry}
              onChange={(event) => onSearchCountry(event.target.value)}
              placeholder="Search country..."
              className="h-9 pl-8 pr-8"
            />

            {searchCountry && (
              <button
                type="button"
                onClick={() => onSearchCountry('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="h-72">
          <div className="p-1">
            {notFound ? (
              <SearchNotFound query={searchCountry} className="px-2 py-4" />
            ) : (
              dataFiltered.map((country: CountryOption) => {
                const isSelected = selectedCountry === country.code;

                return (
                  <button
                    type="button"
                    key={country.code}
                    onClick={() => {
                      setOpen(false);
                      onSearchCountry('');
                      onSelectedCountry(country.code as PhoneCountry);
                    }}
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm',
                      isSelected && 'bg-accent'
                    )}
                  >
                    <span className="w-6 text-base leading-none">
                      {countryCodeToFlag(country.code)}
                    </span>

                    <span className="min-w-0 flex-1 truncate">{country.label}</span>

                    <span className="text-muted-foreground text-xs">+{country.phone}</span>

                    <Check
                      size={14}
                      className={cn('text-primary', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: readonly CountryOption[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  const lowerQuery = query.toLowerCase();

  return inputData.filter(({ label, code, phone }: CountryOption) =>
    [label, code, phone].some((field) => field.toLowerCase().includes(lowerQuery))
  );
}

function countryCodeToFlag(code?: string) {
  if (!code || code.length !== 2) {
    return '🌐';
  }

  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
