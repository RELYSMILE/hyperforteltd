import React, { useEffect, useState } from 'react'
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
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const NavBar = ({setPageTitle, setIsPageDimmed}) => {
    const [gsettingsData, setGsettingsData] = useState([])
    const [appearancesettingData, setAppearancesettingsData] = useState([])
    const [settingsToggle, setSettingsToggle] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [activeNavBar, setActiveNavBar] = useState(false)
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

       useEffect(() => {
        const fetchSettings = async() => {
            try{
                const generalSettingsData = await getDoc(doc(db, 'settings', 'XaeK0raHltvTWxbQkWn2'))
                const appearanceSettingsData = await getDoc(doc(db, 'settings', '4hmGZ3GjgfK7bDbyC14g'))
                const SettingsData = await getDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'))
                if(generalSettingsData.exists()){
                    setGsettingsData(generalSettingsData.data())
                }
                if(appearanceSettingsData.exists()){
                    setAppearancesettingsData(appearanceSettingsData.data())
                }
                if(SettingsData.exists()){
                    setSettingsToggle(SettingsData.data())
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchSettings()
    })
    const handleSignOut = async() => {
        auth.signOut()
        navigate('/authentication')
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(db, 'admin', user.uid));
            if (userDoc.exists()) {
              setCurrentUser(userDoc.data());
            } else {
              console.log('No such user data!');
            }
          } else {
            setCurrentUser(null);
          }
    });
    
     return () => unsubscribe();
    }, []);
  return<> <div className='nav-container'>
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
                <div className='currentUser'>{currentUser?.username}</div>
            </div>
            <div className='role-container'>
                <img src={verifiedx} alt="icon" />
                <div className='role'>{currentUser?.adminRole}</div>
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
        <div className='logout-button' onClick={handleSignOut}>Logout</div>
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
                <div className='currentUser'>{currentUser?.username}</div>
            </div>
            <div className='role-container'>
                <img src={verifiedx} alt="icon" />
                <div className='role'>{currentUser?.adminRole}</div>
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