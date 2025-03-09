import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ShopHeader = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (replace with real fetch later)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s delay
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    "Rings",
    "Bracelets",
    "Necklaces",
    "Earrings",
    "Sort by price",
  ];

  // Simple wave pattern as a data URL (Tailwind-compatible)
  const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23D4A5A5' fill-opacity='0.1' d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,90.7C960,96,1056,96,1152,85.3C1248,75,1344,64,1392,58.7L1440,53.3V320H1392H1344H1248H1152H1056H960H864H768H672H576H480H384H288H192H96H48H0V64Z'%3E%3C/path%3E%3C/svg%3E")`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skeletonVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <header
      className="bg-emerald text-ivory py-32"
      style={{
        backgroundImage: `${wavePattern}, linear-gradient(to bottom, charcoal, charcoal/95)`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <motion.div
            initial="pulse"
            animate="pulse"
            variants={skeletonVariants}
            className="space-y-8"
          >
            {/* Skeleton Title */}
            <div className="h-12 sm:h-14 lg:h-16 bg-charcoal/20 rounded-lg mx-auto w-3/4 animate-pulse" />

            {/* Skeleton Search Bar */}
            <div className="flex justify-center">
              <div className="h-12 w-full max-w-lg bg-charcoal/20 rounded-full" />
            </div>

            {/* Skeleton Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-20 bg-charcoal/20 rounded-full"
                  />
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display text-center text-rose-gold"
            >
              Our Products
            </motion.h1>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Find jewelry you like..."
                  className="w-full p-3 rounded-full text-gray-800 bg-ivory border-2 border-rose-gold/20 focus:outline-none focus:ring-2 focus:ring-rose-gold/50 placeholder-gray-500 transition-all duration-300"
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-rose-gold/20 text-ivory rounded-full hover:bg-rose-gold/40 transition-colors duration-300"
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ShopHeader;
