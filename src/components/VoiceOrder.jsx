import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false; // stop after one command
recognition.lang = "en-US";
recognition.interimResults = false;

function VoiceOrder({ menuItems }) {
  const [listening, setListening] = useState(false);
  const dispatch = useDispatch();

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", speech);

    // Simple command parsing
    menuItems.forEach((item) => {
      if (speech.includes(item.name.toLowerCase())) {
        dispatch(addToCart(item));
        speak(`Added ${item.name} to cart`);
      }
    });

    setListening(false);
  };

  recognition.onerror = (event) => {
    console.error(event.error);
    setListening(false);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="my-4 text-center">
      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-lg ${listening ? "bg-red-500" : "bg-green-500"} text-white`}
      >
        {listening ? "Listening..." : "🎙️ Voice Order"}
      </button>
    </div>
  );
}

export default VoiceOrder;
