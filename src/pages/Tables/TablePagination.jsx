import React from "react";

const TablePagination = ({
  totalItems = 0,
  limit, // legacy prop name
  pageSize, // some callers use `pageSize` prop
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const effectiveLimit = Number(limit ?? pageSize ?? 10);

  const safeTotalPages = Math.max(
    1,
    Number(totalPages) || Math.ceil(totalItems / effectiveLimit)
  );
  const safeCurrent = Math.min(
    Math.max(1, Number(currentPage) || 1),
    safeTotalPages
  );

  const startItem =
    totalItems === 0 ? 0 : (safeCurrent - 1) * effectiveLimit + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(safeCurrent * effectiveLimit, totalItems);

  const goto = (page) => {
    const p = Math.min(Math.max(1, Number(page) || 1), safeTotalPages);
    if (p !== safeCurrent) onPageChange(p);
  };

  // build page buttons with ellipses
  const getPageButtons = (cur, total, maxButtons = 7) => {
    const pages = [];
    if (total <= maxButtons) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    const siblingCount = 1; // numbers to show on each side of current
    const left = Math.max(2, cur - siblingCount);
    const right = Math.min(total - 1, cur + siblingCount);

    pages.push(1);

    if (left > 2) pages.push("left-ellipsis");

    for (let p = left; p <= right; p++) pages.push(p);

    if (right < total - 1) pages.push("right-ellipsis");

    pages.push(total);
    return pages;
  };

  const pageButtons = getPageButtons(safeCurrent, safeTotalPages);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
        <div className="px-4 py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
          <label className="mr-2">Show</label>
          <select
            value={effectiveLimit}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 mr-4"
            aria-label="Select items per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
        <div
          className="inline-flex items-center rounded-md shadow-sm"
          role="navigation"
          aria-label="Pagination Navigation"
        >
          <button
            onClick={() => goto(1)}
            disabled={safeCurrent === 1}
            className="px-2 py-1 border border-gray-300 rounded-l disabled:opacity-50  dark:text-gray-400"
            aria-label="First page"
          >
            «
          </button>

          <button
            onClick={() => goto(safeCurrent - 1)}
            disabled={safeCurrent === 1}
            className="px-3 py-1 border-t border-b border-gray-300 disabled:opacity-50 dark:text-gray-400"
            aria-label="Previous page"
          >
            Previous
          </button>

          {pageButtons.map((p, idx) => {
            if (p === "left-ellipsis" || p === "right-ellipsis") {
              return (
                <span
                  key={p + idx}
                  className="px-3 py-1 border border-gray-100 text-gray-500"
                >
                  …
                </span>
              );
            }

            const isActive = p === safeCurrent;
            return (
              <button
                key={p}
                onClick={() => goto(p)}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1 border border-gray-300 ${
                  isActive ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => goto(safeCurrent + 1)}
            disabled={safeCurrent === safeTotalPages}
            className="px-3 py-1 border-t border-b border-gray-300 disabled:opacity-50 dark:text-gray-400"
            aria-label="Next page"
          >
            Next
          </button>

          <button
            onClick={() => goto(safeTotalPages)}
            disabled={safeCurrent === safeTotalPages}
            className="px-2 py-1 border border-gray-300 rounded-r disabled:opacity-50 dark:text-gray-400"
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
