import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { AnimateLogoZoom, type AnimateLogoProps } from '../animate';

// ----------------------------------------------------------------------

export type SplashScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  className?: string;
  slots?: {
    logo?: React.ReactNode;
  };
  slotProps?: {
    wrapper?: React.ComponentProps<'div'>;
    logo?: AnimateLogoProps;
  };
};

export function SplashScreen({
  portal = true,
  slots,
  slotProps,
  className = '',
  ...other
}: SplashScreenProps) {
  const PortalWrapper = portal ? PortalComponent : Fragment;

  const content = (
    <div
      className={`flex grow flex-col ${slotProps?.wrapper?.className || ''}`}
      {...slotProps?.wrapper}
    >
      <div
        className={`bg-background fixed right-0 bottom-0 z-9998 flex h-full w-full grow flex-col items-center justify-center ${className} `}
        {...other}
      >
        {slots?.logo ?? <AnimateLogoZoom {...slotProps?.logo} />}
      </div>
    </div>
  );

  return portal ? <PortalWrapper>{content}</PortalWrapper> : content;
}

// Portal wrapper component
function PortalComponent({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}
