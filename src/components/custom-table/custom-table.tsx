import { isValid } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getObjectValue } from "src/utils/obj-helper";
import { CustomTableCell } from "./custom-table-cell";
import { CustomTableHeader } from "./custom-table-header";
import { CustomTableProps, CustomTableSortModel } from "./custom-table.types";
import SimpleBar from "simplebar-react";
import { BsPencilFill, BsTrash2Fill } from "react-icons/bs";
import clsx from "clsx";
import { IoWarning } from "react-icons/io5";
import Pagination from "../Pagination";

export function CustomTable<P, T extends { id: P; [key: string]: any }>(
  props: CustomTableProps<P, T> &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) {
  const {
    rows,
    configs,
    actions,
    renderRowActions,
    cellClassName,
    tableClassName,
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
    additionalTopRow,
    additionalBottomRow,
    loading,
    flexible,
    emptyState,
    onChangeSortModel,
    ...stackProps
  } = props;

  const [sortModel, setSortModel] = useState<CustomTableSortModel<P, T>>();
  const [isMounted, setIsMounted] = useState(false);
  const scrollBar = useRef<any>(null);

  const sortedRows = useMemo(() => {
    if (onChangeSortModel) {
      return rows;
    }
    const config = configs.find((c) => c.key == sortModel?.key);
    if (!sortModel || !config) {
      return rows;
    }
    const sortDirection = sortModel.direction == "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const valueA = getObjectValue(a, sortModel.key);
      const valueB = getObjectValue(b, sortModel.key);
      if (!valueA) return 1;
      if (!valueB) return -1;
      if (config.type == "date" || config.type == "datetime") {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        if (!isValid(dateA)) return 1;
        if (!isValid(dateB)) return -1;
        return (dateA.getTime() - dateB.getTime()) * sortDirection;
      }
      if (config.type == "number" || config.type == "float") {
        return (Number(valueA) - Number(valueB)) * sortDirection;
      }
      return String(valueA).localeCompare(String(valueB)) * sortDirection;
    });
  }, [configs, onChangeSortModel, rows, sortModel]);

  const pagedRows = useMemo(() => {
    return pagination
      ? sortedRows.slice(
          pagination.rowsPerPage * (pagination.page - 1),
          pagination.rowsPerPage * pagination.page
        )
      : sortedRows;
  }, [pagination, sortedRows]);

  const handleClickSort = useCallback(
    (key: keyof T | string) => {
      const f = onChangeSortModel || setSortModel;
      if (key == sortModel?.key && sortModel.direction == "desc") {
        f(undefined);
      } else {
        f({
          key: key,
          direction: sortModel?.key != key ? "asc" : "desc",
        });
      }
    },
    [onChangeSortModel, sortModel?.direction, sortModel?.key]
  );

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000);
    const interval = setInterval(() => scrollBar.current?.recalculate?.(), 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div {...stackProps}>
      {children}
      <SimpleBar {...scrollbarProps} ref={scrollBar}>
        <table
          className={clsx(
            "relative min-w-[700px]",
            isMounted && flexible ? "table-fixed" : undefined,
            tableClassName
          )}
        >
          <CustomTableHeader
            {...props}
            sortModel={sortModel}
            onClickSort={handleClickSort}
          />
          <tbody>
            {additionalTopRow}
            {pagedRows.map((row, index) => (
              <tr
                key={row.id + "-key-" + index}
                className={clsx(
                  "text-nowrap px-2",
                  row.error ? "bg-error-900" : undefined,
                  onClickRow ? "cursor-pointer hover:bg-orange-900" : undefined
                )}
              >
                {(indexColumn || select) && (
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className={cellClassName}
                  >
                    <div className="flex gap-1 items-center">
                      {select && (
                        <input
                          type="checkbox"
                          className={clsx("checkbox -my-1 -mx-1")}
                          checked={select.selected.includes(row)}
                          onChange={(e) =>
                            e.target.checked
                              ? select.handleSelectOne(row)
                              : select.handleDeselectOne(row)
                          }
                        />
                      )}
                      {indexColumn && <>{index + 1}</>}
                      {row.error && (
                        <div className="tooltip" data-tip={row.error}>
                          <IoWarning className="bg-error" />
                        </div>
                      )}
                    </div>
                  </td>
                )}
                {configs.map((config) => (
                  <CustomTableCell
                    key={config.key.toString()}
                    cellClassName={cellClassName}
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
                  <td align="right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end -my-1">
                      {renderRowActions?.(row, index)}
                      {onClickEdit && (
                        <div
                          className="btn btn-circle"
                          onClick={() => onClickEdit(row, index)}
                        >
                          <BsPencilFill className="h-4 w-4 bg-blue-500" />
                        </div>
                      )}
                      {onClickDelete && (
                        <div
                          className="btn btn-circle"
                          onClick={() => onClickDelete(row, index)}
                        >
                          <BsTrash2Fill className="h-4 w-4 bg-blue-500" />
                        </div>
                      )}
                      {onClickDetail && (
                        <div
                          className="btn btn-outline bg-primary btn-sm"
                          onClick={() => onClickDetail(row, index)}
                        >
                          Chi tiết
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {additionalBottomRow}
          </tbody>
        </table>
        {(loading || rows.length == 0) && <div className="h-[104px]" />}
      </SimpleBar>
      {(loading || rows.length == 0) && (
        <div className="-mt-2 h-[100px] w-full flex items-center justify-center sticky left-0">
          {loading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : emptyState ? (
            emptyState
          ) : (
            <div className="text-lg">No data</div>
          )}
        </div>
      )}
      {pagination && (
        <Pagination
          page={pagination.page}
          count={pagination.totalPages}
          onChange={pagination.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
        />
      )}
    </div>
  );
}
