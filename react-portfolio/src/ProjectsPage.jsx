import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, ArrowUpRight, Star, 
  Twitter, Instagram, Facebook, Dribbble 
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
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${className || ''}`}>
    <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
      <div className="w-1.5 h-1.5 bg-black rounded-full" />
    </div>
    <span className="text-sm font-semibold text-white tracking-wide">{children}</span>
  </div>
);

const Button = ({ children, variant = 'primary', href = '#', className, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-white/20",
    secondary: "bg-gradient-to-b from-white to-gray-400 text-black hover:to-white border border-transparent",
    dark: "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#222] hover:border-white/20",
    outline: "border border-white/20 text-white hover:bg-white/10"
  };

  return (
    <a href={href} className={`${baseStyle} ${variants[variant]} ${className || ''}`}>
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </a>
  );
};

/* --- 2. Page Specific Components --- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '/#services' },
    { name: 'Projects', href: '/projects', current: true },
    { name: 'Team', href: '/#profile' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between p-2 rounded-full border transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
          
          {/* Logo */}
          <a href="/" className="pl-6 text-xl font-bold tracking-tighter text-white flex items-center gap-1">
            POLO<span className="text-blue-500 text-2xl">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#111] p-1.5 rounded-full border border-white/10">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${item.current ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 pr-1">
            <a href="#contact" className="hidden sm:inline-flex px-6 py-3 bg-gradient-to-b from-[#111] to-[#222] border border-white/10 text-white text-sm font-medium rounded-full hover:border-white/30 transition-all shadow-inner">
              Join Us
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-[#111] rounded-3xl border border-white/10 p-6 flex flex-col gap-4 z-50 shadow-2xl">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} className="text-xl font-medium text-white py-2 border-b border-white/5 last:border-0">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const ProjectHero = () => {
  return (
    <section className="pt-40 pb-20 px-6 bg-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 animate-fade-in-up">
        <Badge>Recent Projects</Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Elevating Brands <br/>
          <span className="text-[#787878]">to Drive Success and Impact</span>
        </h1>
        
        <div className="pt-4">
          <Button variant="secondary" href="#contact">
            Contact Now
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, image, link }) => (
  <a href={link} className="group relative block w-full bg-[#111] rounded-[20px] p-0 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
    {/* Image Container */}
    <div className="aspect-[4/3] w-full overflow-hidden rounded-[8px] m-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    
    {/* Floating Icon */}
    <div className="absolute bottom-6 left-6 w-12 h-12 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300 z-10">
      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
    </div>

    {/* Overlay Content (Optional based on design, but good for UX) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pl-20">
      <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{title}</h3>
      <p className="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{category}</p>
    </div>
  </a>
);

const ProjectsGrid = () => {
  const projects = [
    { title: "Atomai", category: "AI Integration Platform", img: "https://framerusercontent.com/images/MOWvK2SZ1VX1XxKpWbMsodpDQjA.png", link: "#" },
    { title: "Polo", category: "Portfolio Template", img: "https://framerusercontent.com/images/lI8guMdEAZPO393np5alz6vOES8.png?scale-down-to=2048", link: "#" },
    { title: "Lio", category: "SaaS Dashboard", img: "https://framerusercontent.com/images/IgQlEJAv5wk5JwCItJr3Hs0HKNc.png?scale-down-to=2048", link: "#" },
    { title: "Fade", category: "Digital Agency", img: "https://framerusercontent.com/images/UEBCw4blSsdPGjv05eqabw2hpw.png", link: "#" },
    { title: "Lanx", category: "Architecture Firm", img: "https://framerusercontent.com/images/Sx3mO6Fcl2SvU8ozvOnNfUEzORk.png", link: "#" },
    { title: "Waitlist", category: "Coming Soon Page", img: "https://framerusercontent.com/images/xObSEs9fPUzoHCCUB6kN2xWOY.png?scale-down-to=2048", link: "#" }
  ];

  return (
    <Section className="pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <div key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
            <ProjectCard 
              title={project.title} 
              category={project.category} 
              image={project.img} 
              link={project.link}
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

const CTASection = () => {
  return (
    <Section className="pb-0">
      <div className="bg-[#0d0d0d] rounded-[3rem] border border-white/10 overflow-hidden relative">
        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center p-8 md:p-16 gap-16">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start gap-8 z-10">
            <Badge>Let's Connect</Badge>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
              Let's Grow <span className="text-gray-600">Together.</span>
            </h2>

            {/* Pricing List */}
            <div className="w-full space-y-6 mt-4">
              <div className="group border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h4 className="text-xl font-bold text-white">Web Design</h4>
                  <span className="px-3 py-1 rounded-full border border-white/10 text-white text-xs bg-[#222]">Starting from $1,999</span>
                </div>
                <p className="text-gray-500 text-sm">Showcasing sleek, high-performance designs tailored for impact.</p>
              </div>

              <div className="group border-t border-white/10 pt-6 border-b pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h4 className="text-xl font-bold text-white">Framer Development</h4>
                  <span className="px-3 py-1 rounded-full border border-white/10 text-white text-xs bg-[#222]">Starting from $4,999</span>
                </div>
                <p className="text-gray-500 text-sm">Building visually stunning, user-focused websites that elevate brands.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
              <Button variant="dark" href="/projects">See All Projects</Button>
              <Button variant="secondary" href="#contact">Get Started Now</Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full lg:h-full relative group">
            <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#111] aspect-[4/3] lg:aspect-auto lg:h-[500px]">
              <img 
                src="https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png?scale-down-to=2048" 
                alt="Growth" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="space-y-4">
          <a href="/" className="text-2xl font-bold text-white">POLO.</a>
          <div className="flex flex-col gap-2 mt-4">
            {['Services', 'Projects', 'Profile', 'Reviews', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-white transition-colors w-max">
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="p-4 bg-[#111] rounded-full text-white border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110"><Twitter size={20}/></a>
          <a href="#" className="p-4 bg-[#111] rounded-full text-white border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110"><Instagram size={20}/></a>
          <a href="#" className="p-4 bg-[#111] rounded-full text-white border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110"><Facebook size={20}/></a>
          <a href="#" className="p-4 bg-[#111] rounded-full text-white border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110"><Dribbble size={20}/></a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 Polo. All rights reserved.</p>
        <p>Made by <span className="text-white cursor-pointer hover:underline">Framebase</span>. Built in <span className="text-white cursor-pointer hover:underline">React</span>.</p>
      </div>
    </footer>
  );
};

/* --- 3. Main Page Layout --- */

export default function ProjectsPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      <Navbar />
      <ProjectHero />
      <ProjectsGrid />
      <CTASection />
      <Footer />
    </div>
  );
}
