import { useRef, useState, useEffect } from 'react';
import {
  m,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useMotionTemplate,
} from 'framer-motion';
import { createClasses } from 'src/utils/create-classes';
import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

const animateBorderClasses = {
  root: createClasses('border__animation__root'),
  primaryBorder: createClasses('border__animation__primary'),
  secondaryBorder: createClasses('border__animation__secondary'),
  svgWrapper: createClasses('border__animation__svg__wrapper'),
  movingShape: createClasses('border__animation__moving__shape'),
};

type BorderStyleProps = {
  width?: string;
  size?: number;
  className?: string;
};

type AnimateBorderProps = React.ComponentProps<'div'> & {
  duration?: number;
  slotProps?: {
    primaryBorder?: BorderStyleProps;
    secondaryBorder?: BorderStyleProps;
    outlineColor?: string;
    svgSettings?: {
      rx?: string;
      ry?: string;
    };
  };
};

// Helper function to create border gradient styles
function getBorderGradientStyles(color?: string, padding: string = '2px'): React.CSSProperties {
  return {
    padding,
    inset: 0,
    width: '100%',
    content: '""',
    height: '100%',
    margin: 'auto',
    position: 'absolute',
    borderRadius: 'inherit',
    mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
    ...(color && {
      background: color,
    }),
  };
}

export function AnimateBorder({
  children,
  duration,
  slotProps,
  className,
  ...other
}: AnimateBorderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const primaryBorderRef = useRef<HTMLSpanElement>(null);

  const [isHidden, setIsHidden] = useState(false);

  const secondaryBorderStyles = useComputedElementStyles(primaryBorderRef);

  useEffect(() => {
    const handleVisibility = () => {
      if (rootRef.current) {
        const displayStyle = getComputedStyle(rootRef.current).display;
        setIsHidden(displayStyle === 'none');
      }
    };

    handleVisibility();

    window.addEventListener('resize', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleVisibility);
    };
  }, []);

  const outlineColor = slotProps?.outlineColor;

  const borderProps = {
    duration,
    isHidden,
    rx: slotProps?.svgSettings?.rx,
    ry: slotProps?.svgSettings?.ry,
  };

  const renderPrimaryBorder = () => (
    <MovingBorder
      {...borderProps}
      ref={primaryBorderRef}
      size={slotProps?.primaryBorder?.size}
      style={getBorderGradientStyles(undefined, slotProps?.primaryBorder?.width)}
      className={slotProps?.primaryBorder?.className}
    />
  );

  const renderSecondaryBorder = () =>
    slotProps?.secondaryBorder && (
      <MovingBorder
        {...borderProps}
        size={slotProps?.secondaryBorder?.size ?? slotProps?.primaryBorder?.size}
        style={{
          ...getBorderGradientStyles(
            undefined,
            slotProps?.secondaryBorder?.width ?? secondaryBorderStyles.padding
          ),
          borderRadius: secondaryBorderStyles.borderRadius,
          transform: 'scale(-1, -1)',
        }}
        className={slotProps?.secondaryBorder?.className}
      />
    );

  return (
    <div
      dir="ltr"
      ref={rootRef}
      className={cn(
        'relative min-h-10 w-fit min-w-10 overflow-hidden',
        !children && 'min-h-0 min-w-0',
        cn([animateBorderClasses.root, className])
      )}
      style={{
        ...(outlineColor &&
          ({
            '--outline-color': outlineColor,
          } as React.CSSProperties)),
      }}
      {...other}
    >
      {outlineColor && (
        <span
          className="absolute inset-0 m-auto"
          style={getBorderGradientStyles(outlineColor, slotProps?.primaryBorder?.width)}
        />
      )}
      {renderPrimaryBorder()}
      {renderSecondaryBorder()}
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

type MovingBorderProps = React.ComponentProps<'span'> & {
  rx?: string;
  ry?: string;
  duration?: number;
  isHidden?: boolean;
  size?: BorderStyleProps['size'];
};

function MovingBorder({
  size,
  isHidden,
  rx = '30%',
  ry = '30%',
  duration = 8,
  className,
  style,
  ...other
}: MovingBorderProps) {
  const svgRectRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  const updateAnimationFrame = (time: number) => {
    if (!svgRectRef.current) return;
    try {
      const pathLength = svgRectRef.current.getTotalLength();
      const pixelsPerMs = pathLength / (duration * 1000);
      progress.set((time * pixelsPerMs) % pathLength);
    } catch {
      return;
    }
  };

  const calculateTransform = (val: number) => {
    if (!svgRectRef.current) return { x: 0, y: 0 };
    try {
      const point = svgRectRef.current.getPointAtLength(val);
      return point ? { x: point.x, y: point.y } : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  };

  useAnimationFrame((time) => (!isHidden ? updateAnimationFrame(time) : undefined));

  const x = useTransform(progress, (val) => calculateTransform(val).x);
  const y = useTransform(progress, (val) => calculateTransform(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <span className={cn('text-left', className)} style={style} {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        className={animateBorderClasses.svgWrapper}
        style={{ position: 'absolute' }}
      >
        <rect ref={svgRectRef} fill="none" width="100%" height="100%" rx={rx} ry={ry} />
      </svg>

      <m.span
        style={{
          transform,
          width: size,
          height: size,
          filter: 'blur(8px)',
          position: 'absolute',
          background: `radial-gradient(#2c7fff 40%, transparent 80%)`,
        }}
        className={animateBorderClasses.movingShape}
      />
    </span>
  );
}

// ----------------------------------------------------------------------

function useComputedElementStyles(ref: React.RefObject<HTMLSpanElement | null>) {
  const [computedStyles, setComputedStyles] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    if (ref.current) {
      const style = getComputedStyle(ref.current);
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      setComputedStyles({
        paddingTop: style.paddingBottom,
        paddingBottom: style.paddingTop,
        paddingLeft: isRtl ? style.paddingLeft : style.paddingRight,
        paddingRight: isRtl ? style.paddingRight : style.paddingLeft,
        borderTopLeftRadius: isRtl ? style.borderBottomLeftRadius : style.borderBottomRightRadius,
        borderTopRightRadius: isRtl ? style.borderBottomRightRadius : style.borderBottomLeftRadius,
        borderBottomLeftRadius: isRtl ? style.borderTopLeftRadius : style.borderTopRightRadius,
        borderBottomRightRadius: isRtl ? style.borderTopRightRadius : style.borderTopLeftRadius,
      });
    }
  }, [ref]);

  return {
    padding: `${computedStyles?.paddingTop} ${computedStyles?.paddingRight} ${computedStyles?.paddingBottom} ${computedStyles?.paddingLeft}`,
    borderRadius: `${computedStyles?.borderTopLeftRadius} ${computedStyles?.borderTopRightRadius} ${computedStyles?.borderBottomRightRadius} ${computedStyles?.borderBottomLeftRadius}`,
  };
}
