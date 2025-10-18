import React, { useState, useRef, useEffect } from "react";
import {
  FiUpload,
  FiSave,
  FiPhone,
  FiMail,
  //FiClock,
  FiImage,
  FiMapPin,
  // FiDollarSign,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  GetsiteInfromationdata,
  UpdatesiteInfromationdata,
} from "../../Redux/Features/SiteConfigurationSlice";
import toast from "react-hot-toast";
import { Loader } from "../../Component/Common/Loader";

export const Siteinfo = () => {
  const dispatch = useDispatch();

  const { Siteinfo, loading, error } = useSelector(
    (state) => state.SiteConfigurationOpraion || {}
  );

  const [formData, setFormData] = useState({
    site_name: "",
    address: "",
    phone: "",
    email: "",
    // currency: "",
    // siteCopyright: " ",
    // timezone: "Asia/Kolkata",
  });

  const [siteLogo, setSiteLogo] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  const logoInputRef = useRef(null);
  const iconInputRef = useRef(null);

  useEffect(() => {
    dispatch(GetsiteInfromationdata());
  }, [dispatch]);

  useEffect(() => {
    // When Redux state updates, populate the form
    if (Siteinfo) {
      setFormData({
        site_name: Siteinfo.site_name || "",
        address: Siteinfo.address || "",
        phone: Siteinfo.phone || "",
        email: Siteinfo.email || "",
      });

      if (Siteinfo.logo) setLogoPreview(Siteinfo.logo);

      if (Siteinfo.favicon) setIconPreview(Siteinfo.favicon);
    }
  }, [Siteinfo]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoClick = () => {
    logoInputRef.current.click();
  };

  const handleIconClick = () => {
    iconInputRef.current.click();
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/png") {
        setSiteLogo(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a PNG image");
        e.target.value = "";
      }
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/png") {
        setSiteIcon(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setIconPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a PNG image");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    //if (siteIcon) data.append("favicon", siteIcon);

    if (siteIcon) {
      data.append("favicon", siteIcon);
    } else {
      data.append("favicon", Siteinfo.favicon);
    }
    //  if (siteLogo) data.append("logo", siteLogo);
    if (siteLogo) {
      data.append("logo", siteLogo);
    } else {
      data.append("logo", Siteinfo.logo);
    }
    for (let [key, value] of data.entries()) {
    }

    dispatch(UpdatesiteInfromationdata({ data }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Siteinformation updated");
      })
      .catch((err) => {
        toast.error(err.message || "UpdateSiteinfo Updatation failed");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-lg mr-4">
              <FiImage className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Information</h1>
              <p className="text-gray-600">Manage your Information</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors"
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          {error && (
            <ErrorMessage
              message={error}
              variant="error"
              dismissible={true}
              autoDismiss={true}
              dismissTimeout={5000}
              onRetry={() => dispatch(GetsiteInfromationdata())}
            />
          )}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Site Configuration
              </h2>
              <p className="text-gray-600 mb-6">
                Update your site settings and preferences
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Site Name */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="siteName"
                    >
                      Site Name
                    </label>
                    <div className="relative">
                      <input
                        id="site_name"
                        name="site_name"
                        value={formData.site_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                        type="text"
                        placeholder="Enter site name"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiImage className="text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <div className="relative">
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                        type="text"
                        placeholder="Enter address"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Currency */}
                  {/* <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="currency"
                    >
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pl-10"
                      >
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="INR">Indian Rupee (INR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                        <option value="JPY">Japanese Yen (JPY)</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="text-gray-500" />
                      </div>
                    </div>
                  </div> */}

                  {/* Contact Number */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="contactNumber"
                    >
                      Contact Number
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                        type="text"
                        placeholder="Enter contact number"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="siteLogo"
                    >
                      Site Logo
                    </label>
                    <div className="flex flex-col space-y-4">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={handleLogoClick}
                          className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span>
                            {siteLogo
                              ? siteLogo.logo
                              : "Change logo,Select new File"}
                          </span>
                          <FiUpload className="text-gray-500" />
                        </button>
                        <input
                          id="siteLogo"
                          ref={logoInputRef}
                          onChange={handleLogoUpload}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          type="file"
                          accept="image/png"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        * Use Transparent PNG image format to get the best site
                        icons.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    {logoPreview ? (
                      <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                        Logo Preview
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Timezone */}
                  {/* <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="timezone"
                    >
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="America/New_York">
                          America/New_York
                        </option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FiClock className="text-gray-500" />
                      </div>
                    </div>
                  </div> */}

                  {/* Email */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                        type="email"
                        placeholder="Enter email address"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Icon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="siteIcon"
                    >
                      Favicon
                    </label>
                    <div className="flex flex-col space-y-4">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={handleIconClick}
                          className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span>
                            {siteIcon
                              ? siteIcon.name
                              : "Change Icon,Select new File"}
                          </span>
                          <FiUpload className="text-gray-500" />
                        </button>
                        <input
                          id="siteIcon"
                          ref={iconInputRef}
                          onChange={handleIconUpload}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          type="file"
                          accept="image/png"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        * Use Transparent PNG image format to get the best site
                        icons.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    {iconPreview ? (
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={iconPreview}
                          alt="Icon preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                        Favicon Preview
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
