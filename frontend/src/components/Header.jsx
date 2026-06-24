import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b" >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
          Digi<span className="text-[--gold] ">Store</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {user ? (
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {user?.role === "admin" ? (
            <button
              className="px-4 py-2 rounded bg-black text-white"
              onClick={handleDashboard}
            >
              Dashboard
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded border"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-full"
          />

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}

          {user?.role === "admin" ? (
            <button onClick={handleDashboard}>Dashboard</button>
          ) : (
            <button onClick={() => navigate("/cart")}>Cart</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
