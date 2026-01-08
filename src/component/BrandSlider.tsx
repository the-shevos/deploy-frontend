import React from "react";
import { motion } from "framer-motion";

const brandLogos = [
  {
    name: "Nike",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Adidas",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Puma",
    src: "https://upload.wikimedia.org/wikipedia/en/3/37/Puma_AG.svg",
  },
  {
    name: "The North Face",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/73/The_North_Face_logo.svg",
  },
  {
    name: "Under Armour",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Under_armour_logo.svg",
  },
  {
    name: "Patagonia",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Patagonia_logo.svg",
  },
  {
    name: "Arc'teryx",
    src: "https://upload.wikimedia.org/wikipedia/en/6/6c/Arc%27teryx_logo.svg",
  },
];

const BrandSlider = () => {
  return (
    <div className="relative mt-24 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-xl">
      <motion.div
        className="flex items-center gap-28 py-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: "linear",
        }}
      >
        {[...brandLogos, ...brandLogos].map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[180px] opacity-60 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="h-12 md:h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};

export default BrandSlider;
