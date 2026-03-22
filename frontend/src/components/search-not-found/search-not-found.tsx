import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

type SearchNotFoundProps = React.ComponentProps<'div'> & {
  query?: string;
  slotProps?: {
    title?: React.ComponentProps<'h6'>;
    description?: React.ComponentProps<'p'>;
  };
};

export function SearchNotFound({ query, className, slotProps, ...other }: SearchNotFoundProps) {
  if (!query) {
    return (
      <p className="text-muted-foreground text-sm" {...slotProps?.description}>
        Please enter keywords
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2 rounded-xl text-center', className)} {...other}>
      <h6 className="text-foreground m-0 text-lg font-semibold" {...slotProps?.title}>
        Not found
      </h6>

      <p className="text-muted-foreground m-0 text-sm" {...slotProps?.description}>
        No results found for &nbsp;
        <strong>{`"${query}"`}</strong>
        .
        <br /> Try checking for typos or using complete words.
      </p>
    </div>
  );
}
