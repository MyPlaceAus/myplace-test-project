import type { UseInViewOptions } from 'framer-motion';

import { useRef, useEffect } from 'react';
import { m, animate, useInView, useTransform, useMotionValue } from 'framer-motion';
import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export type AnimateCountUpProps = React.ComponentProps<'p'> & {
  to: number;
  from?: number;
  toFixed?: number;
  duration?: number;
  unit?: 'k' | 'm' | 'b' | string;
  once?: UseInViewOptions['once'];
  amount?: UseInViewOptions['amount'];
  as?: React.ElementType;
};

export function AnimateCountUp({
  to,
  from = 0,
  toFixed = 0,
  once = true,
  duration = 2,
  amount = 0.5,
  unit: unitProp,
  as: Component = 'p',
  className,
  ...other
}: AnimateCountUpProps) {
  const countRef = useRef(null);

  const shortNumber = shortenNumber(to);

  const startCount = useMotionValue<number>(from);
  const endCount = shortNumber ? shortNumber.value : to;

  const unit = unitProp ?? shortNumber?.unit;

  const inView = useInView(countRef, { once, amount });

  const rounded = useTransform(startCount, (latest) =>
    latest.toFixed(isFloat(latest) ? toFixed : 0)
  );

  useEffect(() => {
    if (inView) {
      animate(startCount, endCount, { duration });
    }
  }, [duration, endCount, inView, startCount]);

  return (
    <Component className={cn('m-0 inline-flex p-0', className)} {...other}>
      <m.span ref={countRef}>{rounded}</m.span>
      {unit}
    </Component>
  );
}

// ----------------------------------------------------------------------

function isFloat(n: number | string) {
  return typeof n === 'number' && !Number.isInteger(n);
}

function shortenNumber(value: number): { unit: string; value: number } | undefined {
  if (value >= 1e9) {
    return { unit: 'b', value: value / 1e9 };
  }
  if (value >= 1e6) {
    return { unit: 'm', value: value / 1e6 };
  }
  if (value >= 1e3) {
    return { unit: 'k', value: value / 1e3 };
  }
  return undefined;
}
