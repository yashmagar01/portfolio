import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Dribbble } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Left: Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</a>
            <Link to="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</Link>
            <a href="#profile" className="text-sm text-gray-400 hover:text-white transition-colors">Profile</a>
            <a href="#reviews" className="text-sm text-gray-400 hover:text-white transition-colors">Reviews</a>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Dribbble size={20} /></a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 Polo</p>
          <div className="flex gap-4">
            <a href="https://x.com/framebase_" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Made by Framebase</a>
            <a href="https://framer.link/framebase" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Built in Framer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
