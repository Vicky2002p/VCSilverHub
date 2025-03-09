// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../config/images";
import { ImageComponent } from "../ui/ImageComponent";
import { useLoading } from "../../context/LoadingContext";
import { SkeletonLoader } from "../ui/SkeletonLoader";

export const Hero = () => {
  const { isLoading, reportLoaded } = useLoading();
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hasReported, setHasReported] = useState(false);
  const heroImage = IMAGES.getImageData(IMAGES.banners.hero);
  const braceletImage = IMAGES.getImageData(IMAGES.products.bracelets[0]); // Use a different image

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });
  const imageInView = useInView(imageRef, { once: true, margin: "-100px" });

  const handleImageLoad = (id) => {
    console.log(`Image loaded: ${id}`);
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleImageError = (id) => {
    console.error(`Image failed to load: ${id}`);
    handleImageLoad(id); // Treat errors as loaded to avoid hanging
  };

  useEffect(() => {
    if (loadedImages.size === 2 && !hasReported) {
      console.log("Hero: All images loaded, reporting to context");
      reportLoaded("Hero");
      setHasReported(true);
    }
  }, [loadedImages, reportLoaded, hasReported]);

  return (
    <section className="relative min-h-screen pb-4 bg-emerald overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-rose-gold leading-tight mb-6">
              Sparkle & <br />
              Shine: Exquisite <br />
              Elegance <br />
              Unveiled
            </h1>
            <p className="text-ivory text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
              Discover our collection of handcrafted jewelry pieces
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-rose-gold text-ivory rounded-full hover:bg-taupe transition-colors"
            >
              Explore Collection
            </motion.button>
          </motion.div>

          <div ref={imageRef} className="relative mt-12 lg:mt-0">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonLoader className="w-[80%] rounded-3xl shadow-xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                  }
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative z-10 flex justify-end"
                >
                  <div className="w-[80%] overflow-hidden rounded-3xl shadow-xl">
                    <ImageComponent
                      imageData={heroImage}
                      alt="Elegant necklace"
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad("hero")}
                      onError={() => handleImageError("hero")}
                    />
                  </div>
                  <div className="absolute left-[2%] top-[60%] h-[30%] w-[40%] overflow-hidden rounded-3xl shadow-xl">
                    <ImageComponent
                      imageData={braceletImage}
                      alt="Ring detail"
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad("bracelet")}
                      onError={() => handleImageError("bracelet")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-rose-gold/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
