import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    profession: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted:", formData);
      navigate("/home");
    }
  };

  const toggleFormMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const { role } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        {/* Logo / Navbar-like */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">
          {isLogin
            ? "Welcome Back"
            : `Create ${
                role === "citizen"
                  ? "Citizen"
                  : role === "govt-admin"
                  ? "Admin"
                  : "Business"
              } Account`}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          {isLogin
            ? "Log in to access government services"
            : "Sign up to access government services"}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-600`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Age</option>
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>36-50</option>
                  <option>50+</option>
                </select>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Profession</option>
                <option>Student</option>
                <option>Self-Employed</option>
                <option>Government Employee</option>
                <option>Private Sector</option>
                <option>Retired</option>
                <option>Other</option>
              </select>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select State/UT</option>

                {/* States */}
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chhattisgarh</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Odisha</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Tripura</option>
                <option>Uttar Pradesh</option>
                <option>Uttarakhand</option>
                <option>West Bengal</option>

                {/* Union Territories */}
                <option>Andaman and Nicobar Islands</option>
                <option>Chandigarh</option>
                <option>Dadra and Nagar Haveli and Daman and Diu</option>
                <option>Delhi</option>
                <option>Lakshadweep</option>
                <option>Puducherry</option>
                <option>Ladakh</option>
                <option>Jammu and Kashmir</option>

                <option>Other</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.94 0 6.62 1.7 8.14 3.12l5.9-5.9C34.44 3.44 29.72 1.5 24 1.5 14.94 1.5 7.2 6.98 3.66 14.91l6.91 5.37C12.36 14.21 17.74 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24.5c0-1.64-.15-3.21-.42-4.71H24v9.01h12.75c-.55 2.91-2.18 5.39-4.64 7.05l7.07 5.48C43.66 37.04 46.5 31.22 46.5 24.5z"
            />
            <path
              fill="#4A90E2"
              d="M24 46.5c6.48 0 11.9-2.13 15.87-5.78l-7.07-5.48C30.58 37.62 27.48 38.5 24 38.5c-6.26 0-11.64-4.71-13.43-11.13l-6.91 5.36C7.2 41.02 14.94 46.5 24 46.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.57 27.37c-.44-1.3-.68-2.7-.68-4.12s.24-2.82.68-4.12l-6.91-5.37C2.6 16.57 1.5 20.11 1.5 24s1.1 7.43 3.16 10.24l6.91-5.37z"
            />
          </svg>
          <span>Google</span>
        </button>

        {/* Toggle Mode */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleFormMode}
            className="text-blue-600 font-semibold hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
