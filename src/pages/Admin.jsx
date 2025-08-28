import React, { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  // Load products from localStorage 
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add new product
  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !category || !price) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(), // unique id
      name,
      category,
      price: parseFloat(price)
    };

    setProducts([...products, newProduct]);
    setName("");
    setCategory("");
    setPrice("");
  };

  // Delete product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4"> Admin Panel</h2>

      {/* Add Product Form */}
      <form onSubmit={addProduct} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-2"> Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded shadow hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-orange-600 font-semibold">₹{p.price}</p>
            </div>
            <button
              onClick={() => deleteProduct(p.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

