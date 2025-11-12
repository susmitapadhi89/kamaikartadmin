import React, { useState } from "react";

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  activeTab,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter options based on active tab
  const getFilterOptions = () => {
    const baseOptions = {
      wallet: [
        { value: "all", label: "All Types" },
        { value: "Credit", label: "Credit" },
        { value: "Debit", label: "Debit" },
      ],
      earnings: [
        { value: "all", label: "All Commissions" },
        { value: "90%", label: "90% Commission" },
        { value: "80%", label: "80% Commission" },
        { value: "70%", label: "70% Commission" },
      ],
      myOrders: [
        { value: "all", label: "All Status" },
        { value: "Delivered", label: "Delivered" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Pending", label: "Pending" },
      ],
      assignedOrders: [
        { value: "all", label: "All Status" },
        { value: "Pending", label: "Pending" },
        { value: "In Progress", label: "In Progress" },
        { value: "Completed", label: "Completed" },
      ],
    };

    return baseOptions[activeTab] || baseOptions.wallet;
  };

  const getDateFilterOptions = () => [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleStatusFilter = (value) => {
    onFilterChange({
      ...filters,
      status: value === "all" ? "" : value,
    });
  };

  const handleDateFilter = (value) => {
    onFilterChange({
      ...filters,
      dateRange: value === "all" ? "" : value,
    });
  };

  const handleAmountFilter = (min, max) => {
    onFilterChange({
      ...filters,
      amountRange: { min, max },
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
    setIsFilterOpen(false);
  };

  const hasActiveFilters = () => {
    return filters.status || filters.dateRange || filters.amountRange;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={`Search ${
                activeTab === "wallet"
                  ? "transactions"
                  : activeTab === "earnings"
                  ? "earnings"
                  : "orders"
              }...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       bg-white text-gray-900 placeholder-gray-500
                       transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          {/* Quick Status Filter */}
          {getFilterOptions().length > 0 && (
            <div className="relative">
              <select
                value={filters.status || "all"}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5
                         pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm font-medium text-gray-700 hover:bg-gray-50
                         transition-colors duration-200 cursor-pointer"
              >
                {getFilterOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Date Filter */}
          <div className="relative">
            <select
              value={filters.dateRange || "all"}
              onChange={(e) => handleDateFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5
                       pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       text-sm font-medium text-gray-700 hover:bg-gray-50
                       transition-colors duration-200 cursor-pointer"
            >
              {getDateFilterOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border text-sm font-medium
                     transition-all duration-200 ${
                       isFilterOpen || hasActiveFilters()
                         ? "bg-blue-50 border-blue-200 text-blue-700"
                         : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                     }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <span>Filters</span>
            {hasActiveFilters() && (
              <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 px-3 py-2.5 text-sm font-medium text-gray-600
                       hover:text-gray-800 transition-colors duration-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isFilterOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Amount Range Filter */}
            {(activeTab === "wallet" || activeTab === "earnings") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.amountRange?.min || ""}
                    onChange={(e) =>
                      handleAmountFilter(
                        e.target.value,
                        filters.amountRange?.max
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.amountRange?.max || ""}
                    onChange={(e) =>
                      handleAmountFilter(
                        filters.amountRange?.min,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Order Value Filter */}
            {(activeTab === "myOrders" || activeTab === "assignedOrders") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Value
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Date Range Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                           focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                           focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                              focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Amount: High to Low</option>
                <option value="amount_low">Amount: Low to High</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Active Filters:
              </h4>
              <div className="flex flex-wrap gap-2">
                {filters.status && (
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs
                                font-medium bg-blue-100 text-blue-800"
                  >
                    Status: {filters.status}
                    <button
                      onClick={() => handleStatusFilter("all")}
                      className="ml-1 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.dateRange && filters.dateRange !== "all" && (
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs
                                font-medium bg-green-100 text-green-800"
                  >
                    Date: {filters.dateRange}
                    <button
                      onClick={() => handleDateFilter("all")}
                      className="ml-1 hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.amountRange &&
                  (filters.amountRange.min || filters.amountRange.max) && (
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs
                                font-medium bg-purple-100 text-purple-800"
                    >
                      Amount: {filters.amountRange.min || "0"} -{" "}
                      {filters.amountRange.max || "∞"}
                      <button
                        onClick={() => handleAmountFilter("", "")}
                        className="ml-1 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
              </div>
            </div>
          )}

          {/* Filter Actions */}
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900
                       transition-colors duration-200"
            >
              Reset All
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
                       hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
