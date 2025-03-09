// src/components/ui/ImageComponent.jsx
import React, { useState } from "react";

export const ImageComponent = ({
  imageData,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  loading = "lazy",
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad(); // Call parent onLoad if provided
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    if (onError) onError(); // Call parent onError if provided
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageData.original}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Image failed to load</span>
        </div>
      )}
    </div>
  );
};