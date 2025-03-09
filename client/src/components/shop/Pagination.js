// src/components/shop/Pagination.jsx
import React from "react";
import { motion } from "framer-motion";

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {},
}) => {
  const maxVisiblePages = 5;
  const ellipsis = "...";

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfWindow = Math.floor((maxVisiblePages - 2) / 2);
    let start = Math.max(2, currentPage - halfWindow);
    let end = Math.min(totalPages - 1, currentPage + halfWindow);

    if (end - start + 1 < maxVisiblePages - 2) {
      if (currentPage <= halfWindow + 1) {
        end = maxVisiblePages - 1;
      } else {
        start = totalPages - maxVisiblePages + 2;
      }
    }

    const pages = [1];
    if (start > 2) pages.push(ellipsis);
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push(ellipsis);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  const baseButtonStyles =
    "flex items-center justify-center rounded-full transition-all duration-300 text-sm sm:text-base w-8 h-8 sm:w-10 sm:h-10";
  const activeButtonStyles = "bg-rose-gold text-ivory font-bold";
  const inactiveButtonStyles =
    "bg-charcoal/20 text-charcoal hover:bg-rose-gold/20";
  const disabledButtonStyles =
    "bg-charcoal/10 text-charcoal/40 cursor-not-allowed";
  const navigationButtonStyles =
    "bg-rose-gold text-ivory hover:bg-rose-gold/80";

  return (
    <nav
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      aria-label="Pagination"
    >
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
        <motion.button
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${baseButtonStyles} ${
            currentPage === 1 ? disabledButtonStyles : navigationButtonStyles
          }`}
          aria-label="Previous page"
        >
          &lt;
        </motion.button>

        {visiblePages.map((page, index) => (
          <React.Fragment key={`${page}-${index}`}>
            {page === ellipsis ? (
              <span
                className={`${baseButtonStyles} ${disabledButtonStyles}`}
                aria-hidden="true"
              >
                {ellipsis}
              </span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`${baseButtonStyles} ${
                  page === currentPage
                    ? activeButtonStyles
                    : inactiveButtonStyles
                }`}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}

        <motion.button
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`${baseButtonStyles} ${
            currentPage === totalPages
              ? disabledButtonStyles
              : navigationButtonStyles
          }`}
          aria-label="Next page"
        >
          &gt;
        </motion.button>
      </div>
    </nav>
  );
};

export default Pagination;
