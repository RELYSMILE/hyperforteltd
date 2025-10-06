import React from 'react'
import close from '../../assets/icons/close.png'
import './About.css'

const About = ({HandleCloseAboutComponent}) => {
  return (
    <div className='about'>
        <div onClick={HandleCloseAboutComponent} className='close'>
            <img src={close} alt="close" />
        </div>
        <div>We create customized solutions to simplify your operations and services. We connect the dots between your people, your places, your services and results. All done at the best quality service, time and budget. Hyperforte offers an exceptional level of service that takes the headache off you and creates trust and partnership between our clients and ourselves"</div>
    </div>
  )
}

export default About