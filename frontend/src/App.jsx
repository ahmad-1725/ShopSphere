import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/api.js";

import ProtectedRoute from "./components/ProtectedRoutes";
import ProtectAdmin from "./components/ProtectAdmin";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import EditProduct from "./components/admin/EditProduct";
import Customers from "./pages/admin/Customers";

import { useAuth } from "./context/AuthContext";

function App() {
  const { loading, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <ProtectAdmin>
              <Dashboard />
            </ProtectAdmin>
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route
            path="orders"
            element={
              <ProtectAdmin>
                <AdminOrders />
              </ProtectAdmin>
            }
          />
          <Route path="customers" element={<ProtectAdmin><Customers /></ProtectAdmin>} />
          <Route path="settings" element={<ProtectAdmin></ProtectAdmin>} />
        </Route>
        <Route
          path={`/products/:id/edit`}
          element={
            <ProtectAdmin>
              <EditProduct />
            </ProtectAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
