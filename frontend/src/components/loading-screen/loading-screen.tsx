import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export type LoadingScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  slots?: {
    progress?: React.ReactNode;
  };
  slotsProps?: {
    progress?: React.ComponentProps<'div'>;
  };
};

export function LoadingScreen({
  portal,
  slots,
  slotsProps,
  className,
  ...other
}: LoadingScreenProps) {
  const content = (
    <div
      className={cn('flex min-h-full w-full flex-grow items-center justify-center px-5', className)}
      {...other}
    >
      {slots?.progress ?? (
        <div
          className={cn(
            'bg-primary/20 h-1 w-full max-w-[360px] overflow-hidden rounded-full',
            slotsProps?.progress?.className
          )}
          {...slotsProps?.progress}
        >
          <div className="bg-primary h-full animate-pulse" style={{ width: '30%' }} />
        </div>
      )}
    </div>
  );

  if (portal) {
    return createPortal(content, document.body);
  }

  return <Fragment>{content}</Fragment>;
}
