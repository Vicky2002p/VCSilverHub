import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Testimonials } from "./Testimonials";
import { useLoading } from "../context/LoadingContext";

export const Footer = () => {
  const { setIsLoading } = useLoading();

  const footerRef = useRef(null);
  const topSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });
  const topInView = useInView(topSectionRef, { once: true, margin: "-100px" });
  const bottomInView = useInView(bottomSectionRef, {
    once: true,
    margin: "-100px",
  });

  React.useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={footerInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="bg-charcoal text-ivory py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <motion.div
          ref={topSectionRef}
          variants={staggerChildren}
          initial="hidden"
          animate={topInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-display mb-4">
              From the people
            </h2>
            <p className="text-ivory/80 text-sm sm:text-base">
              We love hearing from our customers!
              <br />
              You're the reason we're here and the reason we do what we do.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Testimonials />
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          ref={bottomSectionRef}
          variants={staggerChildren}
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="text-center sm:text-left">
            <a
              href="/"
              className="text-rose-gold text-xl sm:text-2xl font-display"
            >
              SilverHub
            </a>
          </motion.div>

          {/* Links: Shop */}
          <motion.div variants={fadeInUp} className="text-center sm:text-left">
            <h3 className="font-display mb-2 text-base sm:text-lg">Shop</h3>
            <ul className="space-y-2">
              <motion.li variants={fadeInUp}>
                <a
                  href="/collections"
                  className="hover:text-rose-gold transition-colors text-sm sm:text-base"
                >
                  Collections
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="/about"
                  className="hover:text-rose-gold transition-colors text-sm sm:text-base"
                >
                  About
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Links: Contact */}
          <motion.div variants={fadeInUp} className="text-center sm:text-left">
            <h3 className="font-display mb-2 text-base sm:text-lg">Contact</h3>
            <ul className="space-y-2">
              <motion.li variants={fadeInUp}>
                <a
                  href="/privacy"
                  className="hover:text-rose-gold transition-colors text-sm sm:text-base"
                >
                  Privacy
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="/terms"
                  className="hover:text-rose-gold transition-colors text-sm sm:text-base"
                >
                  Terms
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={fadeInUp}
            className="text-center sm:text-left col-span-1"
          >
            <h3 className="font-display mb-2 text-base sm:text-lg">
              Subscribe to our newsletter
            </h3>
            <p className="text-xs sm:text-sm mb-4">
              For product announcements and exclusive insights
            </p>
            <motion.form
              variants={fadeInUp}
              className="flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Input your email"
                  className="w-full px-3 py-2 rounded-md bg-charcoal border border-ivory/30 focus:border-rose-gold focus:outline-none text-sm sm:text-base"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-rose-gold text-ivory rounded-md hover:bg-taupe transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-ivory/10 gap-4"
        >
          {/* Copyright */}
          <motion.div
            variants={fadeInUp}
            className="text-xs sm:text-sm text-ivory/70 text-center sm:text-left"
          >
            © 2022 Brand, Inc.
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={staggerChildren}
            className="flex justify-center sm:justify-start space-x-6"
          >
            {["Twitter", "Facebook", "LinkedIn", "YouTube"].map((platform) => (
              <motion.a
                key={platform}
                href="#"
                variants={fadeInUp}
                whileHover={{ scale: 1.1, color: "#F9A8D4" }}
                className="text-ivory/70 hover:text-rose-gold transition-colors text-sm sm:text-base"
              >
                <span className="sr-only">{platform}</span>
                {platform === "Twitter" && (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                )}
                {platform === "Facebook" && (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {platform === "LinkedIn" && (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {platform === "YouTube" && (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
