// src/components/Services.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLoading } from "../../context/LoadingContext";

export const Services = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [iconsLoaded, setIconsLoaded] = useState({
    delivery: false,
    customerCare: false,
    paymentSecurity: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Services: All icons simulated as loaded");
      setIconsLoaded({
        delivery: true,
        customerCare: true,
        paymentSecurity: true,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const allLoaded = Object.values(iconsLoaded).every(Boolean);
    if (allLoaded) {
      console.log("Services: All icons loaded, setting isLoading to false");
      setIsLoading(false);
    }
  }, [iconsLoaded, setIsLoading]);

  const services = [
    {
      id: "delivery",
      icon: (
        <svg
          className="w-12 h-12 text-rose-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      title: "Delivery",
      description:
        "Ea esse elit anim commodo laborum pariatur nisi. Voluptate elit d",
    },
    {
      id: "customerCare",
      icon: (
        <svg
          className="w-12 h-12 text-rose-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Customer care",
      description:
        "Ea esse elit anim commodo laborum pariatur nisi. Voluptate elit d",
    },
    {
      id: "paymentSecurity",
      icon: (
        <svg
          className="w-12 h-12 text-rose-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Payment security",
      description:
        "Ea esse elit anim commodo laborum pariatur nisi. Voluptate elit d",
    },
  ];

  const ServiceSkeleton = () => (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="h-5 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
      <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
    </div>
  );

  return (
    <div className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="contents" // Keeps grid layout intact
            >
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <ServiceSkeleton key={index} />
                ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="contents" // Keeps grid layout intact
            >
              {services.map((service) => (
                <div key={service.id} className="text-center">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-lg font-display mb-2">{service.title}</h3>
                  <p className="text-charcoal/70">{service.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
