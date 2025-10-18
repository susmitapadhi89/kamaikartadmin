import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../../Component/Common/Loader";
import { Button, Chip } from "@mui/material";

export const SellerDetailModal = ({
  open,
  onClose,
  onApprove,
  onReject,
  onBlock,
  data,
}) => {
  const { SingleSeller, loading } = useSelector(
    (state) => state.SellerOperation
  );

  const seller = SingleSeller?.sellerProfile || data;

  if (!open) return null;
  const statusColor = {
    approved: "success",
    pending: "warning",
    rejected: "error",
    blocked: "default",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt- z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto animate-slideUp">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Seller Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : seller ? (
            <>
              {/* Seller Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <InfoBlock title="Personal Information">
                    <InfoRow label="First Name" value={seller.firstName} />
                    <InfoRow label="Last Name" value={seller.lastName} />
                    <InfoRow label="phoneno" value={seller.phoneNo} />
                    <InfoRow label="Email" value={seller.email} />
                    <InfoRow label="Role" value={seller.role_id} />
                    <div className="flex">
                      <span className="text-gray-600 w-32">Status:</span>
                      <Chip
                        label={seller.status || "N/A"}
                        color={
                          statusColor[seller.status?.toLowerCase()] || "default"
                        }
                        size="small"
                      />
                    </div>
                  </InfoBlock>

                  <InfoBlock title="Business Information">
                    <InfoRow label="Shop Name" value={seller.shopName} />
                    <InfoRow label="Shop Address" value={seller.Address} />
                    <InfoRow
                      label="Shop PickupAddress"
                      value={seller.pickupAddress}
                    />{" "}
                    <InfoRow label="Shop City" value={seller.city} />
                    <InfoRow label="Shop State" value={seller.state} />
                    <InfoRow label="Pincode" value={seller.pincode} />
                    <InfoRow
                      label="Shop GSTNumber"
                      value={seller.gstNumber}
                    />{" "}
                  </InfoBlock>

                  <InfoBlock title="Bank Infromation">
                    <InfoRow label=" Bank Name" value={seller.bankName} />{" "}
                    <InfoRow
                      label="Account Number"
                      value={seller.accountNumber}
                    />{" "}
                    <InfoRow label="IFSC" value={seller.ifsc} />
                  </InfoBlock>
                </div>

                {/* Documents */}
                <InfoBlock title="Documents">
                  <div className="grid grid-cols-2 gap-4">
                    <DocumentCard
                      title="Shop Image"
                      imageUrl={seller.shopImage}
                    />
                    <DocumentCard
                      title="Aadhar Card"
                      imageUrl={seller.adharCard}
                    />
                    <DocumentCard title="PAN Card" imageUrl={seller.panCard} />
                    <DocumentCard
                      title="GST Certificate"
                      imageUrl={seller.gstCertificate}
                    />
                    <DocumentCard
                      title="Canceled Check"
                      imageUrl={seller.cancelCheck}
                    />
                  </div>
                </InfoBlock>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {seller.status?.toLowerCase() === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onApprove(seller.user_id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onReject(seller.user_id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {seller.status?.toLowerCase() === "approved" && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => onBlock(seller.user_id)}
                  >
                    Block
                  </Button>
                )}

                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------
   Small Reusable Components
--------------------------------*/
const InfoBlock = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex">
    <span className="text-gray-600 w-32">{label}:</span>
    <span className="font-medium">{value || "N/A"}</span>
  </div>
);

const DocumentCard = ({ title, imageUrl }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
        onClick={() => imageUrl && setOpen(true)}
      >
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <div className="h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg animate-zoomIn"
          />
        </div>
      )}
    </>
  );
};

// View details
