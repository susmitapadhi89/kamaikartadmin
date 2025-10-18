import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiBarChart2,
  FiCalendar,
  FiUsers,
  FiPercent,
  FiDollarSign,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";

export const CouponDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Sample coupon data
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME20",
      discount: 20,
      type: "percentage",
      minPurchase: 100,
      maxDiscount: 50,
      usageLimit: 100,
      used: 45,
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      status: "active",
      created: "2023-05-15",
      description: "Welcome discount for new customers",
    },
    {
      id: 2,
      code: "SUMMER50",
      discount: 50,
      type: "fixed",
      minPurchase: 200,
      maxDiscount: null,
      usageLimit: 200,
      used: 189,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      status: "active",
      created: "2023-05-20",
      description: "Summer special discount",
    },
    {
      id: 3,
      code: "FREESHIP",
      discount: 0,
      type: "shipping",
      minPurchase: 50,
      maxDiscount: null,
      usageLimit: 500,
      used: 324,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "active",
      created: "2023-01-01",
      description: "Free shipping on orders above $50",
    },
    {
      id: 4,
      code: "FLASH25",
      discount: 25,
      type: "percentage",
      minPurchase: 75,
      maxDiscount: 30,
      usageLimit: 150,
      used: 150,
      startDate: "2023-07-01",
      endDate: "2023-07-07",
      status: "expired",
      created: "2023-06-25",
      description: "Flash sale discount",
    },
    {
      id: 5,
      code: "LOYALTY10",
      discount: 10,
      type: "percentage",
      minPurchase: 0,
      maxDiscount: 20,
      usageLimit: null,
      used: 87,
      startDate: "2023-03-01",
      endDate: "2024-03-01",
      status: "active",
      created: "2023-03-01",
      description: "Loyalty program discount",
    },
  ]);

  // New coupon form state
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    type: "percentage",
    minPurchase: "",
    maxDiscount: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Filter coupons based on active tab, search query, and filters
  const filteredCoupons = coupons
    .filter((coupon) => {
      // Tab filter
      if (activeTab === "active" && coupon.status !== "active") return false;
      if (activeTab === "expired" && coupon.status !== "expired") return false;
      if (activeTab === "scheduled" && new Date(coupon.startDate) > new Date())
        return false;

      // Search filter
      if (
        searchQuery &&
        !coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filterStatus !== "all" && coupon.status !== filterStatus)
        return false;

      // Type filter
      if (filterType !== "all" && coupon.type !== filterType) return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by selected option
      switch (sortBy) {
        case "newest":
          return new Date(b.created) - new Date(a.created);
        case "oldest":
          return new Date(a.created) - new Date(b.created);
        case "mostUsed":
          return b.used - a.used;
        case "leastUsed":
          return a.used - b.used;
        case "discountHigh":
          return b.discount - a.discount;
        case "discountLow":
          return a.discount - b.discount;
        default:
          return 0;
      }
    });

  // Calculate statistics
  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === "active").length,
    expired: coupons.filter((c) => c.status === "expired").length,
    scheduled: coupons.filter((c) => new Date(c.startDate) > new Date()).length,
    totalUsage: coupons.reduce((sum, c) => sum + c.used, 0),
    totalSavings: coupons.reduce((sum, c) => sum + c.used * c.discount, 0),
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate a random coupon code
  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon((prev) => ({ ...prev, code }));
  };

  // Submit new coupon
  const handleSubmit = (e) => {
    e.preventDefault();
    const coupon = {
      ...newCoupon,
      id: coupons.length + 1,
      used: 0,
      status:
        new Date(newCoupon.startDate) > new Date() ? "scheduled" : "active",
      created: new Date().toISOString().split("T")[0],
    };

    setCoupons((prev) => [...prev, coupon]);
    setShowCreateModal(false);
    setNewCoupon({
      code: "",
      discount: "",
      type: "percentage",
      minPurchase: "",
      maxDiscount: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  // Edit coupon
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon(coupon);
    setShowCreateModal(true);
  };

  // Update coupon
  const handleUpdate = (e) => {
    e.preventDefault();
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === editingCoupon.id
          ? { ...newCoupon, id: c.id, used: c.used, created: c.created }
          : c
      )
    );
    setShowCreateModal(false);
    setEditingCoupon(null);
    setNewCoupon({
      code: "",
      discount: "",
      type: "percentage",
      minPurchase: "",
      maxDiscount: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  // Delete coupon
  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // Bulk delete
  const handleBulkDelete = () => {
    setCoupons((prev) => prev.filter((c) => !selectedCoupons.includes(c.id)));
    setSelectedCoupons([]);
  };

  // Toggle coupon selection
  const toggleSelection = (id) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedCoupons.length === filteredCoupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(filteredCoupons.map((c) => c.id));
    }
  };

  // Copy coupon code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  // Check if coupon is expiring soon (within 7 days)
  const isExpiringSoon = (endDate) => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return (
      new Date(endDate) <= sevenDaysFromNow && new Date(endDate) >= new Date()
    );
  };

  // Check if all coupons are selected
  const allSelected =
    selectedCoupons.length === filteredCoupons.length &&
    filteredCoupons.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Coupon Management
          </h1>
          <p className="text-gray-600">Create and manage discount coupons</p>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPercent className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Total Coupons</h3>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Active</h3>
                <p className="text-xl font-bold">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiXCircle className="text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Expired</h3>
                <p className="text-xl font-bold">{stats.expired}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Scheduled</h3>
                <p className="text-xl font-bold">{stats.scheduled}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiUsers className="text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Total Usage</h3>
                <p className="text-xl font-bold">{stats.totalUsage}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FiDollarSign className="text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Total Savings</h3>
                <p className="text-xl font-bold">${stats.totalSavings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FiPlus className="mr-2" /> Create Coupon
              </button>

              {selectedCoupons.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Delete Selected (
                  {selectedCoupons.length})
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search coupons..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <FiFilter className="mr-2" /> Filters
                {showFilters ? (
                  <FiChevronUp className="ml-1" />
                ) : (
                  <FiChevronDown className="ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="shipping">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="mostUsed">Most Used</option>
                    <option value="leastUsed">Least Used</option>
                    <option value="discountHigh">Discount: High to Low</option>
                    <option value="discountLow">Discount: Low to High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "active"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiCheckCircle className="mr-2" /> Active
          </button>
          <button
            onClick={() => setActiveTab("expired")}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "expired"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiXCircle className="mr-2" /> Expired
          </button>
          <button
            onClick={() => setActiveTab("scheduled")}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "scheduled"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiClock className="mr-2" /> Scheduled
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiBarChart2 className="mr-2" /> All Coupons
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Validity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  {/* Only show actions column if not all coupons are selected */}
                  {!allSelected && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCoupons.length > 0 ? (
                  filteredCoupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCoupons.includes(coupon.id)}
                          onChange={() => toggleSelection(coupon.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(coupon.code)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                            title="Copy code"
                          >
                            <FiCopy size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {coupon.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          Min: ${coupon.minPurchase}
                          {coupon.maxDiscount &&
                            ` • Max: $${coupon.maxDiscount}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {coupon.type === "percentage"
                            ? `${coupon.discount}%`
                            : coupon.type === "fixed"
                            ? `$${coupon.discount}`
                            : "Free Shipping"}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {coupon.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {coupon.used}
                          {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${
                                coupon.usageLimit
                                  ? (coupon.used / coupon.usageLimit) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(coupon.startDate).toLocaleDateString()} -{" "}
                          {new Date(coupon.endDate).toLocaleDateString()}
                        </div>
                        {isExpiringSoon(coupon.endDate) && (
                          <div className="text-xs text-yellow-600 flex items-center mt-1">
                            <FiClock className="mr-1" /> Expiring soon
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.status === "active"
                              ? "bg-green-100 text-green-800"
                              : coupon.status === "expired"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      {/* Only show action buttons if not all coupons are selected */}
                      {!allSelected && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(coupon)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(coupon.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={allSelected ? "7" : "8"}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No coupons found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Coupon Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto m-4 h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                </h3>
              </div>

              <form
                onSubmit={editingCoupon ? handleUpdate : handleSubmit}
                className="px-6 py-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="code"
                        value={newCoupon.code}
                        onChange={handleInputChange}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter code"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateCode}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newCoupon.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Coupon description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Type
                      </label>
                      <select
                        name="type"
                        value={newCoupon.type}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                        <option value="shipping">Free Shipping</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {newCoupon.type === "percentage"
                          ? "Discount Percentage"
                          : newCoupon.type === "fixed"
                          ? "Discount Amount"
                          : "Free Shipping"}
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={newCoupon.discount}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder={
                          newCoupon.type === "percentage"
                            ? "e.g., 20"
                            : "e.g., 10"
                        }
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Purchase Amount
                    </label>
                    <input
                      type="number"
                      name="minPurchase"
                      value={newCoupon.minPurchase}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 50"
                      min="0"
                    />
                  </div>

                  {newCoupon.type === "percentage" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Discount Amount (Optional)
                      </label>
                      <input
                        type="number"
                        name="maxDiscount"
                        value={newCoupon.maxDiscount}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 30"
                        min="0"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usage Limit (Optional)
                    </label>
                    <input
                      type="number"
                      name="usageLimit"
                      value={newCoupon.usageLimit}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 100"
                      min="0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={newCoupon.startDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={newCoupon.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingCoupon(null);
                      setNewCoupon({
                        code: "",
                        discount: "",
                        type: "percentage",
                        minPurchase: "",
                        maxDiscount: "",
                        usageLimit: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
