import { ComponentProps, ReactNode } from "react";
import { Selection } from "src/hooks/use-selection";
import { UsePaginationResult } from "src/hooks/use-pagination";
import SimpleBar from "simplebar-react";

export type CustomTableEditCellProps<
  P,
  T extends { id: P; [key: string]: any }
> = (
  editingValue: any,
  onChange: (value: any) => void,
  updating: boolean,
  initialValue: any,
  onUpdate: (value: any) => Promise<any>,
  onCancel: () => void,
  type?: "string" | "number" | "date" | "datetime" | "float"
) => ReactNode;

export interface CustomTableConfig<P, T extends { id: P; [key: string]: any }> {
  key: keyof T | string;
  headerLabel: string;
  groupedHeaderLabel?: string;
  headerIcon?: ReactNode;
  type?: "string" | "number" | "date" | "datetime" | "float";
  headerCellClassName?: string;
  renderCell?: (cellData: T, onEdit?: () => void) => ReactNode;
  renderEditingCell?: CustomTableEditCellProps<P, T>;
  cellClassName?: string;
}

export interface CustomTableSortModel<
  P,
  T extends { id: P; [key: string]: any }
> {
  key: keyof T | string;
  direction: "asc" | "desc";
}

export interface CustomTableProps<P, T extends { id: P; [key: string]: any }> {
  rows: T[];
  configs: CustomTableConfig<P, T>[];
  actions?: ReactNode;
  renderRowActions?: (item: T, index: number) => ReactNode;
  cellClassName?: string;
  tableClassName?: string;
  scrollbarProps?: ComponentProps<typeof SimpleBar>;
  children?: ReactNode;
  onClickRow?: (item: T, index: number) => void;
  onClickEdit?: (item: T, index: number) => void;
  onClickDelete?: (item: T, index: number) => void;
  onClickDetail?: (item: T, index: number) => void;
  onUpdate?: (key: keyof T, value: any, item: T, index: number) => Promise<any>;
  indexColumn?: boolean;
  select?: Selection<T>;
  pagination?: UsePaginationResult;
  stickyHeader?: boolean;
  additionalTopRow?: ReactNode;
  additionalBottomRow?: ReactNode;
  loading?: boolean;
  flexible?: boolean;
  emptyState?: ReactNode;
  onChangeSortModel?: (sortModel?: CustomTableSortModel<P, T>) => void;
}
