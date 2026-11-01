import * as React from 'react';
import {
  PaginationItem as ReactstrapPaginationItem,
  PaginationLink as ReactstrapPaginationLink,
} from 'reactstrap';

import { cn } from '../../lib/utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('pagination mb-0 items-center', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <ReactstrapPaginationItem data-slot="pagination-item" {...(props as any)} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  href,
  ...props
}: PaginationLinkProps) {
  return (
    <ReactstrapPaginationLink
      href={href}
      // Without an href reactstrap renders a <button>; don't let it submit a form.
      type={href ? undefined : 'button'}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        isActive && 'active',
        props['aria-disabled'] && 'disabled',
        className
      )}
      {...(props as any)}
    />
  );
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" className="cn-rtl-flip size-4" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon aria-hidden="true" className="cn-rtl-flip size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('page-link disabled inline-flex items-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
