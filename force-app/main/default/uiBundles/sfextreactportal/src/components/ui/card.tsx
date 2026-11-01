import * as React from 'react';
import {
  Card as ReactstrapCard,
  CardBody,
  CardFooter as ReactstrapCardFooter,
  CardHeader as ReactstrapCardHeader,
  CardSubtitle,
  CardTitle as ReactstrapCardTitle,
} from 'reactstrap';

import { cn } from '../../lib/utils';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <ReactstrapCard
      data-slot="card"
      data-size={size}
      className={cn('shadow-sm group/card data-[size=sm]:text-sm', className)}
      {...(props as any)}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <ReactstrapCardHeader
      data-slot="card-header"
      className={cn(
        'border-b-0 bg-transparent pt-4 pb-0 gap-1 grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className
      )}
      {...(props as any)}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <ReactstrapCardTitle
      tag="div"
      data-slot="card-title"
      className={cn('mb-0 text-xl leading-snug font-medium', className)}
      {...(props as any)}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <CardSubtitle
      tag="div"
      data-slot="card-description"
      className={cn('mt-0 text-muted-foreground', className)}
      {...(props as any)}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <CardBody
      data-slot="card-content"
      className={cn(className)}
      {...(props as any)}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <ReactstrapCardFooter
      data-slot="card-footer"
      className={cn('flex items-center', className)}
      {...(props as any)}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
