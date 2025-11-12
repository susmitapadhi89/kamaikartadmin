import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import TransactionTabs from "../../../Component/Seller/TransactionTabs";
import { GetSellerById } from "../../../Redux/Features/SellerServicesSlice";
import SearchFilters from "../../../Component/Seller/SearchFilters";
import UserProfileCard from "../../../Component/Seller/UserProfileCard";
import StatsOverview from "../../../Component/Seller/StatsOverview";
import { ListProduct } from "../../../Component/Tableview/Showdata";

export const SellerDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const { seller, loading, error } = useSelector((state) => state.SellerOperation);
  const [activeTab, setActiveTab] = useState("wallet");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetSellerById(id));
  }, [dispatch, id]);

   // Mock data - ensure all data has proper structure
  const mockData = {
    wallet: [
      {
        id: 1,
        sn: 1,
        type: "Debit",
        refNo: "ref_QRfAxhdSwy7o",
        amount: "$ 111",
        status: "successful",
        createdAt: "2025-10-18 10:46:42",
      },
      {
        id: 2,
        sn: 2,
        type: "Credit",
        refNo: "ref_sgl.DBAESp5g5",
        amount: "$ 500",
        status: "successful",
        createdAt: "2025-10-16 16:21:52",
      },
    ],
    earnings: [
      {
        id: 1,
        sn: 1,
        commission: "90%",
        earning: "$10",
        adminEarned: "$1",
        balance: "$9",
        order: "8459937969",
        createdAt: "18 Oct 2025",
      },
      {
        id: 2,
        sn: 2,
        commission: "90%",
        earning: "$10",
        adminEarned: "$1",
        balance: "$9",
        order: "0835341398",
        createdAt: "15 Oct 2025",
      },
    ],
    myOrders: [
      {
        id: 1,
        sn: 1,
        code: "3978771378",
        status: "Delivered",
        total: "$ 61",
        createdAt: "2025-10-07 11:09:24",
      },
      {
        id: 2,
        sn: 2,
        code: "4661567621",
        status: "Cancelled",
        total: "$ 30",
        createdAt: "2025-10-06 18:41:58",
      },
    ],
    assignedOrders: [
      {
        id: 1,
        sn: 1,
        code: "1234567890",
        status: "Pending",
        total: "$ 50",
        createdAt: "2025-10-08 10:30:00",
      },
      {
        id: 2,
        sn: 2,
        code: "0987654321",
        status: "In Progress",
        total: "$ 75",
        createdAt: "2025-10-07 14:20:00",
      },
    ],
  };

  const userData = {
    id: "#396",
    driverId: "YMzNW driver",
    joinDate: "27 Sep 2025 11:00 am",
    name: "Dharmesh Dholakiya",
    email: "dharmesh@gmail.com",
    phone: "+919033461564",
    walletBalance: "259",
    totalOrders: "8",
    mostExpensiveOrder: "76",
  };

  // Load data when tab changes
  useEffect(() => {
    setLoading(true);

    // Simulate API call
    const timer = setTimeout(() => {
      const data = mockData[activeTab] || [];
      console.log("Loading data for tab:", activeTab, data); // Debug log
      setTableData(data);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Define columns based on active tab
  const getColumns = () => {
    const baseColumns = {
      wallet: [
        { key: "sn", label: "S/N" },
        { key: "type", label: "TYPE" },
        { key: "refNo", label: "REF NO." },
        { key: "amount", label: "AMOUNT" },
        { key: "status", label: "STATUS" },
        { key: "createdAt", label: "CREATED AT" },
      ],
      earnings: [
        { key: "sn", label: "S/N" },
        { key: "commission", label: "COMMISSION" },
        { key: "earning", label: "EARNING" },
        { key: "adminEarned", label: "ADMIN EARNED" },
        { key: "balance", label: "BALANCE" },
        { key: "order", label: "ORDER" },
        { key: "createdAt", label: "CREATED AT" },
      ],
      myOrders: [
        { key: "sn", label: "S/N" },
        { key: "code", label: "CODE" },
        { key: "status", label: "STATUS" },
        { key: "total", label: "TOTAL" },
        { key: "createdAt", label: "CREATED AT" },
      ],
      assignedOrders: [
        { key: "sn", label: "S/N" },
        { key: "code", label: "CODE" },
        { key: "status", label: "STATUS" },
        { key: "total", label: "TOTAL" },
        { key: "createdAt", label: "CREATED AT" },
      ],
    };

    return baseColumns[activeTab] || baseColumns.wallet;
  };

  // Add custom renderers
  const getColumnRenderers = () => {
    return getColumns().map((col) => {
      switch (col.key) {
        case "type":
          return {
            ...col,
            render: (value) => (
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  value === "Credit"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {value}
              </span>
            ),
          };
        case "status":
          return {
            ...col,
            render: (value) => (
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  value === "successful" || value === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : value === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : value === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : value === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {value}
              </span>
            ),
          };
        case "amount":
        case "earning":
        case "adminEarned":
        case "balance":
        case "total":
          return {
            ...col,
            render: (value) => (
              <span className="font-semibold text-gray-900">{value}</span>
            ),
          };
        case "refNo":
        case "order":
        case "code":
          return {
            ...col,
            render: (value) => (
              <code className="text-sm bg-gray-50 px-2 py-1 rounded font-mono">
                {value}
              </code>
            ),
          };
        case "commission":
          return {
            ...col,
            render: (value) => (
              <span className="font-medium text-blue-600">{value}</span>
            ),
          };
        default:
          return col;
      }
    });
  };

  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab); // Debug log
    setActiveTab(tab);
    setSearchQuery("");
    setFilters({});
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEdit = (id) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item:", id);
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with User Profile */}
        <UserProfileCard userData={userData} />

        {/* Stats Overview */}
        <StatsOverview userData={userData} />

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6">
            {/* Tabs Navigation */}
            <TransactionTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Search and Filters */}
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              filters={filters}
              onFilterChange={handleFilterChange}
              activeTab={activeTab}
            />

            {/* ListProduct Table */}
            <div className="mt-6">
              <ListProduct
                columns={getColumnRenderers()}
                data={tableData}
                loading={loading}
                totalItems={tableData.length}
                serverMode={false} // Client-side filtering for now
                filtershow={false}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

//   if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Seller Details (ID: {id})</h1>

//       {seller && (
//         <div className="mb-6">
//           <p><strong>Name:</strong> {seller.name}</p>
//           <p><strong>Email:</strong> {seller.email}</p>
//           <p><strong>Phone:</strong> {seller.phone}</p>
//         </div>
//       )}

//       {/* Tabs */}
//       <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />

//       {/* Tab Content */}
//       <div className="mt-6">
//         {activeTab === "wallet" && (
//           <div className="bg-white rounded-lg shadow p-4">
//             💳 Wallet Transactions Section
//           </div>
//         )}
//         {activeTab === "myOrders" && (
//           <div className="bg-white rounded-lg shadow p-4">
//             📦 My Orders Section
//           </div>
//         )}
//         {activeTab === "assignedOrders" && (
//           <div className="bg-white rounded-lg shadow p-4">
//             🚚 Assigned Orders Section
//           </div>
//         )}
//         {activeTab === "earnings" && (
//           <div className="bg-white rounded-lg shadow p-4">
//             💰 Earning History Section
//           </div>
//         )}
//       </div>
//     </div>
//   );
};