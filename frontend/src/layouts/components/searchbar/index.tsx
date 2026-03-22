import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { cn } from 'src/lib/utils';
import { Label } from 'src/components/label';
import { Input } from 'src/components/ui/input';
import { Iconify } from 'src/components/iconify';
import { Button } from 'src/components/ui/button';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';
import { Dialog, DialogContent } from 'src/components/ui/dialog';
import type { NavSectionProps } from 'src/components/nav-section';

import { ResultItem } from './result-item';
import { applyFilter, flattenNavSections } from './utils';

// ----------------------------------------------------------------------

export type SearchbarProps = React.ComponentProps<'div'> & {
  data?: NavSectionProps['data'];
};

export function Searchbar({ data: navItems = [], className, ...other }: SearchbarProps) {
  const { value: open, onFalse: onClose, onTrue: onOpen, onToggle } = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = useCallback(() => {
    onClose();
    setSearchQuery('');
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onToggle();
        setSearchQuery('');
      }
    },
    [onToggle]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const formattedNavItems = flattenNavSections(navItems);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: formattedNavItems,
        query: searchQuery,
      }),
    [formattedNavItems, searchQuery]
  );

  const notFound = searchQuery && !dataFiltered.length;

  const renderButton = () => (
    <div
      onClick={onOpen}
      className={cn(
        'flex cursor-pointer items-center',
        'sm:bg-muted/20 sm:hover:bg-muted/40 sm:rounded-xl sm:pr-2 sm:transition-colors',
        className
      )}
      {...other}
    >
      <Button
        variant="ghost"
        size="icon"
        className="sm:text-muted-foreground sm:inline-flex sm:p-2"
      >
        <Iconify icon="eva:search-fill" />
      </Button>

      <Label className="cursor-inherit hidden bg-white text-xs text-gray-800 shadow-sm sm:inline-flex">
        ⌘K
      </Label>
    </div>
  );

  const renderResults = () => (
    <ul className="m-0 list-none p-0">
      {dataFiltered.map((item) => {
        const matchesTitle = match(item.title, searchQuery, {
          insideWords: true,
        });
        const partsTitle = parse(item.title, matchesTitle);

        const matchesPath = match(item.path, searchQuery, {
          insideWords: true,
        });
        const partsPath = parse(item.path, matchesPath);

        return (
          <li key={`${item.title}${item.path}`} className="mb-0 p-0 hover:bg-transparent">
            <ResultItem
              path={partsPath}
              title={partsTitle}
              href={item.path}
              labels={item.group.split('.')}
              onClick={handleClose}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {renderButton()}

      <Dialog open={open} onOpenChange={(op) => !op && handleClose()}>
        <DialogContent className="max-w-md items-start overflow-visible">
          <div className="relative mt-5 w-full">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <Iconify icon="eva:search-fill" width={24} className="text-gray-400" />
            </div>
            <Input
              autoFocus={open}
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              id="search-input"
              className="rounded-sm border-b pr-20 pl-10 text-base"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Label className="tracking-wide text-gray-400">esc</Label>
            </div>
          </div>

          {notFound ? (
            <div className="px-5 py-12">
              <SearchNotFound query={searchQuery} />
            </div>
          ) : (
            <Scrollbar className="h-100 p-5">{renderResults()}</Scrollbar>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
