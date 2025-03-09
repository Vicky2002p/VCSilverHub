import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../config/images";
import { ImageComponent } from "../ui/ImageComponent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLoading } from "../../context/LoadingContext";

// Static product data for the carousel
const products = [
  {
    id: 1,
    name: "Diamond Bracelet",
    price: 168.76,
    category: "Bracelets",
    image: IMAGES.getImageData(IMAGES.products.bracelets[0]),
  },
  {
    id: 2,
    name: "Diamond Bracelet",
    price: 168.76,
    category: "Bracelets",
    image: IMAGES.getImageData(IMAGES.products.bracelets[1]),
  },
  {
    id: 3,
    name: "Diamond Necklace",
    price: 168.76,
    category: "Necklaces",
    image: IMAGES.getImageData(IMAGES.products.necklaces[0]),
  },
  {
    id: 4,
    name: "Diamond Necklace",
    price: 168.76,
    category: "Necklaces",
    image: IMAGES.getImageData(IMAGES.products.necklaces[1]),
  },
  {
    id: 5,
    name: "Diamond Necklace",
    price: 168.76,
    category: "Necklaces",
    image: IMAGES.getImageData(IMAGES.products.necklaces[0]),
  },
  {
    id: 6,
    name: "Diamond Necklace",
    price: 168.76,
    category: "Necklaces",
    image: IMAGES.getImageData(IMAGES.products.necklaces[1]),
  },
];

