import React, { useEffect, useState } from "react";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(saved);
  }, []);

  const updateStorage = (updated) => {
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  const handleApprove = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: "approved" } : r
    );
    updateStorage(updated);
  };

  const handleDelete = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    updateStorage(updated);
  };

  return (
    <div
      className="p-6 md:p-12 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: "var(--primary-color)" }}
      >
        ⭐ Manage Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="shadow-md rounded-xl p-6 border relative transition-colors duration-300"
              style={{
                backgroundColor: "var(--card-bg-color)",
                borderColor: "var(--primary-color)",
                color: "var(--text-color)"
              }}
            >
              <p className="italic">"{r.review}"</p>
              <div className="flex text-yellow-500 mb-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="mt-2 font-semibold">- {r.name}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    r.status === "approved" ? "text-green-600" : "text-orange-500"
                  }
                >
                  {r.status}
                </span>
              </p>

              <div className="absolute top-4 right-4 flex gap-2">
                {r.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="px-3 py-1 rounded hover:opacity-90 transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--text-color)"
                    }}
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r.id)}
                  className="px-3 py-1 rounded hover:opacity-90 transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-color)"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminReviews;


