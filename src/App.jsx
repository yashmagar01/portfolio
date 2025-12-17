import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Profile from './components/sections/Profile';
import Services from './components/sections/Services';
import PricingCta from './components/sections/PricingCta';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary font-sans">
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <Services />
        <PricingCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
