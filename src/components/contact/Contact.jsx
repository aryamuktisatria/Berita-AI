// src/components/contact/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Send, 
  CheckCircle,
  User,
  MessageCircle,
  Heart
} from 'lucide-react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mvgqjkza");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.15,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      text: "aryamuktisatria@gmail.com",
      link: "mailto:aryamuktisatria@gmail.com",
      color: "bg-red-100 text-red-600",
      gradient: "from-red-400 to-red-600"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      text: "+62 856 2519 826",
      link: "tel:+628562519826",
      color: "bg-green-100 text-green-600",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      text: "Yogyakarta, Indonesia",
      link: "https://maps.google.com/?q=Yogyakarta",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      text: "github.com/aryamuktisatria",
      link: "https://github.com/aryamuktisatria",
      color: "bg-gray-100 text-gray-600",
      gradient: "from-gray-400 to-gray-600"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      text: "linkedin.com/in/aryamuktisatriahendrayana",
      link: "https://www.linkedin.com/in/aryamuktisatriahendrayana",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: "Instagram",
      text: "@aryamuktisatria",
      link: "https://instagram.com/aryamuktisatria",
      color: "bg-pink-100 text-pink-600",
      gradient: "from-pink-400 to-pink-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary relative overflow-hidden">
      {/* Background decorative elements dengan animasi */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-highlight rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Mari <span className="text-primary">Terhubung</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Tertarik berkolaborasi atau memiliki pertanyaan? Mari berbicara tentang ide dan proyek Anda!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-8"
            >
              Informasi <span className="text-primary">Kontak</span>
            </motion.h3>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-primary/20 relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-700 mt-1 text-sm group-hover:text-gray-800 transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              variants={itemVariants}
              className="pt-8"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Github className="h-5 w-5" />, href: "https://github.com/aryamuktisatria", color: "hover:text-gray-900" },
                  { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/aryamuktisatriahendrayana", color: "hover:text-blue-600" },
                  { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/aryamuktisatria", color: "hover:text-pink-600" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialVariants}
                    whileHover="hover"
                    className={`p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 text-gray-600 ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/97 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/30"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              Kirim <span className="text-primary">Pesan</span>
            </h3>

            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h4>
                <p className="text-gray-600">
                  Terima kasih telah menghubungi. Saya akan membalas pesan Anda segera.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 placeholder-gray-400 text-gray-900"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 placeholder-gray-400 text-gray-900"
                      placeholder="email@example.com"
                    />
                  </div>
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Pesan
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 placeholder-gray-400 text-gray-900 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-sm"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                  >
                    {state.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-200/50"
        >
          <p className="text-gray-600 flex items-center justify-center">
            © 2025 <span className="mx-1 font-semibold text-primary">Aryamukti Satria Hendrayana</span>. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;