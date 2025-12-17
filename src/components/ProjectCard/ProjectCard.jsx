import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import './ProjectCard.css'

function ProjectCard({ project, index = 0 }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  const arrowVariants = {
    rest: { x: 0, y: 0, opacity: 0 },
    hover: { 
      x: 4, 
      y: -4, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.article
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
    >
      <Link to={`/projects/${project.slug}`} className="project-card__link">
        {/* Image Container */}
        <div className="project-card__image-container">
          <motion.div 
            className="project-card__image-wrapper"
            variants={imageVariants}
          >
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
          </motion.div>
          
          {/* Hover Overlay */}
          <motion.div 
            className="project-card__overlay"
            variants={overlayVariants}
          >
            <div className="project-card__overlay-content">
              <span className="project-card__view">
                View Project
                <motion.span variants={arrowVariants}>
                  <ArrowUpRight size={18} />
                </motion.span>
              </span>
            </div>
          </motion.div>

          {/* Arrow Icon */}
          <motion.div 
            className="project-card__arrow"
            variants={arrowVariants}
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">{project.title}</h3>
            <span className="project-card__category">{project.category}</span>
          </div>
          
          <p className="project-card__subtitle">{project.subtitle}</p>
          
          {/* Tags */}
          <div className="project-card__tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="project-card__tag project-card__tag--more">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default ProjectCard
