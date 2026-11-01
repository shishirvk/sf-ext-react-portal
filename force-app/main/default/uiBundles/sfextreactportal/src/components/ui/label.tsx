import * as React from 'react';
import { Label as ReactstrapLabel } from 'reactstrap';

import { cn } from '../../lib/utils';

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <ReactstrapLabel
      data-slot="label"
      className={cn(
        'mb-0 gap-2 leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none',
        className
      )}
      {...(props as any)}
    />
  );
}

export { Label };
