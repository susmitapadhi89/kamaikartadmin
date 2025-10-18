import { useState } from "react";

export const AccountBalance = () => {
  const [currentValue, setCurrentValue] = useState(12575.5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  // Handle adding balance
  const handleAddBalance = () => {
    if (amount && parseFloat(amount) > 0) {
      setCurrentValue((prev) => prev + parseFloat(amount));
      setAmount("");
      setShowAddModal(false);
    }
  };

  // Handle withdrawing balance
  const handleWithdrawBalance = () => {
    if (
      amount &&
      parseFloat(amount) > 0 &&
      parseFloat(amount) <= currentValue
    ) {
      setCurrentValue((prev) => prev - parseFloat(amount));
      setAmount("");
      setShowWithdrawModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Account Balance */}
      <header className="bg-primary text-white rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Token Account Dashboard</h1>
          <div className="text-right">
            <p className="text-xl">Account Balance</p>
            <p className="text-3xl font-bold">{formatCurrency(currentValue)}</p>
          </div>
        </div>

        {/* Add Balance and Withdraw Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Balance
          </button>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <i className="fas fa-minus-circle mr-2"></i>
            Withdraw
          </button>
        </div>
      </header>

      {/* Add Balance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">Add Balance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAmount("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBalance}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Balance Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">Withdraw Funds</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Available Balance:
                </span>
                <span className="font-medium">
                  {formatCurrency(currentValue)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Withdraw (USD)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  max={currentValue}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setAmount("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawBalance}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sample content below the header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Your Token Portfolio</h2>
        <p className="text-gray-600">
          Your tokens and investments will appear here.
        </p>
      </div>
    </div>
  );
};
