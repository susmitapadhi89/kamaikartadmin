// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export const Homepage = () => {
//   const [timeRange, setTimeRange] = useState("week");
//   const [activeTab, setActiveTab] = useState("overview");

//   // Mock data - replace with actual API calls
//   const dashboardData = {
//     summary: {
//       todaySales: 12500,
//       weeklySales: 87500,
//       monthlySales: 325000,
//       growthRate: 12.5,
//       activeProducts: 45,
//       inactiveProducts: 8,
//       pendingOrders: 12,
//       deliveredOrders: 89,
//       walletBalance: 56780,
//       upcomingPayout: 23450,
//     },
//     salesData: [
//       { day: "Mon", sales: 12000, orders: 15 },
//       { day: "Tue", sales: 19000, orders: 22 },
//       { day: "Wed", sales: 15000, orders: 18 },
//       { day: "Thu", sales: 22000, orders: 28 },
//       { day: "Fri", sales: 18000, orders: 20 },
//       { day: "Sat", sales: 25000, orders: 32 },
//       { day: "Sun", sales: 21000, orders: 26 },
//     ],
//     categorySales: [
//       { name: "Clothing", value: 35 },
//       { name: "Electronics", value: 25 },
//       { name: "Home Decor", value: 20 },
//       { name: "Books", value: 15 },
//       { name: "Others", value: 5 },
//     ],
//     topProducts: [
//       { id: 1, name: "Red Kurta", sales: 45, revenue: 67500, rating: 4.5 },
//       {
//         id: 2,
//         name: "Wireless Headphones",
//         sales: 32,
//         revenue: 48000,
//         rating: 4.7,
//       },
//       { id: 3, name: "Designer Saree", sales: 28, revenue: 42000, rating: 4.8 },
//       { id: 4, name: "Smart Watch", sales: 25, revenue: 62500, rating: 4.3 },
//       {
//         id: 5,
//         name: "Handmade Jewelry",
//         sales: 22,
//         revenue: 33000,
//         rating: 4.6,
//       },
//     ],
//     recentOrders: [
//       {
//         id: "#ORD-1001",
//         customer: "Rajesh Patel",
//         amount: 2499,
//         status: "Delivered",
//         date: "2024-01-15",
//       },
//       {
//         id: "#ORD-1002",
//         customer: "Priya Sharma",
//         amount: 1899,
//         status: "Processing",
//         date: "2024-01-15",
//       },
//       {
//         id: "#ORD-1003",
//         customer: "Amit Kumar",
//         amount: 3299,
//         status: "Shipped",
//         date: "2024-01-14",
//       },
//       {
//         id: "#ORD-1004",
//         customer: "Neha Gupta",
//         amount: 1599,
//         status: "Pending",
//         date: "2024-01-14",
//       },
//       {
//         id: "#ORD-1005",
//         customer: "Sanjay Singh",
//         amount: 2799,
//         status: "Delivered",
//         date: "2024-01-13",
//       },
//     ],
//     alerts: [
//       {
//         type: "stock",
//         message: "Red Kurta has only 5 items left",
//         priority: "high",
//       },
//       {
//         type: "suggestion",
//         message: "તમારા Red Kurta પર 30% વધુ sales થયા છે, stock વધારો",
//         priority: "medium",
//       },
//       {
//         type: "order",
//         message: "3 new orders pending processing",
//         priority: "medium",
//       },
//     ],
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

//   const StatusBadge = ({ status }) => {
//     const colors = {
//       Delivered: "bg-green-100 text-green-800",
//       Shipped: "bg-blue-100 text-blue-800",
//       Processing: "bg-yellow-100 text-yellow-800",
//       Pending: "bg-red-100 text-red-800",
//     };

//     return (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   const StatCard = ({ title, value, subtitle, trend, icon }) => (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//           <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
//         </div>
//         <div
//           className={`p-3 rounded-full ${
//             trend >= 0 ? "bg-green-100" : "bg-red-100"
//           }`}
//         >
//           {icon}
//         </div>
//       </div>
//       {trend && (
//         <div
//           className={`flex items-center mt-2 text-sm ${
//             trend >= 0 ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           <span>{trend >= 0 ? "↗" : "↘"}</span>
//           <span className="ml-1">{Math.abs(trend)}% from last period</span>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
//         <p className="text-gray-600">
//           Welcome back! Here's your business overview
//         </p>
//       </div>

