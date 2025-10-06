import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import person1 from '../assets/images/person-01.jpeg'
import person2 from '../assets/images/person-02.jpeg'
import person3 from '../assets/images/person-03.jpeg'
import person4 from '../assets/images/person-04.jpeg'
import './Testimonial.css'

const Testimonial = () => {
  const testimonials = [
  {
    id: 0,
    name: 'Amanda J.',
    quote:
      'Hyper Forte Solution has been outstanding with their Rentals & Hires service. The equipment is always reliable, well-maintained, and delivered right on schedule. It has truly streamlined our projects.',
    book: 'RENTALS & HIRES',
    image: person1,
  },
  {
    id: 1,
    name: 'Robert L.',
    quote:
      'With Hyper Forte Solution’s Transportation & Haulage, we’ve never had to worry about delays. Their fleet is efficient, and the team provides excellent updates every step of the way.',
    book: 'TRANSPORTATION & HAULAGE',
    image: person3,
  },
  {
    id: 2,
    name: 'Nana M.',
    quote:
      'The Services Technology Tools from Hyper Forte Solution have transformed how we operate. Everything is user-friendly, innovative, and backed by a support team that truly cares about our success.',
    book: 'SERVICES TECHNOLOGY TOOLS',
    image: person4,
  },
  {
    id: 3,
    name: 'Aadhya D.',
    quote:
      'Hyper Forte Solution’s Warehousing service is second to none. Secure, well-organized, and always accessible, it gives us confidence that our goods are in safe hands.',
    book: 'WAREHOUSING',
    image: person2, 
  },
];




  const [index, setIndex] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * testimonials.length)
    
    // Prevent immediate repeat
    setIndex((prev) => {
      while (randomIndex === prev) {
        randomIndex = Math.floor(Math.random() * testimonials.length)
      }
      return randomIndex
    })
  }, 8000)

  return () => clearInterval(interval)
}, [])

  return <div className='testimonial-section-container'>
    <div className='label'>Testimonials</div>
    <div className='testimonial-section'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={testimonials[index].id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className='quote-box'
          >
            <div className='quote-author-image'>
              <img src={testimonials[index].image} alt="" />
              <div className='quote-author'>{testimonials[index].name}</div>
            </div>
            <div className='quote-text'>{testimonials[index].quote}</div>
            <div className='quote-book'>{testimonials[index].book}</div>
          </motion.div>
        </AnimatePresence>
    </div>
  </div>
}

export default Testimonial