import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* Left Column: Intro Text */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-400 tracking-wide uppercase">Vibe Coder</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
              <span className="block text-white">yash magar</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-10">
              I’m a problem-solving coder with a knack for crafting clean, impactful solutions to boost your projects.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/projects" 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-all hover:scale-105"
              >
                See All Projects
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all"
              >
                Contact Now
              </Link>
            </div>
          </div>

          {/* Right Column: Visuals / Project Thumbnails */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: AtomAI */}
              <div className="group relative aspect-[4/3] bg-surface rounded-2xl overflow-hidden cursor-pointer border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-white">AtomAI</p>
                 </div>
              </div>
              
              {/* Card 2: Polo */}
              <div className="group relative aspect-[4/3] bg-surface rounded-2xl overflow-hidden cursor-pointer border border-white/5 mt-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-white">Polo</p>
                 </div>
              </div>
              
              {/* Card 3: Fade */}
              <div className="group relative aspect-[4/3] bg-surface rounded-2xl overflow-hidden cursor-pointer border border-white/5 -mt-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-white">Fade</p>
                 </div>
              </div>
              
              {/* Card 4: Lio */}
              <div className="group relative aspect-[4/3] bg-surface rounded-2xl overflow-hidden cursor-pointer border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-white">Lio</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
