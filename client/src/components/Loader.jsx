// src/components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 space-y-4">
      {/* 🌪️ Animated Spinner */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-t-transparent border-primary"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>

      {/* ✨ Pulsating Text */}
      <motion.p
        className="text-lg font-medium text-primary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Fetching Weather Data...
      </motion.p>
    </div>
  );
}
