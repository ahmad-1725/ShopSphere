import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Loader from '../components/Loader';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      }).finally(()=>{
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    navigate("/products");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if(loading){
    return <Loader />
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT */}
        <div className="flex-1">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Shop Smart, <br />
            Shop <span className="text-blue-600">Digital</span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-md">
            Discover premium electronics with fast delivery, secure checkout,
            and unbeatable prices.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Browse Products
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-kbogl.nitrocdn.com/AbvhSakynrVOIgIpkGhkwCCbthSKbCeK/assets/images/optimized/rev-ee5823e/as2.ae/wp-content/uploads/2024/10/Gadgets-Examples.webp"
            alt="Shopping"
            className="rounded-2xl shadow-2xl hover:scale-105 transition duration-300"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-8">
          {/* CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-500">
              Get your orders quickly and reliably.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-500">100% secure checkout experience.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
            <p className="text-gray-500">
              Top-rated products from trusted sellers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
