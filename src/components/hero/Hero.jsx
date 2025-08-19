// src/components/hero/Hero.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { FaReact, FaJsSquare, FaPython } from 'react-icons/fa';

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 50]);
  const yImage = useTransform(scrollY, [0, 500], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
  };

  const floatVariants = (delay, x, y) => ({
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 0.1, 
      scale: 1, 
      x: [0, x, 0], 
      y: [0, y, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }
    }
  });

  // Untuk gambar supaya selalu floating slow elegan
  const floatingImage = {
    animate: {
      y: [0, -20, 0, 20, 0],  // naik turun
      rotate: [0, 1.5, 0, -1.5, 0], // rotasi pelan
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16 bg-[#FEFFC4]"
    >
      {/* Background Animated Icons */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 text-primary text-5xl opacity-0"
          variants={floatVariants(0, 100, 50)}
        >
          <FaReact />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/4 text-highlight text-6xl opacity-0"
          variants={floatVariants(2, -100, -50)}
        >
          <FaJsSquare />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-1/2 text-accent text-7xl opacity-0"
          variants={floatVariants(4, 50, -100)}
        >
          <FaPython />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: yText }}
            className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 
                      mt-12 lg:-mt-52 xl:-mt-64" // PERUBAHAN DI SINI
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-2 mb-4 rounded-full bg-highlight/20 text-primary font-semibold text-sm shadow-md">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Berita AI Terkini & Terpercaya!</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
            >
              Kecerdasan Buatan <br /> di Ujung Jari Anda
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Platform berita terdepan yang menyajikan informasi terkini dari berbagai sumber terpercaya, semuanya didukung oleh kecerdasan buatan.
            </motion.p>

            <motion.div variants={itemVariants}>
              <motion.a
                href="#news"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-primary to-accent transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent/50"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-6 w-6 mr-2 animate-spin-slow" />
                <span>Lihat Berita</span>
                <motion.div
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT (IMAGE FLOATING) */}
          <motion.div
            style={{ y: yImage }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-w-4 aspect-h-3"
              {...floatingImage} // apply floating animation here
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-75 animate-pulse-slow"></div>
              <img
                src="/hero/hero.png"
                alt="AI Powered News Illustration"
                className="relative rounded-3xl object-cover w-full h-full transform transition-all duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;