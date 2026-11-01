'use client';

import * as React from 'react';
import { Input as ReactstrapInput } from 'reactstrap';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  onCheckedChange,
  ref,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'> & {
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <ReactstrapInput
      type="checkbox"
      data-slot="checkbox"
      innerRef={ref as any}
      className={cn('mt-0 shrink-0 cursor-pointer', className)}
      onChange={(event) => onCheckedChange?.(event.target.checked)}
      {...(props as any)}
    />
  );
}

export { Checkbox };
