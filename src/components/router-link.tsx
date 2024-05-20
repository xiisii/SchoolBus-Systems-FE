import { forwardRef } from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

/**
 * This is a wrapper over `next/link` component.
 * We use this to help us maintain consistency between CRA and Next.js
 */
export const RouterLink = forwardRef((props: LinkProps, ref: any) => (
  <Link
    ref={ref}
    {...props}
  />
));
