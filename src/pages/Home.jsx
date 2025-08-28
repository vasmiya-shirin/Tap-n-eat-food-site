function Home() {
  const featured = [
    {
      id: 1,
      name: "Cheesy Burger",
      desc: "Juicy beef patty with melted cheese & fresh veggies",
      price: "₹150",
      img: "https://www.shutterstock.com/image-photo/close-tasty-burger-isolated-on-600nw-2494691375.jpg",
    },
    {
      id: 2,
      name: "Hot & Spicy Pizza",
      desc: "Loaded with toppings, baked to perfection",
      price: "₹299",
      img: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg",
    },
    {
      id: 3,
      name: "Creamy Pasta",
      desc: "Italian pasta tossed in creamy sauce",
      price: "₹220",
      img: "https://img.freepik.com/free-photo/plate-fettuccine-alfredo-with-fresh-parsley_9975-124881.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-400 via-red-400 to-orange-600 min-h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/30"></div>
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
                    <span className="text-orange-600 font-semibold">{dish.price}</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

