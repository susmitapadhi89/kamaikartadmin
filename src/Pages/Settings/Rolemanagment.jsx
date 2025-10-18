import React, { useState } from "react";

export const Role = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Customer",
      description: "Shop products, trade tokens, and earn cashback rewards",
      image: "/images/customer.jpg", // Default image path
      features: [
        "Browse and purchase products",
        "Trade seller tokens for profit",
        "Earn 6% annual cashback",
        "Participate in lucky draws",
        "Track your investment portfolio",
      ],
      button_text: "Start Shopping & Trading",
    },
    {
      id: 2,
      name: "Vendor/Seller",
      description: "Sell products, launch tokens, and build your business",
      image: "/images/seller.jpg",
      features: [
        "List and sell your products",
        "Launch your own tokens",
        "Access AI-powered product tools",
        "Track sales and analytics",
        "Build customer loyalty",
      ],
      button_text: "Start Selling & Earn",
    },
    {
      id: 3,
      name: "Token Trader",
      description: "Focus on token investments and portfolio management",
      image: "/images/trader.jpg",
      features: [
        "Invest in seller tokens",
        "Advanced portfolio tracking",
        "Market analysis tools",
        "Trading insights & alerts",
        "Maximize investment returns",
      ],
      button_text: "Start Token Trading",
    },
    {
      id: 4,
      name: "Platform Admin",
      description: "Manage platform operations and user experience",
      image: "/images/admin.jpg",
      features: [
        "Full platform management",
        "User role administration",
        "Analytics and reporting",
        "Content customization",
        "System configuration",
      ],
      button_text: "Admin Dashboard",
    },
  ]);

  const [newSection, setNewSection] = useState({
    name: "",
    description: "",
    image: "",
    features: [""],
    button_text: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  // Handle input changes for features
  const handleFeatureChange = (sectionIndex, featureIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].features[featureIndex] = value;
    setSections(updatedSections);
  };

  // Add a new feature to a section
  const addFeature = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].features.push("");
    setSections(updatedSections);
  };

  // Remove a feature from a section
  const removeFeature = (sectionIndex, featureIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].features.splice(featureIndex, 1);
    setSections(updatedSections);
  };

  // Handle input changes for section fields
  const handleInputChange = (sectionIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex][field] = value;
    setSections(updatedSections);
  };

  // Handle image upload for existing sections
  const handleImageUpload = (sectionIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].image = e.target.result;
        setSections(updatedSections);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle new section input changes
  const handleNewSectionChange = (field, value) => {
    setNewSection({
      ...newSection,
      [field]: value,
    });
  };

  // Handle new section feature changes
  const handleNewSectionFeatureChange = (index, value) => {
    const updatedFeatures = [...newSection.features];
    updatedFeatures[index] = value;
    setNewSection({
      ...newSection,
      features: updatedFeatures,
    });
  };

  // Handle image upload for new section
  const handleNewSectionImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSection({
          ...newSection,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a feature to the new section
  const addNewSectionFeature = () => {
    setNewSection({
      ...newSection,
      features: [...newSection.features, ""],
    });
  };

  // Remove a feature from the new section
  const removeNewSectionFeature = (index) => {
    const updatedFeatures = [...newSection.features];
    updatedFeatures.splice(index, 1);
    setNewSection({
      ...newSection,
      features: updatedFeatures,
    });
  };

  // Add a new section
  const addNewSection = () => {
    if (!newSection.name.trim()) {
      alert("Name is required");
      return;
    }

    setSections([
      ...sections,
      {
        id: sections.length + 1,
        name: newSection.name,
        description: newSection.description,
        image: newSection.image,
        features: newSection.features.filter((f) => f.trim() !== ""),
        button_text: newSection.button_text,
      },
    ]);

    setNewSection({
      name: "",
      description: "",
      image: "",
      features: [""],
      button_text: "",
    });
  };

  // Remove a section
  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  // Save changes
  const saveChanges = () => {
    // In a real application, you would send this data to your backend
    console.log("Saving sections:", sections);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl text-fontcolourblack mb-2">
          Role Content Admin Panel
        </h1>
        <p className="text-fontcolourblack mb-6">
          Manage the content for different user roles on your platform
        </p>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`py-2 px-4 whitespace-nowrap ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-fontcolourblack-500 hover:text-fontcolourblack"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {section.name}
            </button>
          ))}
          <button
            className={`py-2 px-4 whitespace-nowrap ${
              activeTab === sections.length
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-fontcolourblack-500 hover:text-fontcolourblack"
            }`}
            onClick={() => setActiveTab(sections.length)}
          >
            + Add New Section
          </button>
        </div>

        {/* Form for each section */}
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            className={`${activeTab === sectionIndex ? "block" : "hidden"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-fontcolourblack">
                Edit {section.name} Section
              </h2>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => removeSection(sectionIndex)}
              >
                Remove Section
              </button>
            </div>

            {/* Image Upload/Preview */}
            <div className="mb-6">
              <label className="block text-fontcolourblack text-sm font-bold mb-2">
                Image
              </label>
              <div className="flex items-center">
                {section.image && (
                  <div className="mr-4">
                    <img
                      src={section.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(sectionIndex, e)}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-500">
                    Recommended: Square image, 300x300px or larger
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-fontcolourblack text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                value={section.name}
                onChange={(e) =>
                  handleInputChange(sectionIndex, "name", e.target.value)
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-fontcolourblack text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                value={section.description}
                onChange={(e) =>
                  handleInputChange(sectionIndex, "description", e.target.value)
                }
                rows="2"
              />
            </div>
            <div className="mb-6">
              <label className="block text-fontcolourblack text-sm font-bold mb-2">
                Features
              </label>
              {section.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(
                        sectionIndex,
                        featureIndex,
                        e.target.value
                      )
                    }
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 px-3 py-1"
                    onClick={() => removeFeature(sectionIndex, featureIndex)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 bg-white-200 hover:bg-gray-300 text-fontcolourblack font-bold py-1 px-3 rounded text-sm"
                onClick={() => addFeature(sectionIndex)}
              >
                + Add Feature
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-fontcolourblack text-sm font-bold mb-2">
                Call-to-Action Text
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                value={section.button_text}
                onChange={(e) =>
                  handleInputChange(sectionIndex, "button_text", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {/* Add New Section Form */}
        <div
          className={`${activeTab === sections.length ? "block" : "hidden"}`}
        >
          <h2 className="text-xl font-semibold text-fontcolourblack mb-6">
            Add New Section
          </h2>

          {/* Image Upload/Preview for New Section */}
          <div className="mb-6">
            <label className="block text-fontcolourblack text-sm font-bold mb-2">
              Image
            </label>
            <div className="flex items-center">
              {newSection.image && (
                <div className="mr-4">
                  <img
                    src={newSection.image}
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

          <div className="mb-6">
            <label className="block text-fontcolourblack text-sm font-bold mb-2">
              Name *
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
              value={newSection.name}
              onChange={(e) => handleNewSectionChange("name", e.target.value)}
              placeholder="e.g., Affiliate Marketer"
            />
          </div>

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

          <div className="mb-6">
            <label className="block text-fontcolourblack text-sm font-bold mb-2">
              Features
            </label>
            {newSection.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                  value={feature}
                  onChange={(e) =>
                    handleNewSectionFeatureChange(index, e.target.value)
                  }
                  placeholder="Feature description"
                />
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700 px-3 py-1"
                  onClick={() => removeNewSectionFeature(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-fontcolourblack py-1 px-3 rounded text-sm"
              onClick={addNewSectionFeature}
            >
              + Add Feature
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-fontcolourblack text-sm font-bold mb-2">
              Call-to-Action Text
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
              value={newSection.button_text}
              onChange={(e) =>
                handleNewSectionChange("button_text", e.target.value)
              }
              placeholder="e.g., Join Affiliate Program"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addNewSection}
          >
            Add New Section
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
