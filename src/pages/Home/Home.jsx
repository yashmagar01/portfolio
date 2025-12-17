import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Code, Database, Layout, Smartphone, Globe, Cpu } from 'lucide-react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'
import './Home.css'

function Home() {
  const featuredProjects = projects.slice(0, 4)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const services = [
    {
      title: 'Frontend Dev',
      description: 'Building responsive, pixel-perfect user interfaces with React, Tailwind, and Framer Motion.',
      icon: Layout
    },
    {
      title: 'Backend Systems',
      description: 'Robust server-side architecture using Node.js, Python, and scalable databases.',
      icon: Database
    },
    {
      title: 'AI Integration',
      description: 'Leveraging LLMs and machine learning to build intelligent, adaptive applications.',
      icon: Cpu
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <motion.div 
              className="hero__content"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={fadeInUp} className="hero__badge">
                <span className="hero__badge-dot"></span>
                Available for work
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="hero__title">
                Creative <br />
                <span className="text-muted">Developer.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="hero__description">
                I'm Yash Magar, a full-stack developer passionate about building 
                digital products that merge design with robust engineering.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="hero__actions">
                <Link to="/contact" className="btn btn-primary">
                  Start a project
                </Link>
                <Link to="/projects" className="btn btn-secondary">
                  View Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual / Stat Card */}
            <motion.div 
              className="hero__visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="stat-card-display">
                <div className="stat-card-display__content">
                  <span className="stat-card-display__number">6+</span>
                  <span className="stat-card-display__label">Successful <br/>Projects</span>
                </div>
                <div className="stat-card-display__decorator"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What I Do</h2>
            <p className="section-subtitle">Comprehensive solutions for digital challenges</p>
          </motion.div>

          <div className="services__grid">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="service-card__icon">
                  <service.icon size={24} />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured section">
        <div className="container">
          <div className="section-header-row">
            <h2 className="section-title">Selected Work</h2>
            <Link to="/projects" className="link-arrow">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About / Team Section Equivalent */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-preview__card">
            <div className="about-preview__content">
              <h2 className="about-preview__title">Let's build something meaningful.</h2>
              <p className="about-preview__text">
                I believe in technology's power to solve real problems. Whether it's a 
                complex web platform or an AI-driven tool, I bring dedication and 
                technical expertise to every project.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
            </div>
            <div className="about-preview__image">
               {/* Placeholder for dev image or abstract graphic */}
               <div className="about-preview__placeholder">
                  <span>YM</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
