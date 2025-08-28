import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-xl font-bold tracking-wide text-white">
          Tap N' Eat
        </h1>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${
                isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${
                isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `transition-colors duration-200 font-medium ${
                isActive ? "text-white border-b-2 border-white" : "text-orange-100 hover:text-white"
              }`
            }
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
