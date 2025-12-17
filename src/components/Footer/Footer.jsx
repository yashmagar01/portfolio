import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { navLinks, socialLinks } from '../../data/projects'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const iconMap = {
    Github: Github,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Mail: Mail
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.footer 
      className="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="footer__container">
        <div className="footer__top">
          {/* Logo & Description */}
          <motion.div className="footer__brand" variants={itemVariants}>
            <Link to="/" className="footer__logo">
              Yash
            </Link>
            <p className="footer__description">
              Crafting digital experiences with precision and creativity. 
              Let's build something amazing together.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="footer__nav" variants={itemVariants}>
            <h4 className="footer__heading">Navigation</h4>
            <ul className="footer__links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer__link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="footer__social-section" variants={itemVariants}>
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__social">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div className="footer__cta" variants={itemVariants}>
            <h4 className="footer__heading">Let's Work Together</h4>
            <Link to="/contact" className="footer__cta-button">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <motion.div className="footer__divider" variants={itemVariants} />

        <motion.div className="footer__bottom" variants={itemVariants}>
          <p className="footer__copyright">
            © {currentYear} Yash Magar. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed & Built with ❤️
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
