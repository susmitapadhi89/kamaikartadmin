import React, { useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp,
  FiPieChart,
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
  FiChevronUp,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const TokenDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("monthly");
  const [expandedSeller, setExpandedSeller] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToken, setSelectedToken] = useState("Tech Store Token (TST)");
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);

  // Sample data - in a real app this would come from an API
  const tokenData = {
    tokens: [
      {
        name: "Tech Store Token (TST)",
        symbol: "TST",
        listedPrice: 80,
        currentPrice: 125.5,
        totalSupply: 10000,
        circulating: 7500,
        performance: {
          monthly: { change: 12, trend: "up" },
          quarterly: { change: 8, trend: "up" },
          yearly: { change: 24, trend: "up" },
        },
      },
      {
        name: "ElectroHub Token (EHT)",
        symbol: "EHT",
        listedPrice: 80,
        currentPrice: 89.2,
        totalSupply: 15000,
        circulating: 12000,
        performance: {
          monthly: { change: 5, trend: "up" },
          quarterly: { change: 15, trend: "up" },
          yearly: { change: 32, trend: "up" },
        },
      },
      {
        name: "Gadget Galaxy Token (GGT)",
        symbol: "GGT",
        currentPrice: 75.8,
        listedPrice: 80,
        totalSupply: 8000,
        circulating: 6000,
        performance: {
          monthly: { change: -2, trend: "down" },
          quarterly: { change: 3, trend: "up" },
          yearly: { change: 18, trend: "up" },
        },
      },
      {
        name: "Tech Paradise Token (TPT)",
        symbol: "TPT",
        currentPrice: 110.3,
        listedPrice: 80,
        totalSupply: 12000,
        circulating: 9500,
        performance: {
          monthly: { change: 8, trend: "up" },
          quarterly: { change: 12, trend: "up" },
          yearly: { change: 28, trend: "up" },
        },
      },
    ],
    holders: [
      { name: "Rahul S.", tokens: 1500, value: 18825 },
      { name: "Priya M.", tokens: 88, value: 11170 },
      { name: "Amit K.", tokens: 234, value: 29367 },
    ],
    sellers: [
      {
        id: 1,
        name: "ElectroHub",
        tokens: [
          { name: "Tech Store Token", value: 125.5, quantity: 500 },
          { name: "ElectroHub Token", value: 89.2, quantity: 300 },
          { name: "Premium Membership", value: 250.0, quantity: 50 },
          { name: "Discount Token", value: 45.0, quantity: 200 },
          { name: "Loyalty Points", value: 10.0, quantity: 1000 },
        ],
      },
      {
        id: 2,
        name: "Gadget Galaxy",
        tokens: [
          { name: "Tech Store Token", value: 125.5, quantity: 250 },
          { name: "Gadget Galaxy Token", value: 75.8, quantity: 400 },
          { name: "VIP Access", value: 199.9, quantity: 75 },
          { name: "Early Access Pass", value: 149.9, quantity: 120 },
          { name: "Warranty Extension", value: 99.9, quantity: 80 },
        ],
      },
      {
        id: 3,
        name: "Tech Paradise",
        tokens: [
          { name: "Tech Store Token", value: 125.5, quantity: 800 },
          { name: "Tech Paradise Token", value: 110.3, quantity: 200 },
          { name: "Elite Membership", value: 350.0, quantity: 30 },
          { name: "Premium Support", value: 199.0, quantity: 45 },
          { name: "Exclusive Content", value: 79.9, quantity: 150 },
        ],
      },
      {
        id: 4,
        name: "Digital World",
        tokens: [
          { name: "Tech Store Token", value: 125.5, quantity: 600 },
          { name: "Digital World Token", value: 95.0, quantity: 350 },
          { name: "Streaming Pass", value: 129.9, quantity: 90 },
          { name: "Cloud Storage", value: 69.9, quantity: 200 },
          { name: "Gaming Access", value: 149.9, quantity: 70 },
        ],
      },
      {
        id: 5,
        name: "Future Tech",
        tokens: [
          { name: "Tech Store Token", value: 125.5, quantity: 400 },
          { name: "Future Tech Token", value: 135.0, quantity: 250 },
          { name: "Innovation Kit", value: 299.9, quantity: 40 },
          { name: "Beta Access", value: 89.9, quantity: 180 },
          { name: "Tech Insights", value: 59.9, quantity: 220 },
        ],
      },
    ],
  };

  const toggleSeller = (sellerId) => {
    if (expandedSeller === sellerId) {
      setExpandedSeller(null);
    } else {
      setExpandedSeller(sellerId);
    }
  };

  // Filter sellers based on search query
  const filteredSellers = tokenData.sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.tokens.some((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Get currently selected token data
  const currentToken =
    tokenData.tokens.find((token) => token.name === selectedToken) ||
    tokenData.tokens[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Token Dashboard
          </h1>
          <p className="text-gray-600">Manage your token ecosystem</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Products Listed
                </h3>
                <p className="text-2xl font-bold mt-1">₹200</p>
              </div>
            </div>
          </div>

          {/* Empty space for medium and large screens */}
          <div className="hidden md:block lg:block md:col-span-1 lg:col-span-1"></div>

          {/* Buttons container - positioned to the right */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:col-span-2 lg:col-span-2">
            {/* Your Token Account Value Button */}
            <button
              className="bg-primary hover:bg-blue-700 text-fontcolourwhite py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => navigate("/admin/Token/Account")}
            >
              <FiDollarSign className="mr-2" />
              Your Token Account
            </button>

            {/* New Token Add Button */}
            <button className="bg-green-600  text-fontcolourwhite py-2 px-4 rounded-lg flex items-center justify-center">
              <FiDollarSign className="mr-2" />
              Add New Token
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Token Performance</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["monthly", "quarterly", "yearly"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === range
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mb-6">
              <button
                onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                className="flex items-center justify-between w-full md:w-80 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg font-medium"
              >
                <span className="flex items-center">
                  <FiDollarSign className="mr-2" /> {selectedToken}
                </span>
                {showTokenDropdown ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {showTokenDropdown && (
                <div className="absolute z-10 mt-1 w-full md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {tokenData.tokens.map((token) => (
                    <button
                      key={token.name}
                      onClick={() => {
                        setSelectedToken(token.name);
                        setShowTokenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-gray-500">
                        Current: ₹{token.currentPrice}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Listed Price</p>
                <p className="text-xl font-bold">₹{currentToken.listedPrice}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Current Price</p>
                <p className="text-xl font-bold">
                  ₹{currentToken.currentPrice}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm"> Price</p>
                <p className="text-xl font-bold">
                  ₹{currentToken.currentPrice}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Total Supply</p>
                <p className="text-xl font-bold">
                  {currentToken.totalSupply.toLocaleString()}{" "}
                  {currentToken.symbol}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Circulating</p>
                <p className="text-xl font-bold">
                  {currentToken.circulating.toLocaleString()}{" "}
                  {currentToken.symbol}
                </p>
              </div>
            </div>

            {/* Circulation Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Circulation Progress</span>
                <span>
                  {(
                    (currentToken.circulating / currentToken.totalSupply) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (currentToken.circulating / currentToken.totalSupply) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            {/* <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center text-gray-400">
              [Performance Chart - Monthly/Quarterly/Yearly]
            </div> */}
          </div>

          {/* Top Token Holders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Top Token Holders</h2>
              <span className="text-sm text-gray-500">
                {tokenData.holders.length} holders
              </span>
            </div>
            <p className="text-gray-600 mb-6">Users holding your tokens</p>

            <div className="space-y-6">
              {tokenData.holders.map((holder, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    {holder.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{holder.name}</h4>
                      <p className="font-medium">
                        ₹{holder.value.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {holder.tokens} tokens
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seller List Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">
              Seller Tokens
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search sellers or tokens..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-4 pr-2">
              {filteredSellers.length > 0 ? (
                filteredSellers.map((seller) => (
                  <div
                    key={seller.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSeller(seller.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">
                          {expandedSeller === seller.id ? (
                            <FiChevronDown className="text-gray-500" />
                          ) : (
                            <FiChevronRight className="text-gray-500" />
                          )}
                        </span>
                        <h3 className="font-medium">{seller.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          Current Price: ₹{currentToken.currentPrice}
                        </p>
                        <p className="text-sm text-gray-500">
                          {seller.tokens.length} token types
                        </p>
                      </div>
                    </div>

                    {expandedSeller === seller.id && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-3">
                          Token Details
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Token Name
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Current Price
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total Value
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {seller.tokens.map((token, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {token.name}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    ₹{token.value}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {token.quantity}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600">
                                    ₹
                                    {(
                                      token.value * token.quantity
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No sellers or tokens found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
