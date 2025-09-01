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

  if (loading) return <p className="p-6">Loading...</p>;

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  // Apply search + category filter
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🍴 Our Menu</h2>

      {/* Search + Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
            <div key={product.id} className="border p-4 rounded shadow">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-orange-600 font-semibold">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-600"
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
