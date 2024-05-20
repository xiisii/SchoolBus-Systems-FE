import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellProps,
  TableProps,
  CardProps,
  Card,
  Checkbox,
  Stack,
  TablePagination,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { Scrollbar, ScrollbarProps } from "./scrollbar";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Selection } from "src/hooks/use-selection";
import { UsePaginationResult } from "src/hooks/use-pagination";
import { Delete, Edit, Warning } from "@mui/icons-material";
import useFunction from "src/hooks/use-function";
import NoSSRWrapper from "src/hocs/no-ssr-wrapper";
import { getObjectValue } from "src/utils/obj-helper";

export type CardTableEditCellProps<
  P,
  T extends { id: P; [key: string]: any }
> = (
  editingValue: any,
  onChange: (value: any) => void,
  updating: boolean,
  initialValue: any,
  onUpdate: (value: any) => Promise<any>,
  onCancel: () => void,
  type?: "string" | "number" | "date" | "datetime"
) => ReactNode;

export interface CardTableConfig<P, T extends { id: P; [key: string]: any }> {
  key: keyof T | string;
  headerLabel: string;
  headerIcon?: ReactNode;
  type?: "string" | "number" | "date" | "datetime";
  headerCellProps?: TableCellProps;
  renderCell?: (cellData: T, onEdit?: () => void) => ReactNode;
  renderEditingCell?: CardTableEditCellProps<P, T>;
  cellProps?: TableCellProps;
}

