// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../config/images";
import { ImageComponent } from "./ui/ImageComponent";
import { useLoading } from "../context/LoadingContext";

const testimonials = [
  {
    text: "The ring itself is stunning, with a beautiful design that catches the light and sparkles from every angle. The quality of the materials used is evident, as the ring feels substantial and durable. The gemstone is exquisite, with a vibrant color and exceptional clarity.",
    author: "Anna Fernandez",
    location: "USA",
    image: IMAGES.modals[0],
  },
  {
    text: "I absolutely love the attention to detail in this piece. The craftsmanship is exceptional, and it's even more beautiful in person.",
    author: "Sarah Johnson",
    location: "UK",
    image: IMAGES.modals[1],
  },
  {
    text: "The quality exceeded my expectations. This piece is truly a work of art that I'll cherish forever.",
    author: "Maria Garcia",
    location: "Spain",
    image: IMAGES.modals[2],
  },
  {
    text: "The ring itself is stunning, with a beautiful design that catches the light and sparkles from every angle. The quality of the materials used is evident, as the ring feels substantial and durable. The gemstone is exquisite, with a vibrant color and exceptional clarity.",
    author: "Anna Fernandez",
    location: "USA",
    image: IMAGES.modals[3],
  },
  {
    text: "I absolutely love the attention to detail in this piece. The craftsmanship is exceptional, and it's even more beautiful in person.",
    author: "Sarah Johnson",
    location: "UK",
    image: IMAGES.modals[4],
  },
  {
    text: "The quality exceeded my expectations. This piece is truly a work of art that I'll cherish forever.",
    author: "Maria Garcia",
    location: "Spain",
    image: IMAGES.modals[5],
  },
  {
    text: "The quality exceeded my expectations. This piece is truly a work of art that I'll cherish forever.",
    author: "Maria Garcia",
    location: "Spain",
    image: IMAGES.modals[6],
  },
];

export const Testimonials = () => {
  const { isLoading, reportLoaded } = useLoading();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hasReported, setHasReported] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index) => {
    console.log(`Testimonial image loaded: ${index}`);
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageError = (index) => {
    console.error(`Testimonial image failed to load: ${index}`);
    handleImageLoad(index); // Treat errors as loaded to avoid hanging
  };

  useEffect(() => {
    if (loadedImages.size === testimonials.length && !hasReported) {
      console.log("Testimonials: All images loaded, reporting to context");
      reportLoaded("Testimonials");
      setHasReported(true);
    }
  }, [loadedImages, reportLoaded, hasReported]);

  return (
    <div className="w-full min-h-[26rem] flex flex-col md:flex-row rounded-xl bg-emerald shadow-lg overflow-hidden">
      {/* Image Section - Full width in mobile, 2/5 width in desktop */}
      <div className="w-full h-[400px] sm:h-[600px] md:h-auto md:w-2/5 shrink-0 relative">
        {isLoading ? (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl md:rounded-t-none md:rounded-l-xl" />
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ImageComponent
                imageData={IMAGES.getImageData(testimonial.image)}
                alt={`Testimonial by ${testimonial.author}`}
                className="w-full h-full object-cover object-center"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Content Section - Full width in mobile, 3/5 width in desktop */}
      <div className="relative w-full md:w-3/5 p-6 pb-24 md:p-8">
        <div className="min-h-[200px] md:min-h-[250px]">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-ivory text-lg leading-relaxed mb-6"
          >
            {testimonials[currentIndex].text}
          </motion.p>

          <motion.div
            key={`${currentIndex}-author`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-ivory"
          >
            <h3 className="font-display text-lg font-semibold mb-1">
              {testimonials[currentIndex].author}
            </h3>
            <p className="text-sm text-ivory/80">
              {testimonials[currentIndex].location}
            </p>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-6 right-6 bottom-6 flex justify-between items-center">
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-ivory w-4"
                    : "bg-ivory/30 hover:bg-ivory/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="w-8 h-8 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-rose-gold hover:border-rose-gold transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-rose-gold hover:border-rose-gold transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
