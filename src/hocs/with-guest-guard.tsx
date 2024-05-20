import type { FC } from 'react';
import { GuestGuard } from 'src/guards/guest-guard';

export const withGuestGuard = <P extends object>(Component: FC<P>): FC<P> => (props: P) => (
  <GuestGuard>
    <Component {...props} />
  </GuestGuard>
);
