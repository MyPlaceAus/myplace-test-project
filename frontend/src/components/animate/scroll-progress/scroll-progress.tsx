import type { PaletteColorKey } from 'src/types';
import type { MotionValue, MotionProps } from 'framer-motion';

import { createPortal } from 'react-dom';
import { m, useSpring, useTransform } from 'framer-motion';
import { createClasses } from 'src/utils/create-classes';
import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

export const scrollProgressClasses = {
  circular: createClasses('scroll__progress__circular'),
  linear: createClasses('scroll__progress__linear'),
};

type BaseProps = MotionProps & React.ComponentProps<'svg'> & React.ComponentProps<'div'>;

export interface ScrollProgressProps extends BaseProps {
  size?: number;
  portal?: boolean;
  thickness?: number;
  whenScroll?: 'x' | 'y';
  progress: MotionValue<number>;
  variant: 'linear' | 'circular';
  color?: PaletteColorKey | 'inherit';
  slotProps?: {
    wrapper?: React.ComponentProps<'div'>;
  };
}

export function ScrollProgress({
  size,
  portal,
  variant,
  slotProps,
  className,
  progress,
  thickness = 3.6,
  whenScroll = 'y',
  color = 'primary',
  ...other
}: ScrollProgressProps) {
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

  const transformProgress = useTransform(progress, [0, -1], [0, 1]);

  const progressValue = isRtl && whenScroll === 'x' ? transformProgress : progress;
  const progressSize = variant === 'circular' ? (size ?? 64) : (size ?? 3);

  const scaleX = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getColorValue = () => {
    if (color === 'inherit') return undefined;
    const colorMap: Record<PaletteColorKey, string> = {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      info: 'hsl(var(--info-main))',
      success: 'hsl(var(--success-main))',
      warning: 'hsl(var(--warning-main))',
      error: 'hsl(var(--error-main))',
    };
    return colorMap[color as PaletteColorKey];
  };

  const renderCircular = () => (
    <CircularRoot
      viewBox={`0 0 ${progressSize} ${progressSize}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn([scrollProgressClasses.circular, className])}
      style={{
        width: progressSize,
        height: progressSize,
        ...(getColorValue() && { color: getColorValue() }),
      }}
      {...other}
    >
      <circle
        cx={progressSize / 2}
        cy={progressSize / 2}
        r={progressSize / 2 - thickness - 4}
        strokeWidth={thickness}
        strokeOpacity={0.2}
      />

      <m.circle
        cx={progressSize / 2}
        cy={progressSize / 2}
        r={progressSize / 2 - thickness - 4}
        strokeWidth={thickness}
        style={{ pathLength: progressValue }}
      />
    </CircularRoot>
  );

  const getGradientValue = () => {
    if (color === 'inherit') return undefined;
    const gradientMap: Record<PaletteColorKey, string> = {
      primary: 'linear-gradient(135deg, hsl(var(--primary-light)), hsl(var(--primary)))',
      secondary: 'linear-gradient(135deg, hsl(var(--secondary-light)), hsl(var(--secondary)))',
      info: 'linear-gradient(135deg, hsl(var(--info-light)), hsl(var(--info-main)))',
      success: 'linear-gradient(135deg, hsl(var(--success-light)), hsl(var(--success-main)))',
      warning: 'linear-gradient(135deg, hsl(var(--warning-light)), hsl(var(--warning-main)))',
      error: 'linear-gradient(135deg, hsl(var(--error-light)), hsl(var(--error-main)))',
    };
    return gradientMap[color as PaletteColorKey];
  };

  const renderLinear = () => (
    <LinearRoot
      className={cn([scrollProgressClasses.linear, className])}
      style={{
        height: progressSize,
        scaleX,
        ...(getGradientValue() && { background: getGradientValue() }),
      }}
      {...other}
    />
  );

  const content = (
    <div {...slotProps?.wrapper}>{variant === 'circular' ? renderCircular() : renderLinear()}</div>
  );

  return portal ? createPortal(content, document.body) : content;
}

// ----------------------------------------------------------------------

const CircularRoot = ({ className, style, ...props }: React.ComponentProps<typeof m.svg>) => (
  <m.svg
    className={cn('text-foreground rotate-[-90deg]', className)}
    style={{
      ...style,
    }}
    {...props}
  >
    <style>{`
      ${className || ''} circle {
        fill: none;
        stroke-dashoffset: 0;
        stroke: currentColor;
      }
    `}</style>
  </m.svg>
);

const LinearRoot = ({ className, style, ...props }: React.ComponentProps<typeof m.div>) => (
  <m.div
    className={cn('bg-foreground top-0 right-0 left-0 origin-left', className)}
    style={style}
    {...props}
  />
);
