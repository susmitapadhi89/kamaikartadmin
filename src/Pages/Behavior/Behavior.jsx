import React, { useState } from "react";

export const BehaviorDisputes = () => {
  // Sample dispute data
  const [disputes, setDisputes] = useState([
    {
      id: 1,
      userId: "user123",
      userName: "John Doe",
      orderId: "ORD-78945",
      type: "Return Abuse",
      status: "Open",
      date: "2023-10-15",
      description:
        "Customer has returned 15 out of last 20 orders with questionable reasons.",
      priority: "High",
    },
    {
      id: 2,
      userId: "user456",
      userName: "Jane Smith",
      orderId: "ORD-78216",
      type: "Fake Reviews",
      status: "In Progress",
      date: "2023-10-14",
      description:
        "User has posted multiple fake 5-star reviews for their own products.",
      priority: "Medium",
    },
    {
      id: 3,
      userId: "user789",
      userName: "Robert Johnson",
      orderId: "ORD-78123",
      type: "Payment Fraud",
      status: "Resolved",
      date: "2023-10-10",
      description:
        "Used stolen credit card information for multiple purchases.",
      priority: "High",
    },
    {
      id: 4,
      userId: "user101",
      userName: "Sarah Williams",
      orderId: "ORD-77981",
      type: "Harassment",
      status: "Open",
      date: "2023-10-08",
      description:
        "Customer service agent reported abusive language during chat support.",
      priority: "Medium",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
    priority: "All",
  });

  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter disputes based on selected filters
  const filteredDisputes = disputes.filter((dispute) => {
    return (
      (filters.status === "All" || dispute.status === filters.status) &&
      (filters.type === "All" || dispute.type === filters.type) &&
      (filters.priority === "All" || dispute.priority === filters.priority)
    );
  });

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setDisputes(
      disputes.map((dispute) =>
        dispute.id === id ? { ...dispute, status: newStatus } : dispute
      )
    );
  };

  // Open dispute detail modal
  const openDisputeDetail = (dispute) => {
    setSelectedDispute(dispute);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Behavior Disputes
      </h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="All">All Types</option>
              <option value="Return Abuse">Return Product</option>
              <option value="Fake Reviews">Fake Reviews</option>
              <option value="Payment Fraud">Payment Fraud</option>
              <option value="Harassment">Item not recievd </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {dispute.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {dispute.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dispute.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dispute.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        dispute.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : dispute.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {dispute.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={dispute.status}
                      onChange={(e) =>
                        handleStatusChange(dispute.id, e.target.value)
                      }
                      className={`text-sm font-medium rounded-md px-2 py-1
                        ${
                          dispute.status === "Open"
                            ? "bg-blue-100 text-blue-800"
                            : dispute.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dispute.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openDisputeDetail(dispute)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDisputes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No disputes match the selected filters
          </div>
        )}
      </div>

      {/* Dispute Detail Modal */}
      {isDetailModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Dispute Details
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">User</h4>
                  <p className="text-lg font-semibold">
                    {selectedDispute.userName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedDispute.userId}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Order ID
                  </h4>
                  <p className="text-lg font-semibold">
                    {selectedDispute.orderId}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Type</h4>
                  <p className="text-lg font-semibold">
                    {selectedDispute.type}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Priority
                  </h4>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      selectedDispute.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : selectedDispute.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedDispute.priority}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Description
                </h4>
                <p className="mt-1 text-gray-800">
                  {selectedDispute.description}
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Save Changes
              </button>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
