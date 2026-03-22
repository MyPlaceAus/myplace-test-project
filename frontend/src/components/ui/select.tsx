import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from 'src/lib/utils';

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectVisualVariant = 'outlined' | 'filled' | 'standard';

const SelectVariantContext = React.createContext<SelectVisualVariant | undefined>(undefined);

type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  visualVariant?: SelectVisualVariant;
};

const Select = ({ visualVariant, ...props }: SelectProps) => (
  <SelectVariantContext.Provider value={visualVariant}>
    <SelectPrimitive.Root {...props} />
  </SelectVariantContext.Provider>
);

const selectTriggerVariantClasses: Record<SelectVisualVariant, string> = {
  outlined:
    'border-input bg-background hover:border-primary/60 focus:border-primary focus:ring-3 focus:ring-primary/25 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:ring-offset-0 data-[state=open]:border-primary data-[state=open]:ring-3 data-[state=open]:ring-primary/25',
  filled:
    'border-transparent bg-muted hover:brightness-95 focus:bg-muted focus:brightness-95 focus:border-transparent focus:ring-0 focus:ring-offset-0 focus-visible:bg-muted focus-visible:brightness-95 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-muted data-[state=open]:brightness-95 data-[state=open]:border-transparent data-[state=open]:ring-0 disabled:bg-muted disabled:brightness-93 disabled:text-muted-foreground disabled:opacity-100',
  standard:
    'rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none hover:border-ring/80 focus:ring-0 focus:border-b-2 focus:border-ring focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-ring data-[state=open]:border-b-2 data-[state=open]:border-ring',
};

const selectTriggerInvalidClasses =
  'aria-invalid:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus:ring-destructive/25 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25 aria-invalid:data-[state=open]:border-destructive aria-invalid:data-[state=open]:ring-destructive/25 group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus:border-destructive group-data-[invalid=true]/field:focus:ring-destructive/25 group-data-[invalid=true]/field:focus-visible:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive/25 group-data-[invalid=true]/field:data-[state=open]:border-destructive group-data-[invalid=true]/field:data-[state=open]:ring-destructive/25';

const selectTriggerFilledInvalidClasses =
  'aria-invalid:border-transparent aria-invalid:bg-destructive/10 aria-invalid:hover:bg-destructive/15 aria-invalid:focus:bg-destructive/15 aria-invalid:focus-visible:bg-destructive/15 aria-invalid:data-[state=open]:bg-destructive/15 aria-invalid:focus:ring-0 aria-invalid:focus-visible:ring-0 aria-invalid:data-[state=open]:ring-0 group-data-[invalid=true]/field:border-transparent group-data-[invalid=true]/field:bg-destructive/10 group-data-[invalid=true]/field:hover:bg-destructive/15 group-data-[invalid=true]/field:focus:bg-destructive/15 group-data-[invalid=true]/field:focus-visible:bg-destructive/15 group-data-[invalid=true]/field:data-[state=open]:bg-destructive/15 group-data-[invalid=true]/field:focus:ring-0 group-data-[invalid=true]/field:focus-visible:ring-0 group-data-[invalid=true]/field:data-[state=open]:ring-0';

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    visualVariant?: SelectVisualVariant;
  }
>(({ className, children, visualVariant, ...props }, ref) => {
  const inheritedVariant = React.useContext(SelectVariantContext);
  const resolvedVariant = visualVariant ?? inheritedVariant ?? 'outlined';
  const invalidClasses =
    resolvedVariant === 'filled' ? selectTriggerFilledInvalidClasses : selectTriggerInvalidClasses;

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'ring-offset-background data-placeholder:text-muted-foreground focus:ring-ring focus-visible:ring-ring flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-sm focus:ring-1 focus-visible:ring-1 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:truncate',
        selectTriggerVariantClasses[resolvedVariant],
        invalidClasses,
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-1950 max-h-[--radix-select-content-available-height] min-w-32 origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
