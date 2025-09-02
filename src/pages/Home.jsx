import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"
import OrderTracking from "./OrderTracking";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react"

function Home() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const orderPlaced = useSelector((state) => state.order.placed);
  const dispatch = useDispatch();
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    // ✅ only show approved reviews
    setReviews(saved.filter((r) => r.status === "approved"));
  }, []);

  const addReview = (e) => {
    e.preventDefault();
    if (!name || !review) return alert("Please fill all fields");

    const newReview = {
      id: Date.now(),
      name,
      review,
      rating,
      status: "pending", // ✅ pending until admin approves
    };

    const existing = JSON.parse(localStorage.getItem("reviews")) || [];
    localStorage.setItem("reviews", JSON.stringify([newReview, ...existing]));

    alert("✅ Review submitted! Waiting for admin approval.");
    setName("");
    setReview("");
    setRating(5);
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("combos")) || [];
    setCombos(saved);
  }, []);
  const featured = [
    {
      id: 1,
      name: "Cheesy Burger",
      desc: "Juicy beef patty with melted cheese & fresh veggies",
      price: "150",
      img: "https://www.shutterstock.com/image-photo/close-tasty-burger-isolated-on-600nw-2494691375.jpg",
    },
    {
      id: 2,
      name: "Hot & Spicy Pizza",
      desc: "Loaded with toppings, baked to perfection",
      price: "299",
      img: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg",
    },
    {
      id: 3,
      name: "Creamy Pasta",
      desc: "Italian pasta tossed in creamy sauce",
      price: "220",
      img: "https://img.freepik.com/free-photo/plate-fettuccine-alfredo-with-fresh-parsley_9975-124881.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url('https://img.freepik.com/premium-photo/food-with-delivery-set-dishes-diet-top-view-free-space-your-text-black-background_187166-3086.jpg')] bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Tap N'Eat</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-100">
            Delicious meals delivered to your doorstep. Fresh, fast & affordable!
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <a
              href="/menu"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-300 transition"
            >
              Order Now
            </a>
            <a
              href="/admin"
              className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition"
            >
              Admin Portal
            </a>
          </div>
        </div>
      </div>
      {/* Combo Offer */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🔥 Special Combo Offers</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {combos.map((c) => (
            <div key={c.id} className="bg-white shadow rounded p-4">
              {c.image && <img src={c.image} alt={c.name} className="h-32 w-full object-cover rounded" />}
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p>{c.desc}</p>
              <p className="text-green-600 font-semibold">₹{c.price}</p>
              <button  onClick={() => dispatch(addToCart(c))} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      {/* Featured Dishes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-10">
            🍴 Featured Dishes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featured.map((dish) => (
              <div
                key={dish.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
                  <p className="text-gray-600 mt-1">{dish.desc}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-orange-600 font-semibold">₹{dish.price}</span>
                    <button onClick={() => dispatch(addToCart(dish))} className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6">
            {/* Review Form */}
            <form
              onSubmit={addReview}
              className="mb-8 space-y-4 bg-gray-100 p-4 rounded-lg"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 rounded w-full"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
              <button className="bg-orange-500 text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>

            {/* Show Approved Reviews */}
            <h2 className="text-xl font-semibold mb-4">⭐ Customer Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No approved reviews yet.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="bg-white p-4 rounded shadow mb-4">
                  <p className="italic">"{r.review}"</p>
                  <div className="flex text-yellow-500 mb-2">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="mt-2 font-semibold">- {r.name}</p>
                </div>
              ))
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
