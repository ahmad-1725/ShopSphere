import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

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

  const buttons = [
    { name: "All" },
    { name: "Laptops" },
    { name: "Cameras" },
    { name: "Wearables" },
    { name: "Gadgets" },
  ];

  const normalize = (str) => str?.toLowerCase();

  const filteredProducts =
    active === "All"
      ? products
      : products.filter(
          (p) => normalize(p.category) === normalize(active)
        );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[--surface]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
            Shop<span className="text-[--gold]">Sphere</span>
          </h1>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="text-[--muted] text-xs"
            >
              HOME
            </button>

            <button
              className="bg-[--ink] text-white rounded-full px-6 py-2"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>
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

            {user?.role === "admin" ? (
              <button onClick={handleDashboard}>Dashboard</button>
            ) : (
              <button onClick={() => navigate("/cart")}>Cart</button>
            )}
          </div>
        )}
      </header>

      {/* FILTER BAR */}
      <div className="px-6 py-6 mb-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-[--surface]">
        {/* SEARCH */}
        <input
          className="w-72 text-xs px-6 py-2 rounded-full border bg-[--white] outline-none"
          placeholder="Search products..."
          type="text"
        />

        {/* CATEGORY BUTTONS */}
        <div className="flex gap-3 flex-wrap justify-center">
          {buttons.map((button) => (
            <button
              key={button.name}
              onClick={() => setActive(button.name)}
              className={`text-xs px-5 py-2 rounded-full border transition-all
                ${
                  active === button.name
                    ? "bg-[--ink] text-white"
                    : "bg-[--white] text-[--muted]"
                }`}
            >
              {button.name}
            </button>
          ))}
        </div>

        {/* SORT */}
        <select className="text-xs px-4 py-2 rounded-full border bg-[--white]">
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A to Z</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto px-6 py-10 mb-10">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;