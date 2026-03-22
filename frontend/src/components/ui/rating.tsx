import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from 'src/lib/utils';

type RatingSize = 'xxSmall' | 'xSmall' | 'small' | 'medium' | 'large';

type RatingIconGetterParams = {
  value: number;
  filled: boolean;
  fillRatio: number;
  size: RatingSize;
  active: boolean;
};

const sizeClasses: Record<RatingSize, string> = {
  xxSmall: 'h-3 w-3',
  xSmall: 'h-4 w-4',
  small: 'h-5 w-5',
  medium: 'h-6 w-6',
  large: 'h-7 w-7',
};

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  precision?: number;
  size?: RatingSize;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  getIcon?: (params: RatingIconGetterParams) => React.ReactNode;
  filledClassName?: string;
  emptyClassName?: string;
  labels?: Partial<Record<number, string>>;
  showLabel?: boolean;
  labelClassName?: string;
  onValueChange?: (value: number) => void;
}

const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(min, num));

const toFixedNumber = (num: number) => Number(num.toFixed(2));

const getLabelForValue = (labels: Partial<Record<number, string>> | undefined, value: number) => {
  if (!labels) return undefined;

  return (
    labels[value] ??
    labels[toFixedNumber(value)] ??
    labels[Math.ceil(value)] ??
    labels[Math.floor(value)]
  );
};

const renderIconNode = (iconNode: React.ReactNode) => {
  if (React.isValidElement<{ className?: string }>(iconNode)) {
    const currentClassName = iconNode.props.className;

    return React.cloneElement(iconNode, {
      className: cn('h-full w-full', currentClassName),
    });
  }

  return iconNode;
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      max = 5,
      precision = 1,
      size = 'small',
      readOnly = false,
      disabled = false,
      icon,
      emptyIcon,
      getIcon,
      filledClassName = 'text-yellow-400',
      emptyClassName = 'text-muted-foreground',
      labels,
      showLabel = false,
      labelClassName,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);
    const displayValue = hoveredValue ?? value;
    const isDisabled = disabled || readOnly;
    const normalizedPrecision = clamp(precision, 0.1, 1);
    const selectedLabel = getLabelForValue(labels, displayValue);

    const getValueFromPointer = (event: React.MouseEvent<HTMLButtonElement>, itemValue: number) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const rawPercent = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const steppedPercent = Math.ceil(rawPercent / normalizedPrecision) * normalizedPrecision;

      return toFixedNumber(clamp(itemValue - 1 + steppedPercent, normalizedPrecision, max));
    };

    const handleClick = (newValue: number) => {
      if (!isDisabled && onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => !isDisabled && setHoveredValue(null)}
        >
          {Array.from({ length: max }, (_, i) => i + 1).map((starValue) => (
            <button
              key={starValue}
              type="button"
              disabled={isDisabled}
              aria-label={labels?.[starValue] ?? `Rate ${starValue}`}
              className={cn(
                'group cursor-pointer transition-colors disabled:cursor-default',
                isDisabled && 'cursor-default'
              )}
              onMouseEnter={(event) =>
                !isDisabled && setHoveredValue(getValueFromPointer(event, starValue))
              }
              onMouseMove={(event) =>
                !isDisabled && setHoveredValue(getValueFromPointer(event, starValue))
              }
              onClick={(event) => handleClick(getValueFromPointer(event, starValue))}
            >
              {(() => {
                const fillRatio = clamp(displayValue - (starValue - 1), 0, 1);

                const filledIconNode = getIcon?.({
                  value: starValue,
                  filled: true,
                  fillRatio,
                  size,
                  active: hoveredValue !== null,
                }) ??
                  icon ?? <Star />;

                const emptyIconNode = getIcon?.({
                  value: starValue,
                  filled: false,
                  fillRatio,
                  size,
                  active: hoveredValue !== null,
                }) ??
                  emptyIcon ??
                  icon ?? <Star />;

                return (
                  <span
                    className={cn(
                      'relative inline-flex transition-transform duration-150 ease-out',
                      !isDisabled && 'group-hover:scale-125'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex [&>svg]:fill-none',
                        sizeClasses[size],
                        emptyClassName
                      )}
                    >
                      {renderIconNode(emptyIconNode)}
                    </span>

                    {fillRatio > 0 ? (
                      <span
                        className={cn('absolute inset-0 overflow-hidden', filledClassName)}
                        style={{ width: `${fillRatio * 100}%` }}
                      >
                        <span className={cn('inline-flex [&>svg]:fill-current', sizeClasses[size])}>
                          {renderIconNode(filledIconNode)}
                        </span>
                      </span>
                    ) : null}
                  </span>
                );
              })()}
            </button>
          ))}
        </div>

        {showLabel && selectedLabel ? (
          <span className={cn('text-sm text-muted-foreground', labelClassName)}>
            {selectedLabel}
          </span>
        ) : null}
      </div>
    );
  }
);
Rating.displayName = 'Rating';

export { Rating };
