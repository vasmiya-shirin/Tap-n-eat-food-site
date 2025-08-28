import React, { useState, useEffect } from "react";

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://vasmiya-shirin.github.io/restaurant-api/fooditems.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🍴 Our Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="text-orange-600 font-semibold">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
