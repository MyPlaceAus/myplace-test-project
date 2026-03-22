import React from 'react';
import SimpleBar from 'simplebar-react';
import { cn } from 'src/lib/utils';

import { scrollbarClasses } from './classes';

// Types
interface ScrollbarProps extends React.ComponentPropsWithoutRef<typeof SimpleBar> {
  ref?: React.Ref<any>;
  children: React.ReactNode;
  className?: string;
  fillContent?: boolean;
  slotProps?: {
    wrapper?: { className?: string };
    contentWrapper?: { className?: string };
    content?: { className?: string };
  };
}

// Scrollbar component
export function Scrollbar({
  ref,
  children,
  className,
  fillContent = true,
  slotProps,
  ...other
}: ScrollbarProps) {
  return (
    <SimpleBar
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={cn(
        // Base styles
        'flex min-h-0 min-w-0 grow flex-col',
        // Fill content styles - expand wrapper and content
        fillContent && '[&_.simplebar-wrapper]:min-h-full',
        fillContent &&
          '[&_.simplebar-content]:flex [&_.simplebar-content]:min-h-full [&_.simplebar-content]:flex-1 [&_.simplebar-content]:flex-col',
        // Slot styles - only apply if className exists
        slotProps?.wrapper?.className && `[&_.simplebar-wrapper]:${slotProps.wrapper.className}`,
        slotProps?.contentWrapper?.className &&
          `[&_.simplebar-content-wrapper]:${slotProps.contentWrapper.className}`,
        slotProps?.content?.className && `[&_.simplebar-content]:${slotProps.content.className}`,
        // Merge with scrollbar classes and custom className
        cn([scrollbarClasses.root, className])
      )}
      {...other}
    >
      {children}
    </SimpleBar>
  );
}
