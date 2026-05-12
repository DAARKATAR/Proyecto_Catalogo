import React from 'react';
import Navbar from '../../../shared/components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../../../shared/components/Footer';

const Landing = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
