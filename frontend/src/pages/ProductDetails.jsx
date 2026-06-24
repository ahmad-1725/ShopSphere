import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    console.log(count);
  }, [cart]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // TOAST
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!product)
    return (
      <div className="min-h-screen bg-[--surface] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-extrabold mb-2">Product Not Found</h2>
        <p className="text-[--muted] mb-6 max-w-md">
          This item may have been removed or the link is incorrect.{" "}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="px-12 py-5 bg-[--ink] font-medium text-xs text-[--white] rounded-full
        hover:bg-[#242424] hover:-translate-y-[2px] transition-all duration-300"
        >
          BACK TO PRODUCTS
        </button>
      </div>
    );
  if (loading) return <h2>Loading product details...</h2>;
  return (
    <div className="min-h-screen bg-[--surface] overflow-hidden">
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
            Digi<span className="text-[--gold] ">Store</span>
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className=" text-xs text-[--muted] uppercase"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
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
            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div>
        )}
      </header>
      <div className="px-4 sm:px-8 lg:px-20 py-4 text-xs font-normal overflow-x-auto whitespace-nowrap">
        {" "}
        <span
          className="text-[--muted] cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Home /{" "}
        </span>
        <span
          className="text-[--muted] cursor-pointer"
          onClick={() => navigate("/products")}
        >
          Products /{" "}
        </span>
        <span className="text-[--ink]">{product.name}</span>
      </div>
      <div
        className="
          flex flex-col lg:flex-row
          gap-10
          py-8 lg:py-12
          px-4 sm:px-8 lg:px-16
        "
      >
        <div
  className="
    relative
    overflow-hidden
    rounded-[1.75rem]
    bg-[--white]
    flex justify-center items-center
    w-full lg:w-[42%]
    h-fit
    lg:sticky lg:top-10
    py-10 sm:py-16
    group
  "
>
  {product.stock === 0 && (
    <p
      className="
        absolute left-4 top-4 z-10
        px-4 py-[6px]
        rounded-full
        bg-[--ink]
        text-[--white]
        text-xs
      "
    >
      OUT OF STOCK
    </p>
  )}

  <div className="overflow-hidden">
    <img
      className="
        max-h-[320px] sm:max-h-[420px]
        object-contain

        transition-transform duration-500 ease-out
        group-hover:scale-105
      "
      src={product.image}
      alt={product.name}
    />
  </div>
</div>
        <div
          className="w-full lg:w-[58%]
        py-4 lg:py-6
        px-2 sm:px-4 lg:px-16"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl
            leading-[0.9]
            font-outfit
            font-extrabold
            lg:scale-x-110
            break-words"
          >
            {product.name}
          </h1>
          <h2
            className="mt-6 lg:mt-10
              text-2xl sm:text-3xl
              font-inter font-black
              lg:scale-x-105"
          >
            ${product.price}
          </h2>
          <p
            className="
    text-sm sm:text-base
    leading-relaxed
    font-extralight
    my-6 lg:my-8
    py-6 lg:py-8
    border-y
  "
          >
            {" "}
            {product.description}
          </p>
          <div className="px-4 py-4 mb-4 bg-[--white] border rounded-2xl flex justify-between">
            <p className="text-[--muted]">Category</p>
            <p className="font-[sans]">{product.category}</p>
          </div>
          <div className="px-4 py-4 bg-[--white] border rounded-2xl flex justify-between">
            <p className="text-[--muted]">Stock</p>
            <p className="font-[sans]">{product.stock}</p>
          </div>
          <div
            className="
    text-center
    my-8 lg:my-10
    py-8
    border-y
  "
          >
            <button
              className="mb-3 w-full h-14 bg-[--ink] text-[--white] rounded-full
              hover:bg-[#242424] hover:-translate-y-[2px] hover:shadow-2xl  
              active:translate-y-[1px] active:h-13 active:shadow-md 
              transition-all duration-[400ms] ease-[cubic-bezier(.34,1.56,.64,1)]
              disabled:cursor-not-allowed disabled:opacity-60"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                triggerToast();
              }}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              className="w-full h-14 rounded-full bg-transparent border-[1.5px] text-[--ink]
                flex items-center justify-center gap-2 font-[DM_Sans] 
                text-[13px] tracking-[0.08em] uppercase
                transition-all duration-200 
                hover:bg-[#e4e2db] hover:border-[--ink]"
              onClick={() => navigate("/cart")}
            >
              View Cart ({count})
            </button>
          </div>{" "}
        </div>
      </div>

      <div
        className={`fixed bottom-8 left-1/2 z-[999]
          px-7 py-[14px] rounded-full
          bg-[--ink] text-[--white]
          flex items-center gap-2
          text-[13px] font-[DM_Sans] tracking-[0.04em]
          shadow-[0_16px_48px_rgba(0,0,0,0.3)]
          whitespace-nowrap
          transition-all duration-[400ms] ease-[cubic-bezier(.34,1.56,.64,1)]
          ${
            showToast
              ? "opacity-100 translate-x-[-50%] translate-y-0 scale-100"
              : "opacity-0 translate-x-[-50%] translate-y-[80px] scale-95"
          }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#4ADE80] flex-shrink-0"></span>
        Added to cart — {product.name}
      </div>
    </div>
  );
};

export default ProductDetails;
