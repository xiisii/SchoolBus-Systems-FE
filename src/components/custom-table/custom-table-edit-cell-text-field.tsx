import { ReactNode } from "react";

export const CustomTableEditCellTextfield: (
  editingValue: any,
  onChange: (value: any) => void,
  updating: boolean,
  initialValue: any,
  onUpdate: (value: any) => Promise<any>,
  onCancel: () => void,
  type?: "string" | "number" | "date" | "datetime" | "float"
) => ReactNode = (
  editingValue,
  onChange,
  updating,
  initialValue,
  onUpdate,
  onCancel,
  type
) => {
  return <>Not supported yet</>;
};
