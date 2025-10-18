import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateWhyChoose,
  DeleteWhyChoose,
  getAllWhyChoose,
} from "../../../Redux/Features/WhyChooseServicesSlice";
import { Loader } from "../../../Component/Common/Loader";
import { ErrorMessage } from "../../../Component/Common/Error";
import { AddNewSection } from "./AddChooseModel,";
import toast from "react-hot-toast";

export const Chossen = () => {
  const [sections, setSections] = useState([]);

  const dispatch = useDispatch();
  const { WhyChooseData, loading, error } = useSelector(
    (state) => state.WhychooseOpration
  );

  useEffect(() => {
    dispatch(getAllWhyChoose());
  }, [dispatch]);

  console.log(WhyChooseData);

  useEffect(() => {
    if (WhyChooseData && WhyChooseData.length > 0) {
      setSections(
        WhyChooseData.map((item) => ({
          ...item,
          isEditing: false,
        }))
      );
    }
  }, [WhyChooseData]);

  const [newSection, setNewSection] = useState({
    title: "",
    description: "",
    icon: "",
    file: "",
  });

  const [activeTab, setActiveTab] = useState(0);

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
        updatedSections[sectionIndex].icon = e.target.result;
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

  const removeSection = (index) => {
    console.log(index);

    const sectionToDelete = sections[index];
    if (!sectionToDelete.id) {
      alert("Cannot delete unsaved section");
      return;
    }

    if (window.confirm("Are you sure you want to delete this section?")) {
      dispatch(DeleteWhyChoose(sectionToDelete.id))
        .unwrap()
        .then(() => {})
        .catch((err) => console.error("❌ Delete error:", err));
    }
  };
  const handleNewSectionImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setNewSection({
        ...newSection,
        icon: previewUrl, // preview માટે
        file: file, // upload માટે original file save કરો
      });
    }
  };

  // Add a new section
  const addNewSection = () => {
    if (!newSection.title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", newSection.title);
    formData.append("description", newSection.description);
    if (newSection.icon) {
      formData.append("icon", newSection.file); // 👈 Node.js multer માટે
    }

    // 🔹 Dispatch Redux thunk (API call)
    dispatch(CreateWhyChoose(formData))
      .unwrap()
      .then((res) => {
        setNewSection({ title: "", description: "", icon: "" });
        setActiveTab(sections.length); // tab reset
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // Save changes
  const saveChanges = () => {
    console.log("Saving sections:", sections);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl text-fontcolourblack mb-2">Why Choosen</h1>
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
              {section.title}
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
                {section.title} Section
              </h2>

              <div className="flex gap-2">
                {/* Remove Button */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => removeSection(sectionIndex)}
                >
                  Remove Section
                </button>
              </div>
            </div>

            {/* Conditional render: edit mode or view mode */}
            {section.isEditing ? (
              <>
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-fontcolourblack text-sm font-bold mb-2">
                    Icon
                  </label>
                  <div className="flex items-center">
                    {section.icon && (
                      <div className="mr-4">
                        <img
                          src={section.icon}
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

                {/* Title input */}
                <div className="mb-6">
                  <label className="block text-fontcolourblack text-sm font-bold mb-2">
                    Title
                  </label>

                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                    value={section.title}
                    onChange={(e) =>
                      handleInputChange(sectionIndex, "title", e.target.value)
                    }
                  />
                </div>

                {/* Description input */}
                <div className="mb-6">
                  <label className="block text-fontcolourblack text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-fontcolourblack leading-tight focus:outline-none focus:shadow-outline"
                    value={section.description}
                    onChange={(e) =>
                      handleInputChange(
                        sectionIndex,
                        "description",
                        e.target.value
                      )
                    }
                    rows="2"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* View only */}
                <p className="mb-2">{section.description}</p>
                {section.icon && (
                  <img
                    src={section.icon}
                    alt={section.icon}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </>
            )}
          </div>
        ))}

        {/* Add New Section Form */}
        <div
          className={`${activeTab === sections.length ? "block" : "hidden"}`}
        >
          <AddNewSection
            newSection={newSection}
            handleNewSectionChange={handleNewSectionChange}
            handleNewSectionImageUpload={handleNewSectionImageUpload}
            addNewSection={addNewSection}
          />
        </div>
      </div>
    </div>
  );
};
