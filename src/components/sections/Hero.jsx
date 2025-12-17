import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-black text-white px-6 pt-32 pb-20 md:pt-40">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/9694443/9694443-hd_1920_1080_25fps.mp4"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto w-full gap-8">
        
        {/* Badge / Label */}
        <div className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:0.1s]">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-white/10 rounded-full shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-center w-5 h-5 bg-white/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium text-gray-200 tracking-wide">
              Ready to Collaborate
            </span>
          </div>
        </div>

        {/* Hero Heading */}
        <div className="flex flex-col items-center gap-6 text-center max-w-4xl animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:0.2s]">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="block text-white">Building digital products,</span>
            <span className="block text-gray-400">brands, and experience.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            A 20-year-old software developer and designer from Pune, Maharashtra. 
            Specializing in creating modern web experiences using React and Tailwind.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
          
          {/* Primary Button */}
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              See All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          {/* Secondary Button */}
          <a 
            href="#contact" 
            className="group px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
          >
            Contact Me
          </a>
        </div>

      </div>

      {/* Decorative Shooting Star Effects (Simplified CSS implementation) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 rotate-[25deg] animate-pulse" />
        <div className="absolute top-20 right-1/3 w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-10 rotate-[25deg] animate-pulse [animation-delay:1s]" />
      </div>
    </section>
  );
};

export default Hero;
