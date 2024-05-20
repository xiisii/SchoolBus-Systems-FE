import clsx from "clsx";
import type { FC } from "react";

interface PaginationProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onChange: (event: any, page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  count,
  onChange,
  rowsPerPage,
}) => {
  return (
    <div className="join">
      {Array(Math.ceil(count / rowsPerPage))
        .fill(0)
        .map((_, index) => (
          <button
            className={clsx(
              "join-item btn",
              index == page ? "btn-active" : undefined
            )}
            key={index}
            onClick={(e) => onChange(e, index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
