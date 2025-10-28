import React from "react";
import { motion } from "framer-motion";
import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiBarometer,
} from "react-icons/wi";
import { weatherThemes, getThemeByWeatherCode } from "../utils/weatherThemes.js";

export default function WeatherCard({ data }) {
  const themeKey = getThemeByWeatherCode(data.weathercode);
  const theme = weatherThemes[themeKey] || weatherThemes.default;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`card w-80 md:w-96 shadow-xl text-gray-800 backdrop-blur-lg ${theme.bg} text-white relative overflow-hidden`}
    >
      {/* Animated background icons */}
      <div
        className={`absolute top-4 right-4 text-6xl opacity-30 ${theme.animation}`}
      >
        {theme.icon}
      </div>

      <div className="card-body relative z-10 text-center">
        <h2 className="card-title justify-center text-2xl font-semibold mb-2">
          {data.city}, {data.country}
        </h2>

        <p className="text-6xl font-bold mb-4">{data.temperature}°C</p>

        <div className="grid grid-cols-2 gap-3 text-sm justify-items-center">
          <div className="flex items-center gap-2">
            <WiStrongWind className="text-2xl" /> {data.windspeed} km/h
          </div>
          <div className="flex items-center gap-2">
            <WiHumidity className="text-2xl" /> Humidity:{" "}
            {data.relative_humidity_2m ?? "--"}%
          </div>
          <div className="flex items-center gap-2">
            <WiBarometer className="text-2xl" /> Pressure:{" "}
            {data.pressure_msl ?? "--"} hPa
          </div>
          <div className="flex items-center gap-2">
            <WiThermometer className="text-2xl" /> Feels like:{" "}
            {data.temperature}°C
          </div>
        </div>

        <p className="text-sm mt-4 italic">({themeKey.toUpperCase()})</p>
      </div>

      {/* Optional animated raindrops / snow flakes */}
      {themeKey === "rainy" && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-white text-lg opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
              }}
              animate={{ y: "110vh" }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              💧
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
