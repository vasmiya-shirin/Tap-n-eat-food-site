// src/pages/UserPanel.jsx
import React from "react";
import { useSelector } from "react-redux";

function UserPanel() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen p-6 bg-var-bg text-var-text transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--primary-color)" }}>
        Welcome, {user ? user.name : "User"}!
      </h1>
      <p className="text-lg mb-4">
        This is your User Panel. Here you can view products, manage your cart, and track orders.
      </p>
      <p className="text-sm text-gray-500">
        Role: {user ? user.role : "N/A"}
      </p>
    </div>
  );
}

export default UserPanel;
