
// src/pages/About.jsx
import React from "react";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Smith",
    role: "Head Chef",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emma Williams",
    role: "Delivery Manager",
    img: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-orange-500 mb-4">About Tap N' Eat</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Tap N' Eat is your go-to platform for fresh and delicious meals delivered straight
          to your doorstep. We combine convenience with quality to give you the best food
          experience.
        </p>
      </section>

      {/* Mission & Features */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-6">
            Our mission is to make food ordering simple, enjoyable, and accessible. Whether
            it's your favorite meal or trying something new, we are here to deliver fresh
            and tasty food every time.
          </p>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Fresh, high-quality ingredients in every meal.</li>
            <li>Fast and reliable delivery service.</li>
            <li>User-friendly online ordering system.</li>
            <li>Special offers and discounts for loyal customers.</li>
          </ul>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
            alt="Food delivery"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-semibold text-orange-500 text-center mb-8">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
