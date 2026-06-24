import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading ,setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      console.log(data);

      setForm(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await api.put(`/products/${id}`, form);
      console.log(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }finally{
      setLoading(false);
    }
  };

  if(loading) return <h2>Loading...</h2>;
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          placeholder="Image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button type="button" onClick={() => navigate("/dashboard/products")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
