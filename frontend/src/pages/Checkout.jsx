import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api.js";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "COD",
  });

  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      if (
        !checkoutData.name ||
        !checkoutData.phone ||
        !checkoutData.address ||
        !checkoutData.city
      ) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      await api.post("/order", {
        items: orderItems,
        shippingInfo: {
          name: checkoutData.name,
          phone: checkoutData.phone,
          address: checkoutData.address,
          city: checkoutData.city,
        },
        paymentMethod: checkoutData.paymentMethod,
      });

      setCart([]);
      localStorage.removeItem("cart");

      navigate("/orders");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-2xl font-semibold text-gray-500">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Heading */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold font-['Syne'] text-[--ink]">
          Checkout
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT: PRODUCTS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-4 flex gap-4 items-center"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>
                <p className="text-blue-600 font-bold">
                  ${item.price}
                </p>
              </div>

              <div className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: CHECKOUT SIDEBAR (FIXED STRUCTURE) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6 lg:sticky lg:top-6">

            {/* Shipping */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                Shipping Information
              </h2>

              <div className="grid gap-3">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={checkoutData.name}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={checkoutData.phone}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2"
                />

                <input
                  name="address"
                  placeholder="Address"
                  value={checkoutData.address}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2"
                />

                <input
                  name="city"
                  placeholder="City"
                  value={checkoutData.city}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="font-semibold mb-3">
                Payment Method
              </h3>

              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={checkoutData.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Qty</span>
                <span>
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-[--ink] text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;