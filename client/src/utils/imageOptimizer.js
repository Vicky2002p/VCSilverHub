// src/utils/imageOptimizer.js
export const getOptimizedImageUrl = (url, options = {}) => {
    // Remove the leading slash if it exists
    const path = url.startsWith('/') ? url.slice(1) : url;
    
    // Check if the image is already in WebP format
    const isWebP = path.toLowerCase().endsWith('.webp');
    
    // Create a placeholder version for lazy loading
    const placeholder = path.replace(/\.(jpg|jpeg|png|webp)$/, '-placeholder.$1');
    
    return {
      src: `/${path}`, // Original source
      webp: isWebP ? `/${path}` : `/${path.replace(/\.(jpg|jpeg|png)$/, '.webp')}`, // WebP version
      placeholder: `/${placeholder}`, // Placeholder for lazy loading
      thumbnail: `/${path.replace(/\.(jpg|jpeg|png|webp)$/, '-thumb.$1')}`, // Thumbnail version
    };
  };