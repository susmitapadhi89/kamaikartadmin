import { useState, useMemo, useEffect } from "react";
import { Loader } from "../Common/Loader";

export const ListProduct = ({
  columns = [],
  data = [],
  fetchData, // backend call function
  serverMode = false,
  onEdit,
  onDelete,
  onView,
  onOrderView,
  loading, // ✅ Redux thi
  // totalPages,
  totalItems,
  filtershow = true,
}) => {
  const filterOptions = {
    status: [
      { value: "", label: "Status" },
      { value: "approved", label: "Approved" },
      { value: "reject", label: "Rejected" },
      { value: "block", label: "Blocked" },
      { value: "delete", label: "Deleted" },
    ],
    user_status: [
      { value: "", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  };

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = "";
      return acc;
    }, {})
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log("hii");

  console.log(columns);
  console.log(data);

  // 🔹 Server-side fetch
  useEffect(() => {
    if (!serverMode || !fetchData) return;

    const fetchTableData = async () => {
      try {
        await fetchData({ page: currentPage, limit, filters });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTableData();
  }, [currentPage, limit, filters, fetchData, serverMode]);

  const getCellValue = (row, key) => {
    if (key === "parent") return row.parent?.name ?? "";
    if (key === "main") return row.main?.name ?? "";
    return row[key] ?? "";
  };

  // 🔹 Client-side filtering & pagination
  const filteredData = useMemo(() => {
    if (serverMode) return data; // server already filtered
    return data.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.key].toLowerCase();
        if (!filterValue) return true;
        return getCellValue(row, col.key)
          .toString()
          .toLowerCase()
          .includes(filterValue);
      })
    );
  }, [data, filters, columns, serverMode]);

  const paginatedData = useMemo(() => {
    if (serverMode) return data; // already paginated from server
    const start = (currentPage - 1) * limit;

    return filteredData.slice(start, start + limit);
  }, [filteredData, currentPage, limit, data, serverMode]);

  const totalPages = serverMode
    ? Math.ceil(totalItems / limit) || 1
    : Math.ceil(filteredData.length / limit) || 1;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // reset page
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      {/* Filters */}
      {filtershow && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {columns.map((col) =>
              col.key === "image" ? null : (
                <div key={col.key} className="relative">
                  {filterOptions[col.key] ? (
                    <select
                      value={filters[col.key]}
                      onChange={(e) =>
                        setFilters({ ...filters, [col.key]: e.target.value })
                      }
                      className={`border min-w-[180px] rounded px-2 py-1 text-sm h-9 ${
                        filters[col.key] === "" ? "text-gray-400" : "text-black"
                      }`}
                    >
                      {filterOptions[col.key].map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="text-black"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={filters[col.key]}
                      onChange={(e) =>
                        setFilters({ ...filters, [col.key]: e.target.value })
                      }
                      placeholder={`Filter ${col.label}`}
                      className="border rounded px-2 py-1"
                    />
                  )}
                  {filters[col.key] && !filterOptions[col.key] && (
                    <button
                      onClick={() => handleFilterChange(col.key, "")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {[5, 10, 25, 50, 100].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-blue-300">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || onView || onOrderView) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center"
                >
                  <Loader />
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {col.dropdownOptions ? (
                          // ✅ Dropdown for this column
                          <select
                            value={row[col.key]}
                            onChange={(e) =>
                              col.onUpdate &&
                              col.onUpdate(row.id, e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                          >
                            {col.dropdownOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : col.key === "image" ? (
                          <img
                            src={row[col.key]}
                            alt=""
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : col.key === "parent" ? (
                          row.parent ? (
                            row.parent.name
                          ) : (
                            row.parent_name
                          )
                        ) : col.render ? (
                          col.render(row[col.key], row)
                        ) : typeof row[col.key] === "boolean" ? (
                          row[col.key] ? (
                            "True"
                          ) : (
                            "False"
                          )
                        ) : (
                          row[col.key] ?? "-"
                        )}
                      </div>
                    </td>
                  ))}

                  {(onEdit || onDelete || onView || onOrderView) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        {onView && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(row.id);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row.id);
                            }}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              onDelete(row.id);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                        {onOrderView && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(row.id);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View"
                          >
                            ViewOrder
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{(currentPage - 1) * limit + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {serverMode
              ? Math.min(currentPage * limit, totalItems)
              : Math.min(currentPage * limit, filteredData.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {serverMode ? totalItems : filteredData.length}
          </span>{" "}
          results
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};
