import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import arrow_forward from '../assets/icons/arrow_forward.png'
import './HeroTitle.css'

const HeroTitle = () => {
  const [index, setIndex] = useState(0)
  const quoteDataSet = [
    {
      id: 0,
      tag: 'Innovative solutions for outsourced services',
      title_1: 'Explore Our 3PL Services',
    },
    {
      id: 1,
      tag: 'Full Service Warehousing & Fulfillment',
      title_1: 'Our company offers Logistics Services',
    },
    {
      id: 2,
      tag: 'Outsourcing services with excellence.',
      title_1: 'Safety for all courier & packages',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * quoteDataSet.length)
      setIndex((prev) => {
        while (randomIndex === prev) {
          randomIndex = Math.floor(Math.random() * quoteDataSet.length)
        }
        return randomIndex
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='animation-container'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={quoteDataSet[index].id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='quote-box'
        >
          <div className='animation-content'>
            <div className='animation-tag'>{quoteDataSet[index].tag}</div>
            <h1 className='animation-title_1'>{quoteDataSet[index].title_1}</h1>
            <div className='animation-info'>We offer you a one-of-a-kind outsourcing support for hiring, freights, logistics and exports.</div>
            <Link to='https://wa.me/2349021463046' target='_blank'>
              <div className='tack-button-container'>
                  <div>Request a FREE Quote</div>
                  <img src={arrow_forward} alt="" />
              </div>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroTitle
