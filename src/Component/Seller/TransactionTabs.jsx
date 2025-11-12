import React from "react";

const TransactionTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "wallet", label: "Wallet Transactions", icon: "💳" },
    { id: "myOrders", label: "My Orders", icon: "📦" },
    { id: "assignedOrders", label: "Assigned Orders", icon: "🚚" },
    { id: "earnings", label: "Earning History", icon: "💰" },
  ];

  const handleTabClick = (tabId) => {
    console.log("Changing tab to:", tabId); // Debug log
    onTabChange(tabId);
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-200 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TransactionTabs;
