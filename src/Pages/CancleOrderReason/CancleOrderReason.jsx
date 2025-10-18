import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";
import {
  CreateReason,
  DeleteReasonData,
  GetReasonData,
  GetReasonDataById,
  UpdateReasonData,
} from "../../Redux/Features/CancleOrderReasonServicesSlice";

export const CancleOrderReason = () => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reasonToDeletedid, setReasonTODeletedid] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [EditId, setEditId] = useState(null);
  const { ReasonData, loading, error } = useSelector(
    (state) => state.CancelOrderReasonOpration
  );

  // New state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(GetReasonData());
  }, [dispatch]);

  const [newReason, setNewReason] = useState({
    name: "",
  });

  const handleDeleteClick = (category) => {
    setReasonTODeletedid(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setReasonTODeletedid(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!reasonToDeletedid) return;

      const res = await dispatch(DeleteReasonData(reasonToDeletedid)).unwrap();
      resetForm();
      setIsEditMode(false);
      setEditId(null);
      toast.success(res.message || "Reason deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setReasonTODeletedid(null);
    }
  }, [dispatch, reasonToDeletedid, setIsEditMode, setEditId]);

  const resetForm = () => {
    setNewReason({ name: "" });
    setIsEditMode(false);
    setEditId(null);
    setIsModalOpen(false); // Close modal when form is reset
  };

  const handleEdit = useCallback(
    async (id) => {
      try {
        const res = await dispatch(GetReasonDataById(id)).unwrap();

        setNewReason((prev) => {
          const updated = {
            ...prev,
            name: res.reason,
          };

          return updated;
        });

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
    if (!newReason.name.trim()) return toast.error("Name Required");

    // For create mode, image is required

    const payload = { reason: newReason.name.trim() };

    if (isEditMode && EditId) {
      dispatch(UpdateReasonData({ reasonId: EditId, data: payload }))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Reason updated");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Update failed");
          console.error("❌ Error:", err);
        });
    } else {
      dispatch(CreateReason(payload))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Reason created");
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong");
          console.error("❌ Error:", err);
        });
    }
  };

  const ReasonColums = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "reason", label: " Reason" },
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
                      value={newReason.name}
                      onChange={(e) =>
                        setNewReason({ ...newReason, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="New Category"
                    />
                  </div>
                </div>{" "}
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
              CancleOrder Reason List
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Reason
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <ListProduct
              columns={ReasonColums}
              data={ReasonData}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              filtershow={false}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete CancleOrderReason"
        message={"Are you sure you want to delete the CancleOrderReason ?"}
      />
    </div>
  );
};
