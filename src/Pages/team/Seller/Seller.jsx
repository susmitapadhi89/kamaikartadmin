import React, { useCallback, useMemo, useState } from "react";
import { Button, Chip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ListProduct } from "../../../Component/Tableview/Showdata";
import {
  GetSellerById,
  DeleteSeller,
  GetSellerData,
  UpdateSeller,
} from "../../../Redux/Features/SellerServicesSlice.js";
import { DeleteConfirmationModal } from "../../../Component/Common/Delete";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SellerDetailModal } from "./ViewSellerDetail";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../../Component/Common/Error.jsx";

const Seller = () => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sellerToDeleteId, setSellerToDeleteId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { sellerData, totalPages, totalItems, loading, error } = useSelector(
    (state) => state.SellerOperation
  );

  const fetchSellerData = useCallback(
    async ({ page, limit, filters }) => {
      try {
        dispatch(GetSellerData({ page, limit, filters }));
      } catch (error) {
        toast.error(error.message || "Failed to load sellers");
        return { data: [], total: 0 };
      }
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phoneno", label: "Phone No" },
      {
        key: "status",
        label: "Status",
        render: (value) => (
          <Chip
            label={value}
            size="small"
            color={
              value === "Approved"
                ? "success"
                : value === "pending"
                ? "warning"
                : value === "Rejected"
                ? "error"
                : "default"
            }
            variant="outlined"
          />
        ),
      },
      { key: "role_id", label: "Role" },
    ],
    []
  );

  const handleViewDetails = (id) => {
    if (id) {
      dispatch(GetSellerById(id)); // state auto update
      setDetailModalOpen(true);
    }
  };

  // Actions
  const updateSellerStatus = (id, status) => {
    dispatch(UpdateSeller({ id, data: { status } }))
      .unwrap()
      .then(() => {
        toast.success(`Seller ${status} successfully`);
        setDetailModalOpen(false);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleApprove = (id) => updateSellerStatus(id, "Approved");
  const handleReject = (id) => updateSellerStatus(id, "Rejected");
  const handleBlock = (id) => updateSellerStatus(id, "Blocked");

  const handleDeleteClick = (id) => {
    setSellerToDeleteId(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSellerToDeleteId(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!sellerToDeleteId) return;

      const res = await dispatch(DeleteSeller(sellerToDeleteId)).unwrap();

      toast.success(res.message || "Seller deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setSellerToDeleteId(null);
    }
  }, [dispatch, sellerToDeleteId]);

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Seller List</h1>
      </div>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        {error ? (
          <ErrorMessage
            message={error}
            variant="error" // 🔹 error | warning | info | success
            dismissible // 🔹 user can remove this error
            onRetry={() => fetchSellerData({ page: 1, limit: 10 })} // 🔹 retry button
            autoDismiss={false} // 🔹 auto dismiss disable
          />
        ) : (
          <ListProduct
            columns={columns}
            data={sellerData}
            serverMode={true}
            fetchData={fetchSellerData}
            onView={handleViewDetails}
            onDelete={handleDeleteClick}
            totalPages={totalPages}
            totalItems={totalItems}
            loading={loading}
          />
        )}
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Seller"
        message="Are you sure you want to delete this seller?"
      />

      <SellerDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        //seller={selectedSeller}
        onApprove={handleApprove}
        onReject={handleReject}
        onBlock={handleBlock}
      />
    </div>
  );
};

export default Seller;
