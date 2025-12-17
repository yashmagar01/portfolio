import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects, skills } from '../../data/projects'
import './Home.css'

function Home() {
  const featuredProjects = projects.filter(p => p.featured)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const heroTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__container">
          <motion.div 
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div className="hero__badge" variants={itemVariants}>
              <Sparkles size={16} />
              <span>Available for new projects</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 className="hero__title" variants={heroTextVariants}>
              <span className="hero__title-line">Hi, I'm</span>
              <span className="hero__title-name">Yash Magar</span>
            </motion.h1>

            {/* Description */}
            <motion.p className="hero__description" variants={itemVariants}>
              A passionate developer crafting digital experiences with precision and creativity. 
              I specialize in building modern web applications that are both beautiful and functional.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="hero__actions" variants={itemVariants}>
              <Link to="/projects" className="hero__btn hero__btn--primary">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View My Work
                  <ArrowUpRight size={18} />
                </motion.span>
              </Link>
              <Link to="/contact" className="hero__btn hero__btn--secondary">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.span>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="hero__scroll"
              variants={itemVariants}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={20} />
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="hero__bg">
          <div className="hero__gradient hero__gradient--1" />
          <div className="hero__gradient hero__gradient--2" />
          <div className="hero__grid" />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured section" id="projects">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle">
              A curated selection of my recent projects showcasing web development, 
              AI integration, and creative problem-solving.
            </p>
          </motion.div>

          <div className="featured__grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>

          <motion.div 
            className="featured__cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/projects" className="featured__link">
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                View All Projects
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills section" id="skills">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Expertise</span>
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-subtitle">
              Technologies and tools I use to bring ideas to life.
            </p>
          </motion.div>

          <motion.div 
            className="skills__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  transition: { duration: 0.2 }
                }}
              >
                <span className="skill-card__name">{skill.name}</span>
                <span className="skill-card__category">{skill.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section" id="about">
        <div className="container">
          <div className="about__grid">
            <motion.div 
              className="about__content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">About Me</span>
              <h2 className="section-title">Passionate about creating digital experiences</h2>
              <p className="about__text">
                I'm a developer with a keen eye for design and a passion for building 
                exceptional digital products. With experience in both frontend and backend 
                development, I bring ideas to life through clean code and thoughtful user experiences.
              </p>
              <p className="about__text">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or working on personal creative endeavors.
              </p>
              <Link to="/contact" className="about__link">
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Let's work together
                  <ArrowUpRight size={18} />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div 
              className="about__stats"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="stat-card">
                <span className="stat-card__number">6+</span>
                <span className="stat-card__label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__number">2+</span>
                <span className="stat-card__label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__number">12+</span>
                <span className="stat-card__label">Technologies</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <motion.div 
            className="cta__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta__title">Ready to start a project?</h2>
            <p className="cta__text">
              Let's collaborate and create something amazing together.
            </p>
            <Link to="/contact" className="cta__button">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
