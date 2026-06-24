import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);

      console.log("LOGIN RESPONSE:", data);

      if (!data.success) {
        alert(data.message);
        return;
      }

      login(data.data.user, data.data.token);

      console.log("TOKEN SAVED:", data.data.token); // VERIFY

      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 
        focus:outline-none focus:ring-2 focus:ring-white"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 
        focus:outline-none focus:ring-2 focus:ring-white"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Login
          </button>
          <p className="text-center text-gray-200 text-sm mt-2">
            Don’t have an account?{" "}
            <button
              className="text-white font-medium hover:underline hover:text-gray-200 transition"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
