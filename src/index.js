// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./WeatherApp";

// 這支 CSS 檔的樣式會作用到全域
import "./styles.css";

function App() {
  return <WeatherApp />;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
