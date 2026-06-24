import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api.js";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const [loading, setLoading] = useState(false);

  // calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      // ✅ FIXED payload
      await api.post("/order", {
        items: orderItems,
      });

      // clear cart
      setCart([]);
      localStorage.removeItem("cart");

      navigate("/orders");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <h1>Cart is empty</h1>;

  return (
    <div>
      <h1>Checkout</h1>

      {cart.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>$. {item.price}</p>
        </div>
      ))}

      <h2>Total: $. {total}</h2>

      <button onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
