import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };
  const countSubTotal = () => {
    let count = 0;
    cart.map((item) => {
      count += item.price * item.quantity;
    });
    let total = String(count);
    return total;
  };

  if (cart.length === 0)
    return (
      <div className="bg-[--surface] min-h-screen">
        <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* LOGO */}
            <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
              Shop<span className="text-[--gold] ">Sphere</span>
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
        </header>
        <div className="min-h-96 flex justify-center items-center">
          <div className="max-w-md text-center p-10">
            <div className="inline-flex items-center justify-center p-5 rounded-3xl bg-[--white] border shadow-sm my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="w-11 h-11 text-[--muted]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7"
                />
                <circle cx="9" cy="19" r="1.25" />
                <circle cx="18" cy="19" r="1.25" />
              </svg>
            </div>{" "}
            <h1 className="py-2 font-[sans-serif] text-3xl font-extrabold">
              Your Cart is Empty
            </h1>
            <p className="text-[--muted] px-10 py-4 mb-2 text-sm leading-relaxed">
              Looks like you haven't added anything yet. Discover our full range
              of products.
            </p>
            <button
              className="bg-[--ink] w-48 px-6 py-3 rounded-3xl text-[--white] text-sm uppercase"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-[--surface] min-h-screen">
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-2xl font-normal font-[serif] italic text-[#0C0C10]">
            Shop<span className="text-[--gold] ">Sphere</span>
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

      <div className="py-10 px-20 border-b">
        <p className="text-6xl font-syne font-extrabold tracking-[-0.025em] ">
          Shopping{" "}
          <span className="font-['Instrument_Serif'] italic font-normal text-[--gold]">
            Cart
          </span>
        </p>
      </div>
      <div className="flex lg:flex-row flex-col items-center lg:items-start lg:justify-evenly py-20">
        <div className="flex-col w-[60%]">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-4 m-4 bg-[--white] rounded-xl border"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl bg-[--surface] overflow-hidden">
                <img
                  src={item.image}
                  alt="item.pic"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="flex-1">
                <h3 className="uppercase text-xs font-medium text-[--gold]">
                  {item.category}
                </h3>

                <h3 className="font-[sans-serif] font-bold">{item.name}</h3>

                <p className="text-[--muted] font-serif">${item.price}</p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-end justify-between min-w-[120px]">
                <h3 className="font-serif font-extrabold text-2xl">
                  ${(item.price * item.quantity).toFixed(2)}
                </h3>

                <div className="bg-[--surface] border py-1 rounded-2xl flex items-center">
                  <button className="px-3" onClick={() => item.quantity--}>
                    -
                  </button>

                  <p className="px-4">{item.quantity}</p>

                  <button className="px-3" onClick={() => item.quantity++}>
                    +
                  </button>
                </div>

                <button
                  className="text-[--muted] text-xs font-normal uppercase mt-2"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[30%] bg-[--white] rounded-2xl">
          <div className="">
            <div className="border-b">
              <p className="mx-10 my-5 text-[--ink] text-lg scale-x-105 font-[sans] font-bold">
                Order Summary
              </p>
            </div>
            <div className="p-6 text-sm text-[--muted] border-b">
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>${countSubTotal()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p className="text-green-600">Free</p>
              </div>
            </div>
            <div className="flex font-[sans-serif] font-bold justify-between px-6 py-4">
              <p>Total</p>
              <p className="text-2xl font-serif">${total}</p>
            </div>
            <div className="px-6 py-6 flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full h-14 bg-[--ink] text-[--white] rounded-full
                  font-[DM_Sans] text-[13px] tracking-[0.08em] uppercase
                  transition-all duration-300
                  hover:bg-[#242424] hover:-translate-y-[2px] hover:shadow-xl
                  active:translate-y-[1px] active:shadow-md"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full h-14 rounded-full border-[1.5px] text-[--ink]
                  text-[13px] uppercase tracking-[0.08em]
                  transition-all duration-200
                  hover:bg-[#e4e2db]"
              >
                Continue Shopping
              </button>
            </div>
            <div className=" border-t p-4 mx-6 text-sm font-normal text-[--muted]">
              <p className="my-1">256-bit SSL encrypted checkout</p>
              <p className="my-1">Free returns within 30 days</p>
              <p className="my-1">24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
