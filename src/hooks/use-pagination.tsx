import { useCallback, useState } from "react";

interface UsePaginationProps {
  count: number;
  initialRowsPerPage?: number;
}

export interface UsePaginationResult {
  count: number;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function usePagination({
  count,
  initialRowsPerPage,
}: UsePaginationProps): UsePaginationResult {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 10);

  const totalPages = Math.ceil(count / rowsPerPage);

  const onPageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const onRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return {
    count,
    page,
    rowsPerPage,
    totalPages,
    onPageChange,
    onRowsPerPageChange,
  };
}

export default usePagination;
