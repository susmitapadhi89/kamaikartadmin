// components/PromoCodeForm.jsx
import { Close, Face } from "@mui/icons-material";
import React from "react";

const PromoCodeForm = ({
  showModal,
  handleCloseModal,
  editingPromoCode,
  formData,
  errors,
  handleInputChange,
  handleSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white  shadow-xl w-full max-w-6xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4  flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {editingPromoCode ? "Edit Promo Code" : "Create New Promo Code"}
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <Close />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            {/* Promo Code */}
            <InputField
              label="Promo Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="e.g., WELCOME90"
              error={errors.code}
            />

            {/* Description */}
            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter promo code description"
              error={errors.description}
            />

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Discount Type"
                name="discount_type"
                value={formData.discount_type}
                onChange={handleInputChange}
                options={[
                  { value: "percentage", label: "Percentage (%)" },
                  { value: "fixed", label: "Fixed Amount (₹)" },
                ]}
              />
              <InputField
                label="Discount Value"
                name="discount_value"
                value={formData.discount_value}
                onChange={handleInputChange}
                placeholder={
                  formData.discount_type === "percentage"
                    ? "e.g., 90"
                    : "e.g., 200"
                }
                type="number"
                error={errors.discount_value}
                min="0"
                step={formData.discount_type === "percentage" ? "1" : "0.01"}
              />
            </div>

            {/* Minimum Order Value */}
            <InputField
              label="Minimum Order Value (₹)"
              name="min_order_value"
              value={formData.min_order_value}
              onChange={handleInputChange}
              placeholder="e.g., 500"
              type="number"
              error={errors.min_order_value}
              min="0"
              step="0.01"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Maximum Discount */}
            <InputField
              label="Maximum Discount (₹)"
              name="max_discount"
              value={formData.max_discount}
              onChange={handleInputChange}
              placeholder="e.g., 1000"
              type="number"
              error={errors.max_discount}
              min="0"
              step="0.01"
            />

            {/* Usage Limit */}
            <InputField
              label="Usage Limit"
              name="usage_limit"
              value={formData.usage_limit}
              onChange={handleInputChange}
              placeholder="e.g., 100"
              type="number"
              error={errors.usage_limit}
              min="1"
              step="1"
            />

            {/* Valid From & To */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Valid From"
                name="valid_from"
                value={formData.valid_from}
                onChange={handleInputChange}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                error={errors.valid_from}
              />
              <InputField
                label="Valid To"
                name="valid_to"
                value={formData.valid_to}
                onChange={handleInputChange}
                type="date"
                min={
                  formData.valid_from || new Date().toISOString().split("T")[0]
                }
                error={errors.valid_to}
              />
            </div>

            {/* Status */}
            <StatusToggle
              isActive={formData.is_active}
              onChange={handleInputChange}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center transition-all duration-200"
            >
              {editingPromoCode ? "Update Promo Code" : "Create Promo Code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromoCodeForm;

/* Helper Components */
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  min,
  step,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    />
    {error && <ErrorText text={error} />}
  </div>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    />
    {error && <ErrorText text={error} />}
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const StatusToggle = ({ isActive, onChange }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-gray-800">Active Promo Code</div>
        <div className="text-sm text-gray-500">
          Enable or disable this promo code
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="is_active"
          checked={isActive}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </div>
    <div
      className={`mt-3 p-3 rounded-lg ${
        isActive
          ? "bg-green-50 border border-green-200"
          : "bg-yellow-50 border border-yellow-200"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            isActive ? "bg-green-500" : "bg-yellow-500"
          }`}
        ></div>
        <span
          className={`text-sm font-medium ${
            isActive ? "text-green-800" : "text-yellow-800"
          }`}
        >
          {isActive
            ? "This promo code is currently active"
            : "This promo code is currently disabled"}
        </span>
      </div>
    </div>
  </div>
);

const ErrorText = ({ text }) => (
  <p className="mt-1 text-sm text-red-600 flex items-center">{text}</p>
);
