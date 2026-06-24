import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", form);

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="inset-0 absolute">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          alt="background"
        />
        {/* Dark Overlay */}
        <div className=" bg-black/60 absolute inset-0"></div>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="font-bold text-3xl text-center text-white mb-8">
            Create Account
          </h2>

          <input
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
            type="text"
            placeholder="Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
            type="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
            type="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-gray-200 text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-white hover:underline font-medium hover:text-gray-200 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
