import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Import login action

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      formData.role === "admin" &&
      formData.email === "admin@test.com" &&
      formData.password === "admin123"
    ) {
      const user = {
        name: formData.name || "Admin",
        email: formData.email,
        role: "admin",
      };
      dispatch(login(user)); // Dispatch login action
      alert("✅ Admin logged in");
      navigate("/admin"); // ✅ Use role-based route
    } else if (
      formData.role === "customer" &&
      formData.email &&
      formData.password &&
      formData.name
    ) {
      const user = {
        name: formData.name,
        email: formData.email,
        role: "customer",
      };
      dispatch(login(user)); // Dispatch login action
      alert("✅ Customer logged in");
      navigate("/menu"); // ✅ Use role-based route
    } else {
      alert("❌ Invalid credentials or missing name!");
    }
  };

  return (
    <div
      className="p-6 max-w-md mx-auto transition-colors duration-300 min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div
        className="w-full p-6 rounded-lg shadow-lg transition-colors duration-300"
        style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
      >
        <h2
          className="text-2xl font-semibold mb-4 text-center"
          style={{ color: "var(--primary-color)" }}
        >
          🔑 Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded transition-colors duration-300"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded transition-colors duration-300"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded transition-colors duration-300"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium">Login as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded transition-colors duration-300"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg hover:opacity-90 transition-colors duration-300"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--button-text-color)",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
