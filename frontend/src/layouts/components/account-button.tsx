import { m } from 'framer-motion';
import { getInitials } from 'src/utils/initials';
import { cn } from 'src/lib/utils';

import { AvatarRoot, AvatarImage, AvatarFallback } from 'src/components/ui/avatar';
import { varTap, varHover, AnimateBorder, transitionTap } from 'src/components/animate';

// ----------------------------------------------------------------------

export type AccountButtonProps = React.ComponentProps<'button'> & {
  photoURL: string;
  displayName: string;
};

export function AccountButton({
  photoURL,
  displayName,
  className,
  onClick,
  ...other
}: AccountButtonProps) {
  const initials = getInitials(displayName);

  return (
    <m.button
      whileTap={varTap(0.96)}
      whileHover={varHover(1.04)}
      transition={transitionTap()}
      aria-label="Account button"
      onClick={onClick}
      className={cn(
        'ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-full p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      <AnimateBorder
        className="h-10 w-10 rounded-full p-0.75"
        slotProps={{
          primaryBorder: { size: 45, width: '1.5px' },
          secondaryBorder: {},
        }}
      >
        <AvatarRoot className="h-full w-full">
          <AvatarImage src={photoURL} alt={displayName} />
          <AvatarFallback className={`text-${initials.length > 1 ? 'md' : 'lg'}`}>
            {getInitials(displayName)}
          </AvatarFallback>
        </AvatarRoot>
      </AnimateBorder>
    </m.button>
  );
}
