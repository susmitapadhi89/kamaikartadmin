import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Login } from "../Redux/Features/AuthenticationServicesSlice";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, loading, error } = useSelector(
    (state) => state.AuthOpration
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setFieldErrors({ username: false, password: false });
  };

  //submit data
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      Login({
        identifier: formData.username, // backend પ્રમાણે field હોઈ શકે identifier
        password: formData.password,
      })
    );
  };
  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful! 🎉");

      navigate("/admin/Dashboard/home");
      setFormData({
        username: "",
        password: "",
        remember: false,
      });
    }

    if (isLoggedIn === false) {
      setFormData({
        username: "",
        password: "",
        remember: false,
      });
    }

    const savedRemember = localStorage.getItem("rememberMe") === "true";
    const savedUsername = localStorage.getItem("username") || "";
    const savedPassword = localStorage.getItem("password") || "";

    if (savedRemember) {
      setFormData({
        username: savedUsername,
        password: savedPassword,
        remember: savedRemember,
      });
    }

    if (error) {
      toast.error(error);
      setFieldErrors({
        username: true,
        password: true,
      });
    }
  }, [error, navigate, isLoggedIn]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img className="h-24 w-auto sm:h-28" src="Logo.png" alt="Logo" />
        </div>

        {/* Form Title */}
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.password ? "border-red-500" : "border-gray-300"
                } pr-10`} // Add extra padding on the right for the icon
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div> */}

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {loading && <p className="text-blue-500">Logging in...</p>}
          {error && (
            <p className="text-red-500">
              {typeof error === "object" ? error.message : error}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
