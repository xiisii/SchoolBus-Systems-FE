import type { FC } from 'react';
import { AuthGuard } from 'src/guards/auth-guard';

export const withAuthGuard = <P extends object>(Component: FC<P>): FC<P> => (props: P) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
