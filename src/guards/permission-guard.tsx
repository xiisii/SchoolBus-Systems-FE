import { type FC, type ReactNode } from "react";
import { useAuth } from "src/hooks/use-auth";

interface PermissionGuardProps {
  children: ReactNode;
  apiActions: string[];
  hideText?: boolean;
}

export const PermissionGuard: FC<PermissionGuardProps> = (props) => {
  const { children, apiActions, hideText } = props;
  const { user } = useAuth();

  return <>{children}</>;
};
