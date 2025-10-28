// src/hooks/useWeather.js
import { useState } from "react";
import { geocodeCity, fetchWeatherForLatLon } from "../utils/fetchWeather";

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch weather by city name
   */
  const fetchWeatherByCity = async (city) => {
    if (!city || city.trim() === "") {
      setError("Please enter a valid city name.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setWeatherData(null);

      // 1️⃣ Get coordinates from city name
      const geo = await geocodeCity(city);

      // 2️⃣ Fetch weather using coordinates
      const data = await fetchWeatherForLatLon(
        geo.latitude,
        geo.longitude,
        geo.timezone
      );

      // 3️⃣ Combine data into a single clean object
      setWeatherData({
        city: geo.name,
        country: geo.country,
        ...data.current_weather,
        timezone: geo.timezone,
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch weather using device location
   */
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await fetchWeatherForLatLon(latitude, longitude);

          setWeatherData({
            city: "Your Location",
            country: "",
            ...data.current_weather,
          });
        } catch (err) {
          setError(err.message || "Failed to fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("❌ Geolocation error:", err.message);
        setError(
          "Unable to access your location. Please allow location permissions."
        );
        setLoading(false);
      }
    );
  };

  return {
    weatherData,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
  };
}
