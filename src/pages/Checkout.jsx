import React from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/orderSlice";
import { useDispatch } from "react-redux";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeOrder());
    navigate("/success");
  };

  return (
    <div
      className="max-w-3xl mx-auto p-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--primary-color)" }}
      >
        Checkout
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-lg shadow transition-colors duration-300"
        style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
      >
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)"
            }}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            placeholder="Enter delivery address"
            required
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)"
            }}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select
            required
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)"
            }}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg hover:opacity-90 transition-colors duration-300"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--text-color)"
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
