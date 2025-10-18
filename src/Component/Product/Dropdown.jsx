import React, { useState } from "react";

export const ColorAndSizeSelector = ({ product, setProduct }) => {
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Multicolor",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const toggleColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.includes(color)
        ? product.colors.filter((c) => c !== color)
        : [...product.colors, color],
    });
  };

  const toggleSize = (size) => {
    setProduct({
      ...product,
      sizes: product.sizes.includes(size)
        ? product.sizes.filter((s) => s !== size)
        : [...product.sizes, size],
    });
  };

  const removeColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.filter((c) => c !== color),
    });
  };

  const removeSize = (size) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((s) => s !== size),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Color Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Available Colors *
        </label>

        {/* Selected Colors */}
        <div className="flex flex-wrap gap-2 mb-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
            >
              <span className="text-xs">{color}</span>
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Color Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorDropdown(!showColorDropdown)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
          >
            <span className="text-gray-400">Select colors</span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                showColorDropdown ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showColorDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-300 max-h-60 overflow-auto">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-2 cursor-pointer flex items-center ${
                    product.colors.includes(color)
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                  {product.colors.includes(color) && (
                    <svg
                      className="ml-auto h-5 w-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Available Sizes *
        </label>

        {/* Selected Sizes */}
        <div className="flex flex-wrap gap-2 mb-2">
          {product.sizes.map((size) => (
            <div
              key={size}
              className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
            >
              <span className="text-xs">{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Size Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSizeDropdown(!showSizeDropdown)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
          >
            <span className="text-gray-400">Select sizes</span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                showSizeDropdown ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showSizeDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-300 max-h-60 overflow-auto">
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 cursor-pointer flex items-center ${
                    product.sizes.includes(size)
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm text-gray-700">{size}</span>
                  {product.sizes.includes(size) && (
                    <svg
                      className="ml-auto h-5 w-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
