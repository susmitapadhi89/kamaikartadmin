import React, { useState, useRef, useMemo, useEffect } from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  CreatePaymentType,
  GetPaymenttypeById,
  GetPaymenttypeData,
  UpdatePaymentType,
} from "../../Redux/Features/PaymentServicesSlice";
import toast from "react-hot-toast";

export const PaymentPage = () => {
  const dispatch = useDispatch();
  const { PaymentListdata, Paymentloading, Paymenterror } = useSelector(
    (state) => state.PaymentOperation
  );

  useEffect(() => {
    dispatch(GetPaymenttypeData());
  }, [dispatch]);

  const PaymentColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "image", label: "Payment Image" },
      { key: "name", label: "Payment Name" },
      { key: "mode", label: "Payment Mode" },
      { key: "key_id", label: "Payment ID" },
      { key: "is_active", label: "Activation" },
    ],
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mode: "test",
    image: null,
    key_id: "",
    key_secret: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Reset form when modal opens/closes
  const handleOpenModal = async (payment = null) => {
    setErrors({});
    if (payment) {
      try {
        const result = await dispatch(GetPaymenttypeById(payment)).unwrap();
        setFormData({
          name: result?.data.name || "",
          mode: result?.data.mode || "test",
          image: result?.data.image || null,
          key_id: result?.data.key_id || "",
          key_secret: result?.data.key_secret || "",
          is_active: result?.data.is_active ?? true,
        });
        setEditingPayment(result);
        setImagePreview(result?.data.image || null);
        setShowModal(true);
      } catch (err) {
        toast.error("Failed to fetch payment details!");
      }
    } else {
      // adding new
      setFormData({
        name: "",
        mode: "test",
        image: null,
        key_id: "",
        key_secret: "",
        is_active: true,
      });
      setEditingPayment(null);
      setImagePreview(null);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPayment(null);
    setFormData({
      name: "",
      mode: "test",
      image: null,
      key_id: "",
      key_secret: "",
      is_active: true,
    });
    setImagePreview(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (type === "checkbox") {
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Payment name is required";
    }

    if (!formData.mode) {
      newErrors.mode = "Please select a mode";
    }

    if (!formData.image) {
      newErrors.image = "Please upload an image";
    }

    if (!formData.key_id.trim()) {
      newErrors.key_id = "Key ID is required";
    }

    if (!formData.key_secret.trim()) {
      newErrors.key_secret = "Key secret is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("mode", formData.mode);
    payload.append("key_id", formData.key_id);
    payload.append("key_secret", formData.key_secret);
    payload.append("is_active", formData.is_active);
    if (formData.image instanceof File) {
      // user selected a new image file
      payload.append("image", formData.image);
    } else if (typeof formData.image === "string") {
      // user didn't change image — send the URL string
      payload.append("image", formData.image);
    }

    try {
      if (editingPayment) {
        await dispatch(
          UpdatePaymentType({ id: editingPayment.data.id, data: payload })
        ).unwrap();
        toast.success("Payment updated successfully!");
      } else {
        await dispatch(CreatePaymentType(payload)).unwrap();
        toast.success("Payment added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      toast.error(err || "Something went wrong!");
    }
  };

  {
    Paymentloading && <p className="text-center text-blue-600">Loading...</p>;
  }
  {
    Paymenterror && <p className="text-center text-red-500">{Paymenterror}</p>;
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Payment Methods
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your payment gateway configurations
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
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
            Add Payment Method
          </button>
        </div>

        {/* Payments List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Configured Payment Methods
            </h2>
          </div>
          <ListProduct
            columns={PaymentColumns}
            data={PaymentListdata}
            onEdit={(payment) => handleOpenModal(payment)}
            filtershow={false}
          />
        </div>
      </div>

      {/* Add/Edit Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 mt-10 sm:p-4">
          <div className="bg-white rounded-2xl  w-full max-w-5xl overflow-hidden flex flex-col ">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5  py-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {editingPayment
                  ? "Edit Payment Method"
                  : "Add New Payment Method"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 transition-colors duration-200"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form Container (scrolls only inside content) */}
            <div className="overflow-y-auto w-full max-h-[85vh] p-2 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN */}
                  <div className="space-y-4">
                    {/* Payment Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Payment Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter payment gateway name"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                          errors.name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Environment Mode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Environment Mode <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["test", "live"].map((mode) => (
                          <div
                            key={mode}
                            onClick={() => setFormData({ ...formData, mode })}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              formData.mode === mode
                                ? mode === "test"
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  formData.mode === mode
                                    ? mode === "test"
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-green-500 bg-green-500"
                                    : "border-gray-400"
                                }`}
                              ></div>
                              <div>
                                <div className="font-medium capitalize">
                                  {mode} Mode
                                </div>
                                <div className="text-xs text-gray-500">
                                  {mode === "test"
                                    ? "For testing purposes"
                                    : "Production environment"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.mode && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.mode}
                        </p>
                      )}
                    </div>

                    {/* API Credentials */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        API Credentials
                      </h3>

                      <div className="space-y-4">
                        {/* Key ID */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Key ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="key_id"
                            value={formData.key_id}
                            onChange={handleInputChange}
                            placeholder="Enter your API key ID"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                              errors.key_id
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.key_id && (
                            <p className="text-sm text-red-600 mt-1">
                              {errors.key_id}
                            </p>
                          )}
                        </div>

                        {/* Key Secret */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Key Secret <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="key_secret"
                            value={formData.key_secret}
                            onChange={handleInputChange}
                            placeholder="Enter your API key secret"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                              errors.key_secret
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.key_secret && (
                            <p className="text-sm text-red-600 mt-1">
                              {errors.key_secret}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-6">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Logo <span className="text-red-500">*</span>
                      </label>

                      <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 text-center relative">
                        {imagePreview ? (
                          <>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-36 w-auto object-contain mx-auto"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute top-2 right-2  text-black rounded-sm
                               p-1 "
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">
                              <span className="font-medium text-blue-600">
                                Click to upload
                              </span>{" "}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG up to 5MB
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          name="image"
                          onChange={handleInputChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      {errors.image && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.image}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-800 text-sm">
                            Active Payment Gateway
                          </h3>
                          <p className="text-xs text-gray-500">
                            Enable or disable this payment method
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                        </label>
                      </div>
                      <p
                        className={`mt-3 text-sm font-medium ${
                          formData.is_active
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {formData.is_active
                          ? "This payment method is active"
                          : "This payment method is disabled"}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg"
                      >
                        {editingPayment ? "Update Payment" : "Save Payment"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
