export const weatherThemes = {
  sunny: {
    bg: "bg-gradient-to-br from-yellow-300 to-orange-500",
    icon: "☀️",
    animation: "animate-pulse",
  },
  cloudy: {
    bg: "bg-gradient-to-br from-gray-300 to-gray-500",
    icon: "☁️",
    animation: "animate-pulse",
  },
  rainy: {
    bg: "bg-gradient-to-br from-blue-400 to-blue-700",
    icon: "🌧️",
    animation: "animate-bounce",
  },
  snowy: {
    bg: "bg-gradient-to-br from-blue-100 to-white",
    icon: "❄️",
    animation: "animate-pulse",
  },
  default: {
    bg: "bg-gradient-to-br from-slate-200 to-slate-400",
    icon: "🌤️",
    animation: "animate-pulse",
  },
};

/*
 Map Open-Meteo weather code to a theme type
 */
export function getThemeByWeatherCode(code) {
  if (code === 0) return "sunny"; // Clear
  if ([1, 2, 3].includes(code)) return "cloudy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  return "default";
}
