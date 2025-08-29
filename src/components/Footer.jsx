export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">Tap N' Eat</h2>
          <p className="text-sm">Delicious food, delivered to your door.</p>
        </div>

        {/* Center - Links */}
        <div className="flex gap-6">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/menu" className="hover:text-white transition">Menu</a>
          <a href="/cart" className="hover:text-white transition">Cart</a>
          <a href="/admin" className="hover:text-white transition">Admin</a>
        </div>

        {/* Right side - Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Tap N' Eat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

