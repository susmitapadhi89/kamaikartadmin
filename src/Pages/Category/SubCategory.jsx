import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CreateSubCategory,
  DeleteCategory,
  GetMainCategoryData,
  GetPersonalCategoryDataBYID,
  GetSubCategoryData,
  UpdateCategoryValue,
} from "../../Redux/Features/CategoryServicesSlice";
import CategoryDropdown from "../../Component/CustomeDropDown/DropDown";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";

export const SubCategory = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  const dispatch = useDispatch();
  const {
    SubCategorydata,
    PersonalCategoryData,
    MainCategorydata,
    loading,
    error,
  } = useSelector((state) => state.CategoryOpration);

  useEffect(() => {
    dispatch(GetMainCategoryData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetSubCategoryData());
  }, [dispatch]);

  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    image: "",
    parent_id: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteid, setCategoryToDeleteid] = useState(null);

  const SubCategoryColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "SubSub Category Name" },
      { key: "parent", label: "Main Category" },
      { key: "priority", label: "Priority" },
    ],
    []
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setNewSubCategory({ ...newSubCategory, image: file });
      setPreviewImage(previewUrl);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDeleteid(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCategoryToDeleteid(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      const res = await dispatch(DeleteCategory(categoryToDeleteid)).unwrap();
      resetForm();
      setIsEditMode(false);
      setEditId(null);
      toast.success(res.message || "Category deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  }, [dispatch, categoryToDeleteid, setIsEditMode, setEditId]);

  const handleEdit = useCallback(
    async (id) => {
      try {
        const res = await dispatch(GetPersonalCategoryDataBYID(id)).unwrap();

        setNewSubCategory((prev) => {
          const updated = {
            ...prev,
            name: res.name,
            parent_id: res.parent?.id || "",
            image: res.image,
          };

          return updated;
        });
        setPreviewImage(res.image || null);

        setIsEditMode(true);
        setEditId(id);
        setIsModalOpen(true); // Open modal when editing
      } catch (err) {
        toast.error("Failed to load category for edit");
      }
    },
    [dispatch]
  );

  const resetForm = () => {
    setNewSubCategory({ name: "", parent_id: "", image: null });
    setPreviewImage(null);
    setIsEditMode(false);
    setEditId(null);
    setIsModalOpen(false); // Close modal when form is reset
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!newSubCategory.name.trim()) return toast.error("Name Required");
    if (!newSubCategory.parent_id) return toast.error("Category Required");

    // For create mode, image is required
    if (!isEditMode && !newSubCategory.image)
      return toast.error("Image Required");

    const formData = new FormData();
    formData.append("name", newSubCategory.name);
    formData.append("parent_id", newSubCategory.parent_id);

    if (newSubCategory.image instanceof File) {
      // User new image select kare → file moklo
      formData.append("image", newSubCategory.image);
    } else if (newSubCategory.image) {
      // Edit mode ma old image avi URL → as it is moklo
      formData.append("image", newSubCategory.image);
    }
    if (isEditMode && EditId) {
      // ✅ Edit mode

      dispatch(UpdateCategoryValue({ id: EditId, data: formData, type: "sub" }))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sub Category updated");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Update failed");
          console.error("❌ Error:", err);
        });
    } else {
      // ✅ Create mode
      dispatch(CreateSubCategory(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sub Category created");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong");
          console.error("❌ Error:", err);
        });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Modal Overlay with Blur Effect */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode ? "Edit Sub Category" : "Add New Sub Category"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Sub category name * (EN)
                    </label>
                    <input
                      type="text"
                      value={newSubCategory.name}
                      onChange={(e) =>
                        setNewSubCategory({
                          ...newSubCategory,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="New Sub Category"
                      required
                    />
                  </div>

                  <div>
                    <CategoryDropdown
                      data={MainCategorydata}
                      title={"Select Main Category"}
                      lable={"MainCategory"}
                      handleselected={(item) =>
                        setNewSubCategory({
                          ...newSubCategory,
                          parent_id: item.id, // ✅ Correct: get id from selected item
                        })
                      }
                      selectedValue={newSubCategory.parent_id}
                    />
                  </div>
                </div>

                {/* Right: Upload */}
                <div className="items-center justify-center">
                  <label
                    htmlFor="subcategoryImage"
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                      previewImage
                        ? "border-blue-500 bg-blue-50 "
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-blue-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG (Max 2MB) • Ratio 1:1 (500x500)
                        </p>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="subcategoryImage"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-4">
                {loading && <p className="text-blue-500">Logging in...</p>}
                {error && (
                  <p className="text-red-500">
                    {typeof error === "object" ? error.message : error}
                  </p>
                )}{" "}
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${"bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"}`}
                >
                  {isEditMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub Category List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Sub Category List
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Sub Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {
              <ListProduct
                columns={SubCategoryColumns}
                data={SubCategorydata}
                serverMode={false}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            }
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Category"
        message={"Are you sure you want to delete the Sub category ?"}
      />
    </div>
  );
};
