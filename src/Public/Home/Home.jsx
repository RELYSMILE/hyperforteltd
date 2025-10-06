import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer.jsx'
import { Link } from 'react-router-dom';
import LiveChat from '../../Components/LiveChat/LiveChat.jsx';
import AOS from "aos";
import SpinnerHome from '../../Components/SpinnerHome.jsx';
import "aos/dist/aos.css";
import heroAdVideo from '../../assets/bg/tiny.mp4'
import PublicNavigation from '../../Components/PublicNavigation'
import Testimonial from '../../Components/Testimonial';
import HeroTitle from '../../Components/HeroTitle'
import more_down from '../../assets/icons/more_down.png'
import scroll from '../../assets/icons/scroll.png'
import icon01dark from '../../assets/icons/icon-01-dark.png'
import icon02dark from '../../assets/icons/icon-02-dark.png'
import icon03dark from '../../assets/icons/icon-03-dark.png'
import icon04dark from '../../assets/icons/icon-04-dark.png'
import about05 from '../../assets/images/about-05.jpg'
import about06 from '../../assets/images/about-06.jpg'
import whyus01 from '../../assets/images/why-us-01.jpg'
import partner01 from '../../assets/logo/partner-01.png'
import partner02 from '../../assets/logo/partner-02.png'
import partner03 from '../../assets/logo/partner-03.png'
import partner04 from '../../assets/logo/partner-04.png'
import step1 from '../../assets/icons/step1.png'
import step2 from '../../assets/icons/step2.png'
import step4 from '../../assets/icons/step4.png'
import step3 from '../../assets/icons/step3.png'
import check from '../../assets/icons/check.png'
import tab_0 from '../../assets/bg/tab-0.png'
import './Home.css'

