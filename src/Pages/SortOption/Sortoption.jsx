import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatesortOption,
  DeletesortOption,
  GetsortOptionData,
  GetsortOptionById,
  UpdatesortOption,
} from "../../Redux/Features/SortOptionServicesSlice";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";

export const SortOptionSetup = () => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sortOptionToDeleteId, setSortOptionToDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const { sortOptionData, loading, error } = useSelector(
    (state) => state.sortOptionOperation
  );

  useEffect(() => {
    dispatch(GetsortOptionData());
  }, [dispatch]);

  const [newSortOption, setNewSortOption] = useState({
    code: "",
    name: "",
    sort_order: "",
  });

  const handleDeleteClick = (id) => {
    setSortOptionToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSortOptionToDeleteId(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!sortOptionToDeleteId) return;

      const res = await dispatch(
        DeletesortOption(sortOptionToDeleteId)
      ).unwrap();
      resetForm();
      toast.success(res.message || "Sort Option deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setSortOptionToDeleteId(null);
    }
  }, [dispatch, sortOptionToDeleteId]);

  const resetForm = () => {
    setNewSortOption({
      code: "",
      name: "",
      sort_order: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = useCallback(
    async (id) => {
      try {
        const res = await dispatch(GetsortOptionById(id)).unwrap();
        setNewSortOption({
          code: res.data.code,
          name: res.data.name,
          sort_order: res.data.sort_order,
        });
        setIsEditMode(true);
        setEditId(id);
      } catch (err) {
        toast.error("Failed to load sort option for edit");
        console.error(err);
      }
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!newSortOption.code.trim()) return toast.error("Code is required");
    if (!newSortOption.name.trim()) return toast.error("Name is required");
    if (!newSortOption.sort_order || isNaN(newSortOption.sort_order))
      return toast.error("Valid sort order is required");

    const data = {
      code: newSortOption.code,
      name: newSortOption.name,
      sort_order: parseInt(newSortOption.sort_order),
    };

    if (isEditMode && editId) {
      dispatch(UpdatesortOption({ id: editId, data }))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sort Option updated");
          resetForm();
        })
        .catch((err) => toast.error(err.message || "Update failed"));
    } else {
      dispatch(CreatesortOption(data))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Sort Option created");
          resetForm();
        })
        .catch((err) => toast.error(err.message || "Create failed"));
    }
  };

  const handleInputChange = (field, value) => {
    setNewSortOption((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const SortOptionColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "sort_order", label: "Sort Order" },
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Sort Option Setup
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Code *
            </label>
            <input
              type="text"
              value={newSortOption.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., POPULAR"
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Name *
            </label>
            <input
              type="text"
              value={newSortOption.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Most Popular"
            />
          </div>

          {/* Sort Order Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Sort Order *
            </label>
            <input
              type="number"
              value={newSortOption.sort_order}
              onChange={(e) => handleInputChange("sort_order", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1"
              min="1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 items-center">
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && (
            <p className="text-red-500">
              {typeof error === "object" ? error.message : error}
            </p>
          )}

          {isEditMode && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {/* Sort Option List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sort Option List
          </h2>
          <ListProduct
            columns={SortOptionColumns}
            data={sortOptionData}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Sort Option"
        message="Are you sure you want to delete this sort option?"
      />
    </div>
  );
};
