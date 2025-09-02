import React, { useState, useEffect } from "react";

function AdminCombos() {
  const [combos, setCombos] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("combos")) || [];
    setCombos(saved);
  }, []);

  const handleAdd = () => {
    if (!name || !price) return alert("Name & price required!");
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🍔 Combo Offers</h2>

      {/* Form */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Combo Name" className="border p-2 w-full mb-2"/>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="border p-2 w-full mb-2"/>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 w-full mb-2"/>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="border p-2 w-full mb-2"/>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add Combo</button>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2">
        {combos.map((c) => (
          <div key={c.id} className="bg-white p-4 shadow rounded relative">
            {c.image && <img src={c.image} alt={c.name} className="h-50 w-full object-cover rounded"/>}
            <h3 className="font-bold text-lg">{c.name}</h3>
            <p>{c.desc}</p>
            <p className="text-green-600 font-semibold">₹{c.price}</p>
            <button onClick={() => handleDelete(c.id)}   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCombos;
