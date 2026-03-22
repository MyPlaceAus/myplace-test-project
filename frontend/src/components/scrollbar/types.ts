import type { Props as SimplebarProps } from 'simplebar-react';

// ----------------------------------------------------------------------

export type ScrollbarProps = SimplebarProps &
  React.ComponentProps<'div'> & {
    fillContent?: boolean;
    slotProps?: {
      wrapper?: React.ComponentProps<'div'>;
      content?: React.ComponentProps<'div'>;
      contentWrapper?: React.ComponentProps<'div'>;
    };
  };
