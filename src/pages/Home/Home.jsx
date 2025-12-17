import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Github, Twitter, Instagram, Dribbble } from 'lucide-react';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#111111b3]' : 'bg-[#111111b3] backdrop-blur-xl'
      } border border-white/10 rounded-full w-[95%] max-w-[840px]`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* Logo */}
          <a href="#hero" className="flex-shrink-0">
            <div className="w-20 h-10 relative">
              <span className="text-xl font-bold">POLO</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/90 hover:text-white transition-colors text-base">
              Why Us
            </a>
            <a href="#projects" className="text-white/90 hover:text-white transition-colors text-base">
              Projects
            </a>
            <a href="#team" className="text-white/90 hover:text-white transition-colors text-base">
              Team
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors text-base">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <a 
            href="https://framer.link/rioO8iI"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-b from-[#0a0a0a] to-white/10 border border-white/10 hover:border-white/20 transition-all shadow-inner"
          >
            <span className="text-sm">Join Us</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 px-6 space-y-3">
            <a href="#services" className="block py-2 text-white/90 hover:text-white transition-colors">
              Why Us
            </a>
            <a href="#projects" className="block py-2 text-white/90 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#team" className="block py-2 text-white/90 hover:text-white transition-colors">
              Team
            </a>
            <a href="#contact" className="block py-2 text-white/90 hover:text-white transition-colors">
              Contact
            </a>
            <a 
              href="https://framer.link/rioO8iI"
              className="block w-full text-center py-3 px-6 rounded-full bg-gradient-to-b from-[#0a0a0a] to-white/10 border border-white/10"
            >
              Join Us
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-10 pt-32 pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-white/20 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#111] shadow-2xl border border-white/5">
              <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
              </div>
              <span className="text-sm text-white/90">Vibe Coder</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal mb-6 tracking-tight animate-fade-in-up">
              yash magar
            </h1>
            
            {/* Floating Profile Badge */}
            <a 
              href="#profile"
              className="hidden lg:inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0a] shadow-inner border border-white/10 hover:scale-110 transition-transform -rotate-[35deg]"
            >
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          {/* Description */}
          <div className="max-w-[600px] mx-auto text-center mb-8">
            <p className="text-base md:text-lg text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
              I'm a problem-solving coder with a knack for crafting clean, impactful solutions to boost your projects.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
            <a 
              href="#projects"
              className="px-8 py-4 rounded-full bg-gradient-to-b from-gray-500/30 to-[#0a0a0a] text-white hover:from-gray-500/40 transition-all"
            >
              See All Projects
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-b from-white to-gray-400 text-black hover:from-gray-100 transition-all"
            >
              Contact Now
            </a>
          </div>

          {/* Testimonial Cards */}
          <div className="hidden lg:block absolute top-12 right-[310px] max-w-[209px] -rotate-[14deg]">
            <div className="bg-[#111] rounded-xl p-6 shadow-2xl border border-white/5">
              <p className="text-sm mb-3">" Working with him was a game changer! "</p>
              <p className="text-xs text-white/50 text-right">-Tejas</p>
            </div>
          </div>

          <div className="hidden lg:block absolute top-[178px] right-5 max-w-[209px] rotate-[6deg]">
            <div className="bg-[#111] rounded-xl p-6 shadow-2xl border border-white/5">
              <p className="text-sm mb-3">"Provide Extra Ordinary Results"</p>
              <p className="text-xs text-white/50 text-right">Vijay</p>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-[1400px] mx-auto mt-16">
            {/* Project 1 */}
            <div className="space-y-6">
              <ProjectCard
                title="AtomAI"
                image="https://framerusercontent.com/images/MOWvK2SZ1VX1XxKpWbMsodpDQjA.png"
                href="/projects/atomai"
              />
              <ProjectCard
                title="Polo"
                image="https://framerusercontent.com/images/lI8guMdEAZPO393np5alz6vOES8.png"
                href="/projects/polo"
              />
            </div>

            {/* Project 2 */}
            <div className="hidden md:block space-y-6">
              <ProjectCard
                title="Fade"
                image="https://framerusercontent.com/images/UEBCw4blSsdPGjv05eqabw2hpw.png"
                href="/projects/fade"
              />
              <ProjectCard
                title="Lio"
                image="https://framerusercontent.com/images/IgQlEJAv5wk5JwCItJr3Hs0HKNc.png"
                href="/projects/lio"
              />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <a 
            href="#profile"
            className="flex items-center justify-center w-12 h-12 mx-auto mt-16 rounded-full bg-gradient-to-b from-gray-400/20 to-transparent border border-white/10 hover:scale-110 transition-transform"
          >
            <ArrowRight className="w-5 h-5 rotate-90" />
          </a>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="relative px-4 md:px-10 py-24 bg-[#0d0d0d] rounded-t-[48px]">
        <div className="max-w-[1100px] mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#111] shadow-2xl border border-white/5">
              <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
              </div>
              <span className="text-sm text-white/90">Expert at Problem Solving</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight">
              yash magar, Your Developer
            </h2>
            <p className="text-lg text-white/90 max-w-[600px] mx-auto">
              Brief initial presentation of myself and my previous experiences.
            </p>
          </div>

          {/* Profile Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Profile Card */}
            <div className="bg-[#111] rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5">
              {/* Profile Image */}
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-[3/4]">
                <img 
                  src="https://framerusercontent.com/images/W0jo6W7grfD8qR5NCTiaBrtieQ.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Available Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-lg bg-black/50">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs">Available for work</span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Hey, I'm Yash Magar</h3>
                  <p className="text-white/70">Developer & AI Enthusiast from Latur, Maharashtra</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 py-4 border-y border-white/10">
                  <SocialLink href="https://x.com/home" icon={<Twitter size={20} />} />
                  <div className="w-px h-6 bg-white/10" />
                  <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
                  <div className="w-px h-6 bg-white/10" />
                  <SocialLink href="https://dribbble.com" icon={<Dribbble size={20} />} />
                </div>

                <a 
                  href="#contact"
                  className="block w-full text-center px-8 py-4 rounded-full bg-gradient-to-b from-gray-500/30 to-[#0a0a0a] text-white hover:from-gray-500/40 transition-all"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* About & Skills */}
            <div className="space-y-8">
              {/* About */}
              <div>
                <p className="text-white/70 leading-relaxed">
                  I'm Yash Magar, a passionate coder from Latur, Maharashtra, currently pursuing a Diploma in Computer Engineering at Government Polytechnic Awasari. I thrive on turning tough problems into clean, reliable code—and I've already brought my ideas to life through personal projects and my startup, College Sahayak.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <SkillBadge text="Product Design" />
                  <SkillBadge text="Web development" />
                  <SkillBadge text="AI Enthusiast" />
                  <SkillBadge text="App Development" />
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Experience */}
              <div className="space-y-3">
                <ExperienceItem 
                  role="Freelance"
                  company="Self Lead"
                  year="2024"
                />
                <ExperienceItem 
                  role="Web Development"
                  company="College Sahayk"
                  year="2024"
                />
                <ExperienceItem 
                  role="App Development"
                  company="Jijamata App"
                  year="2025"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative px-4 md:px-10 py-24 bg-[#0d0d0d]">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="flex-1 max-w-[720px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#111] shadow-2xl border border-white/5 mb-6">
                <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
                </div>
                <span className="text-sm text-white/90">Development services</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight">
                Development Services
              </h2>
              <p className="text-lg text-white/90">
                Explore a suite of tech services to power your projects and drive real results.
              </p>
            </div>

            <a 
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-b from-white to-gray-400 text-black hover:from-gray-100 transition-all"
            >
              Contact Now
            </a>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Service 1 - Large */}
            <ServiceCard
              title="Website Design"
              description="Crafting responsive, user-centric websites with clean HTML, CSS & JavaScript—optimized for performance and growth."
              image="https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png"
              large
            />

            {/* Right Column */}
            <div className="space-y-6">
              <ServiceCard
                title="AI Agents"
                description="Designing and deploying intelligent AI agents to automate workflows, analyze data, and supercharge your projects."
              />
              <ServiceCard
                title="Video Editing"
                description="Transforming raw footage into polished, engaging videos with seamless cuts, transitions and sound design."
              />
              <ServiceCard
                title="App Development"
                description="Building scalable, cross-platform mobile apps in React Native—delivering smooth, reliable experiences on every device."
                hasCarousel
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative px-4 md:px-10 py-24 bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-[1300px] mx-auto bg-[#0d0d0d] rounded-[48px] border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#111] shadow-2xl border border-white/5">
                <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
                </div>
                <span className="text-sm text-white/90">Let's Connect</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                Let's Grow <span className="text-white/60">Together</span>
              </h2>

              {/* Pricing Info */}
              <div className="space-y-4">
                <div className="h-px bg-white/10" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold">Web Design</h5>
                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs">
                      Starting from $1,999
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    Showcasing sleek, high-performance designs tailored for impact
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold">Framer Development</h5>
                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs">
                      Starting from $4,999
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    Building visually stunning, user-focused websites that elevate brands.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects"
                  className="px-8 py-4 rounded-full bg-gradient-to-b from-gray-500/30 to-[#0a0a0a] text-white hover:from-gray-500/40 transition-all"
                >
                  See All Projects
                </a>
                <a 
                  href="https://framer.link/rioO8iI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-gradient-to-b from-white to-gray-400 text-black hover:from-gray-100 transition-all"
                >
                  Get Started Now
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:p-6">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://framerusercontent.com/images/IwwlXF60xjgLFBH3Sj6kzl9eXs.png"
                  alt="Service preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-10 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-12">
            {/* Logo & Links */}
            <div className="space-y-8">
              <div className="w-20 h-10">
                <span className="text-xl font-bold">POLO</span>
              </div>
              
              <nav className="flex flex-wrap gap-x-8 gap-y-4">
                <a href="#services" className="text-white/90 hover:text-white transition-colors">Services</a>
                <a href="#projects" className="text-white/90 hover:text-white transition-colors">Projects</a>
                <a href="#profile" className="text-white/90 hover:text-white transition-colors">Profile</a>
                <a href="#reviews" className="text-white/90 hover:text-white transition-colors">Reviews</a>
                <a href="#contact" className="text-white/90 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <SocialLink href="https://x.com/home" icon={<Twitter size={20} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
              <SocialLink href="https://github.com" icon={<Github size={20} />} />
              <SocialLink href="https://dribbble.com" icon={<Dribbble size={20} />} />
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-8 border-t border-white/10 text-sm text-white/60">
            <p>© 2025 Polo</p>
            <div className="flex gap-4">
              <p>Made by <a href="https://x.com/framebase_" target="_blank" rel="noopener" className="text-white hover:underline">Framebase</a></p>
              <p>Built in <a href="https://framer.link/framebase" target="_blank" rel="noopener" className="text-white hover:underline">Framer</a></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a 
        href="https://framer.link/rioO8iI"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-5 px-4 py-3 rounded-xl bg-white text-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 z-50"
      >
        <span className="text-sm font-semibold">Edit template (Free)</span>
      </a>
    </div>
  );
};

// Helper Components
const ProjectCard = ({ title, image, href }) => (
  <a 
    href={href}
    className="group relative block bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/5 hover:border-white/10 transition-all"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] shadow-inner border border-white/10 group-hover:rotate-45 transition-transform">
      <ArrowRight className="w-5 h-5" />
    </div>
  </a>
);

const SocialLink = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0a0a0a] hover:bg-white/5 transition-colors"
  >
    {icon}
  </a>
);

const SkillBadge = ({ text }) => (
  <span className="px-4 py-2 rounded-lg bg-[#0a0a0a] text-white/80 text-sm border border-white/5">
    {text}
  </span>
);

const ExperienceItem = ({ role, company, year }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-[#0d0d0d] shadow-xl border border-white/5">
    <div className="flex-1">
      <p className="font-medium">{role}</p>
    </div>
    <div className="flex-1 text-center">
      <p className="text-white/70">{company}</p>
    </div>
    <div className="flex-1 text-right">
      <p className="text-white/70">{year}</p>
    </div>
  </div>
);

const ServiceCard = ({ title, description, image, large, hasCarousel }) => (
  <div className={`bg-[#111] rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5 space-y-6 ${large ? 'lg:row-span-2' : ''}`}>
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-white/10 rounded" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-white/70 leading-relaxed">{description}</p>
    {(large || hasCarousel) && image && (
      <div className="rounded-xl overflow-hidden shadow-2xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
  </div>
);

export default Home;
