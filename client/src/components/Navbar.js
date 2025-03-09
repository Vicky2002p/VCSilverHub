import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom"; // Add this if using React Router

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Hook to get current URL path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Menu container variants with ripple unveil
  const menuVariants = {
    hidden: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      opacity: 0,
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      transition: { duration: 1, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      opacity: 0,
      transition: { duration: 0.7, ease: [0.87, 0, 0.13, 1] },
    },
  };

  // Link variants with prismatic glow
  const linkVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.85 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: 0.9,
        ease: "easeOut",
        type: "spring",
        stiffness: 50,
      },
    }),
    exit: (i) => ({
      opacity: 0,
      y: 50,
      scale: 0.85,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeIn" },
    }),
  };

  // Prismatic underline variants
  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Close button variants with faceted rotation
  const closeVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.7, delay: 1, ease: "easeOut" },
    },
    exit: { scale: 0, opacity: 0, rotate: -90, transition: { duration: 0.5 } },
    hover: {
      scale: 1.15,
      rotate: 90,
      boxShadow: "0 0 15px rgba(212, 165, 165, 0.5)",
    },
    tap: { scale: 0.95 },
    pulse: {
      scale: [1, 1.03, 1],
      opacity: [1, 0.9, 1],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-charcoal/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a href="/" className="text-rose-gold text-2xl font-display">
              SilverHub
            </a>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={link.href}
                  className={`text-ivory hover:text-rose-gold transition-colors`}
                  onClick={() => setIsMenuOpen(false)} // Close mobile menu if open
                >
                  {link.label}
                </a>
                {location.pathname === link.href && (
                  <motion.span
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute left-0 right-0 bottom-[-2px] h-0.5 bg-rose-gold"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-ivory hover:text-rose-gold"
            >
              <UserIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-ivory hover:text-rose-gold"
            >
              <ShoppingBagIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-ivory hover:text-rose-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-emerald/10 backdrop-blur-3xl z-50 md:hidden flex flex-col justify-center items-center px-6 sm:px-8 lg:px-10"
          >
            <div className="space-y-12 sm:space-y-14">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  <motion.a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{
                      y: -6,
                      color: "#B9A394",
                      textShadow: "0 0 10px rgba(212, 165, 165, 0.7)",
                    }}
                    className="text-ivory text-3xl sm:text-4xl lg:text-5xl font-display transition-colors duration-300"
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.span
                        variants={underlineVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute left-0 right-0 bottom-[-8px] h-1 bg-rose-gold shadow-lg shadow-rose-gold/40"
                      />
                    )}
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* Faceted Close Button */}
            <motion.button
              variants={closeVariants}
              initial="hidden"
              animate={["visible", "pulse"]}
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              className="absolute top-6 right-6 w-16 h-16 flex items-center justify-center bg-rose-gold/20 border-2 border-rose-gold/60 rounded-2xl shadow-2xl text-ivory hover:text-rose-gold hover:bg-rose-gold/35 transition-colors duration-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <XMarkIcon className="h-8 w-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
