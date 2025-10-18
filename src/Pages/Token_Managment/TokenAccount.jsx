import { useEffect, useState } from "react";
import { AccountBalance } from "../../Component/Token/AccountBalanceModel";

// Sample token data
const sampleTokens = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    quantity: 3.2,
    buyPrice: 1800,
    currentPrice: 1950,
  },
  {
    id: 2,
    name: "Bitcoin",
    symbol: "BTC",
    quantity: 0.5,
    buyPrice: 42000,
    currentPrice: 45500,
  },
  {
    id: 3,
    name: "Cardano",
    symbol: "ADA",
    quantity: 1000,
    buyPrice: 0.45,
    currentPrice: 0.48,
  },
  {
    id: 4,
    name: "Polkadot",
    symbol: "DOT",
    quantity: 50,
    buyPrice: 18,
    currentPrice: 16.5,
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    quantity: 8,
    buyPrice: 95,
    currentPrice: 102,
  },
];

export const TokenAccount = () => {
  const [tokens, setTokens] = useState(sampleTokens);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [profitLossPercent, setProfitLossPercent] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [newToken, setNewToken] = useState({
    name: "",
    symbol: "",
    quantity: 0,
    buyPrice: 0,
  });
  const [sellQuantity, setSellQuantity] = useState(0);

  // Calculate portfolio values
  useEffect(() => {
    let investment = 0;
    let value = 0;

    tokens.forEach((token) => {
      investment += token.quantity * token.buyPrice;
      value += token.quantity * token.currentPrice;
    });

    setTotalInvestment(investment);
    setCurrentValue(value);
    setProfitLoss(value - investment);
    setProfitLossPercent(((value - investment) / investment) * 100);
  }, [tokens]);

  // Handle buying a token
  const handleBuyToken = () => {
    if (
      newToken.name &&
      newToken.symbol &&
      newToken.quantity > 0 &&
      newToken.buyPrice > 0
    ) {
      const token = {
        id: tokens.length + 1,
        name: newToken.name,
        symbol: newToken.symbol,
        quantity: parseFloat(newToken.quantity),
        buyPrice: parseFloat(newToken.buyPrice),
        currentPrice: parseFloat(newToken.buyPrice), // Initially same as buy price
      };

      setTokens([...tokens, token]);
      setNewToken({ name: "", symbol: "", quantity: 0, buyPrice: 0 });
      setShowBuyModal(false);
    }
  };

  // Handle selling a token
  const handleSellToken = () => {
    if (
      selectedToken &&
      sellQuantity > 0 &&
      sellQuantity <= selectedToken.quantity
    ) {
      const updatedTokens = tokens
        .map((token) => {
          if (token.id === selectedToken.id) {
            return {
              ...token,
              quantity: token.quantity - parseFloat(sellQuantity),
            };
          }
          return token;
        })
        .filter((token) => token.quantity > 0); // Remove token if quantity is 0

      setTokens(updatedTokens);
      setShowSellModal(false);
      setSelectedToken(null);
      setSellQuantity(0);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <AccountBalance />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="text-fontcolourblack text-sm ">Total Investment</h3>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(totalInvestment)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <h3 className="text-fontcolourblack text-sm ">Current Value</h3>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(currentValue)}
          </p>
        </div>

        <div
          className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
            profitLoss >= 0 ? "border-green-500" : "border-red-500"
          }`}
        >
          <h3 className="text-fontcolourblack text-sm ">Profit/Loss</h3>
          <p
            className={`text-2xl font-bold mt-1 ${
              profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(profitLoss)}
          </p>
        </div>

        <div
          className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
            profitLossPercent >= 0 ? "border-green-500" : "border-red-500"
          }`}
        >
          <h3 className="text-fontcolourblack text-sm ">Profit/Loss %</h3>
          <p
            className={`text-2xl font-bold mt-1 ${
              profitLossPercent >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {profitLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Token List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  Token
                </th>
                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  Buy Price
                </th>
                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  Current Price
                </th>

                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  P/L
                </th>
                <th className="px-6 py-3 text-left text-xs  text-fontcolourblack uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tokens.map((token) => {
                const tokenValue = token.quantity * token.currentPrice;
                const tokenInvestment = token.quantity * token.buyPrice;
                const tokenProfitLoss = tokenValue - tokenInvestment;
                const tokenProfitLossPercent =
                  (tokenProfitLoss / tokenInvestment) * 100;

                return (
                  <tr
                    key={token.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-purple-600">
                            {token.symbol.substring(0, 2)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm  text-gray-900">
                            {token.name}
                          </div>
                          <div className="text-sm text-fontcolourblack">
                            {token.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-fontcolourblack">
                      {token.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-fontcolourblack">
                      {formatCurrency(token.buyPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-fontcolourblack">
                      {formatCurrency(token.currentPrice)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      <span
                        className={
                          tokenProfitLoss >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {formatCurrency(tokenProfitLoss)} (
                        {tokenProfitLossPercent.toFixed(2)}%)
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      <button
                        onClick={() => {
                          setSelectedToken(token);
                          setShowSellModal(true);
                        }}
                        className="text-green-600 hover:text-red-900 mr-3"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => {
                          setSelectedToken(token);
                          setShowSellModal(true);
                        }}
                        className="text-red-600 hover:text-red-900 mr-3"
                      >
                        Sell
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Token Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">Buy New Token</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm  text-gray-700 mb-1">
                  Token Name
                </label>
                <input
                  type="text"
                  value={newToken.name}
                  onChange={(e) =>
                    setNewToken({ ...newToken, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E.g. Ethereum"
                />
              </div>
              <div>
                <label className="block text-sm  text-gray-700 mb-1">
                  Symbol
                </label>
                <input
                  type="text"
                  value={newToken.symbol}
                  onChange={(e) =>
                    setNewToken({ ...newToken, symbol: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E.g. ETH"
                />
              </div>
              <div>
                <label className="block text-sm  text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newToken.quantity}
                  onChange={(e) =>
                    setNewToken({ ...newToken, quantity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm  text-gray-700 mb-1">
                  Buy Price (INR)
                </label>
                <input
                  type="number"
                  value={newToken.buyPrice}
                  onChange={(e) =>
                    setNewToken({ ...newToken, buyPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBuyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyToken}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Buy Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Token Modal */}
      {showSellModal && selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              Sell {selectedToken.name} ({selectedToken.symbol})
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Price:</span>
                <span className="">
                  {formatCurrency(selectedToken.currentPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Available Quantity:
                </span>
                <span className="">{selectedToken.quantity}</span>
              </div>
              <div>
                <label className="block text-sm  text-gray-700 mb-1">
                  Quantity to Sell
                </label>
                <input
                  type="number"
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  max={selectedToken.quantity}
                />
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Estimated Value:</span>
                <span className="">
                  {formatCurrency(sellQuantity * selectedToken.currentPrice)}
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowSellModal(false);
                  setSelectedToken(null);
                  setSellQuantity(0);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSellToken}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sell Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
