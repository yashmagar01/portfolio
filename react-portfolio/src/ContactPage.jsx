import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Twitter, Instagram, 
  Dribbble, Facebook, Mail, MapPin, Phone 
} from 'lucide-react';

/* --- 1. Shared UI Components --- */

const Section = ({ id, className, children }) => (
  <section id={id} className={`relative w-full px-6 py-20 md:py-24 ${className || ''}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
    <span className="text-sm font-medium text-gray-200 tracking-wide uppercase">{children}</span>
  </div>
);

const Input = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600"
    />
  </div>
);

const Select = ({ label, options }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <div className="relative">
      <select className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-white/20 appearance-none cursor-pointer text-gray-400 focus:text-white transition-colors">
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  </div>
);

const Button = ({ children }) => (
  <button className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all active:scale-95 mt-4">
    {children}
    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
  </button>
);

/* --- 2. Page Components --- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/#profile' },
    { name: 'Contact', href: '/contact', current: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between p-2 pl-6 pr-2 rounded-full border transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
          <a href="/" className="text-xl font-bold text-white tracking-tighter">
            POLO<span className="text-blue-500">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-[#111] p-1.5 rounded-full border border-white/10">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${link.current ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex px-6 py-3 bg-[#1a1a1a] text-white border border-white/10 text-sm font-medium rounded-full hover:bg-[#222] transition-all">
              Let's Talk
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 rounded-full bg-[#111] text-white border border-white/10">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {links.map(link => (
          <a key={link.name} href={link.href} className="text-4xl font-bold text-gray-500 hover:text-white transition-colors">{link.name}</a>
        ))}
        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-6 p-4 text-white"><X size={32}/></button>
      </div>
    </nav>
  );
};

const ContactContent = () => {
  return (
    <div className="pt-40 pb-20 px-4 sm:px-6 min-h-screen bg-black relative overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Info */}
        <div className="flex-1 flex flex-col justify-between py-8 animate-fade-in-left">
          <div>
            <Badge>Contact</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Let's get in <br/> <span className="text-gray-500">touch.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-md leading-relaxed">
              Have a project in mind? We'd love to hear from you. Let's create something amazing together.
            </p>
          </div>

          <div className="flex flex-col gap-10 mt-16 lg:mt-0">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Details</h3>
              <div className="space-y-4">
                <a href="mailto:hello@polo.com" className="flex items-center gap-4 text-xl text-white hover:text-blue-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Mail size={20} />
                  </div>
                  hello@yashmagar.com
                </a>
                <a href="tel:+910000000000" className="flex items-center gap-4 text-xl text-white hover:text-blue-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Phone size={20} />
                  </div>
                  +91 98765 43210
                </a>
                <div className="flex items-center gap-4 text-xl text-white group">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin size={20} />
                  </div>
                  Pune, Maharashtra
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Follow Us</h3>
              <div className="flex gap-4">
                {[Twitter, Instagram, Dribbble, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full bg-[#111] border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-1">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 w-full lg:max-w-xl animate-fade-in-up delay-200">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            
            <form className="relative z-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Name" placeholder="John Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="Service" options={['Web Design', 'Development', 'SEO', 'Other']} />
                <Input label="Budget" placeholder="$1k - $5k" />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea 
                  rows="6" 
                  placeholder="Tell us about your project..." 
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <Button>Send Message</Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/10 pt-20 pb-8 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
      <div className="space-y-4 max-w-sm">
        <a href="/" className="text-2xl font-bold text-white">POLO.</a>
        <p className="text-gray-500">
          Crafting digital experiences with code and passion. Based in Pune, India.
        </p>
      </div>
      <div className="flex gap-16">
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold">Pages</h4>
          {['Home', 'Services', 'Projects', 'Contact'].map(link => (
            <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold">Socials</h4>
          {['Twitter', 'Instagram', 'LinkedIn'].map(link => (
            <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
      <p>© 2025 Polo. All rights reserved.</p>
      <p>Designed by Framebase.</p>
    </div>
  </footer>
);

/* --- 3. Main Export --- */

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <ContactContent />
      <Footer />
      
      {/* Global Styles for Font & Animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Satoshi:wght@500;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Satoshi', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-left { animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
