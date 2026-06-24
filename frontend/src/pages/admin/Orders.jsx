import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState("all");

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/order");
      setOrders(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/order/${id}/status`, {
        status,
      });

      setOrders(orders.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      console.error(err);
    }
  };

  const buttons = [
    {
      name: "all",
    },
    {
      name: "processing",
    },
    {
      name: "pending",
    },
    {
      name: "delivered",
    },
    {
      name: "cancelled",
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <h2>Loading Orders...</h2>;
  return (
    <div className="space-y-4">
      <div className="mx-6 mb-6 py-4 flex justify-between">
        <h2 className="text-[--ink] text-xl font-bold font-['Syne']">Orders</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between gap-4">
          {buttons.map((button) => (
            <button
              key={button.name}
              className={`px-4 py-2 capitalize text-sm text-[--muted] bg-[--white] border rounded-3xl transition-all hover:border-black
                ${active === `${button.name}` ? "bg-[var(--ink)] text-[--white]" : ""}`}
              onClick={() => setActive(`${button.name}`)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <div>
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
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <p className="px-6 text-[--muted]">No Orders Found</p>
      ) : (
        <div className="overflow-x-auto border rounded-2xl">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
            {/* HEADER */}
            <thead className="bg-[--surface] text-left text-sm text-[--ink]">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Items</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="bg-[--white]">
              {orders
                .filter((order) =>
                  active === "all" ? true : order.status === active,
                )
                .map((order) => (
                  <tr
                    key={order._id}
                    className="border-t bg-[--white] hover:bg-[--surface] transition"
                  >
                    {/* ORDER ID */}
                    <td className="p-3 text-xs text-[--muted]">{order._id}</td>

                    {/* USER */}
                    <td className="p-3">{order.user?.email}</td>

                    {/* TOTAL */}
                    <td className="p-3 font-medium">$ {order.totalAmount}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="placed">placed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>

                    {/* ITEMS */}
                    <td className="p-3 text-sm text-[--muted]">
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.product?.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
