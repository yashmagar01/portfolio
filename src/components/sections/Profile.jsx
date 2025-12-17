import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Dribbble, ArrowUpRight } from 'lucide-react';

export default function Profile() {
  const tags = [
    "Product Design",
    "Web development",
    "AI Enthusiast",
    "App Development",
    "Freelance",
    "Self Lead"
  ];

  const timeline = [
    { year: "2024", role: "Web Development", company: "College Sahayk" },
    { year: "2024", role: "App Development", company: "Jijamata App" },
    { year: "2025", role: "Upcoming Projects", company: "" }
  ];

  return (
    <section id="profile" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-white">Available for work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Expert at Problem Solving</h2>
            <p className="text-xl text-gray-400">yash magar, Your Developer</p>
          </div>
          <p className="text-gray-500 max-w-sm text-sm">
            Brief initial presentation of myself and my previous experiences.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Bio */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Hey, I'm Yash Magar.</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              I’m Yash Magar, a passionate coder from Latur, Maharashtra, currently pursuing a Diploma in Computer Engineering at Government Polytechnic Awasari. I thrive on turning tough problems into clean, reliable code—and I’ve already brought my ideas to life through personal projects and my startup, College Sahayak.
            </p>
            <p className="text-gray-500">
              Developer & AI Enthusiast from Latur, Maharashtra.
            </p>
            
            <div className="flex items-center gap-6 pt-4">
              <a href="#" className="p-2 bg-surface rounded-full text-white hover:bg-white hover:text-black transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-surface rounded-full text-white hover:bg-white hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-surface rounded-full text-white hover:bg-white hover:text-black transition-all">
                <Dribbble size={20} />
              </a>
              <Link to="/contact" className="px-6 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform">
                Connect with me
              </Link>
            </div>
          </div>

          {/* Right Column: Skills & Timeline */}
          <div className="space-y-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-surface border border-white/5 rounded-full text-sm text-gray-300 hover:border-white/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-surface transition-colors cursor-default">
                  <span className="text-gray-500 font-mono text-sm">{item.year}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-accent transition-colors">
                      {item.role}
                      {item.company && <span className="text-gray-500 ml-2 font-normal">– {item.company}</span>}
                    </h4>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
