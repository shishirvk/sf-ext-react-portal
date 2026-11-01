import * as React from 'react';

import { cn } from '../../lib/utils';

const ALERT_COLOR = { default: 'secondary', destructive: 'danger' } as const;

/**
 * Bootstrap alert markup. This is not reactstrap's Alert because that component
 * always sets role="alert", and some screens turn the role off on purpose so
 * screen readers don't announce a message twice.
 */
function Alert({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: keyof typeof ALERT_COLOR }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        'alert',
        `alert-${ALERT_COLOR[variant]}`,
        "mb-0 grid gap-0.5 text-left has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 w-full group/alert",
        className
      )}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'alert-heading font-semibold group-has-[>svg]/alert:col-start-2',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm group-has-[>svg]/alert:col-start-2 [&_p:not(:last-child)]:mb-4 [&_p:last-child]:mb-0',
        className
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-action"
      className={cn('absolute top-2 right-2', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
