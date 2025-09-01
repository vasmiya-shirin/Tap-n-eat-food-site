import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for your order. Your food will be delivered soon.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
