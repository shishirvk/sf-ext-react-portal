import * as React from 'react';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link';

const BOOTSTRAP_COLOR: Record<BadgeVariant, string> = {
  default: 'text-bg-primary',
  secondary: 'text-bg-secondary',
  destructive: 'text-bg-danger',
  outline: 'text-bg-light border',
  ghost: 'text-bg-light',
  link: 'text-bg-light',
};

function badgeVariants({
  variant = 'default',
  className,
}: { variant?: BadgeVariant; className?: string } = {}) {
  return cn('badge', BOOTSTRAP_COLOR[variant], className);
}

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & {
  variant?: BadgeVariant;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={badgeVariants({ variant, className })}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
