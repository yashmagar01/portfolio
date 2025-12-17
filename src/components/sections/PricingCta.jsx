import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

export default function PricingCta() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Let's Connect</h2>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-500">Let's Grow Together</h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-surface border border-white/5 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Web Design</h3>
            <p className="text-sm text-gray-500 mb-6">Starting from $1,999</p>
            <p className="text-gray-400 mb-8 flex-1">
              Showcasing sleek, high-performance designs tailored for impact
            </p>
            <Link to="/contact" className="w-full py-3 text-center bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-surface border border-white/5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/20">Popular</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Framer Development</h3>
            <p className="text-sm text-gray-500 mb-6">Starting from $4,999</p>
            <p className="text-gray-400 mb-8 flex-1">
              Building visually stunning, user-focused websites that elevate brands.
            </p>
            <a href="https://framer.link/rioO8iI" target="_blank" rel="noopener noreferrer" className="w-full py-3 text-center bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Get Started Now
            </a>
          </div>

        </div>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
          <Link 
            to="/projects" 
            className="px-8 py-4 bg-surface text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            See All Projects
            <ArrowUpRight size={18} />
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform"
          >
            Get Started Now
          </Link>
        </div>

        {/* Banner Image Placeholder */}
        <div className="w-full h-64 md:h-96 bg-surface rounded-3xl overflow-hidden relative border border-white/5">
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
             <span className="text-lg">Project Banner Placeholder</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

      </div>
    </section>
  );
}
