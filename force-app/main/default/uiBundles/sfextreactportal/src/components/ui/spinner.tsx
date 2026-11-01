import * as React from 'react';
import { Spinner as ReactstrapSpinner } from 'reactstrap';

function Spinner({ ...props }: React.ComponentProps<'span'>) {
  return <ReactstrapSpinner tag="span" size="sm" {...(props as any)} />;
}

export { Spinner };
