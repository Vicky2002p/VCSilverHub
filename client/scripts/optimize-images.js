// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = './public/images';
const QUALITY = 80;

// Add size configurations for responsive images
const SIZES = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1920
};

async function processImage(inputPath) {
  try {
    const ext = path.extname(inputPath);
    const dir = path.dirname(inputPath);
    const name = path.basename(inputPath, ext);

    // Generate metadata first
    const metadata = await sharp(inputPath).metadata();

    // Create all variants in parallel
    await Promise.all([
      // WebP version
      sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(path.join(dir, `${name}.webp`)),

      // Optimized original
      sharp(inputPath)
        .jpeg({ quality: QUALITY })
        .toFile(path.join(dir, `${name}-optimized${ext}`)),

      // Placeholder (blur)
      sharp(inputPath)
        .resize(20)
        .blur(5)
        .toFile(path.join(dir, `${name}-placeholder${ext}`)),

      // Generate responsive sizes
      ...Object.entries(SIZES).map(([size, width]) =>
        sharp(inputPath)
          .resize(width, null, { withoutEnlargement: true })
          .toFile(path.join(dir, `${name}-${size}${ext}`))
      )
    ]);

    // Generate manifest data
    return {
      original: inputPath,
      width: metadata.width,
      height: metadata.height,
      variants: {
        webp: `${name}.webp`,
        optimized: `${name}-optimized${ext}`,
        placeholder: `${name}-placeholder${ext}`,
        responsive: Object.fromEntries(
          Object.keys(SIZES).map(size => [size, `${name}-${size}${ext}`])
        )
      }
    };

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return null;
  }
}