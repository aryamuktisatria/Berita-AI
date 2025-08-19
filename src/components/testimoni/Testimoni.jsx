// src/components/testimoni/Testimoni.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Star } from 'lucide-react';

const Testimoni = () => {
  const testimonials = [
    {
      text: "Website berita AI ini sangat membantu saya tetap update dengan perkembangan terbaru. Desainnya modern dan mudah digunakan!",
      name: "Ahmad Rizki",
      role: "AI Researcher",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
    },
    {
      text: "Sumber berita yang terpercaya dan selalu update. Fitur pencariannya sangat membantu menemukan topik spesifik yang saya butuhkan.",
      name: "Sari Dewi",
      role: "Data Scientist",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
    },
    {
      text: "Antarmuka yang intuitif dan berita yang selalu fresh. Sangat recommended untuk yang tertarik dengan perkembangan AI!",
      name: "Budi Santoso",
      role: "Tech Entrepreneur",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotate: -2
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: {
          type: "spring",
          damping: 15,
          stiffness: 300
        }
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -15,
      scale: 1.03,
      rotate: 0.5,
      boxShadow: "0 25px 50px -12px rgba(121, 158, 255, 0.25)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Star rating component dengan animasi
  const StarRating = ({ rating }) => {
    return (
      <motion.div 
        className="flex justify-center mb-4 space-x-1"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: {
                delay: 0.6 + (i * 0.1),
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }
            }}
            whileHover={{
              scale: 1.3,
              rotate: 15,
              transition: { duration: 0.2 }
            }}
            viewport={{ once: true }}
          >
            <Star
              className={`h-7 w-7 ${
                i < rating 
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' 
                  : 'text-gray-300'
              } transition-all duration-300`}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Background decorative elements dengan animasi */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-accent rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-highlight rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-12 h-12 bg-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Apa Kata <span className="text-primary">Pengguna</span> Kami?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Lihat apa yang dikatakan oleh pengguna setia kami tentang pengalaman mereka menggunakan platform berita AI kami.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              <motion.div
                variants={hoverVariants}
                className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 h-full flex flex-col transition-all duration-500 border-2 border-white/30 group-hover:border-primary/30 group-hover:shadow-3xl relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                <div className="relative z-10">
                  {/* Quote icon top dengan animasi */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FaQuoteLeft className="text-primary text-3xl mb-6 opacity-80 group-hover:opacity-100 group-hover:text-accent transition-all duration-500" />
                  </motion.div>

                  {/* Testimonial text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-700 mb-6 flex-1 text-center italic text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-500"
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* Quote icon bottom dengan animasi */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FaQuoteRight className="text-primary text-3xl ml-auto mb-6 opacity-80 group-hover:opacity-100 group-hover:text-accent transition-all duration-500" />
                  </motion.div>

                  {/* Star rating */}
                  <StarRating rating={testimonial.rating} />

                  {/* User info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center mt-6"
                  >
                    <div className="flex justify-center mb-5">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md"></div>
                        <motion.img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>
                    
                    <motion.h4
                      className="font-bold text-gray-900 text-xl mb-1 group-hover:text-primary transition-colors duration-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <p className="text-gray-600 text-sm font-medium">{testimonial.role}</p>
                  </motion.div>
                </div>

                {/* Decorative elements dengan animasi */}
                <motion.div
                  className="absolute top-4 right-4 w-10 h-10 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-8 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section dengan animasi */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { number: "500+", text: "Pengguna Aktif" },
            { number: "1000+", text: "Berita Setiap Hari" },
            { number: "99%", text: "Kepuasan Pengguna" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={floatVariants}
              animate="animate"
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
            >
              <div className="text-4xl font-bold text-primary mb-3">{stat.number}</div>
              <div className="text-gray-700 font-medium">{stat.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimoni;