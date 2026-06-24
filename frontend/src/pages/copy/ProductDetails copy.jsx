import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState();

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

  if (!product) return <h2>Product not found...</h2>;
  if (loading) return <h2>Loading product details...</h2>;
  return (
    <div>
      <img src={product.image} alt="" />
      <h1>{product.name}</h1>
      <h2>$.{product.price}</h2>

      <p>{product.description}</p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <h3 onClick={ () => navigate("/cart")}>View Cart</h3>
      <p>{count}</p>
    </div>
  );
};

export default ProductDetails;
