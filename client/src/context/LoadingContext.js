// src/context/LoadingContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedComponents, setLoadedComponents] = useState(new Set());

  const reportLoaded = useCallback((componentName) => {
    setLoadedComponents((prev) => {
      if (prev.has(componentName)) return prev; // Prevent duplicate reports
      const newSet = new Set(prev).add(componentName);
      console.log(`Component loaded: ${componentName}, Total: ${newSet.size}`);
      if (newSet.size === 5) {
        console.log("All components loaded, setting isLoading to false");
        setIsLoading(false);
      }
      return newSet;
    });
  }, []); // Empty dependency array since it doesn’t depend on anything

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, reportLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
