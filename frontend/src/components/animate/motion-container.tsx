import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

export type MotionContainerProps = React.ComponentProps<'div'> &
  MotionProps & {
    animate?: boolean;
    action?: boolean;
  };

export function MotionContainer({
  animate,
  children,
  action = false,
  className,
  ...other
}: MotionContainerProps) {
  return (
    <m.div
      variants={varContainer()}
      initial={action ? false : 'initial'}
      animate={action ? (animate ? 'animate' : 'exit') : 'animate'}
      exit={action ? undefined : 'exit'}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}
