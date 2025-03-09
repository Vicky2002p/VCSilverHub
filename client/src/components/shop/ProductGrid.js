// src/components/shop/ProductGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  // Animation variants for grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      // Adjust grid columns to control card width
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={index} // Use unique ID from data later
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
