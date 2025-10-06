import React, {useState} from 'react'
import About from './About/About'
import {Link} from 'react-router-dom'
import logo from '../assets/logo/logo.png'
import logo_alpha from '../assets/logo/logo-alpha.png'
import more_down from '../assets/icons/more_down.png'
import more_down_gray from '../assets/icons/more_down_gray.png'
import arrow_left from '../assets/icons/arrow_left.png'
import menu from '../assets/icons/menu.png'
import close from '../assets/icons/close.png'
import './PublicNavigation.css'

const PublicNavigation = ({isNavBgVisible, homeId}) => {
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true)  
  const [isAboutScreenActive, setIsAboutScreenActive] = useState(false)
  const [isServiceScreenActive, setIsServiceScreenActive] = useState(false)
  const [isContactScreenActive, setIsContactScreenActive] = useState(false)
  const [isServicesClicked, setIsServicesClicked] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)


  const HomeScreen = () => {
    setIsAboutScreenActive(false)
    setIsServiceScreenActive(false)
    setIsContactScreenActive(false)
    setIsServicesClicked(false)
    setIsHomeScreenActive(true)
  }
  const AboutScreen = () => {
    setIsHomeScreenActive(false)
    setIsServiceScreenActive(false)
    setIsContactScreenActive(false)
    setIsServicesClicked(false)
    setIsAboutScreenActive(true)
  }
  const ServicesScreen = () => {
    setIsHomeScreenActive(false)
    setIsAboutScreenActive(false)
    setIsContactScreenActive(false)
    setIsServiceScreenActive(true)
  }
  const ContactScreen = () => {
    setIsHomeScreenActive(false)
    setIsAboutScreenActive(false)
    setIsServiceScreenActive(false)
    setIsContactScreenActive(false)
    setIsServicesClicked(false)
    setIsContactScreenActive(true)
  }

  const HandleCloseNavBar = () => {
    setIsMobileNavOpen(false)
  }
  const HandleOpenNavBar = () => {
    setIsMobileNavOpen(true)
  }
  const HandleCloseAboutComponent = () => {
    setIsAboutScreenActive(false)
    setIsHomeScreenActive(true)
  }

  return<>
    <div className={isNavBgVisible? 'navigation-parent-container navigation-parent-container-window-scroll' : 'navigation-parent-container'}>
      <Link to='/' target='_top'>
        <div className='logo-container'> {/* logo image details*/}
            <img src={logo} alt="" /> 
            <img className='logo-alpha' src={logo_alpha} alt="" /> 
        </div>
      </Link>
      <div className='nav-items-container'>
          <div className='nav-items'>
              <a href={`#${homeId}`}><div onClick={HomeScreen} className={isHomeScreenActive? 'nav-item active-nav-item' : 'nav-item'}>Home</div></a>
              <div onClick={AboutScreen} className={isAboutScreenActive? 'nav-item active-nav-item' : 'nav-item'}>About Us</div>
              <div onClick={ServicesScreen} className={isServiceScreenActive? 'nav-item active-nav-item services' : 'nav-item services'}>
                <div onClick={() => setIsServicesClicked((prev) => !prev)} className='services-lable'>
                  <div>Our Services</div>
                  {isNavBgVisible? <img src={more_down_gray} alt="enter" /> : <img src={more_down} alt="enter" />}
                </div>
                {isServicesClicked &&
                <div className='services-container'>
                  <Link to='https://wa.me/2349021463046' target='_blank'>
                    <div className='service'>
                      <div>Rentals & Hires</div>
                      <img src={arrow_left} alt="enter" />
                    </div>
                  </Link>
                  <Link to='https://wa.me/2349021463046' target='_blank'><div className='service'>Transportation & Haulage</div></Link>
                  <Link to='https://wa.me/2349021463046' target='_blank'><div className='service'>Services Technology Tools</div></Link>
                  <Link to='https://wa.me/2349021463046' target='_blank'><div className='service'>Warehousing</div></Link>
              </div>}
              </div>
            
              <Link to='https://wa.me/2349021463046' target='_blank'><div onClick={ContactScreen} className={isContactScreenActive? 'nav-item active-nav-item' : 'nav-item'}>Contact Us</div></Link>
              {/* <div onClick={FAQScreen} className={isFAQScreenActive? 'nav-item active-nav-item' : 'nav-item'}>FAQ</div> */}
          </div>

          <Link to='https://wa.me/2349021463046' target='_blank'><div className={isNavBgVisible? 'tracking-button-window-scroll' : 'tracking-button'}>Request Quote</div></Link>
      </div>

      {/* ================================ Mobile Version ====================================== */}
      <div onClick={HandleOpenNavBar} className={isNavBgVisible? 'burger-button-window-scroll burger-button' : 'burger-button'}>
        <img src={menu} alt="more" />
      </div>
      {isMobileNavOpen &&
      <div className='sm-nav-items-container'>
        <div className='logo-close-button'>
          <Link to='/' target='_top'>
          <div className='sm-logo-container'> {/* logo image details*/}
                <img className='logo' src={logo} alt="" /> 
                <img className='logo-alpha' src={logo_alpha} alt="" /> 
          </div>
          </Link>
          <div onClick={HandleCloseNavBar} className='close-button'><img src={close} alt="close" /></div>
        </div>


          <div className='nav-items'>
              <div onClick={HandleCloseNavBar} className='nav-item'>Home</div>
              <div onClick={AboutScreen} className='nav-item'>About Us</div>
              <div onClick={ServicesScreen} className='nav-item'>
                <div onClick={() => setIsServicesClicked((prev) => !prev)} className='services-lable'>
                  <div>Our Services</div>
                  {isNavBgVisible? <img src={more_down_gray} alt="enter" /> : <img src={more_down} alt="enter" />}
                </div>
                {isServicesClicked &&
                <div className='services-container'>
                  <a href="https://wa.me/2349021463046" target='_blank'><div className='service service-x'>
                    <div>Rentals & Hires</div>
                    <img src={arrow_left} alt="enter" />
                  </div></a>
                  <a href="https://wa.me/2349021463046" target='_blank'><div className='service'>Transportation & Haulage</div></a>
                  <a href="https://wa.me/2349021463046" target='_blank'><div className='service'>Services Technology Tools</div></a>
                  <a href="https://wa.me/2349021463046" target='_blank'><div className='service'>Warehousing</div></a>
              </div>}
              </div>
            
              <a href="https://wa.me/2349021463046" target='_blank'><div onClick={ContactScreen} className='service'>Contact Us</div></a>
          </div>

          <a href="https://wa.me/2349021463046" target='_blank'><div className='tracking-button'>Request Quote</div></a>
      </div>}
    </div>
    {isAboutScreenActive && <About HandleCloseAboutComponent = {HandleCloseAboutComponent} />}
  </>
}

export default PublicNavigation