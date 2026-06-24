import React, { useState } from "react";
import api from "../../services/api.js";

const AddProduct = ({ setProducts, setAddCard }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const { data } = await api.post("/products", payload);

      setProducts((prev) => [...prev, data.product]);

      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
      });

      setAddCard(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-[--white] rounded-2xl shadow-xl w-full max-w-md p-6 relative">

        {/* CLOSE */}
        <button
          onClick={() => setAddCard(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-5 text-center">
          Add Product
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--ink]"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          {/* BUTTONS */}
          <div className="flex gap-3 mt-3">

            <button
              type="button"
              onClick={() => setAddCard(false)}
              className="w-full border py-2 rounded-lg hover:bg-[--surface] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-[--ink] text-white py-2 rounded-lg hover:bg-black transition"
            >
              Add Product
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;