import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <p
        className="p-6 text-center"
        style={{ color: "var(--text-color)" }}
      >
        🛒 Your cart is empty
      </p>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto p-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--primary-color)" }}>
        Your Cart
      </h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)"
            }}
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="font-semibold" style={{ color: "var(--primary-color)" }}>
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="px-3 py-1 rounded hover:opacity-80 transition"
                style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="px-3 py-1 rounded hover:opacity-80 transition"
                style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
              >
                +
              </button>
            </div>

            {/* Remove button */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="px-4 py-2 rounded hover:opacity-80 transition"
              style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-color)" }}>
          Total: ₹{total}
        </h3>
        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-2 rounded-lg hover:opacity-90 transition"
          style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
