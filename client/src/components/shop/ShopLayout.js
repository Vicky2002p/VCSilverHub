// src/components/shop/ShopLayout.jsx
import React, { useState } from "react";
import ShopHeader from "./ShopHeader";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

const ShopLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Static product data with corrected image URLs
  const products = Array.from({ length: 25 }, (_, i) => ({
    name: `Jewelry Item ${i + 1}`,
    price: 49.99 + i * 10,
    imageUrl: `https://picsum.photos/300/200?random=${i + 1}`, // Alternative service
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <ProductGrid products={currentProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShopLayout;
