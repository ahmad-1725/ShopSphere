import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = ()=>{
    navigate("/checkout");
  }

  if (cart.length === 0) return <h1>Cart is empty...</h1>;

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>₹ {item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
          />

          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h2>Total : ${total}</h2>
      <button onClick={handleCheckout}>CheckOut</button>
    </div>
  );
};

export default Cart;
