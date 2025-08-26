import React, { useEffect, useState, useContext } from 'react'
import {auth, db}  from '../../firebase/config'
import { toast } from 'react-toastify'
import NavBar from '../NavBar'
import PageTitle from '../../Components/Admin/PageTitle'
import save from '../../assets/icons/save.png'
import settings from '../../assets/icons/settings.png'
import palette from '../../assets/icons/palette.png'
import extension from '../../assets/icons/extension.png'
import './Settinggs.css'
import { arrayUnion, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Spinner from '../../Components/Spinner'
import { AppContext } from '../Context/Context'


const Settinggs = () => {
    const {currentAdmin, currentLightDarkMode} = useContext(AppContext)
    const [pageTitle, setPageTitle] = useState('Settings')
    const [generalActiveStyle, setGeneralActiveStyle] = useState(true)
    const [apearanceActiveStyle, setApearanceActiveStyle] = useState(false)
    const [featuresActiveStyle, setFeaturesActiveStyle] = useState(false)
    const [gsettingsData, setGsettingsData] = useState([])
    const [appearancesettingData, setAppearancesettingsData] = useState([])
    const [appName, setAppName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [logoColorPicker, setLogoColorPicker] = useState('#000')
    const [primaryColorPicker, setPrimaryColorPicker] = useState('#008080')
    const [settingsToggle, setSettingsToggle] = useState(false)
    const [settingsTogglefetch, setSettingsToggleFetch] = useState([])
    const [toggleDeleteSettings, setToggleDeleteSettings] = useState(true)
    const [toggleAddBookSettings, setToggleAddBookSettings] = useState(true)
    const [toggleUpdateAdminSettings, setToggleUpdateAdminSettings] = useState(true)
    const [toggleDeleteAdminSettings, setToggleDeleteAdminSettings] = useState(true)
    const [toggleAddAdminSettings, setToggleAddAdminSettings] = useState(true)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const [state, setState] = useState(false)
    const [newLocation, setNewLocation] = useState('')

    const handleGeneralActiveStyle = () => {
        setGeneralActiveStyle(true)
        setApearanceActiveStyle(false)
        setFeaturesActiveStyle(false)
    }
    const handleApearanceActiveStyle = () => {
        setGeneralActiveStyle(false)
        setApearanceActiveStyle(true)
        setFeaturesActiveStyle(false)
    }
    const handleFeaturesActiveStyle = () => {
        setFeaturesActiveStyle(true)
        setGeneralActiveStyle(false)
        setApearanceActiveStyle(false)
    }

    const handleSaveSettings = async() => {
        setIsLoading(true)
        console.log(gsettingsData.appName)
        try{
            await updateDoc(doc(db, 'settings', 'XaeK0raHltvTWxbQkWn2'), {
                appName: appName,
                updatedAt: serverTimestamp()
            })
            await updateDoc(doc(db, 'settings', '4hmGZ3GjgfK7bDbyC14g'), {
                logoColor: logoColorPicker || appearancesettingData.logoColor,
                primaryColor: primaryColorPicker || appearancesettingData.primaryColorPicker,
            })
            await updateDoc(doc(db, 'settings', 'locations-array'), {
                locations: arrayUnion({
                    location: newLocation && newLocation ,
                })
            })
            toast.success('Settings saved successfully', {
                toastId: 1,
            })
        }catch(error){
           toast.error('Settings can not be saved at this time, try again', {
                toastId: 2,
            })
        }finally{
            setIsLoading(false)
        }
    }

    const handleToggleAddAdminSettings = async() => {
        setToggleAddAdminSettings((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleAddAdminSettings: toggleAddAdminSettings,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }
    const handleToggleDeleteAdminSettings = async() => {
        setToggleDeleteAdminSettings((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleDeleteAdminSettings: toggleDeleteAdminSettings,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }
    const handleToggleUpdateAdminSettings = async() => {
        setToggleUpdateAdminSettings((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleUpdateAdminSettings: toggleUpdateAdminSettings,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }
    const handleToggleAddBookSettings = async() => {
        setToggleAddBookSettings((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleAddBookSettings: toggleAddBookSettings,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }
    const handleToggleSettings = async() => {
        setSettingsToggle((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleSettings: settingsToggle,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }
    const handleToggleDeleteSettings = async() => {
        setToggleDeleteSettings((prev) => !prev)
        try{
            await updateDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'), {
                toggleDeleteSettings: toggleDeleteSettings,
                updatedAt: serverTimestamp()
            })
            toast.success('Setting saved successfully', {
                toastId: 1
            })
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        const fetchSettings = async() => {
            try{
                const generalSettingsData = await getDoc(doc(db, 'settings', 'XaeK0raHltvTWxbQkWn2'))
                const appearanceSettingsData = await getDoc(doc(db, 'settings', '4hmGZ3GjgfK7bDbyC14g'))
                if(generalSettingsData.exists()){
                    setGsettingsData(generalSettingsData.data())
                    setAppName(generalSettingsData.data().appName)
                }
                if(appearanceSettingsData.exists()){
                    setAppearancesettingsData(appearanceSettingsData.data())
                }
            }catch(error){
                console.log(error)
            }
        }

    setTimeout(() => {
      setState(true)
    }, 2000)
        fetchSettings()
    },[])
    useEffect(() => {
        const fetchSettings = async() => {
            try{
                const SettingsData = await getDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'))
                if(SettingsData.exists()){
                    setSettingsToggleFetch(SettingsData.data())
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchSettings()
    })

  return <>
  <div className={isPageDimmed? 'settings-container page-dimmed' : currentLightDarkMode.lightMode === false? 'settings-container settings-container-dark-mode': 'settings-container'}>
    <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />
    <div className='settings'>
        <PageTitle pageTitle = {pageTitle} />
        <div className='settings-items'>
            <div className='save-settings'>
                {!featuresActiveStyle &&
                <div onClick={handleSaveSettings} className='save-btn'>
                    <img src={save} alt="icon" />
                    <div>{isLoading? 'Saving...' : 'Save Settings'}</div>
                </div>}
            </div>

            <div className={currentLightDarkMode.lightMode === false? 'navigate-container navigate-container-dark-mode' : 'navigate-container'}>
                <div onClick={handleGeneralActiveStyle} className={generalActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item nav-item-active nav-item-dark-mode nav-item-active-dark-mode ': !generalActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item  nav-item-dark-mode' : generalActiveStyle && currentLightDarkMode.lightMode === true? 'nav-item nav-item-active': 'nav-item'}>
                    <img src={settings} alt="icon" />
                    <div>General</div>
                </div>
                <div onClick={handleApearanceActiveStyle} className={apearanceActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item nav-item-active nav-item-dark-mode nav-item-active-dark-mode ': !apearanceActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item  nav-item-dark-mode' : apearanceActiveStyle && currentLightDarkMode.lightMode === true? 'nav-item nav-item-active': 'nav-item'}>
                    <img src={palette} alt="icon" />
                    <div>Apearance</div>
                </div>
                <div onClick={handleFeaturesActiveStyle} className={featuresActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item nav-item-active nav-item-dark-mode nav-item-active-dark-mode ': !featuresActiveStyle && currentLightDarkMode.lightMode === false? 'nav-item  nav-item-dark-mode' : featuresActiveStyle && currentLightDarkMode.lightMode === true? 'nav-item nav-item-active': 'nav-item'}>
                    <img src={extension} alt="icon" />
                    <div>Features</div>
                </div>
            </div>

            {generalActiveStyle &&

            <div className={currentLightDarkMode.lightMode === false? 'general-settings general-settings-dark-mode' : 'general-settings'}>
                <div className='title'>General Settings</div>
                <div className='info'>Manage app basic information and configuration</div>
                {currentAdmin?.adminRole === 'super admin'?
                <>
                    <div className={currentLightDarkMode.lightMode === false? 'app-name-container app-name-container-dark-mode' : 'app-name-container'}>
                        <label>App name</label>
                        <input onChange={(e) => setAppName(e.target.value)} type="text" value={appName} />
                        <div className='app-info'>App Original name: <span style={{color: 'teal'}}>Eur-Africa</span></div>
                    </div>
                    <div className={currentLightDarkMode.lightMode === false? 'app-name-container app-name-container-dark-mode' : 'app-name-container'}>
                        <label>Add new Location</label>
                        <input onChange={(e) => setNewLocation(e.target.value)} type="text" placeholder='Add extra Location here' />
                    </div>
                </>:
                <div className='access'>Access denied, {currentAdmin?.username} You are not authorized to perform this operation.</div>}
            </div>}
            {featuresActiveStyle &&

            <div className={currentLightDarkMode.lightMode === false? 'general-settings general-settings-dark-mode' : 'general-settings'}>
                <div className='title'>Feature Settings</div>
                <div className='info'>Enable or disable specific features on your app</div>

                <div className='feature-container'>
                    {currentAdmin?.adminRole === 'super admin' &&
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Update Publication</div>
                            <div className='info'>Turn on and off update Publication feature</div>
                        </div>
                        <div className='toggle'>
                            {!settingsTogglefetch.toggleSettings?
                            <svg onClick={handleToggleSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>}
                    {currentAdmin?.adminRole === 'super admin' &&
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Delete Publication</div>
                            <div className='info'>Turn on and off Delete Publication feature</div>
                        </div>
                        <div className='toggle'>
                            {settingsTogglefetch.toggleDeleteSettings?
                            <svg onClick={handleToggleDeleteSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleDeleteSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>}
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Add new Publication</div>
                            <div className='info'>Turn on and off Publication adding feature</div>
                        </div>
                        <div className='toggle'>
                            {settingsTogglefetch.toggleAddBookSettings?
                            <svg onClick={handleToggleAddBookSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleAddBookSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>
                    {currentAdmin?.adminRole === 'super admin' &&
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Update admin</div>
                            <div className='info'>Turn on and off update admin feature</div>
                        </div>
                        <div className='toggle'>
                            {settingsTogglefetch.toggleUpdateAdminSettings?
                            <svg onClick={handleToggleUpdateAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleUpdateAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>}
                    {currentAdmin?.adminRole === 'super admin' &&
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Delete admin</div>
                            <div className='info'>Turn on and off delete admin feature</div>
                        </div>
                        <div className='toggle'>
                            {settingsTogglefetch.toggleDeleteAdminSettings?
                            <svg onClick={handleToggleDeleteAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleDeleteAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>}
                    {currentAdmin?.adminRole === 'super admin' &&
                    <div className='settings-container-state'>
                        <div className='settings-state'>
                            <div className='title ft'>Add admin</div>
                            <div className='info'>Turn on and off add admin feature</div>
                        </div>
                        <div className='toggle'>
                            {settingsTogglefetch.toggleAddAdminSettings?
                            <svg onClick={handleToggleAddAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#099b2d" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            :
                            <svg onClick={handleToggleAddAdminSettings}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#808080" d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                            }
                        </div>
                    </div>}
                </div>

            </div>}

            {apearanceActiveStyle &&
            <div className={currentLightDarkMode.lightMode === false? 'general-settings general-settings-dark-mode' : 'general-settings'}>
                <div className='title'>Appearance Settings</div>
                <div className='info'>Customize the look and feel of the app</div>

                <div className='color-scheme'>Color Scheme</div>
                <div className='color-container'>
                    <div className='logo-color'>
                        <div style={{background: logoColorPicker, color: '#fff'}}>Logo color</div>
                        <label htmlFor="Logo">
                            <div className='Logo' style={{background: logoColorPicker, color: '#fff'}}></div>
                            <div className='color' style={{border: `1px solid ${logoColorPicker}`}}>
                                <div className='code'>{logoColorPicker}</div>
                                <div className='preview' style={{background: logoColorPicker, color: '#fff'}}>Color Preview</div>
                                <div>Current Color: {appearancesettingData.logoColor}</div>
                            </div>
                        </label>
                        <input onChange={(e) => setLogoColorPicker(e.target.value)} type="color" name="Logo" id="Logo" style={{display: 'none'}} />
                    </div>
                    <div className='logo-color'>
                        <div style={{background: primaryColorPicker}}>Primary color</div>
                        <label htmlFor="primary">
                            <div className='Logo' style={{background: primaryColorPicker}}></div>
                            <div className='color' style={{border: `1px solid ${primaryColorPicker}`}}>
                                <div className='code'>{primaryColorPicker}</div>
                                <div className='preview' style={{background: primaryColorPicker}}>Color Preview</div>
                                <div>Current Color: {appearancesettingData.primaryColor}</div>
                            </div>
                        </label>
                        <input onChange={(e) => setPrimaryColorPicker(e.target.value)} type="color" name="primary" id="primary" style={{display: 'none'}} />
                    </div>
                </div>
            </div>}
        </div>
    </div>
  </div>

  {!state &&
    <div className='spinner-x'>
        <div className='loading'><Spinner /></div>
    </div>}
</>}

export default Settinggs