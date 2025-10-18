import React from "react";

export const AddNewSection = ({
  newSection,
  handleNewSectionChange,
  handleNewSectionImageUpload,
  addNewSection,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-fontcolourblack mb-6">
        Add New Section
      </h2>

      {/* Image Upload/Preview */}
      <div className="mb-6">
        <label className="block text-fontcolourblack text-sm font-bold mb-2">
          Icon
        </label>
        <div className="flex items-center">
          {newSection.icon && (
            <div className="mr-4">
              <img
                src={newSection.icon}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleNewSectionImageUpload}
              className="mb-2"
            />
            <p className="text-xs text-gray-500">
              Recommended: Square image, 300x300px or larger
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-fontcolourblack text-sm font-bold mb-2">
          Title *
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
          value={newSection.title}
          onChange={(e) => handleNewSectionChange("title", e.target.value)}
          placeholder="e.g., Affiliate Marketer"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-fontcolourblack text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
          value={newSection.description}
          onChange={(e) =>
            handleNewSectionChange("description", e.target.value)
          }
          rows="2"
          placeholder="e.g., Promote products and earn commissions"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addNewSection}
      >
        Add New Section
      </button>
    </div>
  );
};
