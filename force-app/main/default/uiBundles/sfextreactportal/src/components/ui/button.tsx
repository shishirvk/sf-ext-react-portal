import * as React from 'react';
import { Slot } from 'radix-ui';
import { Button as ReactstrapButton } from 'reactstrap';

import { cn } from '../../lib/utils';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'link';
type ButtonSize =
  | 'default'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-lg';

const BOOTSTRAP_COLOR: Record<ButtonVariant, string> = {
  default: 'primary',
  outline: 'outline-secondary',
  secondary: 'secondary',
  ghost: 'light',
  destructive: 'danger',
  link: 'link',
};

const BOOTSTRAP_SIZE: Partial<Record<ButtonSize, 'sm' | 'lg'>> = {
  xs: 'sm',
  sm: 'sm',
  lg: 'lg',
  'icon-xs': 'sm',
  'icon-sm': 'sm',
  'icon-lg': 'lg',
};

const ICON_SIZE: Partial<Record<ButtonSize, string>> = {
  icon: 'size-9 p-0',
  'icon-xs': 'size-6 p-0',
  'icon-sm': 'size-8 p-0',
  'icon-lg': 'size-11 p-0',
};

/** Layout shared by every button, on top of Bootstrap's .btn styling. */
const BASE =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none";

/** Class names for elements that should look like a button without being one. */
function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  const bootstrapSize = BOOTSTRAP_SIZE[size];
  return cn(
    'btn',
    `btn-${BOOTSTRAP_COLOR[variant]}`,
    bootstrapSize && `btn-${bootstrapSize}`,
    BASE,
    ICON_SIZE[size],
    className
  );
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ref,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const dataProps = { 'data-slot': 'button', 'data-variant': variant, 'data-size': size };

  if (asChild) {
    return (
      <Slot.Root
        {...dataProps}
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...(props as any)}
      />
    );
  }

  return (
    <ReactstrapButton
      {...dataProps}
      type="submit"
      color={BOOTSTRAP_COLOR[variant]}
      size={BOOTSTRAP_SIZE[size]}
      innerRef={ref as any}
      className={cn(BASE, ICON_SIZE[size], className)}
      {...(props as any)}
    />
  );
}

export { Button, buttonVariants };
