import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },  
      { path: "menu", element: <Menu /> },
      { path: "cart", element: <Cart /> },
      { path: "admin", element: <Admin /> },
      { path: "login", element: <Login /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

