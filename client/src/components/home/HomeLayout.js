// src/components/home/HomeLayout.jsx
import React, { useEffect } from "react";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { FeaturedProducts } from "./FeaturedProducts";
import { Collections } from "./Collections";
import { Selection } from "./Selection";
import { useLoading } from "../../context/LoadingContext";

const HomeLayout = () => {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // Fallback to stop loading after 5 seconds
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Loading took too long, forcing to false");
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading, setIsLoading]);

  return (
    <main>
      <Hero />
      <Services />
      <FeaturedProducts />
      <Collections />
      <Selection />
    </main>
  );
};

export default HomeLayout;
