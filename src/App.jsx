// src/App.jsx
import React from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import News from './components/news/News';
import Testimoni from './components/testimoni/Testimoni';
import Contact from './components/contact/Contact';
import './index.css';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <News />
        <Testimoni />
        <Contact />
      </main>
    </div>
  );
}

export default App;