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

    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessages = [...savedMessages, formData];
    localStorage.setItem("messages", JSON.stringify(newMessages));

    alert("✅ Thank you! Your message has been saved.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
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
        📞 Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div
          className="shadow-lg rounded-2xl p-6"
          style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--primary-color)" }}>
            Our Information
          </h3>
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
          className="shadow-lg rounded-2xl p-6"
          style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--primary-color)" }}>
            Send a Message
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border p-2 rounded w-full"
              style={{ borderColor: "var(--primary-color)", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="border p-2 rounded w-full"
              style={{ borderColor: "var(--primary-color)", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className="border p-2 rounded w-full"
              style={{ borderColor: "var(--primary-color)", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border p-2 rounded w-full"
              style={{ borderColor: "var(--primary-color)", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
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
            style={{ borderColor: "var(--primary-color)", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
          ></textarea>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg mt-4 hover:opacity-90 transition"
            style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
