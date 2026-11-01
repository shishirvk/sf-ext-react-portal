import * as React from 'react';
import { Input as ReactstrapInput } from 'reactstrap';

import { cn } from '../../lib/utils';

function Input({ className, ref, ...props }: React.ComponentProps<'input'>) {
  const ariaInvalid = props['aria-invalid'];
  return (
    <ReactstrapInput
      data-slot="input"
      innerRef={ref as any}
      invalid={ariaInvalid === true || ariaInvalid === 'true'}
      className={cn('w-full min-w-0', className)}
      {...(props as any)}
    />
  );
}

export { Input };
