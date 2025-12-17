import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks } from '../../data/projects'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    }
  }

  return (
    <motion.nav 
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          Yash
        </Link>
        
        {/* Desktop Links - Centered */}
        <div className="navbar__center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.name}
              {link.name === 'Home' && <span className="active-dot" />}
            </NavLink>
          ))}
        </div>

        {/* Action Button - Right */}
        <div className="navbar__right">
          <Link to="/contact" className="navbar__cta">
            Let's Talk
          </Link>
          
          <button 
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar__mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="navbar__mobile-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="navbar__mobile-link"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="navbar__mobile-separator" />
                <Link to="/contact" className="navbar__mobile-cta">
                  Let's Talk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
