import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useDispatch } from "react-redux";
import {
  CreateSubSubCategory,
  GetMainCategoryData,
  GetSubCategoryBYID,
  GetSubSubCategoryData,
  DeleteCategory,
  GetPersonalCategoryDataBYID,
  UpdateCategoryValue,
} from "../../Redux/Features/CategoryServicesSlice";
import { useSelector } from "react-redux";
import CategoryDropdown from "../../Component/CustomeDropDown/DropDown";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";

export const SubSubCategory = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteid, setCategoryToDeleteid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [refreshSubCategory, setRefreshSubCategory] = useState(false);

  const [newSubSubCategory, setNewSubSubCategory] = useState({
    name: "",
    parent_id: "",
    main_category_id: "", // ✅use thase subcat nu drop down show karavu ke hide
  });
  const dispatch = useDispatch();
  const {
    SubSubCategorydata,
    SubCategorydata,
    MainCategorydata,
    PersonalCategoryData,
    loading,
    error,
  } = useSelector((state) => state.CategoryOpration);

  useEffect(() => {
    dispatch(GetMainCategoryData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetSubSubCategoryData());
  }, [dispatch]);

  const Handlesubcategoryfetch = useCallback(
    (mainId, parentId = "") => {
      dispatch(GetSubCategoryBYID(mainId));

      setNewSubSubCategory((prev) => ({
        ...prev,
        main_category_id: mainId,
        parent_id: parentId || (isEditMode ? prev.parent_id : ""), // use parentId if passed
      }));

      setShowSubCategoryDropdown(true);
      setRefreshSubCategory((prev) => !prev); // toggle refresh flag
    },
    [dispatch, isEditMode] // stable dependency
  );

  const SubSubCategoryColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "SubSub Category Name" },
      { key: "parent", label: "Sub Category" },
      { key: "priority", label: "Priority" },
    ],
    []
  );

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
      setNewSubSubCategory({
        name: "",
        parent_id: "",
        main_category_id: "",
      });
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

        setNewSubSubCategory((prev) => {
          const updated = {
            ...prev,
            name: res.name,
            parent_id: res.parent?.id || "",
            main_category_id: res.main?.id || "",
          };

          return updated;
        });
        setIsEditMode(true);
        setEditId(id);
        setIsModalOpen(true); // Open modal when editing

        if (res.main?.id) {
          Handlesubcategoryfetch(res.main.id, res.parent?.id || "");
        }
      } catch (err) {
        toast.error("Failed to load category for edit");
      }
    },
    [Handlesubcategoryfetch, dispatch]
  );

  const resetForm = () => {
    setNewSubSubCategory({
      name: "",
      parent_id: "",
      main_category_id: "",
    });
    setIsEditMode(false);
    setEditId(null);
    setShowSubCategoryDropdown(false);
    setIsModalOpen(false); // Close modal when form is reset
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newSubSubCategory.name.trim()) {
      toast.error("Name Required");
      return;
    }

    if (!newSubSubCategory.parent_id) {
      toast.error("Category Required");
      return;
    }

    const formData = new FormData();
    formData.append("name", newSubSubCategory.name);
    formData.append("parent_id", newSubSubCategory.parent_id);

    if (isEditMode && EditId) {
      // ✅ Edit mode: update existing sub-sub category
      dispatch(
        UpdateCategoryValue({ id: EditId, data: formData, type: "subsub" })
      )
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sub Sub Category updated");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Update failed");
          console.error("❌ Error:", err);
        });
    } else {
      // ✅ Create mode: create new sub-sub category
      dispatch(CreateSubSubCategory(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sub Sub Category created");
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[64vh]  max-h-[80vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode
                  ? "Edit Sub Sub Category"
                  : "Add New Sub Sub Category"}
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
                      Sub sub category name * (EN)
                    </label>
                    <input
                      type="text"
                      value={newSubSubCategory.name}
                      onChange={(e) =>
                        setNewSubSubCategory({
                          ...newSubSubCategory,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="New Sub Sub Category"
                      required
                    />
                  </div>

                  <div>
                    <CategoryDropdown
                      data={MainCategorydata}
                      title={"Select Main Category"}
                      lable={"MainCategory"}
                      handleselected={(item) => {
                        setNewSubSubCategory((prev) => ({
                          ...prev,
                          main_category_id: item.id,
                          parent_id: isEditMode ? "" : prev.parent_id, // reset parent_id if editing
                        }));

                        Handlesubcategoryfetch(item.id, "");
                      }}
                      selectedValue={newSubSubCategory.main_category_id}
                    />
                  </div>
                </div>

                {/* Right: Priority and Sub Category */}
                <div className="flex flex-col justify-center space-y-6">
                  {showSubCategoryDropdown && (
                    <div>
                      {
                        <CategoryDropdown
                          data={SubCategorydata}
                          title={"Select Sub Category"}
                          lable={"SubCategory"}
                          handleselected={(item) =>
                            setNewSubSubCategory({
                              ...newSubSubCategory,
                              parent_id: item.id, // ✅ Correct: get id from selected item
                            })
                          }
                          refresh={refreshSubCategory}
                          onResetComplete={() => setRefreshSubCategory(false)}
                          selectedValue={newSubSubCategory.parent_id}
                        />
                      }
                    </div>
                  )}
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
                  {isEditMode ? "Update" : "Submit"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub Sub Category List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Child Category List
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Sub Sub Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <ListProduct
              columns={SubSubCategoryColumns}
              data={SubSubCategorydata}
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
        message={"Are you sure you want to delete the Child category ?"}
      />
    </div>
  );
};
