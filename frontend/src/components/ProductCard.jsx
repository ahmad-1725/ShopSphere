import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden group"
    >
      {/* IMAGE */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-blue-600 font-bold text-lg">
          ${product.price}
        </p>

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevents card click
          }}
          className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-300 hover:text-black transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;