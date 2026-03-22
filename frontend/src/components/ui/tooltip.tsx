import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from 'src/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  arrow?: boolean;
  arrowClassName?: string;
};

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, arrow = false, arrowClassName, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      arrowPadding={0}
      className={cn(
        'group/tooltip bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-99999 origin-[--radix-tooltip-content-transform-origin] rounded-md px-3 py-1.5 text-xs',
        className
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute size-2 rotate-45 bg-foreground',
            'group-data-[side=top]/tooltip:-bottom-1 group-data-[side=top]/tooltip:left-1/2 group-data-[side=top]/tooltip:-translate-x-1/2',
            'group-data-[side=bottom]/tooltip:-top-1 group-data-[side=bottom]/tooltip:left-1/2 group-data-[side=bottom]/tooltip:-translate-x-1/2',
            'group-data-[side=left]/tooltip:-right-1 group-data-[side=left]/tooltip:top-1/2 group-data-[side=left]/tooltip:-translate-y-1/2',
            'group-data-[side=right]/tooltip:-left-1 group-data-[side=right]/tooltip:top-1/2 group-data-[side=right]/tooltip:-translate-y-1/2',
            'group-data-[side=top]/tooltip:group-data-[align=start]/tooltip:left-3 group-data-[side=top]/tooltip:group-data-[align=start]/tooltip:translate-x-0',
            'group-data-[side=top]/tooltip:group-data-[align=end]/tooltip:left-auto group-data-[side=top]/tooltip:group-data-[align=end]/tooltip:right-3 group-data-[side=top]/tooltip:group-data-[align=end]/tooltip:translate-x-0',
            'group-data-[side=bottom]/tooltip:group-data-[align=start]/tooltip:left-3 group-data-[side=bottom]/tooltip:group-data-[align=start]/tooltip:translate-x-0',
            'group-data-[side=bottom]/tooltip:group-data-[align=end]/tooltip:left-auto group-data-[side=bottom]/tooltip:group-data-[align=end]/tooltip:right-3 group-data-[side=bottom]/tooltip:group-data-[align=end]/tooltip:translate-x-0',
            'group-data-[side=left]/tooltip:group-data-[align=start]/tooltip:top-3 group-data-[side=left]/tooltip:group-data-[align=start]/tooltip:translate-y-0',
            'group-data-[side=left]/tooltip:group-data-[align=end]/tooltip:top-auto group-data-[side=left]/tooltip:group-data-[align=end]/tooltip:bottom-3 group-data-[side=left]/tooltip:group-data-[align=end]/tooltip:translate-y-0',
            'group-data-[side=right]/tooltip:group-data-[align=start]/tooltip:top-3 group-data-[side=right]/tooltip:group-data-[align=start]/tooltip:translate-y-0',
            'group-data-[side=right]/tooltip:group-data-[align=end]/tooltip:top-auto group-data-[side=right]/tooltip:group-data-[align=end]/tooltip:bottom-3 group-data-[side=right]/tooltip:group-data-[align=end]/tooltip:translate-y-0',
            arrowClassName
          )}
        />
      ) : null}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type TooltipPlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

type TooltipBaseProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

type TooltipProps = TooltipBaseProps & {
  children: React.ReactNode;
  title?: React.ReactNode;
  arrow?: boolean;
  placement?: TooltipPlacement;
  contentProps?: Omit<TooltipContentProps, 'children' | 'arrow' | 'side' | 'align'>;
  providerProps?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;
};

function getPlacement(placement: TooltipPlacement = 'top') {
  const [side, alignValue] = placement.split('-') as [
    TooltipPrimitive.TooltipContentProps['side'],
    'start' | 'end' | undefined,
  ];

  return {
    side,
    align: (alignValue ?? 'center') as TooltipPrimitive.TooltipContentProps['align'],
  };
}

function Tooltip(props: TooltipProps) {
  const { title, children, ...restProps } = props;

  if (title === undefined) {
    return <TooltipRoot {...(restProps as TooltipBaseProps)}>{children}</TooltipRoot>;
  }

  const { arrow = false, placement = 'top', contentProps, providerProps, ...rootProps } = restProps;

  if (title === null || title === false || title === '') {
    return children;
  }

  const { side, align } = getPlacement(placement);
  const trigger = React.isValidElement(children) ? (
    <TooltipTrigger asChild>{children}</TooltipTrigger>
  ) : (
    <TooltipTrigger>{children}</TooltipTrigger>
  );

  return (
    <TooltipProvider {...providerProps}>
      <TooltipRoot {...rootProps}>
        {trigger}
        <TooltipContent side={side} align={align} arrow={arrow} {...contentProps}>
          {title}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
export type { TooltipProps, TooltipPlacement, TooltipContentProps };
