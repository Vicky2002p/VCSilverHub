import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../config/images";
import { ImageComponent } from "../ui/ImageComponent";
import { SkeletonLoader } from "../ui/SkeletonLoader";
import { useLoading } from "../../context/LoadingContext";

export const Selection = () => {
  const { isLoading, reportLoaded } = useLoading();
  const [loadedImages, setLoadedImages] = useState({});
  const [hasReported, setHasReported] = useState(false);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const [selected, setSelected] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [products] = useState([
    {
      name: "Shimmering Ring",
      price: 168.76,
      image: IMAGES.getImageData(IMAGES.products.bracelets[0]),
    },
    {
      name: "Exquisite Earrings",
      price: 125.28,
      image: IMAGES.getImageData(IMAGES.products.necklaces[1]),
    },
    {
      name: "Elegance Earrings",
      price: 620.73,
      image: IMAGES.getImageData(IMAGES.products.bracelets[1]),
    },
    {
      name: "Luxury Collection",
      price: 327.71,
      image: IMAGES.getImageData(IMAGES.products.necklaces[0]),
    },
  ]);

  const textRef = useRef(null);
  const productsRef = useRef(null);
  const scrollRef = useRef(null);
  const textInView = useInView(textRef, { once: false, margin: "-100px" });
  const productsInView = useInView(productsRef, {
    once: false,
    margin: "-100px",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftGradient(scrollLeft > 0);
        setShowRightGradient(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (scrollContainer)
        scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [productsInView]);

  const handleImageLoad = (productName) => {
    console.log(`Image loaded: ${productName}`);
    setLoadedImages((prev) => ({ ...prev, [productName]: true }));
  };

  const handleImageError = (productName) => {
    console.error(`Image failed to load: ${productName}`);
    handleImageLoad(productName);
  };

  useEffect(() => {
    if (Object.keys(loadedImages).length === products.length && !hasReported) {
      console.log("Selection: All images loaded, reporting to context");
      reportLoaded("Selection");
      setHasReported(true);
    }
  }, [loadedImages, reportLoaded, hasReported]);

  // Drag handlers
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setDragPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
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
    setDragPosition({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setSelected(null);
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!selected) {
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [selected]);

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:w-1/4"
          >
            <h2 className="text-4xl md:text-5xl font-display text-charcoal mb-4 leading-tight">
              Our Selection
              <br />
              of Jewelry
            </h2>
            <p className="text-charcoal/70 mb-6 text-lg">
              Discover elegance in every piece, crafted to perfection.
            </p>
            <button className="px-6 py-2 border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-ivory hover:scale-105 transition-all duration-300 rounded-full font-display">
              Shop Now
            </button>
          </motion.div>

          <div ref={productsRef} className="lg:w-3/4 relative">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={isLoading ? "block" : "hidden"}
            >
              <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 pb-4 px-4">
                  {[1, 2, 3, 4].map((n) => (
                    <SkeletonLoader key={n} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className={isLoading ? "hidden" : "block"}
            >
              <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 pb-4 px-4">
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        productsInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      className="group flex-none w-[250px] motion-item cursor-pointer"
                      onClick={() => setSelected(product)}
                    >
                      <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                        <ImageComponent
                          imageData={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="eager"
                          onLoad={() => handleImageLoad(product.name)}
                          onError={() => handleImageError(product.name)}
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-charcoal text-lg mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-rose-gold font-semibold">
                            ${Math.floor(product.price)}
                          </span>
                          <span className="text-sm text-charcoal/60">
                            .
                            {String(
                              Math.round((product.price % 1) * 100)
                            ).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {!isLoading && (
                <>
                  {showLeftGradient && (
                    <div className="absolute -left-6 top-0 bottom-0 w-4 bg-gradient-to-r from-ivory pointer-events-none translate-x-6" />
                  )}
                  {showRightGradient && (
                    <div className="absolute -right-8 top-0 bottom-0 w-4 bg-gradient-to-l from-ivory pointer-events-none translate-x-[-1.5rem]" />
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Modal with Zoom and Drag */}
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
              className="bg-ivory p-6 sm:p-8 rounded-2xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-3xl max-h-[80vh] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-charcoal mb-4 tracking-tight">
                {selected.name}
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-rose-gold text-ivory rounded-full hover:bg-charcoal transition-colors duration-300 font-display text-sm sm:text-base shadow-md"
                >
                  Close
                </button>
              </h3>
              <div
                className="relative w-full aspect-[4/5] max-h-[50vh] mb-4 overflow-hidden rounded-lg cursor-zoom-in"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves
                onClick={handleZoomIn}
                style={{
                  overflow: zoomLevel > 1 ? "auto" : "hidden",
                  cursor: zoomLevel > 1 ? "grab" : "zoom-in",
                  userSelect: "none", // Prevent text selection during drag
                }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                    transition:
                      zoomLevel === 1 && !isDragging
                        ? "transform 0.3s ease"
                        : "none",
                  }}
                >
                  <ImageComponent
                    imageData={selected.image}
                    alt={selected.name}
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
                ${selected.price.toFixed(2)}
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
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
