// src/components/ErrorMessage.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="alert alert-error shadow-lg w-full max-w-md mt-4"
    >
      <FaExclamationTriangle className="text-lg" />
      <span>{message}</span>
    </motion.div>
  );
}
