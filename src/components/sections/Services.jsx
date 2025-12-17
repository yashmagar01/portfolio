import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Website Design",
      description: "Crafting responsive, user-centric websites with clean HTML, CSS & JavaScript—optimized for performance and growth."
    },
    {
      title: "AI Agents",
      description: "Designing and deploying intelligent AI agents to automate workflows, analyze data, and supercharge your projects."
    },
    {
      title: "Video Editing",
      description: "Transforming raw footage into polished, engaging videos with seamless cuts, transitions and sound design."
    },
    {
      title: "App Development",
      description: "Building scalable, cross-platform mobile apps in React Native—delivering smooth, reliable experiences on every device."
    }
  ];

  return (
    <section id="services" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 block">Development Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Development Services</h2>
            <p className="text-lg text-gray-400">
              Explore a suite of tech services to power your projects and drive real results.
            </p>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Contact Now
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
