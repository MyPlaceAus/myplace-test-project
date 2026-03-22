import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X, Info, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from 'src/lib/utils';

type AlertSeverity = 'success' | 'info' | 'warning' | 'error';
type AlertVariant = 'standard' | 'outlined' | 'filled';
type AlertColor = AlertSeverity | 'inherit';

const alertVariants = cva('flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm', {
  variants: {
    variant: {
      standard: 'border-transparent',
      outlined: '',
      filled: 'border-transparent',
    },
    color: {
      success: '',
      info: '',
      warning: '',
      error: '',
      inherit: '',
    },
  },
  defaultVariants: {
    variant: 'standard',
    color: 'info',
  },
});

const alertColorClasses: Record<AlertVariant, Record<AlertColor, string>> = {
  standard: {
    success: 'bg-emerald-50 text-emerald-900',
    info: 'bg-blue-50 text-blue-900',
    warning: 'bg-amber-50 text-amber-900',
    error: 'bg-red-50 text-red-900',
    inherit: 'bg-background text-foreground',
  },
  outlined: {
    success: 'bg-transparent text-emerald-900 border-emerald-300',
    info: 'bg-transparent text-blue-900 border-blue-300',
    warning: 'bg-transparent text-amber-900 border-amber-300',
    error: 'bg-transparent text-red-900 border-red-300',
    inherit: 'bg-background text-foreground border-border',
  },
  filled: {
    success: 'bg-emerald-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-600 text-white',
    inherit: 'bg-foreground text-background',
  },
};

const iconColorClasses: Record<AlertVariant, Record<AlertColor, string>> = {
  standard: {
    success: 'text-emerald-700',
    info: 'text-blue-700',
    warning: 'text-amber-700',
    error: 'text-red-700',
    inherit: 'text-foreground',
  },
  outlined: {
    success: 'text-emerald-700',
    info: 'text-blue-700',
    warning: 'text-amber-700',
    error: 'text-red-700',
    inherit: 'text-foreground',
  },
  filled: {
    success: 'text-white/90',
    info: 'text-white/90',
    warning: 'text-white/90',
    error: 'text-white/90',
    inherit: 'text-background',
  },
};

const defaultIconMapping: Record<AlertSeverity, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  color?: AlertColor;
  icon?: React.ReactNode | false;
  iconMapping?: Partial<Record<AlertSeverity, React.ReactNode>>;
  action?: React.ReactNode;
  onClose?: (event: React.SyntheticEvent) => void;
  closeText?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      severity = 'info',
      variant = 'standard',
      color,
      icon,
      iconMapping,
      action,
      onClose,
      closeText = 'Close',
      role = 'alert',
      children,
      ...props
    },
    ref
  ) => {
    const resolvedColor = color ?? severity;
    const iconNode =
      icon === false ? null : (icon ?? iconMapping?.[severity] ?? defaultIconMapping[severity]);
    const actionNode =
      action ??
      (onClose ? (
        <button
          type="button"
          aria-label={closeText}
          onClick={onClose}
          className="-mr-1 rounded-md p-1 text-current/70 transition hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null);

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          alertVariants({ variant, color: resolvedColor }),
          alertColorClasses[variant][resolvedColor],
          className
        )}
        {...props}
      >
        {iconNode && (
          <div className={cn('shrink-0', iconColorClasses[variant][resolvedColor])}>{iconNode}</div>
        )}
        <div className="min-w-0 flex-1">{children}</div>
        {actionNode && <div className="ml-2 flex shrink-0 items-center">{actionNode}</div>}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 leading-tight font-medium tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
