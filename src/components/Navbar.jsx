import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


function Navbar() {
  const cart = useSelector((state) => state.cart); // read cart from store
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navigate = useNavigate();
  const role = localStorage.getItem("userRole"); // get current role

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    alert("✅ Logged out successfully!");
    navigate("/login"); // redirect to login
  };
  return (
    <nav className="bg-orange-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <img src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png" alt="food logo" width={70}></img>
        {/* Brand */}
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Tap N' Eat
        </h1>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
          {role === "admin" && <NavLink
            to="/admin"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Admin
          </NavLink>}
          {role ? (
            <button
              onClick={handleLogout}
               className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
