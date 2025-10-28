// src/utils/fetchWeather.js
/**
 * Geocode city name to latitude/longitude using Open-Meteo API
 */
export async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding failed: ${res.statusText}`);

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const { latitude, longitude, name, country, timezone } = data.results[0];
    return { latitude, longitude, name, country, timezone };
  } catch (err) {
    console.error("❌ geocodeCity error:", err.message);
    throw new Error(
      "Unable to find city. Please check your spelling or try again."
    );
  }
}

/**
 * Fetch current and hourly weather for a given latitude/longitude
 */
export async function fetchWeatherForLatLon(lat, lon, timezone = "auto") {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,pressure_msl,windspeed_10m,weathercode&timezone=${encodeURIComponent(
    timezone
  )}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.statusText}`);

    const data = await res.json();
    if (!data.current_weather)
      throw new Error("Weather data unavailable for this location.");
    return data;
  } catch (err) {
    console.error("❌ fetchWeatherForLatLon error:", err.message);
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
}

/**
 * Find the nearest hourly index for current time
 */
export function findHourlyIndexForCurrentTime(hourlyTimeArray, currentTimeIso) {
  const target = new Date(currentTimeIso).getTime();
  let nearest = 0;
  let minDiff = Infinity;

  hourlyTimeArray.forEach((t, i) => {
    const diff = Math.abs(new Date(t).getTime() - target);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = i;
    }
  });

  return nearest;
}
