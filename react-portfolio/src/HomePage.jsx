import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Play, Star, Globe, 
  Twitter, Instagram, Dribbble, Facebook, 
  Code, Cpu, Smartphone, Video, Zap, Mail, ArrowUpRight
} from 'lucide-react';

/* --- 1. Reusable UI Components --- */

const Section = ({ id, className, children }) => (
  <section id={id} className={`relative w-full px-4 sm:px-6 py-16 md:py-24 ${className || ''}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm ${className || ''}`}>
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
    </span>
    <span className="text-xs md:text-sm font-medium text-gray-200 tracking-wide uppercase">{children}</span>
  </div>
);

const Button = ({ children, variant = 'primary', href = '#', className, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
    secondary: "bg-[#111] text-white border border-white/10 hover:bg-[#222] hover:border-white/20",
    outline: "border border-white/20 text-white hover:bg-white/10"
  };

  return (
    <a href={href} className={`${baseStyle} ${variants[variant]} ${className || ''}`}>
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </a>
  );
};

/* --- 2. Page Sections --- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'Projects', 'Profile', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between p-2 rounded-full border transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
          
          {/* Logo */}
          <a href="#" className="pl-4 text-xl font-bold tracking-tighter text-white flex items-center gap-1">
            POLO<span className="text-blue-500 text-2xl">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#111] p-1.5 rounded-full border border-white/10">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                {item}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 pr-1">
            <a href="#contact" className="hidden sm:inline-flex px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Let's Talk
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-3 rounded-full bg-[#111] text-white border border-white/10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {navLinks.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-bold text-gray-400 hover:text-white hover:scale-105 transition-all">
            {item}
          </a>
        ))}
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-6 p-4 text-white">
          <X size={32} />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-black">
      
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 scale-105">
          <source src="https://videos.pexels.com/video-files/9694443/9694443-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-5xl px-6 animate-fade-in-up">
        <Badge>Available for Work</Badge>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
          Building digital <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">products, brands,</span> <br/>
          and experiences.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          I'm <strong>Yash Magar</strong>, a 20-year-old software developer and designer from Pune, Maharashtra. 
          Specializing in modern web experiences, AI agents, and intuitive design.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
          <Button variant="secondary" href="#projects" className="w-full sm:w-auto">
            See All Projects <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="primary" href="#contact" className="w-full sm:w-auto">
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
};

const Profile = () => {
  return (
    <Section id="profile">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Profile Image Card */}
        <div className="lg:col-span-5 h-[500px] lg:h-auto bg-[#111] rounded-[2.5rem] border border-white/5 overflow-hidden relative group">
          <img 
            src="https://framerusercontent.com/images/W0jo6W7grfD8qR5NCTiaBrtieQ.jpg" 
            alt="Yash Magar" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl font-bold text-white">Yash Magar</h3>
            <p className="text-gray-400">Pune, India</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#111] rounded-[2.5rem] p-8 md:p-12 border border-white/5">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Driven by design, <br/> empowered by code.
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              I bridge the gap between design and engineering. With a deep passion for 
              <strong> React, Tailwind, and AI</strong>, I build scalable applications that look beautiful and perform flawlessly.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {/* Socials */}
            <div className="flex gap-4">
              {[Twitter, Instagram, Dribbble].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1a1a1a] text-white hover:bg-white hover:text-black transition-all border border-white/5 hover:scale-110">
                  <Icon size={24} />
                </a>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { label: "Experience", value: "3+ Years" },
                { label: "Projects", value: "20+ Done" },
                { label: "Clients", value: "Global" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};

const Services = () => {
  const services = [
    { title: "Web Development", desc: "High-performance React & Next.js websites.", icon: Code },
    { title: "AI Integration", desc: "Custom LLM agents & automation pipelines.", icon: Cpu },
    { title: "Mobile Apps", desc: "Cross-platform apps using React Native.", icon: Smartphone },
    { title: "Video Editing", desc: "Engaging content for social media growth.", icon: Video },
  ];

  return (
    <Section id="services">
      <div className="text-center mb-16 space-y-4">
        <Badge>What I Do</Badge>
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Helping brands <span className="text-gray-600">scale faster.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((item, i) => (
          <div key={i} className="group p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
              <item.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Projects = () => {
  return (
    <Section id="projects" className="bg-[#050505]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <Badge className="mb-4">Selected Work</Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Featured Projects</h2>
        </div>
        <Button variant="outline" href="#projects">View All Work</Button>
      </div>

      {/* Bento Grid Layout for Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Project 1 (Large) */}
        <div className="group relative rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 aspect-[4/3] md:aspect-auto md:h-[500px]">
          <img src="https://framerusercontent.com/images/MOWvK2SZ1VX1XxKpWbMsodpDQjA.png" alt="Atomai Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Atomai</h3>
                <p className="text-gray-400">AI Integration Platform</p>
              </div>
              <div className="p-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <ArrowUpRight className="text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="group relative rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 aspect-[4/3] md:aspect-auto md:h-[500px]">
          <img src="https://framerusercontent.com/images/IgQlEJAv5wk5JwCItJr3Hs0HKNc.png" alt="Jijamata App Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Jijamata App</h3>
                <p className="text-gray-400">Educational Portal</p>
              </div>
              <div className="p-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <ArrowUpRight className="text-black" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};

const Ticker = () => {
  return (
    <div className="w-full py-16 bg-black border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex gap-16 w-max animate-scroll">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            {['React', 'Next.js', 'Tailwind', 'Node.js', 'Python', 'Framer', 'Figma'].map((tech) => (
              <span key={tech} className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 uppercase">
                {tech}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <Section id="contact">
      <div className="relative rounded-[3rem] bg-[#111] border border-white/5 p-12 md:p-24 text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Badge>Get in Touch</Badge>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
            Let's work <br/> <span className="text-gray-600">together.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mt-4">
            Have a project in mind? I'm always excited to discuss new opportunities and ideas.
          </p>
          <div className="mt-8">
            <Button variant="primary" href="mailto:hello@yashmagar.com" className="bg-white text-black px-10 py-5 text-lg">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="space-y-4">
          <a href="#" className="text-2xl font-bold text-white">POLO.</a>
          <p className="text-gray-500 max-w-xs">
            Crafting digital experiences with code and passion. Based in Pune, India.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold">Sitemap</h4>
            <a href="#home" className="text-gray-500 hover:text-white transition-colors">Home</a>
            <a href="#services" className="text-gray-500 hover:text-white transition-colors">Services</a>
            <a href="#projects" className="text-gray-500 hover:text-white transition-colors">Work</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold">Socials</h4>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; 2025 Yash Magar. All rights reserved.</p>
        <p>Built with React & Tailwind.</p>
      </div>
    </footer>
  );
};

/* --- 3. Main Export --- */

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <Hero />
      <Profile />
      <Services />
      <Projects />
      <Ticker />
      <Contact />
      <Footer />
    </div>
  );
}
