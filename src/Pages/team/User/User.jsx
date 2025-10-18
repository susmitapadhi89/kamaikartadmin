import React, { useCallback, useMemo } from "react";
import { Chip, debounce } from "@mui/material";
import { ListProduct } from "../../../Component/Tableview/Showdata";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  GetUserData,
  UpdateUser,
} from "../../../Redux/Features/UserServicesSlice.js";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../../Component/Common/Error.jsx";

const User = () => {
  const dispatch = useDispatch();

  const { Userdata, totalPages, totalItems, loading, error } = useSelector(
    (state) => state.UserOperation
  );

  // const fetchUserData = useCallback(
  //   async ({ page, limit, filters }) => {
  //     try {
  //       dispatch(GetUserData({ page, limit, filters }));
  //     } catch (error) {
  //       toast.error(error.message || "Failed to load sellers");
  //       return { data: [], total: 0 };
  //     }
  //   },
  //   [dispatch]
  // );

  const fetchUserData = useMemo(
    () =>
      debounce(async ({ page, limit, filters }) => {
        try {
          dispatch(GetUserData({ page, limit, filters }));
        } catch (error) {
          toast.error(error.message || "Failed to load users");
          return { data: [], total: 0 };
        }
      }, 400),
    [dispatch] // safe: dispatch is stable
  );

  const handleStatusChange = useCallback(
    async (id, newStatus) => {
      dispatch(UpdateUser({ id, data: { status: newStatus } }))
        .unwrap()
        .then(() => {
          toast.success("User status updated"); // only on success
        })
        .catch((error) => {
          toast.error(error || "Failed to Update User");
          return { data: [], total: 0 };
        });
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      { key: "image", label: "Image" },

      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phoneno", label: "Phone No" },

      {
        key: "user_status",
        label: "Status",
        dropdownOptions: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "blocked", label: "Blocked" },
        ],
        onUpdate: (id, value) => {
          handleStatusChange(id, value);
        },
        render: (value) => (
          <Chip
            label={value}
            size="small"
            variant="outlined"
            color={
              value === "active"
                ? "success"
                : value === "inactive"
                ? "warning"
                : value === "blocked"
                ? "error"
                : "default"
            }
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //   const updateSellerStatus = (id, status) => {
  //     dispatch(UpdateSeller({ id, data: { status } }))
  //       .unwrap()
  //       .then(() => {
  //         toast.success(`Seller ${status} successfully`);
  //         setDetailModalOpen(false);
  //       })
  //       .catch(() => toast.error("Something went wrong"));
  //   };

  //   const handleApprove = (id) => updateSellerStatus(id, "Approved");
  //   const handleReject = (id) => updateSellerStatus(id, "Rejected");
  //   const handleBlock = (id) => updateSellerStatus(id, "Blocked");

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
      </div>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        {error ? (
          <ErrorMessage
            message={error}
            variant="error" // 🔹 error | warning | info | success
            dismissible // 🔹 user can remove this error
            onRetry={() => fetchUserData({ page: 1, limit: 10 })} // 🔹 retry button
            autoDismiss={false} // 🔹 auto dismiss disable
          />
        ) : (
          <ListProduct
            columns={columns}
            data={Userdata}
            serverMode={true}
            fetchData={fetchUserData}
            totalPages={totalPages}
            totalItems={totalItems}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default User;
