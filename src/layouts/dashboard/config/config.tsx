import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useAuth } from "src/hooks/use-auth";
import { getDashboardAdminConfigs } from "./dashboard-admin-configs";

export interface DashboardItem {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: DashboardItem[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: DashboardItem[];
  subheader?: string;
}

export const useSections = () => {
  const { user } = useAuth();

  return useMemo(() => {
    return getDashboardAdminConfigs();
  }, []);
};
