import { createClasses } from 'src/utils/create-classes';
import { cn } from 'src/lib/utils';

import { layoutClasses } from './classes';

// ----------------------------------------------------------------------

export type MainSectionProps = React.ComponentProps<'main'>;

export function MainSection({ children, className, ...other }: MainSectionProps) {
  return (
    <main
      className={cn(
        'flex w-full flex-1 flex-col',
        createClasses(layoutClasses.main.replace('minimal__', '')),
        className
      )}
      {...other}
    >
      {children}
    </main>
  );
}
