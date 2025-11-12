import React from "react";

const StatCard = ({ title, value, icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
  };

  return (
    <div
      className={`rounded-xl border-2 p-6 ${colorClasses[color]} transition-all duration-200 hover:shadow-md hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xl lg:text-2xl font-medium mt-2">{value}</p>
          {trend && <p className="text-xs mt-1 font-medium ">{trend}</p>}
        </div>
        <div className="text-2xl opacity-75">{icon}</div>
      </div>
    </div>
  );
};

const StatsOverview = ({ userData }) => {
  const stats = [
    {
      title: "Sohan Gohel",
      trend: "sohansohan304@gmail.com",

      value: `9409694074`,

      color: "black",
    },
    {
      title: "Wallet Balance",
      value: `$${userData.walletBalance}`,
      icon: "💰",
      color: "green",
      trend: "+12% from last month",
    },
    {
      title: "Total Orders",
      value: userData.totalOrders,
      icon: "📦",
      color: "blue",
      trend: "8 completed this month",
    },
    {
      title: "Most Expensive Order",
      value: `$${userData.mostExpensiveOrder}`,
      icon: "💎",
      color: "purple",
      trend: "Highest single order",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
