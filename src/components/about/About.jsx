// src/components/about/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Target, Globe } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      } 
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Teknologi AI Canggih",
      description: "Menggunakan algoritma mutakhir untuk menyajikan berita yang relevan dan personal"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Untuk Semua Kalangan",
      description: "Platform yang mudah digunakan oleh berbagai usia dan latar belakang"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Fokus pada Akurasi",
      description: "Memverifikasi informasi dari berbagai sumber tepercaya"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cakupan Global",
      description: "Menjangkau berita dari seluruh dunia dengan perspektif lokal"
    }
  ];

  return (
    <section 
      id="about" 
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#FEFFC4]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* LEFT CONTENT - IMAGE */}
          <motion.div
            className="w-full lg:w-2/5 flex justify-center" // PERUBAHAN DI SINI
            variants={imageVariants}
          >
            <motion.div 
              className="relative w-4/5 sm:w-3/5 lg:w-full max-w-sm" // PERUBAHAN DI SINI
              {...floatingAnimation}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-40 animate-pulse-slow"></div>
              <img
                src="/about/about.png"
                alt="Tentang BeritaAI"
                className="relative rounded-3xl object-cover w-full h-auto transform transition-all duration-500 hover:scale-105 shadow-xl"
                style={{ transform: 'scaleX(-1)' }} // Flip image horizontally
              />
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT - TEXT */}
          <motion.div 
            className="w-full lg:w-3/5"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-2 mb-4 rounded-full bg-highlight/20 text-primary font-semibold text-sm shadow-md">
              Tentang Kami
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Revolusi <span className="text-primary">Berita</span> dengan Kecerdasan Buatan
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 mb-6 text-justify"
            >
              BeritaAI adalah platform inovatif yang menghadirkan pengalaman membaca berita terkini dengan dukungan teknologi kecerdasan buatan. Kami mengumpulkan, menganalisis, dan menyajikan informasi dari berbagai sumber terpercaya untuk memastikan Anda selalu mendapatkan berita yang akurat dan relevan.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 mb-10 text-justify"
            >
              Dengan algoritma canggih, kami tidak hanya menyajikan berita tetapi juga mempersonalisasi pengalaman membaca sesuai minat dan preferensi Anda, menjadikan BeritaAI sebagai teman terbaik untuk tetap terinformasi di era digital.
            </motion.p>

            {/* FEATURES GRID */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-primary mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;