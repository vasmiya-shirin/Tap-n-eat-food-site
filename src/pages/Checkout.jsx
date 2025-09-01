import React from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you'd send order data to backend here
    navigate("/success"); // redirect to success page
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            placeholder="Enter delivery address"
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select className="w-full border p-2 rounded" required>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
