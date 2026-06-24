import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import ProductCard from "../../components/admin/ProductCard";
import AddProduct from "../../components/admin/AddProduct";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [addCard, setAddCard] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      setProducts(data.products);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setAddCard(true);
  };

  if (loading) return <h1>Loading Products...</h1>;

  return (
    <div className="">
      <div className="mx-6 mb-6 py-4 flex justify-between border-b-[1px]">
        <h2 className="text-[--ink] text-xl font-bold font-['Syne']">
          Products
        </h2>
        <button
          className="w-[24vh] h-[6vh] rounded-3xl bg-[--ink] text-[--white]
          hover:bg-gray-800
          hover:shadow-md
          transition-all"
          onClick={() => handleAddProduct()}
        >
          Add Product
        </button>
      </div>
      {!addCard ? (
        <></>
      ) : (
        <AddProduct setProducts={setProducts} setAddCard={setAddCard} />
      )}
      {products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[14px]">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              products={products}
              setProducts={setProducts}
              fetchProducts={fetchProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
