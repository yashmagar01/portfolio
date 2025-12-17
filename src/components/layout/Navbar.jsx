import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Vibe Coder
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Why Us
          </a>
          <Link to="/projects" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Projects
          </Link>
          <a href="#team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Team
          </a>
          <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/contact" 
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            Join Us
          </Link>
          
          {/* Mobile Menu Button (Simple implementation for now) */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
