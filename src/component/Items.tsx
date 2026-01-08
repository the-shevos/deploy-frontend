import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  description: string;
  images?: string[];
}

export default function UltraPremiumShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "http://localhost:3000/api/v1/products"
        );
        setProducts(res.data);
      } catch (e) {
        console.error("API Error:", e);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products.length || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [products, isPaused]);

  if (!products.length)
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const currentProduct = products[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden select-none"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const top = Math.random() * 100 + "%";
          const left = Math.random() * 100 + "%";
          const x = Math.random() * 40 - 20 + "px";
          const y = Math.random() * 40 - 20 + "px";
          const duration = Math.random() * 5 + 3 + "s";
          const delay = Math.random() * 3 + "s";
          const size = Math.random() * 2 + 1 + "px";
          return (
            <div
              key={i}
              className="absolute rounded-full bg-gray-100 opacity-50 animate-[floatDots_linear_infinite]"
              style={
                {
                  top,
                  left,
                  width: size,
                  height: size,
                  "--x": x,
                  "--y": y,
                  animationDuration: duration,
                  animationDelay: delay,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-[0.03] pointer-events-none">
        <h2 className="text-[30vw] font-black uppercase whitespace-nowrap">
          {currentProduct.name}
        </h2>
      </div>

      <div className="hidden md:flex absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-8 items-center">
        <span className="text-[10px] tracking-[0.5em] uppercase vertical-text opacity-30 mb-4">
          Nav
        </span>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="group relative flex items-center justify-center"
          >
            <div
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex
                  ? "h-12 w-2px bg-blue-500"
                  : "h-4 w-1px bg-white/20 group-hover:bg-white/50"
              }`}
            />
            {i === currentIndex && (
              <motion.span
                layoutId="activeNav"
                className="absolute -left-8 text-[10px] font-mono text-blue-500"
              >
                0{i + 1}
              </motion.span>
            )}
          </button>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 text-center lg:text-left pt-20 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct._id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <p className="text-blue-500 font-mono tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">
                CONCEPT_2026 // 0{currentIndex + 1}
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-9xl font-bold mb-6 lg:mb-8 leading-tight lg:leading-[0.9] tracking-tighter">
                {currentProduct.name.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              <p className="max-w-full sm:max-w-md mx-auto lg:mx-0 text-slate-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-8 lg:mb-12 italic">
                {currentProduct.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors">
                    Order Piece
                  </span>
                  <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <button className="px-10 py-4 border border-white/10 hover:border-white/40 transition-colors font-black uppercase text-[10px] tracking-[0.2em]">
                  Technical Specs
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center h-[50vh] lg:h-screen relative p-4 sm:p-8">
          <img
            src={
              currentProduct.images?.[0] || "https://via.placeholder.com/1000"
            }
            alt={currentProduct.name}
            className="block md:hidden max-h-full max-w-full object-contain z-20 transition-all"
          />

          <div className="hidden md:flex w-full h-full items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct._id}
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />

                <motion.img
                  src={
                    currentProduct.images?.[0] ||
                    "https://via.placeholder.com/1000"
                  }
                  alt={currentProduct.name}
                  className="max-w-[85%] max-h-[70%] lg:max-h-[85%] w-auto h-auto object-contain z-20 drop-shadow-[0_0_80px_rgba(59,130,246,0.2)] product-float"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl z-30 hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">
                    Status
                  </p>
                  <p className="text-[10px] font-mono">OPTIMAL_SYSTEM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 sm:left-12 flex items-center gap-3 text-[7px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/20">
        <span>Scroll Forbidden</span>
        <div className="w-16 sm:w-20 h-[px] bg-white/10" />
        <span>Luxury Experience</span>
      </div>

      <style>{`
        .vertical-text { writing-mode: vertical-rl; }
        .product-float { animation: float 8s ease-in-out infinite; }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes floatDots {
          0% { transform: translate(0,0); opacity:0.5; }
          50% { transform: translate(var(--x), var(--y)); opacity:1; }
          100% { transform: translate(0,0); opacity:0.5; }
        }
        .animate-[floatDots_linear_infinite] {
          animation: floatDots linear infinite;
        }
        body { background-color: #050505; }
      `}</style>
    </section>
  );
}
