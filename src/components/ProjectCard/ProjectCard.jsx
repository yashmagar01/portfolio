import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import './ProjectCard.css'

function ProjectCard({ project, index = 0 }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.article
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link to={`/projects/${project.slug}`} className="project-card__link">
        {/* Image Container */}
        <div className="project-card__image-container">
          <div 
            className="project-card__image"
            style={{ 
              backgroundColor: project.color || 'var(--color-bg-card)',
              backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!project.thumbnail && (
              <span className="project-card__placeholder">
                {project.title.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="project-card__overlay">
            <span className="project-card__view">View Project</span>
          </div>
        </div>

        {/* Content Below Image */}
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">{project.title}</h3>
            <div className="project-card__arrow">
              <ArrowUpRight size={20} />
            </div>
          </div>
          
          <div className="project-card__tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default ProjectCard
