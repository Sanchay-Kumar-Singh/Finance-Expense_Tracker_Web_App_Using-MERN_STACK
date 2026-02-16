import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { FaLock, FaEnvelope } from "react-icons/fa";

const InputField = ({ id, label, type, value, onChange, icon, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
      />
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* LEFT SIDE HERO */}
      <div className="hidden lg:flex relative bg-[#0f172a] text-white">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
          alt="expenses"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 p-16 flex flex-col justify-between">
          <div>
            <p className="uppercase tracking-widest text-sm text-white/70 mb-6">
              Smart Finance Tracking 
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Take control of your money
              <br />
              <span className="text-white/70">
                Manage, Track & Grow
              </span>
            </h1>

            <p className="mt-6 text-white/70 max-w-md text-lg">
              Log in to access your personalized dashboard, view analytics, and track expenses easily.
            </p>
          </div>

          <div className="text-sm text-white/60">
           "Secure, reliable, and trusted by thousands."
          </div>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="flex items-center justify-center bg-[#fafafa] px-6">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* SERVER NOTE */}
          <div className="mb-5 text-xs text-gray-500 font-medium bg-gray-100 border md:text-[13px] border-gray-200 p-3 rounded-md">
            If login fails, please wait a few seconds and try again.
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <InputField
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope />}
              placeholder="you@example.com"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock />}
              placeholder="Minimum 8 characters"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-md bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium underline text-blue-700">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

