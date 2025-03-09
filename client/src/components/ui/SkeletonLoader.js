// src/components/ui/SkeletonLoader.jsx
import React from "react";

export const SkeletonLoader = ({ className = "", aspectRatio = "1/1" }) => {
  const aspectStyles =
    aspectRatio === "3/4"
      ? "aspect-[3/4]"
      : aspectRatio === "4/5"
      ? "aspect-[4/5]"
      : "aspect-square";

  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-lg ${aspectStyles} ${className}`}
    />
  );
};
