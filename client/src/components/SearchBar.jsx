import React from "react";
import { FaSearch, FaMicrophone, FaLocationArrow } from "react-icons/fa";

export default function SearchBar({ city, setCity, onSearch, onLocate }) {
  // Trigger search when user presses Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-6 w-full max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city..."
        className="input input-bordered w-full bg-white/90 focus:outline-none focus:ring focus:ring-blue-300 text-black"
      />

      <button
        onClick={onSearch}
        className="btn btn-primary flex items-center gap-1"
        aria-label="Search city"
      >
        <FaSearch />
      </button>

      <button
        onClick={onLocate}
        className="btn btn-accent flex items-center gap-1"
        aria-label="Detect location"
      >
        <FaLocationArrow />
      </button>
    </div>
  );
}
