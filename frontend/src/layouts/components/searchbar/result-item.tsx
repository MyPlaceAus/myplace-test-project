import { RouterLink } from 'src/routes/components';
import { isExternalLink } from 'src/utils/url';

import { cn } from 'src/lib/utils';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  href: string;
  labels: string[];
  title: { text: string; highlight: boolean }[];
  path: { text: string; highlight: boolean }[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ResultItem({ title, path, labels, href, className, onClick, ...other }: Props) {
  const isExternal = isExternalLink(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cn(
          'border-b-border block border border-dashed border-transparent p-3',
          'hover:border-primary hover:bg-primary/10 transition-colors hover:rounded-md',
          className
        )}
        {...other}
      >
        {renderContent(title, path, labels)}
      </a>
    );
  }

  return (
    <RouterLink
      href={href}
      onClick={onClick}
      className={cn(
        'block rounded-md border border-dashed border-transparent p-3',
        'transition-colors hover:border-emerald-500/50 hover:bg-emerald-400/10',
        className
      )}
      {...other}
    >
      {renderContent(title, path, labels)}
    </RouterLink>
  );
}

function renderContent(
  title: { text: string; highlight: boolean }[],
  path: { text: string; highlight: boolean }[],
  labels: string[]
) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="text-sm">
          {title.map((part, index) => (
            <span key={index} className={part.highlight ? 'text-primary' : ''}>
              {part.text}
            </span>
          ))}
        </div>
        <div className="truncate text-xs text-gray-400">
          {path.map((part, index) => (
            <span key={index} className={cn(part.highlight && 'text-primary font-semibold')}>
              {part.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex gap-1.5">
        {[...labels].reverse().map((label) => (
          <Label key={label} color="default">
            {label}
          </Label>
        ))}
      </div>
    </>
  );
}