export interface CardTableProps<P, T extends { id: P; [key: string]: any }> {
  rows: T[];
  configs: CardTableConfig<P, T>[];
  actions?: ReactNode;
  renderRowActions?: (item: T, index: number) => ReactNode;
  cellProps?: TableCellProps;
  tableProps?: TableProps;
  cardProps?: CardProps;
  scrollbarProps?: ScrollbarProps;
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
}
export function CardTable<P, T extends { id: P; [key: string]: any }>({
  rows,
  configs,
  actions,
  renderRowActions,
  cellProps,
  tableProps,
  cardProps,
  scrollbarProps,
  children,
  onClickRow,
  onClickEdit,
  onClickDelete,
  onClickDetail,
  onUpdate,
  indexColumn,
  select,
  pagination,
  stickyHeader,
}: CardTableProps<P, T>) {
  return (
    <NoSSRWrapper>
      <Card elevation={24} {...cardProps}>
        {children}
        <Scrollbar {...scrollbarProps}>
          <Table
            {...tableProps}
            sx={{
              minWidth: 700,
              position: "relative",
              ...tableProps?.sx,
            }}
          >
            <TableHead
              sx={{
                ...(stickyHeader
                  ? { position: "sticky", top: -1, zIndex: 1 }
                  : {}),
                bgcolor: "background.paper-tertiary",
              }}
            >
              <TableRow>
                {(indexColumn || select) && (
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      py: 2,
                    }}
                  >
                    <Stack direction="row" gap={1} alignItems="center">
                      {select && (
                        <Checkbox
                          sx={{ my: -1, mx: -0.5 }}
                          checked={select.selected.length == rows.length}
                          onChange={(e, checked) =>
                            checked
                              ? select.handleSelectAll()
                              : select.handleDeselectAll()
                          }
                        />
                      )}
                      {indexColumn && <>STT</>}
                    </Stack>
                  </TableCell>
                )}
                {configs.map((config) => (
                  <TableCell
                    key={config.key.toString()}
                    {...config.headerCellProps}
                    sx={{
                      whiteSpace: "nowrap",
                      px: 2,
                      ...config.headerCellProps?.sx,
                    }}
                  >
                    <Stack gap={1} alignItems="center" direction="row">
                      {config.headerIcon}
                      {config.headerLabel}
                    </Stack>
                  </TableCell>
                ))}

                {(actions ||
                  onClickDelete ||
                  onClickDetail ||
                  onClickEdit ||
                  renderRowActions) && (
                  <TableCell align="center" width="120px" sx={{ py: 1 }}>
                    {actions}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover={!!onClickRow}
                  onClick={
                    onClickRow ? () => onClickRow(row, index) : undefined
                  }
                  key={row["id" as keyof T] + "-key-" + index}
                  sx={{
                    whiteSpace: "nowrap",
                    px: 2,
                    bgcolor: row.error ? "error.lightest" : undefined,
                    cursor: onClickRow ? "pointer" : undefined,
                  }}
                >
                  {(indexColumn || select) && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      {...cellProps}
                    >
                      <Stack direction="row" gap={1} alignItems="center">
                        {select && (
                          <Checkbox
                            sx={{ my: -1, mx: -0.5 }}
                            checked={select.selected.includes(row)}
                            onChange={(e, checked) =>
                              checked
                                ? select.handleSelectOne(row)
                                : select.handleDeselectOne(row)
                            }
                          />
                        )}
                        {indexColumn && <>{index + 1}</>}
                        {row.error && (
                          <Tooltip title={row.error}>
                            <Warning color="error" />
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                  {configs.map((config) => (
                    <CardTableCell
                      key={config.key.toString()}
                      cellProps={cellProps}
                      data={row}
                      config={config}
                      onUpdate={async (value) =>
                        await onUpdate?.(config.key, value, row, index)
                      }
                    />
                  ))}

                  {(onClickDelete ||
                    onClickDetail ||
                    onClickEdit ||
                    renderRowActions) && (
                    <TableCell
                      align="right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        my={-0.5}
                      >
                        {renderRowActions?.(row, index)}
                        {onClickEdit && (
                          <IconButton onClick={() => onClickEdit(row, index)}>
                            <Edit
                              sx={{ height: "20px", width: "20px" }}
                              color="primary"
                            />
                          </IconButton>
                        )}
                        {onClickDelete && (
                          <IconButton onClick={() => onClickDelete(row, index)}>
                            <Delete
                              sx={{ height: "20px", width: "20px" }}
                              color="inherit"
                            />
                          </IconButton>
                        )}
                        {onClickDetail && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => onClickDetail(row, index)}
                            size="small"
                          >
                            Chi tiết
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        {pagination && (
          <TablePagination
            component="div"
            {...pagination}
            count={pagination.count}
            rowsPerPageOptions={[5, 10, 15]}
          />
        )}
      </Card>
    </NoSSRWrapper>
  );
}

function CardTableCell<P, T extends { id: P; [key: string]: any }>({
  data,
  config,
  onUpdate,
  cellProps,
}: {
  data: T;
  config: CardTableConfig<P, T>;
  onUpdate: (value: any) => Promise<any>;
  cellProps?: TableCellProps;
}) {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState<any>();
  const [color, setColor] = useState("");

  const cellValue = useMemo(() => {
    if (typeof config.key === "string") {
      return getObjectValue(data, config.key);
    } else return data[config.key];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[config.key]]);

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
        : "--"
      : config.type == "datetime"
      ? cellValue
        ? format(new Date(cellValue), "dd/MM/yyyy HH:mm")
        : "--"
      : config.type == "number"
      ? cellValue
        ? Number(cellValue).toLocaleString("vi-VN")
        : "--"
      : String(cellValue || "--");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, data, handleStartEdit, cellValue]);

  useEffect(() => {
    if (color) {
      setTimeout(() => setColor(""), 200);
    }
  }, [color]);

  if (editing && config.renderEditingCell) {
    return (
      <TableCell {...cellProps} {...config.cellProps}>
        {config.renderEditingCell(
          editingValue,
          setEditingValue,
          handleUpdateHelper.loading,
          cellValue || "",
          handleUpdateHelper.call,
          handleCancelEdit,
          config.type
        )}
      </TableCell>
    );
  }

  return (
    <TableCell
      align={config.type == "number" ? "right" : "left"}
      {...cellProps}
      sx={{
        bgcolor: color,
        transition: color ? undefined : "background-color ease 2s",
        px: 2,
        ...cellProps?.sx,
      }}
      {...config.cellProps}
    >
      {config.renderEditingCell ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: -1 }}
        >
          {content}
          <IconButton onClick={handleStartEdit} color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <>{content}</>
      )}
    </TableCell>
  );
}
