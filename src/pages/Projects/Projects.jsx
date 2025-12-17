import { motion } from 'framer-motion'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'
import './Projects.css'

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.div 
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Header */}
      <section className="projects-hero">
        <div className="container">
          <motion.div 
            className="projects-hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-label" variants={headerVariants}>
              Portfolio
            </motion.span>
            <motion.h1 className="projects-hero__title" variants={headerVariants}>
              My Projects
            </motion.h1>
            <motion.p className="projects-hero__description" variants={headerVariants}>
              A collection of my work spanning web development, AI integration, 
              and creative problem-solving. Each project represents a unique challenge 
              and an opportunity to push boundaries.
            </motion.p>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="projects-hero__bg">
          <div className="projects-hero__gradient" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Projects
