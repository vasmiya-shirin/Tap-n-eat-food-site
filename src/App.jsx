// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import OrderTracking from "./pages/OrderTracking";
import AdminReviews from "./pages/AdminReviews";
import AdminMessages from "./pages/AdminMessages";
import ProtectedRoute from "./components/ProtectedRoute"; // Import here
import { useTheme } from "./context/ThemeContext";
import "./App.css";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "ordertracking", element: <OrderTracking /> },
      { path: "success", element: <Success /> },
      { path: "contact", element: <Contact /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          { path: "adminmessages", element: <AdminMessages /> },
          { path: "reviews", element: <AdminReviews /> }
        ],
      },
      {
        path: "user-panel",
        element: (
          <ProtectedRoute role="customer">
            <Menu /> {/* You can create a dedicated UserPanel if needed */}
          </ProtectedRoute>
        )
      },
      { path: "login", element: <Login /> }
    ],
  },
]);

function App() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

