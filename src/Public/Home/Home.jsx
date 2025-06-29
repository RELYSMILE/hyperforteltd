import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import spinner from '../../assets/spinner/spinner.gif'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import bg from '../../assets/bg/bg.png'
import wole from '../../assets/images/wole.avif'
import aristotle from '../../assets/images/aristotle.jpg'
import mandela from '../../assets/images/mandela.jpg'
import einstein from '../../assets/images/einstein.jpg'
import maya from '../../assets/images/maya.jpg'
import malala from '../../assets/images/malala.jpg'
import obama from '../../assets/images/obama.jpg'
import achebe from '../../assets/images/achebe.jpg'
import confucius from '../../assets/images/confucius.jpg'
import jobs from '../../assets/images/jobs.jpg'
import brene from '../../assets/images/brene.jpg'
import mlk from '../../assets/images/mlk.jpg'
import curie from '../../assets/images/curie.jpg'
import davinci from '../../assets/images/davinci.jpg'
import rosa from '../../assets/images/rosa.jpg'
import './Home.css'

const Home = () => {
  const [state, setState] = useState(false)
const quoteDataSet = [
  {
    id: 0,
    name: 'Wole Soyinka',
    qoute: 'The man dies in all who keep silent in the face of tyranny.',
    book: 'From his book “The Man Died"',
    image: wole,
  },
  {
    id: 1,
    name: 'Aristotle',
    qoute: 'Educating the mind without educating the heart is no education at all.',
    book: 'Classical Greek Philosophy',
    image: aristotle,
  },
  {
    id: 2,
    name: 'Nelson Mandela',
    qoute: 'Education is the most powerful weapon which you can use to change the world.',
    book: 'Speech in South Africa, 1990',
    image: mandela,
  },
  {
    id: 3,
    name: 'Albert Einstein',
    qoute: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.',
    book: 'Interview with The Saturday Evening Post, 1929',
    image: einstein,
  },
  {
    id: 4,
    name: 'Maya Angelou',
    qoute: 'You may not control all the events that happen to you, but you can decide not to be reduced by them.',
    book: 'Letter to My Daughter (2009)',
    image: maya,
  },
  {
    id: 5,
    name: 'Malala Yousafzai',
    qoute: 'One child, one teacher, one book, and one pen can change the world.',
    book: 'Nobel Peace Prize Speech, 2014',
    image: malala,
  },
  {
    id: 6,
    name: 'Barack Obama',
    qoute: 'Change will not come if we wait for some other person or some other time. We are the ones we’ve been waiting for.',
    book: 'Super Tuesday Speech, 2008',
    image: obama,
  },
  {
    id: 7,
    name: 'Chinua Achebe',
    qoute: 'Until the lions have their own historians, the history of the hunt will always glorify the hunter.',
    book: 'African Proverbs and Wisdom',
    image: achebe,
  },
  {
    id: 8,
    name: 'Confucius',
    qoute: 'It does not matter how slowly you go as long as you do not stop.',
    book: 'The Analects',
    image: confucius,
  },
  {
    id: 9,
    name: 'Steve Jobs',
    qoute: 'The people who are crazy enough to think they can change the world are the ones who do.',
    book: 'Apple’s “Think Different” Campaign',
    image: jobs,
  },
  {
    id: 10,
    name: 'Brené Brown',
    qoute: 'Vulnerability is the birthplace of innovation, creativity and change.',
    book: 'Daring Greatly',
    image: brene,
  },
  {
    id: 11,
    name: 'Dr. Martin Luther King Jr.',
    qoute: 'Injustice anywhere is a threat to justice everywhere.',
    book: 'Letter from Birmingham Jail',
    image: mlk,
  },
  {
    id: 12,
    name: 'Marie Curie',
    qoute: 'Nothing in life is to be feared, it is only to be understood.',
    book: 'Collected Writings',
    image: curie,
  },
  {
    id: 13,
    name: 'Leonardo da Vinci',
    qoute: 'Learning never exhausts the mind.',
    book: 'Notebooks of Leonardo da Vinci',
    image: davinci,
  },
  {
    id: 14,
    name: 'Rosa Parks',
    qoute: 'I have learned over the years that when one’s mind is made up, this diminishes fear.',
    book: 'Rosa Parks: My Story',
    image: rosa,
  }
]


  const [index, setIndex] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * quoteDataSet.length)
    
    // Prevent immediate repeat
    setIndex((prev) => {
      while (randomIndex === prev) {
        randomIndex = Math.floor(Math.random() * quoteDataSet.length)
      }
      return randomIndex
    })
  }, 8000)

  return () => clearInterval(interval)
}, [])

useEffect(() => {
        const timeOut =  setTimeout(() => {
            setState(true)
    }, 2000)

    return ()=>{
        clearTimeout(timeOut)
    }
  }, [])


  return (<>
  {state?
    <div className='app-home-container'>
      <div className='bg-container'>
        <img src={bg} alt='background' />
      </div>
      <div className='nav'><Navbar /></div><br /><br />

      <div className='home-container'>
        <div className='title'>Welcome to the <span style={{color: 'orange'}}>Eur-Africa Research</span> Associates Library</div>
        <div className='info'>A place where research meets opportunity — empowering minds with knowledge <br /> and advancing excellence in discovery and innovation.</div>
        <Link to='/books'><div className='explore'>Explore books</div></Link>
        <AnimatePresence mode='wait'>
          <motion.div
            key={quoteDataSet[index].id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className='quote-box'
          >
            <div className='quote-author-image'>
              <img src={quoteDataSet[index].image} alt="" />
              <div className='quote-author'>{quoteDataSet[index].name}</div>
            </div>
            <div className='quote-text'>{quoteDataSet[index].qoute}</div>
            <div className='quote-book'>{quoteDataSet[index].book}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    :
    <div className='spinner'>
      <img src={spinner} />
      <div className='name'>EUR-AFRICA</div>
    </div>}
  </>)
}

export default Home
