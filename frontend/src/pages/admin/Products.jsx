import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import ProductCard from "../../components/admin/ProductCard";
import AddProduct from "../../components/admin/AddProduct";

const AdminProducts = () => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <h1 className="text-lg font-semibold text-gray-600">
          Loading Products...
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mx-4 sm:mx-6 mb-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
        <h2 className="text-[--ink] text-xl sm:text-2xl font-bold font-['Syne']">
          Products
        </h2>

        <button
          onClick={handleAddProduct}
          className="
            w-full sm:w-auto
            px-6 py-3
            rounded-3xl
            bg-[--ink]
            text-[--white]
            hover:bg-gray-800
            hover:shadow-md
            transition-all
          "
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal/Form */}
      {addCard && (
        <div className="px-4 sm:px-6 mb-6">
          <AddProduct
            setProducts={setProducts}
            setAddCard={setAddCard}
          />
        </div>
      )}

      {/* Products */}
      {products.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <h2 className="text-gray-500 text-lg">
            No products found
          </h2>
        </div>
      ) : (
        <div className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
        </div>
      )}
    </div>
  );
};

export default AdminProducts;