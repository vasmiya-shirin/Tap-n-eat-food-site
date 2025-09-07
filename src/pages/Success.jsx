import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div
        className="p-8 rounded-lg shadow-lg text-center max-w-md w-full"
        style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--success-color)" }}>
          ✅ Order Placed!
        </h2>
        <p className="mb-6">
          Thank you for your order. Your food will be delivered soon.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg transition-colors duration-200"
          style={{
            backgroundColor: "var(--button-bg-color)",
            color: "var(--button-text-color)"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "var(--button-hover-bg-color)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "var(--button-bg-color)"}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Success;

