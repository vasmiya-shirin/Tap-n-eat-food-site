import React, { useState, useEffect } from "react";

function OrderTracking() {
  const [status, setStatus] = useState("Preparing");

  useEffect(() => {
    const steps = ["Preparing", "On the way ", "Delivered "];
    steps.forEach((step, i) => {
      setTimeout(() => setStatus(step), i * 4000);
    });
  }, []);

  return (
    <div className="p-4 border rounded shadow bg-white mt-4">
      <h2 className="text-xl font-bold mb-2"> Live Order Tracking</h2>
      <p className="text-lg">Order Status: {status}</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            status === "Preparing"
              ? "w-1/3 bg-yellow-500"
              : status === "On the way "
              ? "w-2/3 bg-blue-500"
              : "w-full bg-green-600"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default OrderTracking;
