import React, { useState, useEffect } from "react";

function OrderTracking() {
  const [status, setStatus] = useState("Preparing");

  useEffect(() => {
    const steps = ["Preparing", "On the way", "Delivered"];
    steps.forEach((step, i) => {
      setTimeout(() => setStatus(step), i * 4000);
    });
  }, []);

  const getProgressClass = () => {
    if (status === "Preparing") return "w-1/3 var(--primary-color)";
    if (status === "On the way") return "w-2/3 var(--secondary-color)";
    return "w-full var(--completed-color)";
  };

  return (
    <div
      className="p-4 border rounded shadow mt-4 transition-colors duration-300"
      style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: "var(--primary-color)" }}>
        📦 Live Order Tracking
      </h2>
      <p className="text-lg">Order Status: {status}</p>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000`}
          style={{ width: status === "Preparing" ? "33%" : status === "On the way" ? "66%" : "100%", backgroundColor: status === "Preparing" ? "var(--primary-color)" : status === "On the way" ? "var(--secondary-color)" : "var(--completed-color)" }}
        ></div>
      </div>
    </div>
  );
}

export default OrderTracking;

