// src/pages/Home.jsx
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import OrderTracking from "./OrderTracking";
import VoiceOrder from "../components/VoiceOrder"; // Make sure this path is correct
import { useEffect, useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const orderPlaced = useSelector((state) => state.order.placed);

  const [combos, setCombos] = useState([]);

  // Load combos from localStorage
  useEffect(() => {
    const savedCombos = JSON.parse(localStorage.getItem("combos")) || [];
    setCombos(savedCombos);
  }, []);

  // Apply theme on refresh
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.body.className = theme;
  }, []);

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    // Only show approved reviews
    const approvedReviews = saved.filter((r) => r.status === "approved");
    setReviews(approvedReviews);
  }, []);

  // Save review to localStorage without updating displayed reviews directly
  const saveReview = (newReview) => {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    const updated = [newReview, ...saved];
    localStorage.setItem("reviews", JSON.stringify(updated));
    alert("✅ Review submitted! It will appear once approved by admin.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !review.trim()) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      review,
      rating,
      status: "pending", // default status
    };

    saveReview(newReview);

    setName("");
    setReview("");
    setRating(5);
  };

  const featured = [
    {
      id: 1,
      name: "Cheesy Burger",
      desc: "Juicy beef patty with melted cheese & fresh veggies",
      price: 150,
      img: "https://www.shutterstock.com/image-photo/close-tasty-burger-isolated-on-600nw-2494691375.jpg",
    },
    {
      id: 2,
      name: "Hot & Spicy Pizza",
      desc: "Loaded with toppings, baked to perfection",
      price: 299,
      img: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg",
    },
    {
      id: 3,
      name: "Creamy Pasta",
      desc: "Italian pasta tossed in creamy sauce",
      price: 220,
      img: "https://img.freepik.com/free-photo/plate-fettuccine-alfredo-with-fresh-parsley_9975-124881.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  const allItems = [...featured, ...combos];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/food-with-delivery-set-dishes-diet-top-view-free-space-your-text-black-background_187166-3086.jpg')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-overlay)" }}
        ></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to{" "}
            <span style={{ color: "var(--secondary-color)" }}>Tap N'Eat</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl">
            Delicious meals delivered to your doorstep. Fresh, fast & affordable!
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <a
              href="/menu"
              className="px-6 py-3 rounded-full font-semibold shadow-md transition hover:opacity-90"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--button-text-color)",
              }}
            >
              Order Now
            </a>
            <a
              href="/admin"
              className="px-6 py-3 rounded-full font-semibold border-2 transition hover:opacity-90"
              style={{
                borderColor: "var(--text-color)",
                color: "var(--text-color)",
              }}
            >
              Admin Portal
            </a>
          </div>
        </div>
      </div>

      {/* Dishes & Combos Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold mb-10"
            style={{ color: "var(--primary-color)" }}
          >
            🍴 Our Dishes & Combos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundColor: "var(--card-bg-color)",
                  color: "var(--text-color)",
                }}
              >
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  {item.desc && <p className="text-sm mb-3">{item.desc}</p>}
                  <div className="flex justify-between items-center">
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: "600",
                      }}
                    >
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-4 py-2 rounded-full text-sm transition hover:opacity-90"
                      style={{
                        backgroundColor: "var(--button-bg-color)",
                        color: "var(--button-text-color)",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Voice Ordering Component */}
          <div className="mt-10">
            <VoiceOrder menuItems={allItems} />
          </div>

          {/*Reviews */}
          <div className="p-6 max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">📝 Submit a Review</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
              <div>
                <label className="block mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} ⭐
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-amber-700 text-white rounded hover:opacity-90"
              >
                Submit Review
              </button>
            </form>

            <h3 className="text-xl font-semibold mt-6 text-center">✅ Approved Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500">No approved reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="border p-4 rounded shadow">
                    <p className="italic">"{r.review}"</p>
                    <div className="text-yellow-500 mb-2">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <p className="font-semibold">- {r.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Order Tracking Section */}
          {orderPlaced && <OrderTracking />}
        </div>
      </section>
    </div>
  );
}

export default Home;



