import React, { useEffect, useState, useContext } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo.png'
import logo1 from '../assets/icons/logo1.png'
import user from '../assets/icons/user.png'
import shield from '../assets/icons/shield.png'
import dashboard from '../assets/icons/dashboard.png'
import books from '../assets/icons/books.png'
import verifiedx from '../assets/icons/verifiedx.png'
import admin from '../assets/icons/admin.png'
import totalbooks from '../assets/icons/totalbooks.png'
import menu from '../assets/icons/menu.png'
import close from '../assets/icons/close.png'
import settings from '../assets/icons/settings.png'
import logoutIcon from '../assets/icons/logout.png'
import lightModeIcon from '../assets/icons/lightmode.png'
import darkModeIcon from '../assets/icons/darkmode.png'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './Context/Context'

const NavBar = ({setPageTitle, setIsPageDimmed}) => {
    const {currentAdmin, currentLightDarkMode, gsettingsData, appearancesettingData} = useContext(AppContext)
    const [activeNavBar, setActiveNavBar] = useState(false)
    const [lightDarkmodeStatus, setLightDarkmodeStatus] = useState(true)
    const navigate = useNavigate()
    const NavItems = [
        {icon: dashboard, item: 'Dashboard', link: '/dashboard'},
        {icon: books, item: 'Publication Management', link: '/books-management'},
        {icon: totalbooks, item: 'Publication Status',  link: '/book-status'},
        {icon: shield, item: 'Manage Admin',  link: '/administrative-management'},
        {icon: admin, item: 'Admin Role',  link: '/admin-role'},
        {icon: settings, item: 'Settings',  link: '/settings'},
    ]

    const displayNavBar = () => {
        setActiveNavBar(true)
        setIsPageDimmed(true)
    }
    const closeNavBar = () => {
        setActiveNavBar(false)
        setIsPageDimmed(false)
    }
    const handleDarkMode = async() => {
        setLightDarkmodeStatus((prev) => !prev)
        try{
            await updateDoc(doc(db, 'admin', currentAdmin.adminID), {
                lightMode: lightDarkmodeStatus,
            });
            console.log('success')

        }catch(error){
            console.log(error)
        }
    }
    const handleLightMode = async() => {
        setLightDarkmodeStatus((prev) => !prev)
        try{
            await updateDoc(doc(db, 'admin', currentAdmin.adminID), {
                lightMode: lightDarkmodeStatus,
            });
            console.log('success1')
        }catch(error){
            console.log(error)
        }
    }

       
    const handleSignOut = async() => {
        auth.signOut()
        navigate('/authentication')
    }


  return<> <div className={currentLightDarkMode.lightMode === false? 'nav-container dark-mode' : 'nav-container' }>
    <div className='logo-admin-name-container'>
        <div className={currentLightDarkMode.lightMode === false? 'logo-container logo-container-dark-mode' : 'logo-container'}>
            <div className='logo-container-x'>
                <img src={logo1} alt='Logo' />
                <img src={logo} alt='Logo' />
            </div>
            <div className='logo-name' style={{color: appearancesettingData.logoColor}}>{gsettingsData.appName}</div>
        </div>

        <div className={currentLightDarkMode.lightMode === false? 'currentUser-role-container currentUser-role-container-dark-mode' : 'currentUser-role-container'}>
            <div className='currentUser-container'>
                <img src={user} alt="icon" />
                <div className='currentUser'>{currentAdmin?.username}</div>
            </div>
            <div className='role-container'>
                <img src={verifiedx} alt="icon" />
                <div className='role'>{currentAdmin?.adminRole}</div>
            </div>
        </div>
    </div>

    <div className='nave-items'>
        {NavItems.map((item, idx) => (
        <Link to={item?.link} key={idx}>
            <div onClick={(e) => setPageTitle(item.item)} className='nav-item'>
                <img src={item?.icon} alt="icon" />
                <div style={{color: appearancesettingData.primaryColor}} className='item'>{item?.item}</div>
            </div>
        </Link>
        ))}

        {currentLightDarkMode?.lightMode === true?
        <div onClick={handleDarkMode} className='light-dark-mode-container'>
            <img src={lightModeIcon} alt="" />
            <div>Light Mode</div>
        </div>
        :
        <div onClick={handleLightMode} className='light-dark-mode-container'>
            <img src={darkModeIcon} alt="" />
            <div>Dark Mode</div>
        </div>
        }
        <div onClick={handleSignOut} className={currentLightDarkMode.lightMode === false? 'logout-button logout-button-dark-mode' : 'logout-button'}>
            <img src={logoutIcon} alt="logout" />
            <div>Logout</div>
        </div>
        <div onClick={handleSignOut} className={currentLightDarkMode.lightMode === false? 'version version-dark-mode': 'version'}>
            <div>Version 1.0.0.1</div>
        </div>
    </div>
  </div>

  {/* ===================================== small screen nav=================================================== */}

  <div className={activeNavBar? 'small-screen-nav small-screen-nav-active' : 'small-screen-nav small-screen-nav-none-active'}> 
    <div className='logo-admin-name-container'>
        <div className='logo-container'>
            <div className='logo-container-x'>
                <img src={logo1} alt='Logo' />
                <img src={logo} alt='Logo' />
            </div>
            <div style={{color: appearancesettingData.logoColor}} className='logo-name'>{gsettingsData.appName}</div>
        </div>

        <div className='currentUser-role-container'>
            <div className='currentUser-container'>
                <img src={user} alt="icon" />
                <div className='currentUser'>{currentAdmin?.username}</div>
            </div>
            <div className='role-container'>
                <img src={verifiedx} alt="icon" />
                <div className='role'>{currentAdmin?.adminRole}</div>
            </div>
        </div>
    </div>

     <div className='nave-items'>
        {NavItems.map((item, idx) => (
        <Link onClick={closeNavBar} to={item?.link} key={idx}>
            <div onClick={(e) => setPageTitle(item.item)} className='nav-item'>
                <img src={item?.icon} alt="icon" />
                <div style={{color: appearancesettingData.primaryColor}} className='item'>{item?.item}</div>
            </div>
        </Link>
        ))}
        <div className='logout-button' onClick={handleSignOut}>Logout</div>
    </div>
  </div>

  <div className='bugger-button'>
    {!activeNavBar?
    <img onClick={displayNavBar} src={menu} alt="menu" />
    :
    <img onClick={closeNavBar} src={close} alt="menu" />}
  </div>
</>}

export default NavBar