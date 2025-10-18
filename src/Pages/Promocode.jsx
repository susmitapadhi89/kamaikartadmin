import { useEffect, useState } from "react";
import PromoCodeCard from "../Component/Promocode/PromocodeCard";
import PromoCodeForm from "../Component/Promocode/PromoCodeForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CreatePromocode,
  DeletePromocodeData,
  GetPromocodeData,
  UpdatePromocodeData,
} from "../Redux/Features/PromoServicesSlice";
import toast from "react-hot-toast";

export const PromoCode = () => {
  const dispatch = useDispatch();
  const { PromocodeListData, Promocodeloading } = useSelector(
    (state) => state.PromoCodeOperation
  );

  useEffect(() => {
    dispatch(GetPromocodeData());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [editingPromoCode, setEditingPromoCode] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    min_order_value: "",
    max_discount: "",
    usage_limit: "",
    valid_from: "",
    valid_to: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  // Current date and time

  // Form handlers
  const handleOpenModal = (promoCode = null) => {
    if (promoCode) {
      setFormData({
        code: promoCode.code,
        description: promoCode.description,
        discount_type: promoCode.discount_type,
        discount_value: promoCode.discount_value,
        min_order_value: promoCode.min_order_value,
        max_discount: promoCode.max_discount,
        usage_limit: promoCode.usage_limit,
        valid_from: promoCode.valid_from,
        valid_to: promoCode.valid_to,
        is_active: promoCode.is_active,
      });
      setEditingPromoCode(promoCode);
    } else {
      setFormData({
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        min_order_value: "",
        max_discount: "",
        usage_limit: "",
        valid_from: "",
        valid_to: "",
        is_active: true,
      });
      setEditingPromoCode(null);
    }
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPromoCode(null);
    setFormData({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: "",
      min_order_value: "",
      max_discount: "",
      usage_limit: "",
      valid_from: "",
      valid_to: "",
      is_active: true,
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Promo code is required";
    } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code =
        "Promo code should contain only uppercase letters and numbers";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.discount_value || formData.discount_value <= 0) {
      newErrors.discount_value = "Discount value must be greater than 0";
    }

    if (
      formData.discount_type === "percentage" &&
      formData.discount_value > 90
    ) {
      newErrors.discount_value = "Percentage discount cannot exceed 90%";
    }

    if (!formData.min_order_value || formData.min_order_value < 0) {
      newErrors.min_order_value = "Minimum order value is required";
    }

    if (!formData.max_discount || formData.max_discount < 0) {
      newErrors.max_discount = "Maximum discount is required";
    }

    if (!formData.usage_limit || formData.usage_limit <= 0) {
      newErrors.usage_limit = "Usage limit must be greater than 0";
    }

    if (!formData.valid_from) {
      newErrors.valid_from = "Valid from date is required";
    }

    if (!formData.valid_to) {
      newErrors.valid_to = "Valid to date is required";
    } else if (
      formData.valid_from &&
      new Date(formData.valid_to) <= new Date(formData.valid_from)
    ) {
      newErrors.valid_to = "Valid to date must be after valid from date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editingPromoCode) {
        dispatch(
          UpdatePromocodeData({ id: editingPromoCode.id, data: formData })
        )
          .unwrap()
          .then(() => toast.success("Promo code updated successfully!"))
          .catch((err) => toast.error(err));
      } else {
        dispatch(CreatePromocode(formData))
          .unwrap()
          .then(() => toast.success("Promo code created successfully!"))
          .catch((err) => toast.error(err));
      }
      handleCloseModal();
    }
  };

  const handleDeletePromoCode = (id) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      dispatch(DeletePromocodeData(id))
        .unwrap()
        .then(() => toast.success("Promo code deleted successfully!"))
        .catch((err) => toast.error(err));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Promo Codes</h1>
              <p className="text-gray-600 mt-2">
                Manage discount codes and offers
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Promo Code
            </button>
          </div>

          {/* Promo Codes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Promocodeloading ? (
              <div className="text-center py-12">Loading promo codes...</div>
            ) : (
              PromocodeListData?.map((promoCode) => (
                <PromoCodeCard
                  key={promoCode.id}
                  promoCode={promoCode}
                  onEdit={handleOpenModal}
                  onDelete={handleDeletePromoCode}
                />
              ))
            )}
          </div>

          {PromocodeListData.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No promo codes
              </h3>
              <p className="mt-2 text-gray-500">
                Get started by creating your first promo code.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create Promo Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Promo Code Form Modal */}
      <PromoCodeForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        editingPromoCode={editingPromoCode}
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
