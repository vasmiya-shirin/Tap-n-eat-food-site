import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import OrderTracking from "./OrderTracking";
import { useEffect } from "react";

function Home() {
  const orderPlaced = useSelector((state) => state.order.placed);
  const dispatch = useDispatch();

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

  // Load combos from localStorage
  const combos = JSON.parse(localStorage.getItem("combos")) || [];

  // Ensure correct theme is applied on refresh
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.body.className = theme;
  }, []);

  const allItems = [...featured, ...combos]; // merge featured dishes + combos

  return (
    <div className="min-h-screen transition-colors duration-300 bg-var-bg text-var-text">
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
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg text-yellow-50">
            Welcome to{" "}
            <span style={{ color: "var(--secondary-color)" }}>Tap N'Eat</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-yellow-50">Delicious meals delivered to your doorstep. Fresh, fast & affordable!</p>

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

      {/* Featured & Combo Dishes */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10" style={{ color: "var(--primary-color)" }}>
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
                  <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  {item.desc && <p className="text-sm mb-3">{item.desc}</p>}
                  <div className="flex justify-between items-center">
                    <span style={{ color: "var(--primary-color)", fontWeight: "600" }}>₹{item.price}</span>
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

          {/* Order Tracking Section */}
          {orderPlaced && <OrderTracking />}
        </div>
      </section>
    </div>
  );
}

export default Home;

