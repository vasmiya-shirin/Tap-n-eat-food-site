import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import the logout action
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const user = useSelector((state) => state.auth.user); // Get user from authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    alert("✅ Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="logo-section">
          <img
            src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png"
            alt="food logo"
            width={60}
          />
          <h1>Tap N' Eat</h1>
        </div>

        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/menu" className="nav-link">
            Menu
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/cart" className="nav-link cart-link">
            Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>

          {user && user.role === "admin" && (
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          )}

          {user ? (
            <>
              <span className="nav-link">Hello, {user.name}</span>
              <button onClick={handleLogout} className="nav-link btn-link">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}

          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

