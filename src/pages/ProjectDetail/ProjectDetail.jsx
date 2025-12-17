import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Calendar, Folder } from 'lucide-react'
import { projects } from '../../data/projects'
import './ProjectDetail.css'

function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  // Get next and previous projects
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <motion.div 
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <section className="project-detail__header">
        <div className="container">
          <motion.button 
            className="project-detail__back"
            onClick={() => navigate('/projects')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </motion.button>

          <motion.div 
            className="project-detail__intro"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="project-detail__meta" variants={itemVariants}>
              <span className="project-detail__category">
                <Folder size={14} />
                {project.category}
              </span>
              <span className="project-detail__year">
                <Calendar size={14} />
                {project.year}
              </span>
            </motion.div>

            <motion.h1 className="project-detail__title" variants={itemVariants}>
              {project.title}
            </motion.h1>

            <motion.p className="project-detail__subtitle" variants={itemVariants}>
              {project.subtitle}
            </motion.p>

            <motion.div className="project-detail__links" variants={itemVariants}>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__link project-detail__link--primary"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Live
                    <ExternalLink size={16} />
                  </motion.span>
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__link project-detail__link--secondary"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={16} />
                    View Code
                  </motion.span>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Background */}
        <div className="project-detail__bg">
          <div 
            className="project-detail__gradient"
            style={{ background: `radial-gradient(ellipse at center, ${project.color}25 0%, transparent 70%)` }}
          />
        </div>
      </section>

      {/* Hero Image */}
      <section className="project-detail__hero-image">
        <div className="container">
          <motion.div 
            className="project-detail__image-wrapper"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div 
              className="project-detail__image"
              style={{ 
                backgroundColor: project.color || 'var(--color-bg-card)',
                backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!project.thumbnail && (
                <span className="project-detail__placeholder">
                  {project.title}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="project-detail__content">
        <div className="container">
          <div className="project-detail__grid">
            {/* Main Content */}
            <motion.div 
              className="project-detail__main"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="project-detail__section-title">About the Project</h2>
              <p className="project-detail__description">{project.description}</p>
              
              <p className="project-detail__description">
                This project showcases modern development practices and attention to detail. 
                From initial concept to final deployment, every aspect was carefully considered 
                to deliver an exceptional user experience.
              </p>
            </motion.div>

            {/* Sidebar */}
            <motion.aside 
              className="project-detail__sidebar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="project-detail__info-card">
                <h3 className="project-detail__info-title">Technologies</h3>
                <div className="project-detail__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-detail__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-detail__info-card">
                <h3 className="project-detail__info-title">Project Type</h3>
                <p className="project-detail__info-value">{project.category}</p>
              </div>

              <div className="project-detail__info-card">
                <h3 className="project-detail__info-title">Year</h3>
                <p className="project-detail__info-value">{project.year}</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="project-detail__nav">
        <div className="container">
          <div className="project-detail__nav-grid">
            {prevProject ? (
              <Link 
                to={`/projects/${prevProject.slug}`}
                className="project-detail__nav-link project-detail__nav-link--prev"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="project-detail__nav-label">
                    <ArrowLeft size={16} />
                    Previous Project
                  </span>
                  <span className="project-detail__nav-title">{prevProject.title}</span>
                </motion.div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link 
                to={`/projects/${nextProject.slug}`}
                className="project-detail__nav-link project-detail__nav-link--next"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="project-detail__nav-label">
                    Next Project
                    <ArrowUpRight size={16} />
                  </span>
                  <span className="project-detail__nav-title">{nextProject.title}</span>
                </motion.div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ProjectDetail
