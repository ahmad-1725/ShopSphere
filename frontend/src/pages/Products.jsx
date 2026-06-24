import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products);
    } catch (err) {
      setProducts([]);
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-[--surface]">
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
            Shop<span className="text-[--gold] ">Sphere</span>
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={()=>navigate("/home")} className="font-[sans-serif] text-[--muted] text-xs scale-x-110 px-4">HOME</button>
            <button
              className="bg-[--ink] text-[--white] rounded-full px-8 py-2"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>
            <p></p>
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

      <div className="px-6 py-6 mb-4 flex justify-center gap-4 bg-[--surface]">
        <input
          className="w-72 text-[--muted] text-xs px-10 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white] outline-none focus:text-[--ink] focus:ring-[0.05em] focus:ring-[--gold] focus:shadow-[0_0_20px_rgba(0,0,0,0.05)] "
          placeholder="Search products..."
          type="text"
        />
        <button className="text-[--muted] text-xs px-6 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white]">
          ALL
        </button>
        <button className="text-[--muted] text-xs px-6 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white]">
          LAPTOPS
        </button>
        <button className="text-[--muted] text-xs px-6 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white]">
          AUDIO
        </button>
        <button className="text-[--muted] text-xs px-6 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white]">
          WEARABLES
        </button>
        <button className="text-[--muted] text-xs px-6 py-2 rounded-full border-[0.01em] border-gray-300 bg-[--white]">
          CAMERAS
        </button>
        <select
          className="text-[--ink] text-xs px-4 py-2 ml-10 rounded-full border-[0.01em] border-gray-300 bg-[--white] outline-none  focus:ring-[0.05em] focus:ring-[--gold-light]"
          name=""
          id=""
        >
          <option value="">Sort: Featured</option>
          <option value="">Price: Low to High</option>
          <option value="">Price: High to Low</option>
          <option value="">Name: A to Z</option>
        </select>
      </div>

      <div className=" max-w-6xl mx-auto px-6 py10 ">
        {products.length === 0 ? (
          <p>Products not found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