//       {/* Alert Notifications */}
//       <div className="mb-6 space-y-3">
//         {dashboardData.alerts.map((alert, index) => (
//           <div
//             key={index}
//             className={`p-4 rounded-lg border-l-4 ${
//               alert.priority === "high"
//                 ? "border-red-500 bg-red-50"
//                 : alert.priority === "medium"
//                 ? "border-yellow-500 bg-yellow-50"
//                 : "border-blue-500 bg-blue-50"
//             }`}
//           >
//             <div className="flex items-center">
//               <span
//                 className={`mr-3 ${
//                   alert.priority === "high"
//                     ? "text-red-500"
//                     : alert.priority === "medium"
//                     ? "text-yellow-500"
//                     : "text-blue-500"
//                 }`}
//               >
//                 {alert.type === "stock"
//                   ? "⚠️"
//                   : alert.type === "suggestion"
//                   ? "💡"
//                   : "📦"}
//               </span>
//               <span className="text-sm">{alert.message}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Time Range Selector */}
//       <div className="mb-6 flex space-x-2">
//         {["today", "week", "month", "year"].map((range) => (
//           <button
//             key={range}
//             onClick={() => setTimeRange(range)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium ${
//               timeRange === range
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {range.charAt(0).toUpperCase() + range.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Summary Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard
//           title="Today's Sales"
//           value={`₹${dashboardData.summary.todaySales.toLocaleString()}`}
//           subtitle="Total revenue"
//           trend={12.5}
//           icon="💰"
//         />
//         <StatCard
//           title="Active Products"
//           value={dashboardData.summary.activeProducts}
//           subtitle={`${dashboardData.summary.inactiveProducts} inactive`}
//           trend={8.2}
//           icon="🛍️"
//         />
//         <StatCard
//           title="Orders"
//           value={dashboardData.summary.deliveredOrders}
//           subtitle={`${dashboardData.summary.pendingOrders} pending`}
//           trend={15.3}
//           icon="📦"
//         />
//         <StatCard
//           title="Wallet Balance"
//           value={`₹${dashboardData.summary.walletBalance.toLocaleString()}`}
//           subtitle={`₹${dashboardData.summary.upcomingPayout.toLocaleString()} upcoming`}
//           trend={5.7}
//           icon="💳"
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Sales Chart */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Sales & Orders Trend</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={dashboardData.salesData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="sales" fill="#8884d8" name="Sales (₹)" />
//               <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category Sales */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={dashboardData.categorySales}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {dashboardData.categorySales.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tables Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Products */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h3 className="text-lg font-semibold">Top Performing Products</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Sales
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Revenue
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Rating
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {dashboardData.topProducts.map((product) => (
//                   <tr key={product.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {product.name}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {product.sales}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         ₹{product.revenue.toLocaleString()}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <span className="text-sm text-gray-900 mr-1">
//                           {product.rating}
//                         </span>
//                         <span className="text-yellow-400">⭐</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h3 className="text-lg font-semibold">Recent Orders</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Customer
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {dashboardData.recentOrders.map((order) => (
//                   <tr key={order.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-blue-600">
//                         {order.id}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {order.customer}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         ₹{order.amount}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <StatusBadge status={order.status} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-6 bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//             <span className="mr-2">➕</span>
//             Add New Product
//           </button>
//           <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//             <span className="mr-2">🚚</span>
//             Process Orders
//           </button>
//           <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//             <span className="mr-2">💸</span>
//             Withdraw Balance
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const Homepage = () => {
  const [timeRange, setTimeRange] = useState("month");
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 3D Chart Data
  const salesData = [
    { month: "Jan", sales: 45000, orders: 125, profit: 12000 },
    { month: "Feb", sales: 52000, orders: 145, profit: 15000 },
    { month: "Mar", sales: 48000, orders: 135, profit: 13000 },
    { month: "Apr", sales: 61000, orders: 165, profit: 18000 },
    { month: "May", sales: 75000, orders: 195, profit: 22000 },
    { month: "Jun", sales: 82000, orders: 210, profit: 25000 },
    { month: "Jul", sales: 78000, orders: 185, profit: 23000 },
    { month: "Aug", sales: 95000, orders: 240, profit: 29000 },
    { month: "Sep", sales: 88000, orders: 220, profit: 26000 },
    { month: "Oct", sales: 92000, orders: 235, profit: 28000 },
    { month: "Nov", sales: 105000, orders: 265, profit: 32000 },
    { month: "Dec", sales: 120000, orders: 300, profit: 38000 },
  ];

  const stockAlerts = [
    { product: "Red Kurta", stock: 5, threshold: 20, priority: "high" },
    { product: "Designer Saree", stock: 12, threshold: 25, priority: "medium" },
    { product: "Silk Dress", stock: 8, threshold: 15, priority: "high" },
    { product: "Casual Shirt", stock: 22, threshold: 30, priority: "low" },
  ];

  const bestSellingProducts = [
    { name: "Red Kurta", sales: 156, revenue: 234000, growth: 25, rating: 4.8 },
    {
      name: "Designer Saree",
      sales: 134,
      revenue: 201000,
      growth: 18,
      rating: 4.9,
    },
    { name: "Silk Dress", sales: 98, revenue: 147000, growth: 32, rating: 4.7 },
    {
      name: "Casual Shirt",
      sales: 87,
      revenue: 65250,
      growth: 12,
      rating: 4.5,
    },
    {
      name: "Traditional Jewelry",
      sales: 76,
      revenue: 114000,
      growth: 28,
      rating: 4.6,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-7841",
      customer: "Priya Sharma",
      amount: 4599,
      status: "Delivered",
      date: "2024-01-15",
    },
    {
      id: "#ORD-7842",
      customer: "Rajesh Patel",
      amount: 3299,
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "#ORD-7843",
      customer: "Amit Kumar",
      amount: 5899,
      status: "Shipped",
      date: "2024-01-14",
    },
    {
      id: "#ORD-7844",
      customer: "Neha Gupta",
      amount: 2799,
      status: "Pending",
      date: "2024-01-14",
    },
    {
      id: "#ORD-7845",
      customer: "Sanjay Singh",
      amount: 3899,
      status: "Delivered",
      date: "2024-01-13",
    },
  ];

  const customerFeedback = [
    {
      name: "Priya S.",
      comment: "Excellent quality! Perfect fit.",
      rating: 5,
      sentiment: "positive",
    },
    {
      name: "Rajesh P.",
      comment: "Good product but delivery was late",
      rating: 3,
      sentiment: "neutral",
    },
    {
      name: "Amit K.",
      comment: "Amazing fabric quality. Will buy again!",
      rating: 5,
      sentiment: "positive",
    },
    {
      name: "Neha G.",
      comment: "Color slightly different from photo",
      rating: 4,
      sentiment: "positive",
    },
  ];

  // 3D Card Component
  const Card3D = ({ children, className = "" }) => (
    <div
      className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20
      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)",
      }}
    >
      {children}
    </div>
  );

  const StatCard = ({ title, value, change, icon, color }) => (
    <Card3D className="p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 -mr-4 -mt-4 opacity-10">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p
            className={`text-sm font-medium ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? "↗" : "↘"} {Math.abs(change)}% from last period
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
      </div>
    </Card3D>
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      Delivered: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      Shipped: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      Processing: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      Pending: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your business overview
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-lg rounded-xl p-1">
            {["day", "week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === range
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Row - Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value="₹12.4L"
          change={18.2}
          icon="💰"
          color="from-green-400 to-green-600"
        />
        <StatCard
          title="Total Orders"
          value="2,847"
          change={12.5}
          icon="📦"
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          title="Wallet Balance"
          value="₹3.2L"
          change={8.7}
          icon="💳"
          color="from-purple-400 to-purple-600"
        />
        <StatCard
          title="Active Products"
          value="156"
          change={5.3}
          icon="🛍️"
          color="from-orange-400 to-orange-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Section - Sales Graph */}
        <div className="lg:col-span-2">
          <Card3D className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Sales Performance
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">
                  Sales
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-lg">
                  Orders
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-lg">
                  Profit
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card3D>
        </div>

        {/* Right Section - Stock Alerts & Notifications */}
        <div className="space-y-6">
          <Card3D className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Stock Alerts
            </h3>
            <div className="space-y-3">
              {stockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {alert.product}
                    </p>
                    <p className="text-sm text-gray-600">
                      Only {alert.stock} left
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      alert.priority === "high"
                        ? "bg-red-500 text-white"
                        : alert.priority === "medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {alert.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card3D>
        </div>
      </div>

      {/* Middle Section - Orders Table */}
      <Card3D className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-semibold">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 text-blue-600 font-medium">{order.id}</td>
                  <td className="py-4 font-medium text-gray-900">
                    {order.customer}
                  </td>
                  <td className="py-4 font-semibold text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card3D>

      {/* Bottom Section - Best Selling Products & Customer Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Selling Products */}
        <Card3D className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Best Selling Products
          </h3>
          <div className="space-y-4">
            {bestSellingProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">👗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{product.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-500">+{product.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card3D>

        {/* Customer Feedback */}
        <Card3D className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Customer Feedback
          </h3>
          <div className="space-y-4">
            {customerFeedback.map((feedback, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">{feedback.name}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-sm font-semibold">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{feedback.comment}</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    feedback.sentiment === "positive"
                      ? "bg-green-100 text-green-800"
                      : feedback.sentiment === "neutral"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {feedback.sentiment}
                </span>
              </div>
            ))}
          </div>
        </Card3D>
      </div>
    </div>
  );
};
