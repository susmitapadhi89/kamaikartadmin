import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBrand,
  DeleteBrand,
  GetBrandData,
  GetBrandById,
  UpdateBrand,
} from "../../Redux/Features/BrandServicesSlice";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";

export const BrandSetup = () => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDeleteId, setBrandToDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const { brandData, loading, error } = useSelector(
    (state) => state.BrandOperation
  );

  useEffect(() => {
    dispatch(GetBrandData());
  }, [dispatch]);

  const [newBrand, setNewBrand] = useState({
    name: "",
  });

  const handleDeleteClick = (id) => {
    setBrandToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setBrandToDeleteId(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!brandToDeleteId) return;

      const res = await dispatch(DeleteBrand(brandToDeleteId)).unwrap();
      resetForm();
      toast.success(res.message || "Brand deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setBrandToDeleteId(null);
    }
  }, [dispatch, brandToDeleteId]);

  const resetForm = () => {
    setNewBrand({ name: "" });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = useCallback(
    async (id) => {
      try {
        const res = await dispatch(GetBrandById(id)).unwrap();
        // ✅ Use res.data instead of res
        setNewBrand({ name: res.data.name });
        setIsEditMode(true);
        setEditId(id);
      } catch (err) {
        toast.error("Failed to load brand for edit");
        console.error(err);
      }
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBrand.name.trim()) return toast.error("Brand name is required");

    const data = { name: newBrand.name };

    if (isEditMode && editId) {
      dispatch(UpdateBrand({ id: editId, data }))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Brand updated");
          resetForm();
        })
        .catch((err) => toast.error(err.message || "Update failed"));
    } else {
      dispatch(CreateBrand(data))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Brand created");
          resetForm();
        })
        .catch((err) => toast.error(err.message || "Create failed"));
    }
  };

  const BrandColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Brand Name" },
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Brand Setup</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            value={newBrand.name}
            onChange={(e) => setNewBrand({ name: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter brand name"
          />
        </div>

        <div className="flex justify-end gap-4">
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && (
            <p className="text-red-500">
              {typeof error === "object" ? error.message : error}
            </p>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {/* Brand List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Brand List
          </h2>
          <ListProduct
            columns={BrandColumns}
            data={brandData}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Brand"
        message="Are you sure you want to delete this brand?"
      />
    </div>
  );
};