const Home = () => {
  const [isNavBgVisible, setIsNavBgVisible] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [homeId, setHomeId] = useState('home')
  const [isWindowScrolled, setIsWindowScrolled] = useState(false)
  const [calculatedSm, setCalculatedSm] = useState(false)

  const cards = [
    {
      id: 1, 
      heading: 'Rentals & Hires',
      text: 'Order ready-to-go vehicles  for personal or company occasions and  seasoned drivers.',
      icon: icon01dark, 
      alt: 'Rentals & Hires'
    },
    {
      id: 2, 
      heading: 'Transportation & Haulage',
      text: 'Move your goods and services to any destination home and abroad.',
      icon: icon02dark, 
      alt: 'Transportation & Haulage'
    },
    {
      id: 3, 
      heading: 'Services Technology Tools',
      text: 'Automate your services through technology innovations and tools that simplify work and satisfy customers.',
      icon: icon03dark, 
      alt: 'Services Technology Tools'
    },
    {
      id: 4, 
      heading: 'Warehousing',
      text: 'We provide secure and efficient warehousing solutions for goods of all sizes, ensuring safe storage, easy accessibility, and timely distribution.',
      icon: icon04dark, 
      alt: 'Warehousing'
    },
  ]
  
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPageLoading(true)
    }, 3000)
    AOS.init({
      duration: 1000, // animation duration
      once: true,    // whether animation should happen only once
    });
    const WindowScrollY = () => {
    if(window.scrollY >= 90){
      setIsNavBgVisible(true)
    }else{
      setIsNavBgVisible(false)
    }

    if(window.scrollY >= 90){
      setCalculatedSm(window.scrollY/4)
      setIsWindowScrolled(true)
    }else{
      setIsWindowScrolled(false)
    }
  }
  window.addEventListener('scroll', WindowScrollY)

    return() => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', WindowScrollY)
    }
  }, []);

  return <div className='home-parent-container'>
    <div id={homeId} className='hero-section'>
        <video src={heroAdVideo} autoPlay muted loop playsInline></video> {/*hero background video*/}
        <PublicNavigation isNavBgVisible = {isNavBgVisible} homeId = {homeId} /> {/*Nav bar*/}
        <HeroTitle />
        {!isNavBgVisible && <div className='more_down'><img src={more_down} alt="" /></div>}
    </div>
    <div className='home-content-parent-container'>
      <div className='content-fluid-container-1'>
        <div className='content-fluid-image-text'>
            <div className='content-fluid-image'>
              <div className='image-1'><img src={about05} alt="" /></div>
              <div className='content-fluid-image-1'>
                <div className='image-2'><img src={about06} alt="" /></div>
                <div data-aos="fade-up" className='content-fluid-text'>
                  <div className='number'>333k+</div>
                  <div className='text'>Clients Worldwide</div>
                </div>
              </div>
            </div>

            <div className='content-fluid-text'>
              <div className='heading'>World's Leading Contract Logistics Provider</div>
              <div data-aos="zoom-in" className='text-para-1'>We offers freight forwarding, contract logistics, Rentals & Hires, Transportation & Haulage and Services Technology Tools that connect your business to suppliers and markets around the world. Air, ocean (FCL/LCL), and road freight, and multi-modal solutions to move your goods.</div>
              <div data-aos="zoom-in" className='text-para-2'>We provide globally integrated end-to-end solutions tailored to our customers' supply chain management needs with a special commitment to industry specific requirements.</div>
            </div>
        </div>
          <div className='bage'>
            <div className='ball'></div>
          </div>

          <div className='card-container'>
            {cards.map((card, idx) => (
            <div key={idx} className='card'>
              <img src={card.icon} alt={card.alt + 'icon'} />
              <div className='card-child'>
                <div className='heading'>{card.heading}</div>
                <div className='text'>{card.text}</div>

                <Link to='https://wa.me/2349021463046' target='_blank'><div className='action-button'>Get Quote</div></Link>
              </div>
            </div>
            ))}
          </div>
          <div className='moving-ball'></div>
      </div>

      <div className='content-fluid-container-2'>
        <div className='container-content-flex'>
          <div data-aos="zoom-in" className='heading'>Leading 3PL with Global Presence</div>
          <div className='text'>We are a global (3PL) freight forwarder focused on offering competitive and comprehensive solutions without compromising personal service.</div>

          <div data-aos="fade-up" className='list-container'>
            <div className='list-1'>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Fast Delivery</div>
              </div>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Experienced Team</div>
              </div>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Support 24/7</div>
              </div>
            </div>
            <div className='list-2'>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Online Tracking</div>
              </div>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Cargo Insurance</div>
              </div>
              <div className='bullet-text-container'>
                <div className='bullet'></div>
                <div className='list-text'>Safe Warehouse</div>
              </div>
            </div>
          </div>
        </div>

        <div className='container-content-image'><img src={whyus01} alt="" /></div>
        <div className='partners'>
            <img src={partner01} alt="partner-1" />
            <img src={partner02} alt="partner-2" />
            <img src={partner03} alt="partner-3" />
            <img src={partner04} alt="partner-4" />
        </div>
      </div>

      <div className='content-fluid-container-3'>
            <div data-aos="fade-up" className='steps-container'>
              <div className='step'>
                <div className='step-outer-layer'><div className='step-inner-layer'><img src={step1} alt="" /></div></div>
                <div className='text'>Request Quote</div>
              </div>
              <div className='line'></div>
              <img src={check} alt="" />
              <div className='line'></div>
              <div className='step'>
                <div className='step-outer-layer'><div className='step-inner-layer'><img src={step2} alt="" /></div></div>
                <div className='text'>Package Departs</div>
              </div>
              <div className='line'></div>
              <img src={check} alt="" />
              <div className='line'></div>
              <div className='step'>
                <div className='step-outer-layer'><div className='step-inner-layer'><img src={step3} alt="" /></div></div>
                <div className='text'>Track Package Location</div>
              </div>
              <div className='line'></div>
              <img src={check} alt="" />
              <div className='line'></div>
              <div className='step'>
                <div className='step-outer-layer'><div className='step-inner-layer'><img src={step4} alt="" /></div></div>
                <div className='text'>Safely Delivered</div>
              </div>
            </div>
      </div>

      <Testimonial />

      <div className='content-fluid-container-4'>
        <div className='item' data-aos="fade-up">
          <div className='number'>22280+</div>
          <div className='line'></div>
          <div className='label'>Delivered Packages</div>
        </div>
        <div className='item' data-aos="fade-up">
          <div className='number'>1023+</div>
          <div className='line'></div>
          <div className='label'>Happy Customers</div>
        </div>
        <div className='item' data-aos="fade-up">
          <div className='number'>10+</div>
          <div className='line'></div>
          <div className='label'>Awards Won</div>
        </div>
        <div className='item' data-aos="fade-up">
          <div className='number'>1000+</div>
          <div className='line'></div>
          <div className='label'>Satisfied Solutions</div>
        </div>
      </div>

      <div className='content-fluid-container-5'>
        <div className='tab-0-container'><img src={tab_0} alt="" /></div>
        <div className='content-fluid-info'>
            <div className='label'>Delivery Time</div>
            <div className='days-container'>
              <div className='box'></div>
              <div className='days'>1 day</div>
            </div>
            <div className='days-container'>
              <div className='box'></div>
              <div className='days'>2 day</div>
            </div>
            <div className='days-container'>
              <div className='box'></div>
              <div className='days'>3 day</div>
            </div>
            <div className='days-container'>
              <div className='box'></div>
              <div className='days'>4 day or more</div>
            </div>
        </div>

        <div className='sats-infor-container'>
          <div data-aos="fade-up" className='heading'>Our stats speak loudly for themselves.</div>

          <div className='percentage-container-main'>
            <div className='percentage-container' data-aos="fade-up">
              <div className='number'>99.98 <span>%</span></div>
              <div className='label'>Orders Accuracy</div>
            </div>
            <div className='percentage-container' data-aos="fade-up">
              <div className='number'>99.98 <span>%</span></div>
              <div className='label'>Fulfillment On Time</div>
            </div>
            <div className='percentage-container' data-aos="fade-up">
              <div className='number'>7</div>
              <div className='label'>Warehouses Across The Country</div>
            </div>
          </div>
        </div>
      </div>
      {isWindowScrolled && <a href={`#${homeId}`}><div className='scroll'><img src={scroll} alt="" /></div></a>}
      {isWindowScrolled && <div className='screen-metrix'>Calculated SM: {calculatedSm}</div>}
      <LiveChat />
      <Footer  homeId = {homeId} />
    </div>
    {!isPageLoading && <div className='flash-screen'><SpinnerHome /></div>}
  </div>
}

export default Home