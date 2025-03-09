import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../config/images";
import { ImageComponent } from "../ui/ImageComponent";
import { SkeletonLoader } from "../ui/SkeletonLoader";
import { useLoading } from "../../context/LoadingContext";

// Static collection data with luxurious themes
const collections = [
  {
    title: "Luxurious Lustre",
    image: IMAGES.collections.gold,
    theme: "gold",
    description: "Opulent gold pieces that exude timeless elegance.",
  },
  {
    title: "Radiant Reflections",
    image: IMAGES.collections.silver,
    theme: "silver",
    description: "Shimmering silver designs for a modern sparkle.",
  },
  {
    title: "Majestic Mementos",
    image: IMAGES.collections.gold,
    theme: "gold",
    description: "Bold gold keepsakes with regal charm.",
  },
  {
    title: "Blissful Baubles",
    image: IMAGES.collections.silver,
    theme: "silver",
    description: "Playful yet sophisticated silver trinkets.",
  },
  {
    title: "Timeless Treasures",
    image: IMAGES.collections.gold,
    theme: "gold",
    description: "Classic gold treasures for every generation.",
  },
  {
    title: "Divine Diamonds",
    image: IMAGES.collections.silver,
    theme: "silver",
    description: "Exquisite diamond-studded silver masterpieces.",
  },
];

export const Collections = () => {
  const { isLoading, reportLoaded } = useLoading();
  const [selected, setSelected] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hasReported, setHasReported] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-100px" });
  const gridInView = useInView(gridRef, { once: false, margin: "-100px" });

  const handleImageLoad = (index) => {
    console.log(`Collection image loaded: ${index}`);
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageError = (index) => {
    console.error(`Collection image failed to load: ${index}`);
    handleImageLoad(index);
  };

  useEffect(() => {
    if (loadedImages.size === collections.length && !hasReported) {
      console.log("Collections: All images loaded, reporting to context");
      reportLoaded("Collections");
      setHasReported(true);
    }
  }, [loadedImages, reportLoaded, hasReported]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
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

  useEffect(() => {
    if (!selected) {
      setZoomLevel(1);
      setMousePosition({ x: 0, y: 0 });
    }
  }, [selected]);

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-charcoal mb-4">
            Our Collections
          </h2>
          <p className="text-charcoal/70 max-w-md mx-auto text-lg">
            Discover exquisite designs crafted with passion and precision.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {isLoading
            ? [...Array(6)].map((_, index) => (
                <SkeletonLoader
                  key={index}
                  aspectRatio="4/5"
                  className="rounded-2xl shadow-md"
                />
              ))
            : collections.map((collection, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={gridInView ? "visible" : "hidden"}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setSelected(collection)}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && setSelected(collection)
                  }
                  aria-label={`View ${collection.title} collection`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <ImageComponent
                      imageData={IMAGES.getImageData(collection.image)}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      collection.theme === "gold"
                        ? "from-rose-gold/70"
                        : "from-charcoal/70"
                    } to-transparent transition-opacity duration-300`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-display text-ivory drop-shadow-lg">
                        {collection.title}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-ivory text-lg md:text-xl font-display drop-shadow-md">
                      Explore Now
                    </span>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Shop Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-ivory hover:scale-105 transition-all duration-300 rounded-full font-display text-lg">
            Shop All Collections
          </button>
        </motion.div>

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
                {selected.title} {/* Changed from selected.name */}
              </h3>
              <div
                className="relative w-full aspect-[4/5] max-h-[50vh] mb-4 overflow-hidden rounded-lg cursor-zoom-in"
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
                    imageData={IMAGES.getImageData(selected.image)}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                {zoomLevel === 1 && (
                  <span className="absolute bottom-2 right-2 text-ivory text-xs sm:text-sm bg-charcoal/60 px-2 py-1 rounded">
                    Click to zoom in
                  </span>
                )}
              </div>
              <p className="text-charcoal text-base sm:text-lg md:text-xl mb-6">
                {selected.description} {/* Changed from category and price */}
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
    </section>
  );
};
