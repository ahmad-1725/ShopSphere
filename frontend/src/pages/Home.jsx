import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../index.css";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    navigate("/products");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-[--surface]">
      <Header />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT */}
        <div className="flex-1">
          <h2 className="text-5xl md:text-6xl font-[sans-serif] font-black font-stretch-ultra-expanded leading-tight text-gray-900">
            Shop <br />
            <span className="font-['Instrument_Serif'] italic font-normal text-[--gold]">
              Smarter
            </span>{" "}
            <br />
            Every <br /> Day
          </h2>

          <p className="mt-6 text-[--muted] text-lg max-w-md font-normal">
            Discover premium electronics with fast delivery, bank-grade
            security, and unbeatable prices — curated for the discerning
            buyer.{" "}
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleClick}
              className="font-[sans-serif] font-normal bg-[--ink] text-[--white] px-10 py-4 text-white rounded-full shadow-md hover:bg-[#1e1e28] hover:-translate-y-0.5 transition"
            >
              Browse Products
            </button>

            <button className="px-10 py-4 border-2 border-gray-300 rounded-full hover:border-[--ink] transition">
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
      <section className="py-10 border">
        <div className=" m-auto px-36 py-16 text-7xl font-[serif] font-black scale-x-125 inline-block ">
          <p className="text-[--ink] -mb-20 ">Why Choose</p> <br />
          <span className="font-['Instrument_Serif'] italic font-normal text-[--gold] py-16">
            Shop Sphere
          </span>
        </div>
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-8">
          {/* CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out text-center">
            <h3 className="text-xl font-extrabold inline-block scale-x-110 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-500">
              Same-day dispatch on orders placed before 3 PM. Track your parcel
              in real time from warehouse to door.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out text-center">
            <h3 className="text-xl font-extrabold inline-block scale-x-110 mb-2">
              Secure Payment
            </h3>
            <p className="text-gray-500">
              256-bit SSL encryption, tokenized card storage, and 3D Secure
              authentication on every transaction.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out text-center">
            <h3 className="text-xl font-extrabold inline-block scale-x-110 mb-2">
              Best Quality
            </h3>
            <p className="text-gray-500">
              Every product is vetted through our 50-point quality check. Only
              the top 3% of submissions make the cut.{" "}
            </p>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div
          className="
            bg-[--ink]
            mx-4 md:mx-10 lg:mx-20
            px-6 sm:px-10 lg:px-24
            py-12 sm:py-16 lg:py-20
            rounded-3xl
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between
            gap-10
          "
        >
          {/* LEFT TEXT */}
          <div>
            <p
              className="
                text-4xl sm:text-5xl lg:text-6xl
                leading-[0.9]
                font-extrabold
                text-[--white]
                font-[sans-serif]
                inline-block
                lg:scale-x-125 lg:scale-y-90
              "
            >
              Ready to <br />
              <span className="italic font-thin text-[--gold]">
                Elevate
              </span>{" "}
              Your <br />
              Setup?
            </p>
          </div>

          {/* BUTTON */}
          <div className="w-full lg:w-auto">
            <button
              onClick={() => navigate("/products")}
              className="
                w-full lg:w-auto
                bg-[--gold]
                text-[--ink]
                text-xs sm:text-sm
                tracking-[0.12em]
                px-8 sm:px-10
                py-4
                rounded-full

                shadow-[0_0_80px_rgba(255,215,0,0.25)]

                hover:shadow-[0_0_140px_rgba(255,215,0,0.6)]
                hover:-translate-y-[2px]

                transition-all duration-500
              "
            >
              EXPLORE ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
