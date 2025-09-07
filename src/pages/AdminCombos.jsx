import React, { useState, useEffect } from "react";

function AdminCombos() {
  const [combos, setCombos] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Load combos from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("combos")) || [];
    setCombos(saved);
  }, []);

  const handleAdd = () => {
    if (!name || !price) return alert("⚠️ Name & price required!");
    const newCombo = {
      id: Date.now(),
      name,
      desc,
      price: Number(price),
      image,
    };
    const updated = [...combos, newCombo];
    setCombos(updated);
    localStorage.setItem("combos", JSON.stringify(updated));
    setName(""); setDesc(""); setPrice(""); setImage("");
  };

  const handleDelete = (id) => {
    const updated = combos.filter((c) => c.id !== id);
    setCombos(updated);
    localStorage.setItem("combos", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <h2 className="text-2xl font-bold mb-4">🍔 Combo Offers</h2>

      {/* Form */}
      <div className="mb-6 p-4 rounded shadow" style={{ backgroundColor: "var(--card-bg-color)", border: "1px solid var(--border)" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Combo Name"
          className="border p-2 w-full mb-2 rounded"
          style={{ borderColor: "var(--border)", color: "var(--text-color)", backgroundColor: "var(--bg-color)" }}
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
          style={{ borderColor: "var(--border)", color: "var(--text-color)", backgroundColor: "var(--bg-color)" }}
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="border p-2 w-full mb-2 rounded"
          style={{ borderColor: "var(--border)", color: "var(--text-color)", backgroundColor: "var(--bg-color)" }}
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="border p-2 w-full mb-2 rounded"
          style={{ borderColor: "var(--border)", color: "var(--text-color)", backgroundColor: "var(--bg-color)" }}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded"
          style={{ backgroundColor: "var(--primary-color)", color: "var(--button-text-color)" }}
        >
          Add Combo
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2">
        {combos.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded shadow relative"
            style={{ backgroundColor: "var(--card-bg-color)", border: "1px solid var(--border)", color: "var(--text-color)" }}
          >
            {c.image && (
              <img src={c.image} alt={c.name} className="h-60 w-full object-cover rounded mb-2" />
            )}
            <h3 className="font-bold text-lg">{c.name}</h3>
            <p>{c.desc}</p>
            <p className="text-green-600 font-semibold">₹{c.price}</p>
            <button
              onClick={() => handleDelete(c.id)}
              className="px-3 py-1 rounded mt-2"
              style={{ backgroundColor: "var(--danger)", color: "var(--button-text-color)" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCombos;
