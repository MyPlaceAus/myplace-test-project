import { useScrollOffsetTop } from 'src/hooks/use-scroll-offset-top';
import { cn } from 'src/lib/utils';

import { layoutClasses } from './classes';

// ----------------------------------------------------------------------

export type HeaderSectionProps = React.ComponentProps<'header'> & {
  layoutQuery?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: React.ComponentProps<'div'>;
    centerArea?: React.ComponentProps<'div'>;
  };
};

export function HeaderSection({
  className,
  slots,
  slotProps,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}: HeaderSectionProps) {
  const { offsetTop: isOffset } = useScrollOffsetTop();

  const headerHeight =
    layoutQuery === 'lg' || layoutQuery === 'xl'
      ? 'h-[var(--layout-header-desktop-height)]'
      : 'h-[var(--layout-header-mobile-height)]';

  return (
    <header
      className={cn(
        'sticky top-0 z-(--layout-header-zIndex)',
        'bg-background/80 backdrop-blur-(--layout-header-blur)',
        headerHeight,
        // Background overlay when scrolled
        isOffset && !disableOffset && 'before:visible before:opacity-100',
        !disableOffset &&
          'before:bg-background/80 before:invisible before:absolute before:inset-0 before:-z-10 before:opacity-0 before:backdrop-blur-[var(--layout-header-blur)] before:transition-all before:duration-200',
        // Shadow elevation when scrolled
        !disableElevation && isOffset && 'after:visible after:opacity-[0.48]',
        !disableElevation &&
          'after:invisible after:absolute after:right-0 after:bottom-0 after:left-0 after:-z-20 after:mx-auto after:h-6 after:w-[calc(100%-48px)] after:rounded-full after:opacity-0 after:shadow-lg after:transition-all after:duration-200',
        cn([layoutClasses.header, className])
      )}
      {...other}
    >
      {slots?.topArea}

      <div
        className={cn(
          'relative mx-auto flex w-full max-w-6xl flex-nowrap items-center justify-center',
          'h-(--layout-header-mobile-height)',
          layoutQuery !== 'xs' && layoutQuery !== 'sm' && 'lg:h-(--layout-header-desktop-height)',
          'text-(--color)',
          slotProps?.container?.className
        )}
        {...slotProps?.container}
      >
        {slots?.leftArea}

        {slots?.centerArea && (
          <div
            className={cn('flex justify-center', slotProps?.centerArea?.className)}
            {...slotProps?.centerArea}
          >
            {slots?.centerArea}
          </div>
        )}

        {slots?.rightArea}
      </div>

      {slots?.bottomArea}
    </header>
  );
}
