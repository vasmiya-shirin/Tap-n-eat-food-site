import React, { useState, useEffect } from "react";

function Menu() {
  const [products, setProducts] = useState([]);   // all products
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load products from localStorage when component mounts
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Create categories from products
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filtered products (search + filter)
  const filteredProducts = products.filter(p => {
    return (
      (filter === "All" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🍴 Our Menu</h2>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((c, id1) => (
            <option key={id1} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow hover:shadow-lg">
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-orange-600 font-semibold">₹{p.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Menu;
