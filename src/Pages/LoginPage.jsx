// pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithFirebase } from "../redux/AppSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.app);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginWithFirebase(formData));
    if (loginWithFirebase.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-[#1a1a1b] p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          {isLoading ? "Please wait..." : "Login"}
        </button>

        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
