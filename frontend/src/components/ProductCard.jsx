import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const rating = product.rating || 0;
  const count = product.numOfReviews || 0;

  return (
    <div
      onClick={handleClick}
      className="
        group relative cursor-pointer
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        hover:shadow-2xl
        transition-all duration-300
        overflow-hidden
        flex flex-col
        h-full
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 p-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full h-full object-contain
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        {/* CATEGORY */}
        <span className="
          w-fit text-[10px] font-semibold
          px-2.5 py-1 rounded-full
          bg-gray-100 text-gray-600
          tracking-wide
        ">
          {product.category}
        </span>

        {/* TITLE */}
        <h3 className="
          mt-3 text-[15px] sm:text-base
          font-semibold text-gray-900
          line-clamp-2 leading-snug
        ">
          {product.name}
        </h3>

        {/* PRICE + RATING */}
        <div className="mt-3 flex items-end justify-between">
          <p className="text-xl font-bold text-blue-600">
            ${product.price}
          </p>

          {/* REAL RATING */}
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </span>

            <span>
              ({rating.toFixed(1)}) · {count}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="
              w-full py-2.5 rounded-xl
              bg-gradient-to-r from-gray-900 to-black
              text-white text-sm font-medium
              hover:scale-[1.02] active:scale-[0.98]
              transition shadow-md hover:shadow-xl
            "
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;