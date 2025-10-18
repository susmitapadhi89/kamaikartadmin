const PromoCodeCard = ({ promoCode, onEdit, onDelete }) => {
  const getDiscountText = (promoCode) => {
    if (promoCode.discount_type === "percentage") {
      return `${promoCode.discount_value}% off`;
    } else {
      return `₹${promoCode.discount_value} off`;
    }
  };

  const getUsagePercentage = (promoCode) => {
    return (promoCode.used_count / promoCode.usage_limit) * 100;
  };

  const isExpired = (validTo) => {
    return new Date(validTo) < new Date();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div
        className={`p-4 ${
          promoCode.is_active ? "bg-green-50" : "bg-gray-100"
        } border-b border-gray-200`}
      >
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                promoCode.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {promoCode.is_active ? "Active" : "Inactive"}
            </span>
            {isExpired(promoCode.valid_to) && (
              <span className="inline-flex items-center px-2 py-1 ml-2 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Expired
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(promoCode)}
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(promoCode.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {promoCode.code}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {promoCode.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {getDiscountText(promoCode)}
            </div>
            <div className="text-sm text-gray-500">
              Min. order: ₹{promoCode.min_order_value}
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Max Discount:</span>
            <span className="font-medium">₹{promoCode.max_discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Usage:</span>
            <span className="font-medium">
              {promoCode.used_count}/{promoCode.usage_limit}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Valid From:</span>
            <span className="font-medium">{promoCode.valid_from}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Valid To:</span>
            <span className="font-medium">{promoCode.valid_to}</span>
          </div>
        </div>

        {/* Usage Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Usage Progress</span>
            <span>{Math.round(getUsagePercentage(promoCode))}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                getUsagePercentage(promoCode) >= 80
                  ? "bg-red-500"
                  : getUsagePercentage(promoCode) >= 50
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(getUsagePercentage(promoCode), 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeCard;
