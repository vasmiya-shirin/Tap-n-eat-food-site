import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminMessages from "./pages/AdminMessages";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import OrderTracking from "./pages/OrderTracking";
import AdminReviews from "./pages/AdminReviews";
import { useTheme } from "./context/ThemeContext";  // 👈 use context instead
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <Admin />,
        children: [
          { path: "adminmessages", element: <AdminMessages /> },
          { path: "reviews", element: <AdminReviews /> }
        ],
      },
      { path: "login", element: <Login /> }
    ],
  },
]);

function App() {
  const { theme } = useTheme(); // 👈 get theme from context

  return (
    
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;



