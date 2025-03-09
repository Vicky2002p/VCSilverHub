import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProductCard = ({ name, price, imageUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (replace with real fetch later)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const skeletonVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isLoading ? "pulse" : "visible"}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" }}
      // Optional: Set max-width for consistent card size
      className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto"
    >
      {isLoading ? (
        <div className="w-full">
          {/* Skeleton Image */}
          <div className="w-full h-48 bg-charcoal/20 animate-pulse" />
          <div className="p-4 space-y-2">
            {/* Skeleton Name */}
            <div className="h-6 w-3/4 bg-charcoal/20 rounded" />
            {/* Skeleton Price */}
            <div className="h-5 w-1/4 bg-charcoal/20 rounded" />
          </div>
        </div>
      ) : (
        <>
          {/* Adjust image height here */}
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800 hover:text-rose-gold transition-colors duration-200">
              {name}
            </h3>
            <p className="text-gray-600 text-sm">
              ${price.toFixed(2)}
              <span className="ml-2 text-rose-gold/80 text-xs">In Stock</span>
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProductCard;
