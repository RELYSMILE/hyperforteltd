import React, { useEffect, useState } from 'react'
import Auth from '../Components/Auth'
import appBg from '../assets/bg/bg.png'
import logo from '../assets/icons/logo.png'
import stakeImg from '../assets/images/stake1.png'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const [authState, setAuthState] = useState(false)
    const [state, setState] = useState(false)
    
    const handleAuthComponentState = () => {
        setAuthState(true)
    }
    const handleCloseAuthComponent = () => {
        setAuthState(false)
    }

    useEffect(() => {
        const timeOut =  setTimeout(() => {
            setState(true)
    }, 3000)

    return ()=>{
        clearTimeout(timeOut)
    }
    }, [])

  return <div className='app'>
    {state?
    <>
        <div className='app-bg-cobtainer'>
            <img src={appBg} alt="" />
        </div>

        <div className='logo'>
            <img src={logo} alt="" />
        </div>
        <div className='Hero'>
            <div className='Hero-contaner'>
                <div className='hero-headings'>
                    <div className='heading'>Stake your <span>Pi coin & earn</span> rewards in just a few steps</div>
                    <div className='info'>By staking your crypto, you’re not just growing your portfolio, but also helping secure Pi blockchain networks for everyone.</div>
                    <div className='stake-unlock'>
                        <div className='stake-btn' onClick={handleAuthComponentState}>Stake Pi</div>
                        <Link to={'/unlockPi'}><div className='stake-btn unlock'>Unlock Pi</div></Link>
                    </div>
                </div>
                <div className='avarta'>
                    <img src={stakeImg} alt="" />
                </div>
            </div>
        </div>
        {authState && <Auth handleCloseAuthComponent = {handleCloseAuthComponent} />}
    </>
    :
        <div className='flashScreen'>
            <img src={logo} alt="" />
        </div>
    }   
  </div>
}

export default Home