export const FeaturedProducts = () => {
  const { isLoading: contextLoading, reportLoaded } = useLoading();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(() =>
    products.reduce((acc, product) => ({ ...acc, [product.id]: false }), {})
  );
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const headerRef = useRef(null);
  const productsRef = useRef(null);

  const getProductsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [productsToShow, setProductsToShow] = useState(getProductsToShow());

  useEffect(() => {
    const handleResize = () => setProductsToShow(getProductsToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images
  useEffect(() => {
    products.forEach((product) => {
      const img = new Image();
      img.src = product.image.original;
      img.onload = () => handleImageLoad(product.id);
      img.onerror = () => handleImageError(product.id);
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next >= products.length ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? products.length - 1 : next;
    });
  };

  useEffect(() => {
    const allImagesLoaded = Object.values(loadedImages).every(Boolean);
    if (allImagesLoaded) {
      console.log("All images loaded, setting isLoading to false");
      setIsLoading(false);
      reportLoaded("FeaturedProducts");
    }
  }, [loadedImages, reportLoaded]);

  useEffect(() => {
    if (!isLoading && !isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoading, isHovered]);

  // Fallback timeout reduced to 5s
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timeout triggered, forcing all images as loaded");
        setLoadedImages((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((key) => (updated[key] = true));
          return updated;
        });
      }
    }, 5000); // 5s fallback
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleImageLoad = (productId) => {
    console.log(`Image loaded for product ${productId}`);
    setLoadedImages((prev) => {
      const newState = { ...prev, [productId]: true };
      console.log("Updated loadedImages:", newState);
      return newState;
    });
  };

  const handleImageError = (productId) => {
    console.error(`Image failed to load for product ${productId}`);
    handleImageLoad(productId); // Treat errors as loaded
  };

  const handleCloseModal = () => {
    setSelected(null);
    setZoomLevel(1);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (zoomLevel > 1) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  const itemWidthPercentage = 100 / productsToShow;

  const ProductSkeleton = () => (
    <div
      className={`flex-shrink-0 px-2 w-full ${
        productsToShow === 2
          ? "md:w-1/2"
          : productsToShow === 4
          ? "lg:w-1/4"
          : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="w-full h-72 bg-gray-200 animate-pulse rounded-lg" />
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
    </div>
  );

  useEffect(() => {
    if (!selected) {
      setZoomLevel(1);
      setMousePosition({ x: 0, y: 0 });
    }
  }, [selected]);

  return (
    <div className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display text-charcoal mb-4 tracking-tight">
            Featured Products
          </h2>
          <p className="text-charcoal/70 max-w-md mx-auto text-lg">
            Explore our handcrafted jewelry collection.
          </p>
          <button className="mt-6 px-8 py-3 border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-ivory transition-all duration-300 rounded-full font-display text-lg shadow-md">
            Shop Now
          </button>
        </motion.div>

        <div
          ref={productsRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoading ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                {Array(productsToShow)
                  .fill(null)
                  .map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
              </motion.div>
            ) : (
              <motion.div
                animate={{ x: `-${currentIndex * itemWidthPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex"
              >
                {[...products, ...products.slice(0, productsToShow)].map(
                  (product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className={`flex-shrink-0 px-2 w-full ${
                        productsToShow === 2
                          ? "md:w-1/2"
                          : productsToShow === 4
                          ? "lg:w-1/4"
                          : ""
                      } cursor-pointer`}
                      onClick={() => setSelected(product)}
                    >
                      <div className="relative overflow-hidden rounded-lg mb-4 group shadow-md">
                        <ImageComponent
                          imageData={product.image}
                          alt={product.name}
                          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="eager" // Load immediately
                          onLoad={() => handleImageLoad(product.id)}
                          onError={() => handleImageError(product.id)}
                        />
                      </div>
                      <h3 className="font-display text-lg md:text-xl text-charcoal mb-1 text-center">
                        {product.name}
                      </h3>
                      <p className="text-rose-gold text-center text-base md:text-lg">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>

          {!isLoading && (
            <div className="flex justify-center mt-6 space-x-6 items-center">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-rose-gold/90 text-ivory p-3 rounded-full hover:bg-rose-gold transition-colors shadow-md"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </motion.button>
              <div className="flex space-x-2">
                {products.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-rose-gold w-4"
                        : "bg-rose-gold/30 hover:bg-rose-gold/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-rose-gold/90 text-ivory p-3 rounded-full hover:bg-rose-gold transition-colors shadow-md"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Modal with Zoom and Pan */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-6"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-ivory p-6 sm:p-8 rounded-2xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-xl max-h-[90vh] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-charcoal mb-4 tracking-tight">
                {selected.name}
              </h3>
              <div
                className="relative w-full aspect-[4/5] max-h-[80vh] mb-4 overflow-hidden rounded-lg cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onClick={handleZoomIn}
                style={{
                  overflow: zoomLevel > 1 ? "auto" : "hidden",
                  cursor: zoomLevel > 1 ? "move" : "zoom-in",
                }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${mousePosition.x * 100}% ${
                      mousePosition.y * 100
                    }%`,
                    transition:
                      zoomLevel === 1 ? "transform 0.3s ease" : "none",
                  }}
                >
                  <ImageComponent
                    imageData={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                    loading="eager" // Load immediately
                  />
                </div>
                {zoomLevel === 1 && (
                  <span className="absolute bottom-2 right-2 text-ivory text-xs sm:text-sm bg-charcoal/60 px-2 py-1 rounded">
                    Click to zoom in
                  </span>
                )}
              </div>
              <p className="text-charcoal text-base sm:text-lg md:text-xl mb-6">
                {selected.category} - ${selected.price.toFixed(2)}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={handleZoomIn}
                    className="px-4 py-2 bg-rose-gold/20 text-rose-gold rounded-full hover:bg-rose-gold/30 transition-colors duration-300 font-display text-sm sm:text-base"
                  >
                    Zoom In
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="px-4 py-2 bg-rose-gold/20 text-rose-gold rounded-full hover:bg-rose-gold/30 transition-colors duration-300 font-display text-sm sm:text-base"
                  >
                    Zoom Out
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-4 py-2 bg-rose-gold/20 text-rose-gold rounded-full hover:bg-rose-gold/30 transition-colors duration-300 font-display text-sm sm:text-base"
                  >
                    Reset
                  </button>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-rose-gold text-ivory rounded-full hover:bg-charcoal transition-colors duration-300 font-display text-sm sm:text-base shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
