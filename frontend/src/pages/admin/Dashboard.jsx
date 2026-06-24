import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
   <div className="flex h-dvh bg-[--surface] overflow-hidden">

  {/* SIDEBAR */}
  <DashboardSidebar />

  {/* RIGHT SIDE */}
  <div className="flex-1 flex flex-col ml-64">

    {/* HEADER */}
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-['Instrument_Serif'] italic text-[#0C0C10] scale-x-125">
          Digi<span className="text-[--gold]">Store</span>
        </h1>

        <div className="hidden md:flex items-center gap-4">

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-full focus:outline-none"
          />    
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

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
        </div>
      )}
    </header>

    {/* ONLY SCROLLABLE AREA */}
    <main className="flex-1 p-6 overflow-y-auto">
      <Outlet />
    </main>

  </div>

</div>
  );
};

export default Dashboard;
