import React from 'react'
import logo from '../assets/icons/logo.png'
import close from '../assets/icons/close.png'
import { Link } from 'react-router-dom'

const Auth = ({handleCloseAuthComponent}) => {
  return (<div className='auth'>
        <div className='auth-container'>
            <div className='logo-container'>
                <img src={logo} alt="Pi Network" />
                <div onClick={handleCloseAuthComponent} className='close'>
                    <img src={close} alt="close" />
                </div>
            </div>

            <div className='info-container'>
                <div className='heading'>Stake Your Pi Coin and Earn 73% APY!</div>
                <div className='info'>Great news! You now have the opportunity to stake your Pi Coin and earn an impressive Annual Percentage Yield (APY) of 73%. <br />
                By staking, your Pi coins won’t just sit idle — they’ll work for you and grow steadily over time. It’s a smart way to maximize your holdings and participate in the Pi ecosystem more actively.</div>

                <div className='info-x'>🔒 Your coins remain safe. <br />
                📈 You earn rewards daily. <br />
                💰 73% APY = Serious passive income.</div>
                <div className='info-x'>Ready to start? Don’t miss out!</div>

                <Link to={'/wallet'} className='stake-unlock'>
                    <div className='stake-btn'>Continue</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Auth


