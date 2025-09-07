import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://vasmiya-shirin.github.io/restaurant-api/fooditems.json"
        );
        const apiData = res.data;

        const localData = JSON.parse(localStorage.getItem("products")) || [];

        setProducts([...apiData, ...localData]);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="p-6" style={{ color: "var(--text-color)" }}>
        Loading...
      </p>
    );

  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
  };

  return (
    <div
      className="p-6 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2 className="text-2xl font-semibold mb-4">🍴 Our Menu</h2>

      {/* Search + Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
          style={{
            borderColor: "var(--primary-color)",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)"
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          style={{
            borderColor: "var(--primary-color)",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)"
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="px-4 py-2 rounded hover:opacity-90 transition"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--text-color)"
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:scale-105 transition-transform duration-300"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)"
              }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm" style={{ color: "var(--text-color)" }}>
                {product.category}
              </p>
              <p className="font-semibold" style={{ color: "var(--primary-color)" }}>
                ₹{product.price}
              </p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="px-4 py-2 rounded mt-2 hover:opacity-90 transition"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-color)"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;

