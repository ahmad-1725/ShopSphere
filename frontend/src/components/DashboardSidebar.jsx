import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {logout} = useAuth();

  const links = [
    {
      name: "Overview",
      path: "/dashboard/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75h7.5v7.5h-7.5v-7.5zm9 0h7.5v4.5h-7.5v-4.5zm0 6h7.5v10.5h-7.5v-10.5zm-9 3h7.5v7.5h-7.5v-7.5z"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5L12 3 3 7.5m18 0v9L12 21m9-13.5L12 12m0 9V12M3 7.5v9L12 21m-9-13.5L12 12"
          />
        </svg>
      ),
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5.25h6M9 9.75h6M9 14.25h6M5.25 3.75h13.5A1.5 1.5 0 0120.25 5.25v13.5A1.5 1.5 0 0118.75 20.25H5.25a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z"
          />
        </svg>
      ),
    },
    {
      name: "Customers",
      path: "/dashboard/customers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15"
          />
          <circle cx="8" cy="6.75" r="1.25" fill="currentColor" />
          <circle cx="16" cy="12" r="1.25" fill="currentColor" />
          <circle cx="10" cy="17.25" r="1.25" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
  <aside className="fixed top-0 left-0 h-dvh w-64 bg-[--ink] p-4 z-50 flex flex-col overflow-hidden">

  {/* HEADER */}
  <div className="px-2 py-4 border-b border-white/10">
    <h2 className="text-white font-['Instrument_Serif'] italic text-xl">
      Shop<span className="text-[--gold]">Sphere</span>
    </h2>
    <p className="text-white/40 uppercase text-xs">Admin Console</p>
  </div>

  {/* NAV */}
  <nav className="flex flex-col gap-2 mt-4">

    {links.map((link) => {
      const active = location.pathname === link.path;

      return (
        <button
          key={link.path}
          onClick={() => navigate(link.path)}
          className={`
            flex items-center gap-3
            px-4 py-2
            rounded-xl
            text-sm
            transition-all

            ${
              active
                ? "bg-[rgba(201,168,76,.14)] text-[#c9a84c]"
                : "text-white/70 hover:bg-white/5"
            }
          `}
        >
          {link.icon}
          {link.name}
        </button>
      );
    })}

  </nav>

  {/* FOOTER */}
  <div className="mt-auto">
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[--muted] hover:bg-white/10 transition cursor-pointer">

      <span className="text-sm">Admin</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5
        hover:text-[gold] transition-all"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 12H9m0 0l3-3m-3 3l3 3"
        onClick={logout}
        />
      </svg>

    </div>
  </div>

</aside>
  );
};

export default DashboardSidebar;
