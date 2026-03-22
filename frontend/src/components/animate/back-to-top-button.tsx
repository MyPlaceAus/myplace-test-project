import { cloneElement } from 'react';
import { useBackToTop } from 'src/hooks/use-back-to-top';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type BackToTopProps = React.ComponentProps<typeof Button> & {
  isDebounce?: boolean;
  scrollThreshold?: string | number;
  renderButton?: (isVisible?: boolean) => React.ReactElement;
};

export function BackToTopButton({
  isDebounce,
  renderButton,
  scrollThreshold = '90%',
  className,
  ...other
}: BackToTopProps) {
  const { onBackToTop, isVisible } = useBackToTop(scrollThreshold, isDebounce);

  if (renderButton) {
    return cloneElement(renderButton(isVisible) as React.ReactElement<{ onClick?: () => void }>, {
      onClick: onBackToTop,
    });
  }

  return (
    <Button
      aria-label="Back to top"
      onClick={onBackToTop}
      size="icon"
      className={cn(
        'fixed right-6 bottom-6 z-1050 h-12 w-12 md:right-8 md:bottom-8',
        'transition-transform duration-300',
        isVisible ? 'scale-100' : 'scale-0',
        className
      )}
      {...other}
    >
      <Iconify width={24} icon="solar:double-alt-arrow-up-bold-duotone" />
    </Button>
  );
}
