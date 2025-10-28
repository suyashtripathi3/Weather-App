// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "../hooks/useTheme"; // 🆕 import
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { motion } from "framer-motion";
import { getThemeByWeatherCode } from "../utils/weatherThemes.js";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Home() {
  const {
    weatherData,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
  } = useWeather();
  const { darkMode, toggleTheme } = useTheme(); // 🆕 use custom hook

  const [city, setCity] = useState("");
  const [bgClass, setBgClass] = useState(
    "from-blue-100 via-cyan-100 to-indigo-100"
  );

  // 🌤 Change background dynamically based on weather type
  useEffect(() => {
    if (!weatherData) {
      setBgClass("from-blue-100 via-cyan-100 to-indigo-100");
      return;
    }

    const weatherType = getThemeByWeatherCode(weatherData.weathercode);

    switch (weatherType) {
      case "sunny":
        setBgClass("from-yellow-100 via-orange-100 to-pink-100");
        break;
      case "cloudy":
        setBgClass("from-gray-200 via-gray-300 to-gray-400");
        break;
      case "rainy":
        setBgClass("from-blue-200 via-blue-300 to-cyan-400");
        break;
      case "snowy":
        setBgClass("from-blue-100 via-white to-blue-50");
        break;
      default:
        setBgClass("from-blue-100 via-cyan-100 to-indigo-100");
        break;
    }
  }, [weatherData]);

  const handleSearch = () => {
    if (city.trim() !== "") fetchWeatherByCity(city);
  };

  return (
    <div
      className={`flex flex-col min-h-screen w-full bg-linear-to-br ${bgClass} 
      transition-all duration-700 ease-in-out`}
    >
      {/* 🌍 Navbar */}
      <nav className="navbar bg-base-200/80 backdrop-blur-md shadow-md w-full rounded-b-2xl px-6 flex justify-between items-center">
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-primary"
        >
          🌦️ Weather App
        </motion.h1>

        {/* 🌗 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost text-xl"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </nav>

      {/* 🌤 Main Content */}
      <main className="flex flex-col items-center justify-center grow px-4 py-6 text-center">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          onLocate={fetchWeatherByLocation}
        />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {weatherData && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6"
          >
            <WeatherCard data={weatherData} />
          </motion.div>
        )}
      </main>

      {/* 🦶 Footer */}
      <footer className="footer footer-center p-4 bg-base-200/80 backdrop-blur-md text-base-content rounded-t-2xl">
        <aside>
          <p className="text-sm opacity-70">
            Made with ❤️ using React, Tailwind CSS, DaisyUI <br />
            Developed by <span className="font-semibold">Suyash Tripathi</span>
          </p>
        </aside>
      </footer>
    </div>
  );
}
