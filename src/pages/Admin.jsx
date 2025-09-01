import React, { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [messages, setMessages] = useState([]); 

  // Load products + messages from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Add new product
  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !category || !price) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price: parseFloat(price),
      image: image || "https://via.placeholder.com/150",
    };

    setProducts([...products, newProduct]);
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
  };

  // Delete single product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  // Clear all products
  const clearAllProducts = () => {
    if (window.confirm("Are you sure you want to delete all products?")) {
      setProducts([]);
      localStorage.removeItem("products");
    }
  };

  // Delete single message
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((m) => m.id !== id);
    setMessages(updatedMessages);
  };

  // Clear all messages
  const clearAllMessages = () => {
    if (window.confirm("Are you sure you want to delete all messages?")) {
      setMessages([]);
      localStorage.removeItem("messages");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-semibold mb-4">⚙️ Admin Panel</h2>

      {/* ================= Products Section ================= */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📦 Manage Products</h3>

        {/* Add Product Form */}
        <form
          onSubmit={addProduct}
          className="mb-6 flex gap-4 flex-wrap bg-white p-4 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            ➕ Add Product
          </button>
          {products.length > 0 && (
            <button
              type="button"
              onClick={clearAllProducts}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🗑️ Clear All
            </button>
          )}
        </form>

        {/* Product List */}
        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border p-4 rounded shadow hover:shadow-lg flex flex-col justify-between bg-white"
              >
                <div>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
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
        )}
      </div>

      {/* ================= Messages Section ================= */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📩 Customer Messages</h3>

        {messages.length === 0 ? (
          <p className="text-gray-500">No messages received yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="border p-4 rounded shadow bg-white flex justify-between items-start"
              >
                <div>
                  <p><span className="font-bold">👤 Name:</span> {m.name}</p>
                  <p><span className="font-bold">📧 Email:</span> {m.email}</p>
                  <p className="mt-2 text-gray-700">{m.message}</p>
                </div>
                <button
                  onClick={() => deleteMessage(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 h-fit"
                >
                  Delete
                </button>
              </div>
            ))}
            {messages.length > 0 && (
              <button
                onClick={clearAllMessages}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                🗑️ Clear All Messages
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

