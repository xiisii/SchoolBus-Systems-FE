import { useMemo } from "react";
import { CustomTableHeaderCell } from "./custom-table-header-cell";
import { CustomTableProps, CustomTableSortModel } from "./custom-table.types";
import { CustomTableResizableCell } from "./custom-table-resizable-cell";
import clsx from "clsx";

export function CustomTableHeader<P, T extends { id: P; [key: string]: any }>(
  props: CustomTableProps<P, T> & {
    sortModel?: CustomTableSortModel<P, T>;
    onClickSort?: (key: keyof T | string) => void;
    onResized?: () => void;
  }
) {
  const {
    rows,
    configs,
    actions,
    renderRowActions,
    onClickEdit,
    onClickDelete,
    onClickDetail,
    indexColumn,
    select,
    stickyHeader,
    flexible,
  } = props;

  const hasGroupedHeaderLabel = useMemo(
    () => configs.some((c) => c.groupedHeaderLabel),
    [configs]
  );

  return (
    <thead
      className={clsx("bg-slate-100", stickyHeader ? "sticky -top-1 z-10" : "")}
    >
      <tr>
        {(indexColumn || select) && (
          <CustomTableResizableCell
            className="text-nowrap py-2"
            rowSpan={hasGroupedHeaderLabel ? 2 : 1}
          >
            <div className="flex gap-1 items-center">
              {select && (
                <input
                  type="checkbox"
                  className={clsx("checkbox -my-1 -mx-1")}
                  checked={select.selected.length >= rows.length}
                  onChange={(e) =>
                    e.target.checked
                      ? select.handleSelectAll()
                      : select.handleDeselectAll()
                  }
                />
              )}
              {indexColumn && <>STT</>}
            </div>
          </CustomTableResizableCell>
        )}
        {configs.map((config, index) =>
          index == 0 ||
          !config.groupedHeaderLabel ||
          config.groupedHeaderLabel != configs[index - 1].groupedHeaderLabel ? (
            <CustomTableHeaderCell
              key={config.key.toString()}
              {...props}
              hasGroupedHeaderLabel={hasGroupedHeaderLabel}
              config={config}
            />
          ) : null
        )}

        {(actions ||
          onClickDelete ||
          onClickDetail ||
          onClickEdit ||
          renderRowActions) && (
          <th
            className="w-[120px] py-1"
            align="center"
            rowSpan={hasGroupedHeaderLabel ? 2 : 1}
          >
            {actions}
          </th>
        )}
      </tr>
      {hasGroupedHeaderLabel && (
        <tr>
          {configs.map((config) =>
            config.groupedHeaderLabel ? (
              <th
                key={config.key.toString()}
                className={clsx("text-nowrap px-2", config.headerCellClassName)}
              >
                <div className="flex gap-1 items-center">
                  {config.headerIcon}
                  {config.headerLabel}
                </div>
              </th>
            ) : null
          )}
        </tr>
      )}
    </thead>
  );
}
