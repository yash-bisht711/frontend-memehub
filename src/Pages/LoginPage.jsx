// pages/AuthForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithFirebase, signUpWithFirebase } from "../redux/AppSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.app);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isLogin ? loginWithFirebase : signUpWithFirebase;
    const resultAction = await dispatch(action(formData));
    if (loginWithFirebase.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-[#1a1a1b] p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">{isLogin ? "Login" : "Sign Up"}</h2>

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
          {isLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="text-center text-sm mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
