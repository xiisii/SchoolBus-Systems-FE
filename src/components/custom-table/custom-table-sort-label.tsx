import React from "react";
import clsx from "clsx";

interface TableSortLabelProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  active?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomTableSortLabel: React.FC<TableSortLabelProps> = ({
  active,
  direction,
  onClick,
  children,
  style,
  className,
  ...rest
}) => {
  const mergedClassName = clsx(className, {
    "cursor-pointer": onClick,
    "hover:underline": onClick,
    "font-semibold": active,
    "ml-1": active && direction === "desc",
    "mr-1": active && direction === "asc",
  });

  return (
    <div onClick={onClick} style={style} className={mergedClassName} {...rest}>
      {children}
      {active && (
        <span
          className={`ml-1 ${
            direction === "desc" ? "text-descending" : "text-ascending"
          }`}
        >
          {direction === "desc" ? "▼" : "▲"}
        </span>
      )}
    </div>
  );
};

export default CustomTableSortLabel;
