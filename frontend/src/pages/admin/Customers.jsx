import api from "../../services/api.js";
import { useState, useEffect } from "react";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/user");
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>Customers</div>;
};

export default Customers;
