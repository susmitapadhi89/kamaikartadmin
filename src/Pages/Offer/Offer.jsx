import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ListProduct } from "../../Component/Tableview/Showdata";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBanner,
  DeleteBanner,
  GetBannerData,
  GetBannerById,
  UpdateBanner,
} from "../../Redux/Features/BannerServicesSlice";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../../Component/Common/Delete";
import {
  CreateOfferBanner,
  DeleteOfferBanner,
  GetOfferBannerData,
} from "../../Redux/Features/OfferServicesSlice";

export const OfferSetup = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDeleteId, setBannerToDeleteId] = useState(null);

  const { OfferbannerData, loading, error } = useSelector(
    (state) => state.OfferOperation
  );

  useEffect(() => {
    dispatch(GetOfferBannerData());
  }, [dispatch]);
  console.log(OfferbannerData);

  const [newOffer, setNewOffer] = useState({
    title: "",
    image: "",
    link: "", // ✅ added type
  });
  const [previewImage, setPreviewImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setNewOffer({ ...newOffer, image: file });
  //     setPreviewImage(URL.createObjectURL(file));
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, or PNG files are allowed!");
        // Reset the input so user can select again
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setNewOffer({ ...newOffer, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteClick = (id) => {
    setBannerToDeleteId(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setBannerToDeleteId(null);
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!bannerToDeleteId) return;

      const res = await dispatch(DeleteOfferBanner(bannerToDeleteId)).unwrap();
      resetForm();
      toast.success(res.message || "Banner deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setBannerToDeleteId(null);
    }
  }, [dispatch, bannerToDeleteId]);

  const resetForm = () => {
    setNewOffer({ title: "", image: "", type: "", link: "" }); // ✅ reset type
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newOffer.title.trim()) return toast.error("Title required");
    if (!newOffer.image) return toast.error("Image required");

    const formData = new FormData();
    formData.append("title", newOffer.title);
    formData.append("link", newOffer.link); // ✅ add type

    if (newOffer.image instanceof File) {
      formData.append("image", newOffer.image);
    } else if (newOffer.image) {
      formData.append("image", newOffer.image);
    }

    dispatch(CreateOfferBanner(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Banner created");
        resetForm();
      })
      .catch((err) => toast.error(err.message || "Create failed"));
  };

  const BannerColumns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "image", label: "Image" },
      { key: "title", label: "Title" },
      { key: "link", label: "link" }, // ✅ show type in table
    ],
    []
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Offer Setup</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-6 mb-8"
      >
        {/* Left */}
        <div className="space-y-6 pt-12">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Offer Title
            </label>
            <input
              type="text"
              value={newOffer.title}
              onChange={(e) =>
                setNewOffer({ ...newOffer, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Offer Title"
            />
          </div>

          {/* ✅ Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Offer Link
            </label>
            <input
              type="text"
              value={newOffer.link}
              onChange={(e) =>
                setNewOffer({ ...newOffer, link: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Offer Link"
            />
          </div>
        </div>

        {/* Right: Upload */}
        <div>
          <label
            htmlFor="bannerImage"
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
              <p className="text-sm text-gray-600">Click to upload </p>
            )}
          </label>
          <input
            type="file"
            id="bannerImage"
            ref={fileInputRef} // ✅
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-gray-200">
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
            {"Submit"}
          </button>
        </div>
      </form>

      {/* Banner List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Offter List
          </h2>
          <ListProduct
            columns={BannerColumns}
            data={OfferbannerData}
            //onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
        title="Delete Banner"
        message="Are you sure you want to delete this banner?"
      />
    </div>
  );
};
