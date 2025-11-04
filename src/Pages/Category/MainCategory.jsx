import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { Category_Drag_Drop } from "../../Component/Drag&Drop/Category_Drag&Drop";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CreateMainCategory,
  DeleteCategory,
  GetMainCategoryData,
  GetPersonalCategoryDataBYID,
  UpdateCategoryValue,
} from "../../Redux/Features/CategoryServicesSlice";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";

export const MainCategory = () => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteid, setCategoryToDeleteid] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [EditId, setEditId] = useState(null);
  const { MainCategorydata, loading, error } = useSelector(
    (state) => state.CategoryOpration
  );

  // New state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(GetMainCategoryData());
  }, [dispatch]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file);

  //     setNewCategory({ ...newCategory, image: file });
  //     setPreviewImage(previewUrl);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, or PNG files are allowed!");
        e.target.value = ""; // reset input
        return;
      }

      if (file.size > maxSize) {
        toast.error("Image size must be under 2MB!");
        e.target.value = "";
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setNewCategory({ ...newCategory, image: file });
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
      if (!categoryToDeleteid) return;

      const res = await dispatch(DeleteCategory(categoryToDeleteid)).unwrap();
      resetForm();
      setIsEditMode(false);
      setEditId(null);
      toast.success(res.message || "Category deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setCategoryToDeleteid(null);
    }
  }, [dispatch, categoryToDeleteid, setIsEditMode, setEditId]);

  const resetForm = () => {
    setNewCategory({ name: "", image: "" });
    setPreviewImage(null);
    setIsEditMode(false);
    setEditId(null);
    setIsModalOpen(false); // Close modal when form is reset
  };

  const handleEdit = useCallback(
    async (id) => {
      try {
        const res = await dispatch(GetPersonalCategoryDataBYID(id)).unwrap();

        setNewCategory((prev) => {
          const updated = {
            ...prev,
            name: res.name,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!newCategory.name.trim()) return toast.error("Name Required");

    // For create mode, image is required
    if (!isEditMode && !newCategory.image) return toast.error("Image Required");

    const formData = new FormData();
    formData.append("name", newCategory.name);

    if (newCategory.image instanceof File) {
      // User new image select kare → file moklo
      formData.append("image", newCategory.image);
    } else if (newCategory.image) {
      // Edit mode ma old image avi URL → as it is moklo
      formData.append("image", newCategory.image);
    }
    if (isEditMode && EditId) {
      dispatch(
        UpdateCategoryValue({ id: EditId, data: formData, type: "main" })
      )
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Main Category updated");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Update failed");
          console.error("❌ Error:", err);
        });
    } else {
      // ✅ Create mode
      dispatch(CreateMainCategory(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Main Category created");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong");
          console.error("❌ Error:", err);
        });
    }
  };

  const MainCategoryColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: " Category Name" },
      { key: "priority", label: "Priority" },
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Modal Overlay with Blur Effect */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode ? "Edit Category" : "Add New Category"}
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
                    <label className="block text-sm font-medium mb-2 text-black-700">
                      Category Name (EN)
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="New Category"
                    />
                  </div>
                </div>

                {/* Right: Upload */}
                <div className="items-center justify-center">
                  <label
                    htmlFor="categoryImage"
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                      previewImage
                        ? "border-blue-500 bg-blue-50"
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
                    id="categoryImage"
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
                )}
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

      {/* Category List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Main Category List
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <ListProduct
              columns={MainCategoryColumns}
              data={MainCategorydata}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Category"
        message={"Are you sure you want to delete the Main category ?"}
      />
    </div>
  );
};
