import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save message to localStorage
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessages = [...savedMessages, formData];
    localStorage.setItem("messages", JSON.stringify(newMessages));

    alert("✅ Thank you! Your message has been saved.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">📞 Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Our Information</h3>
          <p className="mb-2">📍 Address: 123 Food Street, Malappuram, India</p>
          <p className="mb-2">📧 Email: support@tapneat.com</p>
          <p className="mb-2">📞 Phone: +91 98765 43210</p>
          <p className="mb-4">🕒 Working Hours: 9 AM - 11 PM</p>

          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            className="w-full h-48 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Send a Message</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border p-2 rounded w-full"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="border p-2 rounded w-full mt-4"
          ></textarea>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
