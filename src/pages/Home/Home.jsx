import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Play, Star, CheckCircle, 
  Instagram, Twitter, Facebook, Dribbble, Globe, 
  Smartphone, Video, Cpu, Code
} from 'lucide-react';

/* --- Shared Components --- */

const Section = ({ id, className, children }) => (
  <section id={id} className={`relative w-full px-6 py-20 md:py-32 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md ${className}`}>
    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
    <span className="text-sm font-medium text-gray-200 tracking-wide">{children}</span>
  </div>
);

const Button = ({ children, variant = 'primary', href = '#', className, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95",
    secondary: "bg-[#1a1a1a] text-white border border-white/10 hover:border-white/20 hover:bg-[#222]",
    outline: "border border-white/20 text-white hover:bg-white/10"
  };

  return (
    <a href={href} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </a>
  );
};

/* --- Sub-Components --- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">
          POLO<span className="text-blue-500">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 bg-[#111] px-8 py-3 rounded-full border border-white/10">
          {['Services', 'Projects', 'Profile', 'Team'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:inline-flex px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
            Join Us
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden p-6 flex flex-col gap-4">
          {['Services', 'Projects', 'Profile', 'Team', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg text-gray-300 hover:text-white py-2">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/9694443/9694443-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl px-6">
        <Badge>Ready to Collaborate</Badge>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]">
          Building digital <span className="text-gray-500">products, brands, and experiences.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
          A 20-year-old software developer and designer from Pune, Maharashtra. 
          Specializing in creating modern web experiences using React and Tailwind.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button variant="secondary" href="#projects" icon={ArrowRight}>See All Projects</Button>
          <Button variant="primary" href="#contact">Contact Me</Button>
        </div>
      </div>
      
      {/* Decorative Gradient Line at Bottom */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  );
};

const Profile = () => {
  return (
    <Section id="profile">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#111] p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
        {/* Image */}
        <div className="relative aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden group">
          <img 
            src="https://framerusercontent.com/images/W0jo6W7grfD8qR5NCTiaBrtieQ.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-white uppercase tracking-wider">Available for work</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Hey, I'm Yash Magar</h2>
            <p className="text-xl text-gray-400">
              Aspiring Data Scientist, Designer, and Writer. <br />
              Developer & AI Enthusiast from Latur, Maharashtra.
            </p>
          </div>
          
          <div className="flex gap-4">
            {[Twitter, Instagram, Dribbble].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#222] text-white hover:bg-white hover:text-black transition-colors border border-white/5">
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-col gap-4">
            {['Freelance', 'Self Lead', '2024'].map((item, i) => (
              <div key={i} className="flex justify-between text-gray-400 border-b border-white/5 pb-4 last:border-0">
                <span>{i === 0 ? 'Role' : i === 1 ? 'Type' : 'Year'}</span>
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const Services = () => {
  const services = [
    { title: "Website Design", desc: "Crafting responsive, user-centric websites optimized for growth.", icon: Globe, img: "https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png" },
    { title: "AI Agents", desc: "Deploying intelligent AI agents to automate workflows.", icon: Cpu, img: "https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png" }, // Reusing placeholder from source if unique not found
    { title: "Video Editing", desc: "Engaging videos with seamless cuts and sound design.", icon: Video, img: "https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png" },
    { title: "App Development", desc: "Scalable cross-platform mobile apps in React Native.", icon: Smartphone, img: "https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png" },
  ];

  return (
    <Section id="services">
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <Badge>Services</Badge>
        <h2 className="text-4xl md:text-6xl font-bold text-white">Helping brands thrive <br/><span className="text-gray-500">in the digital world.</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="group relative bg-[#111] rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all overflow-hidden">
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm max-w-[250px]">{service.desc}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <service.icon size={20} />
              </div>
            </div>
            
            {/* Image Container */}
            <div className="w-full h-48 rounded-xl overflow-hidden mt-8 relative z-10">
              <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50 pointer-events-none" />
          </div>
        ))}
      </div>
    </Section>
  );
};

const Projects = () => {
  return (
    <Section id="projects" className="bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <Badge className="mb-4">Selected Work</Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Featured Projects</h2>
        </div>
        <Button variant="outline" href="#projects">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto md:h-[600px]">
        {/* Project 1 - Large */}
        <div className="md:col-span-2 lg:col-span-2 bg-[#111] rounded-3xl overflow-hidden border border-white/5 relative group">
          <img src="https://framerusercontent.com/images/MOWvK2SZ1VX1XxKpWbMsodpDQjA.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Project 1"/>
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-2xl font-bold text-white">Atomai</h3>
            <p className="text-gray-400">AI Integration Platform</p>
          </div>
        </div>

        {/* Project 2 - Tall */}
        <div className="md:col-span-1 lg:col-span-1 bg-[#111] rounded-3xl overflow-hidden border border-white/5 relative group">
          <img src="https://framerusercontent.com/images/IgQlEJAv5wk5JwCItJr3Hs0HKNc.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Project 2"/>
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-2xl font-bold text-white">Jijamata App</h3>
            <p className="text-gray-400">Educational App</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Ticker = () => {
  // Simple CSS Keyframe animation for infinite scroll
  return (
    <div className="w-full py-20 overflow-hidden bg-black relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex gap-8 w-max animate-scroll">
        {[1, 2, 3, 1, 2, 3].map((item, i) => (
          <div key={i} className="w-[300px] h-[200px] md:w-[400px] md:h-[300px] bg-[#111] rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
             {/* Using placeholder images from the source logic */}
             <img src={`https://framerusercontent.com/images/qaXP9CBTkpCNVvyTQ6Uxc8kN5ts.png`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="Ticker item" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactCTA = () => {
  return (
    <Section id="contact">
      <div className="bg-[#111] rounded-[3rem] p-10 md:p-20 text-center border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <Badge>Let's Connect</Badge>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
            Let's Grow <span className="text-gray-600">Together.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-lg">
            Have a project in mind? Let's build something amazing.
          </p>
          <Button variant="primary" href="mailto:hello@example.com" className="bg-blue-600 text-white hover:bg-blue-700 border-none">
            Get Started Now
          </Button>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-white">POLO.</h2>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Projects</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
          </div>
        </div>

        <div className="flex gap-4">
          <a href="#" className="p-3 bg-[#111] rounded-full text-white hover:bg-blue-600 transition-colors"><Twitter size={18}/></a>
          <a href="#" className="p-3 bg-[#111] rounded-full text-white hover:bg-pink-600 transition-colors"><Instagram size={18}/></a>
          <a href="#" className="p-3 bg-[#111] rounded-full text-white hover:bg-blue-800 transition-colors"><Facebook size={18}/></a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>© 2025 Polo. All rights reserved.</p>
        <p>Made by <span className="text-white">Framebase</span>. Built in <span className="text-white">React</span>.</p>
      </div>
    </footer>
  );
};

/* --- Main Layout --- */

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <Profile />
      <Services />
      <Projects />
      <Ticker />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Home;
