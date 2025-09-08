import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext"; // 👈 import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(


  <Provider store={store}>
    <ThemeProvider>   {/* 👈 wrap your app here */}
      <App />
    </ThemeProvider>
  </Provider>

);



