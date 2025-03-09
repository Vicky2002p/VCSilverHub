// src/config/images.js
export const IMAGES = {
  banners: {
    hero: "/images/products/necklaces/myimg1.webp",
    collection: "/images/products/necklaces/myimg1.webp",
  },
  products: {
    bracelets: [
      "/images/products/bracelets/img33.webp",
      "/images/products/bracelets/img34.webp",
      "/images/products/bracelets/img35.webp",
      "/images/products/bracelets/img36.webp",
    ],
    earrings: [
      "/images/products/necklaces/img45.webp",
      "/images/products/necklaces/img46.webp",
    ],
    necklaces: [
      "/images/products/necklaces/myimg1.webp",
      "/images/products/necklaces/myimg2.webp",
    ],
    rings: [
      "/images/products/rings/img2.webp",
      "/images/products/rings/img3.webp",
    ]
  },
  collections: {
    gold: "/images/collections/myimg57.webp",
    silver: "/images/collections/img32.webp",
  },
  modals: [
    "/images/modal/myimg52.jpg",
    "/images/modal/myimg53.jpg",
    "/images/modal/myimg54.jpg",
    "/images/modal/myimg55.jpg",
    "/images/modal/myimg56.jpg",
    "/images/modal/myimg58.jpg",
    "/images/modal/myimg61.jpg",
  ],

  getImageData: (path) => {
    // console.log("Image path requested:", path);
    return {
      original: path,
      // Placeholder fields for compatibility; we'll reintroduce optimization later
      webp: path,
      optimized: path,
      placeholder: path,
      responsive: {
        sm: path,
        md: path,
        lg: path,
        xl: path,
      },
    };
  },
};

// console.log("IMAGES config loaded:", IMAGES);
