import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const ProductCard = ({ product, products, setProducts, fetchProducts }) => {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    try {
      const deleted = await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const editProduct = async (id) => {
    navigate(`/products/${id}/edit`);
  };

  return (
    <div
      className="bg-[--white]  rounded-2xl border flex flex-col gap-3 hover:shadow-md transition"
      key={product._id}
    >
      {/* IMAGE */}
      <div className="flex items-center justify-center bg-[--surface] h-52 overflow-hidden">
        <img
          className="w-full h-full object-contain hover:scale-105 transition"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="px-4 space-y-1">
        <h2 className="font-['Syne'] text-sm">{product.name}</h2>

        <p className="capitalize text-[--muted] text-xs font-normal">
          {product.category}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-lg text-[--ink] font-semibold font-serif">
            ${product.price}
          </p>

          <span className="text-xs text-[--muted]">Stock: {product.stock}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between gap-3 px-4 pb-2">
        {/* EDIT */}
        <button
          onClick={() => editProduct(product._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm hover:bg-[--surface] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487a2.25 2.25 0 113.182 3.182L8.25 19.463 4 20l.537-4.25L16.862 4.487z"
            />
          </svg>
          Edit
        </button>

        {/* DELETE */}
        <button
          onClick={() => deleteProduct(product._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7V4.75A.75.75 0 019.75 4h4.5a.75.75 0 01.75.75V7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7l.6 10.2a1 1 0 001 .8h4.8a1 1 0 001-.8L16 7"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
