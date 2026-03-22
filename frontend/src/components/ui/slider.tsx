import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { TooltipContent, TooltipTrigger, TooltipProvider, Tooltip as TooltipRoot } from './tooltip';

export type SliderMark = {
  value: number;
  label?: React.ReactNode;
};

const sliderVariants = cva('relative flex w-full touch-none select-none items-center', {
  variants: {
    orientation: {
      horizontal: 'h-8',
      vertical: 'h-full min-h-32 w-8 justify-center',
    },
    size: {
      small: 'h-7 data-[orientation=vertical]:w-7',
      medium: 'h-8 data-[orientation=vertical]:w-8',
      large: 'h-9 data-[orientation=vertical]:w-9',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'medium',
  },
});

const sliderTrackVariants = cva('relative overflow-hidden rounded-full bg-muted-foreground/20', {
  variants: {
    orientation: {
      horizontal: 'h-1.5 w-full',
      vertical: 'h-full w-1.5',
    },
    size: {
      small: 'h-1 data-[orientation=vertical]:w-1',
      medium: 'h-1.5 data-[orientation=vertical]:w-1.5',
      large: 'h-2 data-[orientation=vertical]:w-2',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'medium',
  },
});

const sliderRangeVariants = cva('absolute z-10 rounded-full', {
  variants: {
    color: {
      inherit: 'bg-foreground',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-destructive',
    },
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
  },
});

const sliderThumbVariants = cva(
  'z-10 block cursor-pointer rounded-full border border-transparent bg-background shadow-sm transition-transform data-[state=active]:scale-110 data-[state=active]:cursor-grabbing focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:h-8 before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-current/20 before:opacity-0 before:scale-75 before:transition-[transform,opacity] before:duration-200 before:ease-out hover:before:opacity-100 hover:before:scale-100 data-[state=active]:before:opacity-100 data-[state=active]:before:scale-125',
  {
    variants: {
      size: {
        small: 'h-3.5 w-3.5 before:h-8 before:w-8',
        medium: 'h-4.5 w-4.5 before:h-8 before:w-8',
        large: 'h-5 w-5 before:h-10 before:w-10',
      },
      color: {
        inherit: 'bg-foreground text-foreground',
        primary: 'bg-primary text-primary',
        secondary: 'bg-secondary text-secondary',
        info: 'bg-info text-info',
        success: 'bg-success text-success',
        warning: 'bg-warning text-warning',
        error: 'bg-destructive text-destructive',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  }
);

type SliderVariantProps = VariantProps<typeof sliderVariants> & {
  color?: VariantProps<typeof sliderRangeVariants>['color'];
};

export interface SliderProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      'value' | 'defaultValue' | 'onValueChange' | 'min' | 'max' | 'step' | 'orientation' | 'color'
    >,
    SliderVariantProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | SliderMark[];
  markCount?: number;
  showValueLabel?: boolean;
  valueLabelMode?: 'inline' | 'tooltip';
  valueLabelFormat?: (value: number, index: number) => React.ReactNode;
  getAriaValueText?: (value: number, index: number) => string;
  rootClassName?: string;
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
  marksClassName?: string;
  markClassName?: string;
  markLabelClassName?: string;
  valueLabelClassName?: string;
}

const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(min, num));

const toSliderValue = (input: number | number[] | undefined, fallback: number) =>
  input === undefined ? [fallback] : Array.isArray(input) ? input : [input];

const normalizeMarks = (
  marks: SliderProps['marks'],
  min: number,
  max: number,
  step: number,
  markCount: number
): SliderMark[] => {
  if (Array.isArray(marks)) {
    return marks;
  }

  if (!marks) {
    return [];
  }

  if (step > 0) {
    const totalSteps = Math.floor((max - min) / step);

    if (totalSteps > 0 && totalSteps <= 200) {
      return Array.from({ length: totalSteps + 1 }, (_, index) => ({
        value: Number((min + step * index).toFixed(4)),
      }));
    }
  }

  const total = Math.max(2, markCount);
  const stepSize = (max - min) / (total - 1);

  return Array.from({ length: total }, (_, index) => {
    const value = Number((min + stepSize * index).toFixed(4));

    return {
      value,
    };
  });
};

const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      orientation = 'horizontal',
      size = 'medium',
      color = 'primary',
      marks,
      markCount = 5,
      showValueLabel = false,
      valueLabelMode = 'tooltip',
      valueLabelFormat,
      getAriaValueText,
      rootClassName,
      trackClassName,
      rangeClassName,
      thumbClassName,
      marksClassName,
      markClassName,
      markLabelClassName,
      valueLabelClassName,
      ...props
    },
    ref
  ) => {
    const [activeTooltipIndex, setActiveTooltipIndex] = React.useState<number | null>(null);
    const canControlFromOutside = value !== undefined && typeof onValueChange === 'function';
    const isRange = Array.isArray(value ?? defaultValue);
    const controlledValue = React.useMemo(
      () => (value !== undefined ? toSliderValue(value, min) : undefined),
      [value, min]
    );
    const computedDefaultValue = React.useMemo(
      () => toSliderValue(value ?? defaultValue, min),
      [value, defaultValue, min]
    );
    const [internalValue, setInternalValue] = React.useState<number[]>(computedDefaultValue);

    React.useEffect(() => {
      if (!canControlFromOutside && controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [canControlFromOutside, controlledValue]);

    const activeValues = canControlFromOutside
      ? (controlledValue ?? computedDefaultValue)
      : internalValue;
    const sliderOrientation = orientation ?? 'horizontal';
    const sliderColor = color ?? 'primary';
    const marksList = React.useMemo(
      () => normalizeMarks(marks, min, max, step, markCount),
      [marks, min, max, step, markCount]
    );
    const hasMarkLabels = marksList.some((item) => item.label !== undefined);

    const toPercent = React.useCallback(
      (item: number) => `${((clamp(item, min, max) - min) / (max - min || 1)) * 100}%`,
      [min, max]
    );

    const handleValueChange = (next: number[]) => {
      if (!canControlFromOutside) {
        setInternalValue(next);
      }

      if (!onValueChange) {
        return;
      }

      if (isRange) {
        onValueChange(next);
      } else {
        onValueChange(next[0] ?? min);
      }
    };

    const getValueLabel = (item: number, index: number) =>
      valueLabelFormat ? valueLabelFormat(item, index) : item;

    return (
      <div
        className={cn(
          'relative',
          sliderOrientation === 'horizontal' ? 'w-full' : 'inline-flex h-full',
          className,
          rootClassName
        )}
      >
        <TooltipProvider>
          <SliderPrimitive.Root
            ref={ref}
            min={min}
            max={max}
            step={step}
            value={canControlFromOutside ? activeValues : undefined}
            defaultValue={canControlFromOutside ? undefined : computedDefaultValue}
            disabled={disabled}
            orientation={sliderOrientation}
            onValueChange={handleValueChange}
            className={cn(
              sliderVariants({ orientation: sliderOrientation, size }),
              disabled && 'cursor-not-allowed opacity-50'
            )}
            {...props}
          >
            <SliderPrimitive.Track
              className={cn(
                sliderTrackVariants({ orientation: sliderOrientation, size }),
                trackClassName
              )}
            >
              <SliderPrimitive.Range
                className={cn(
                  sliderRangeVariants({ color: sliderColor, orientation: sliderOrientation }),
                  rangeClassName
                )}
              />

              {marksList.length > 0
                ? marksList.map((markItem) => (
                    <span
                      key={`mark-line-${markItem.value}`}
                      className={cn(
                        'pointer-events-none absolute z-0 bg-background/75',
                        sliderOrientation === 'horizontal'
                          ? 'top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2'
                          : 'left-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2',
                        markClassName
                      )}
                      style={
                        sliderOrientation === 'horizontal'
                          ? { left: toPercent(markItem.value) }
                          : { bottom: toPercent(markItem.value) }
                      }
                    />
                  ))
                : null}
            </SliderPrimitive.Track>

            {activeValues.map((item, index) => {
              const thumbNode = (
                <SliderPrimitive.Thumb
                  className={cn(sliderThumbVariants({ size, color: sliderColor }), thumbClassName)}
                  onPointerEnter={() => setActiveTooltipIndex(index)}
                  onPointerLeave={() =>
                    setActiveTooltipIndex((prev) => (prev === index ? null : prev))
                  }
                  onPointerDown={() => setActiveTooltipIndex(index)}
                  onBlur={() => setActiveTooltipIndex((prev) => (prev === index ? null : prev))}
                  onFocus={() => setActiveTooltipIndex(index)}
                  aria-label={
                    getAriaValueText?.(item, index) ??
                    `${isRange ? (index === 0 ? 'Minimum' : 'Maximum') : 'Value'} ${item}`
                  }
                />
              );

              if (showValueLabel && valueLabelMode === 'tooltip') {
                return (
                  <TooltipRoot key={index} delayDuration={0} open={activeTooltipIndex === index}>
                    <TooltipTrigger asChild>{thumbNode}</TooltipTrigger>
                    <TooltipContent
                      side={sliderOrientation === 'horizontal' ? 'top' : 'right'}
                      sideOffset={8}
                      arrow
                      className={cn('px-1.5 py-1 text-xs', valueLabelClassName)}
                    >
                      {getValueLabel(item, index)}
                    </TooltipContent>
                  </TooltipRoot>
                );
              }

              return React.cloneElement(thumbNode, { key: index });
            })}

            {showValueLabel && valueLabelMode === 'inline'
              ? activeValues.map((item, index) => (
                  <span
                    key={`${index}-label`}
                    className={cn(
                      'pointer-events-none absolute rounded bg-background px-1.5 py-0.5 text-xs shadow-sm',
                      sliderOrientation === 'horizontal'
                        ? '-translate-x-1/2 -translate-y-8'
                        : '-translate-y-1/2 translate-x-8',
                      valueLabelClassName
                    )}
                    style={
                      sliderOrientation === 'horizontal'
                        ? { left: toPercent(item) }
                        : { bottom: toPercent(item) }
                    }
                  >
                    {getValueLabel(item, index)}
                  </span>
                ))
              : null}
          </SliderPrimitive.Root>
        </TooltipProvider>

        {hasMarkLabels ? (
          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              sliderOrientation === 'horizontal' ? 'top-7' : 'left-8 top-0',
              marksClassName
            )}
          >
            {marksList.map((markItem) => (
              <span
                key={`mark-label-${markItem.value}`}
                className={cn(
                  'absolute inline-flex items-center text-muted-foreground',
                  sliderOrientation === 'horizontal' ? '-translate-x-1/2' : '-translate-y-1/2',
                  markLabelClassName
                )}
                style={
                  sliderOrientation === 'horizontal'
                    ? { left: toPercent(markItem.value) }
                    : { bottom: toPercent(markItem.value) }
                }
              >
                {markItem.label !== undefined ? (
                  <span className="text-xs">{markItem.label}</span>
                ) : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
