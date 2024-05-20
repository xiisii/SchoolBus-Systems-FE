import { format } from "date-fns";
import { useState, useCallback, useMemo, ReactNode, useEffect } from "react";
import { getObjectValue } from "src/utils/obj-helper";
import { CustomTableConfig } from "./custom-table.types";
import useFunction from "src/hooks/use-function";
import { BsPencilFill } from "react-icons/bs";
import clsx from "clsx";

export function CustomTableCell<P, T extends { id: P; [key: string]: any }>({
  data,
  config,
  onUpdate,
  cellClassName,
}: {
  data: T;
  config: CustomTableConfig<P, T>;
  onUpdate: (value: any) => Promise<any>;
  cellClassName?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState<any>();
  const [color, setColor] = useState("");

  const cellValue =
    typeof config.key === "string"
      ? getObjectValue(data, config.key)
      : data[config.key];

  const handleUpdate = useCallback(
    async (value: any): Promise<any> => {
      await onUpdate(value);
      setEditing(false);
    },
    [onUpdate]
  );

  const handleStartEdit = useCallback(() => {
    setEditing(true);
    setEditingValue(cellValue);
  }, [cellValue]);

  const handleCancelEdit = useCallback(() => setEditing(false), []);
  const handleUpdateHelper = useFunction(handleUpdate, {
    onSuccess: () => setColor("success.lightest"),
    onError: () => setColor("error.lightest"),
  });

  const content = useMemo((): ReactNode => {
    return config.renderCell
      ? config.renderCell(data, handleStartEdit)
      : config.type == "date"
      ? cellValue
        ? format(new Date(cellValue), "dd/MM/yyyy")
        : ""
      : config.type == "datetime"
      ? cellValue
        ? format(new Date(cellValue), "dd/MM/yyyy HH:mm")
        : ""
      : config.type == "number" || config.type == "float"
      ? cellValue
        ? Number(cellValue).toLocaleString("vi-VN")
        : ""
      : String(cellValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, data, handleStartEdit, cellValue]);

  useEffect(() => {
    if (color) {
      setTimeout(() => setColor(""), 200);
    }
  }, [color]);

  if (editing && config.renderEditingCell) {
    return (
      <td className={clsx(cellClassName, config.cellClassName)}>
        {config.renderEditingCell(
          editingValue,
          setEditingValue,
          handleUpdateHelper.loading,
          cellValue || "",
          handleUpdateHelper.call,
          handleCancelEdit,
          config.type
        )}
      </td>
    );
  }

  return (
    <td
      align={
        config.type == "number" || config.type == "float" ? "right" : "left"
      }
      className={clsx("overflow-hidden", cellClassName, config.cellClassName)}
    >
      {config.renderEditingCell ? (
        <div className="flex items-center justify-end -my-1">
          {content}
          <div className="btn btn-circle btn-outline" onClick={handleStartEdit}>
            <BsPencilFill fontSize="small" />
          </div>
        </div>
      ) : (
        <>{content}</>
      )}
    </td>
  );
}
