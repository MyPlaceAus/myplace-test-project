import * as React from 'react';
import { X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from 'src/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-1300 bg-black/25',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fullscreen';
  scroll?: 'paper' | 'body';
  showCloseButton?: boolean;
  bodyClassName?: string;
};

const isDialogHeader = (child: React.ReactNode) =>
  React.isValidElement(child) &&
  (child.type as { displayName?: string }).displayName === 'DialogHeader';

const isDialogFooter = (child: React.ReactNode) =>
  React.isValidElement(child) &&
  (child.type as { displayName?: string }).displayName === 'DialogFooter';

const isDialogBody = (child: React.ReactNode) =>
  React.isValidElement(child) &&
  (child.type as { displayName?: string }).displayName === 'DialogBody';

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size = 'md',
      scroll = 'paper',
      showCloseButton = true,
      bodyClassName,
      ...props
    },
    ref
  ) => {
    const sizeClassName = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      full: 'max-w-[calc(100vw-2rem)]',
      fullscreen: 'max-w-none w-screen h-screen rounded-none',
    }[size];

    const isFullScreen = size === 'fullscreen';

    const childArray = React.Children.toArray(children);
    const hasDialogBody = childArray.some(isDialogBody);
    const headerChildren = childArray.filter(isDialogHeader);
    const footerChildren = childArray.filter(isDialogFooter);
    const bodyChildren = childArray.filter(
      (child) => !isDialogHeader(child) && !isDialogFooter(child)
    );

    const resolvedBodyClassName = cn(
      'flex-1 w-full min-h-0 overflow-y-auto px-6 py-4',
      scroll === 'body' && 'flex-none overflow-visible',
      bodyClassName
    );

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'group/dialog bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-1301 flex w-full flex-col border shadow-lg duration-200 sm:rounded-lg',
            'fixed top-[50%] left-[50%] max-h-[calc(100vh-2rem)] translate-x-[-50%] translate-y-[-50%]',
            scroll === 'body' ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden',
            sizeClassName,
            isFullScreen && 'h-screen max-h-none overflow-hidden rounded-none',
            scroll === 'paper' && 'min-h-0',
            className
          )}
          data-scroll={scroll}
          {...props}
        >
          {hasDialogBody ? (
            children
          ) : (
            <>
              {headerChildren}
              {bodyChildren.length > 0 && (
                <div className={resolvedBodyClassName} data-slot="dialog-body">
                  {bodyChildren}
                </div>
              )}
              {footerChildren}
            </>
          )}
          {showCloseButton ? (
            <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 z-20 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bg-background sticky top-0 z-10 flex w-full shrink-0 flex-col space-y-1.5 border-b px-6 py-4 text-center sm:text-left group-data-[scroll=body]/dialog:static',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'min-h-0 w-full flex-1 overflow-y-auto px-6 py-4 group-data-[scroll=body]/dialog:flex-none group-data-[scroll=body]/dialog:overflow-visible',
      className
    )}
    data-slot="dialog-body"
    {...props}
  />
);
DialogBody.displayName = 'DialogBody';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bg-background sticky bottom-0 z-10 flex w-full shrink-0 flex-col-reverse border-t px-6 py-4 sm:flex-row sm:justify-end sm:space-x-2 group-data-[scroll=body]/dialog:static',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogTitle,
  DialogPortal,
  DialogHeader,
  DialogFooter,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogDescription,
};
