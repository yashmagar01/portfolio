import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { socialLinks } from '../../data/projects'
import { Github, Linkedin, Twitter } from 'lucide-react'
import './Contact.css'

function Contact() {
  const formRef = useRef()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // EmailJS configuration - Replace with your actual keys
    // Get these from https://www.emailjs.com/
    const serviceId = 'YOUR_SERVICE_ID'
    const templateId = 'YOUR_TEMPLATE_ID'
    const publicKey = 'YOUR_PUBLIC_KEY'

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus('success')
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or email directly.')
    }
  }

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

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="container">
          <motion.div 
            className="contact-hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-label" variants={itemVariants}>
              Contact
            </motion.span>
            <motion.h1 className="contact-hero__title" variants={itemVariants}>
              Let's Work Together
            </motion.h1>
            <motion.p className="contact-hero__description" variants={itemVariants}>
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Fill out the form below or reach out through any of my social channels.
            </motion.p>
          </motion.div>
        </div>

        {/* Background */}
        <div className="contact-hero__bg">
          <div className="contact-hero__gradient" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="name" className="contact-form__label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="contact-form__input"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="email" className="contact-form__label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="contact-form__input"
                    />
                  </div>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="subject" className="contact-form__label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message" className="contact-form__label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows="6"
                    className="contact-form__textarea"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="contact-form__submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader className="spinner" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    className="contact-form__status contact-form__status--success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    className="contact-form__status contact-form__status--error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="contact-info__card">
                <h3 className="contact-info__title">Get in Touch</h3>
                <p className="contact-info__text">
                  Feel free to reach out anytime. I'm always open to discussing 
                  new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="contact-info__items">
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="contact-info__label">Email</span>
                      <a href="mailto:yash@example.com" className="contact-info__value">
                        yash@example.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="contact-info__label">Location</span>
                      <span className="contact-info__value">Available Worldwide</span>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="contact-info__label">Availability</span>
                      <span className="contact-info__value">Open to new projects</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="contact-info__social">
                  <h4 className="contact-info__social-title">Follow Me</h4>
                  <div className="contact-info__social-links">
                    {socialLinks.map((social) => {
                      const Icon = iconMap[social.icon]
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-info__social-link"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.name}
                        >
                          <Icon size={20} />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
