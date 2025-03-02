import { PaginationProps } from "./Pagination.types";

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <div className="flex space-x-4 mt-6">
      <button
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
