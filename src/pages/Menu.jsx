import React, { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/cartSlice"

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🍴 Our Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-600"
            >
              Add to Cart
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
