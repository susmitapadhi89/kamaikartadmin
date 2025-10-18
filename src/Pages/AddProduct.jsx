import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorAndSizeSelector } from "../Component/Product/Dropdown";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    subsubCategory: "",
    brand: "",
    unit: "pc",
    price: "",
    orignalprice: "",
    discount: "",
    quantity: "",
    description: "",
    images: [],
    thumbnail: null,
    shippingCost: "",
    colors: [],
    sizes: [],
    attributes: [],
    metaTitle: "",
    fabric: "",
    status: true,
    fabricWarrantyType: "",
    fabricWarrantyDuration: "",
    fabricWarrantyPeriod: "",
    replacementDate: "",
  });

  // Sample data
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
  ];

  const subCategories = {
    1: ["Mobile Phones", "Laptops", "Accessories"],
    2: ["Men", "Women", "Kids"],
    3: ["Furniture", "Appliances", "Decor"],
  };

  const units = ["pc", "kg", "l", "m", "set"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setProduct({ ...product, images: [...files] });
    } else if (name === "thumbnail") {
      setProduct({ ...product, thumbnail: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));
  }, []);

  const removeImage = useCallback((index) => {
    setProduct((prev) => {
      const imgs = [...prev.images];
      imgs.splice(index, 1);
      return {
        ...prev,
        images: imgs,
      };
    });
  }, []);

  const handleAttributeChange = (index, field, value) => {
    const updated = [...product.attributes];
    updated[index] = { ...updated[index], [field]: value };
    setProduct({ ...product, attributes: updated });
  };

  const addAttribute = () => {
    setProduct({
      ...product,
      attributes: [...product.attributes, { name: "", value: "" }],
    });
  };

  const removeAttribute = (index) => {
    const updated = [...product.attributes];
    updated.splice(index, 1);
    setProduct({ ...product, attributes: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    navigate("/admin/products");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <button
            onClick={() => navigate("/Product/View")}
            className="px-4 py-2 bg-gray-200 text-fontcolourgray rounded hover:bg-gray-300"
          >
            Back to Products
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-8">
            {/* General Information Section */}
            <section>
              <h2 className="text-xl font-sm mb-4 border-b pb-2">
                General Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-fontcolourgray mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-fontcolourgray mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Main Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!product.category}
                  >
                    <option value="">
                      {product.category
                        ? "Select Sub Category"
                        : "Select Category First"}
                    </option>
                    {product.category &&
                      subCategories[product.category].map((sub, i) => (
                        <option key={i} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    SubSub Category
                  </label>
                  <select
                    name="subsubCategory"
                    value={product.subsubCategory}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!product.subCategory}
                  >
                    <option value="">
                      {product.subCategory
                        ? "Select SubSub Category"
                        : "Select SubCategory First"}
                    </option>
                    {product.subCategory &&
                      subCategories[product.category].map((sub, i) => (
                        <option key={i} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Unit *
                  </label>
                  <select
                    name="unit"
                    value={product.unit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {units.map((unit, i) => (
                      <option key={i} value={unit}>
                        {unit.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Fabric
                  </label>
                  <textarea
                    name="fabric"
                    value={product.fabric}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Attributes */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm  text-fontcolourgray">
                    Attributes
                  </label>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Attribute
                  </button>
                </div>

                {product.attributes.map((attr, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
                  >
                    <input
                      type="text"
                      placeholder="Attribute Name"
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(i, "name", e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Attribute Value"
                      value={attr.value}
                      onChange={(e) =>
                        handleAttributeChange(i, "value", e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeAttribute(i)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Colors and Sizes */}
              <div className="mt-6">
                <ColorAndSizeSelector
                  product={product}
                  setProduct={setProduct}
                />
              </div>
            </section>

            {/* Pricing & Inventory Section */}
            <section>
              <h2 className="text-xl font-sm mb-4 border-b pb-2">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-fontcolourgray mb-1">
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="w-full pl-8 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Original Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="orignalprice"
                      value={product.orignalprice}
                      onChange={handleChange}
                      className="w-full pl-8 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm text-fontcolourgray mb-1">
                    Shipping Cost
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="shippingCost"
                      value={product.shippingCost}
                      onChange={handleChange}
                      className="w-full pl-8 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Media Section */}
            <section>
              <h2 className="text-xl font-sm mb-4 border-b pb-2">Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Thumbnail Image *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {product.thumbnail ? (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(product.thumbnail)}
                            alt="Thumbnail preview"
                            className="mx-auto h-32 object-contain"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setProduct({ ...product, thumbnail: null })
                            }
                            className="mt-2 text-sm text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="thumbnail-upload"
                              className="relative cursor-pointer bg-white rounded-md text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="thumbnail-upload"
                                name="thumbnail"
                                type="file"
                                className="sr-only"
                                onChange={handleChange}
                                accept="image/*"
                                required
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 2MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm  text-fontcolourgray mb-1">
                    Gallery Images*
                  </label>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-4">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={
                              typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-32 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                            {index === 0 ? "Main Image" : `Image ${index + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${"border-gray-300 hover:border-blue-500 bg-gray-50"}`}
                  >
                    <input
                      type="file"
                      id="product-images"
                      name="images"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="product-images"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium text-blue-600">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (Max 10 images)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* SEO & Status Section */}
            <section>
              <h2 className="text-xl font-sm mb-4 border-b pb-2">
                SEO & Status
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {/* Fabric Warranty Field */}
                <div>
                  <label className="block text-sm text-fontcolourgray mb-1">
                    Fabric Warranty/Guarantee
                  </label>
                  <div className="flex items-center space-x-4">
                    <select
                      name="fabricWarrantyType"
                      value={product.fabricWarrantyType || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="warranty">Warranty</option>
                      <option value="guarantee">Guarantee</option>
                    </select>

                    <input
                      type="number"
                      name="fabricWarrantyDuration"
                      value={product.fabricWarrantyDuration || ""}
                      onChange={handleChange}
                      placeholder="Duration"
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-24"
                    />

                    <select
                      name="fabricWarrantyPeriod"
                      value={product.fabricWarrantyPeriod || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Period</option>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>

                {/* Replacement Date Field */}
                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Replacement Date (if applicable)
                  </label>
                  <input
                    type="date"
                    name="replacementDate"
                    value={product.replacementDate || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={product.metaTitle}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm  text-fontcolourgray mb-1">
                    Status
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.status}
                      onChange={() =>
                        setProduct({ ...product, status: !product.status })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-fontcolourgray">
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
