import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className=" max-w-6xl mx-auto px-6 py10 ">
        <h1 className="font-bold text-3xl my-3 mb-6">Products</h1>
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
