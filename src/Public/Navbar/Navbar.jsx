import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.png'
import logo1 from '../../assets/icons/logo1.png'
import menu from '../../assets/icons/menu.png'
import close from '../../assets/icons/close.png'
import home from '../../assets/icons/home.png'
import book from '../../assets/icons/book.png'
import about from '../../assets/icons/about.png'
import login from '../../assets/icons/login.png'
import './Navbar.css'

const Navbar = () => {
  const [activeNavBar, setActiveNavBar] = useState(false)

  const displayNavBar = () => {
        setActiveNavBar(true)
    }
    const closeNavBar = () => {
        setActiveNavBar(false)
    }
  return (<>
    <div className='navigation-container'>
        <Link to='/'><div className='logo-container'>
           <img src={logo} alt="logo" />
        </div></Link>

        <div className='navigation-item'>
            <Link to='/'><div className='item'>Home</div></Link>
            <Link to='/books'><div className='item'>Books</div></Link>
            <Link to='/about'><div className='item'>About</div></Link>
            <Link to='/authentication'><div className='item'>Login</div></Link>
        </div>
        <div className='sm-bugger-button'>
          {activeNavBar?
          <img onClick={closeNavBar} src={close} alt="menu" />
          :
          <img onClick={displayNavBar} src={menu} alt="menu" />}
        </div>
    </div>

    <div className={activeNavBar? 'sm-screen-nav-active sm-screen-nav' : 'sm-screen-nav sm-screen-nav-none-active'}>
        <div className='navigation-items'>
            <Link onClick={closeNavBar} to='/'><div className='item'>
                <img src={home} alt="" />
                <div>Home</div>
              </div></Link>
            <Link onClick={closeNavBar} to='/books'>
              <div className='item'>
                <img src={book} alt="" />
                <div>Books</div>
              </div></Link>
            <Link onClick={closeNavBar} to='/about'>
            <div className='item'>
              <img src={about} alt="" />
              <div>About</div>
            </div></Link>
            <Link onClick={closeNavBar} to='/authentication'>
            <div className='item'>
              <img src={login} alt="" />
              <div>Login</div>
            </div></Link>
        </div>
    </div>
  </>)
}

export default Navbar