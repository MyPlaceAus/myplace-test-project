import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

export type MotionViewportProps = React.ComponentProps<'div'> &
  MotionProps & {
    disableAnimate?: boolean;
  };

export function MotionViewport({
  children,
  viewport,
  disableAnimate = true,
  className,
  ...other
}: MotionViewportProps) {
  const [smDown, setSmDown] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');

    const handleChange = (e: MediaQueryListEvent) => setSmDown(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const disabled = smDown && disableAnimate;

  if (disabled) {
    return (
      <div className={className} {...other}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      initial="initial"
      whileInView="animate"
      variants={varContainer()}
      viewport={{ once: true, amount: 0.3, ...viewport }}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}
