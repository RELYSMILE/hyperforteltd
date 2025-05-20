import React, { useEffect, useState } from 'react'
import {FaMapMarker} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Base from '../Base'
import Counter from '../Counter'
import react from '../../assets/react.svg'
import './Hero.css'


const Hero = ({title, subtitle, isHero = false, btc}) => {
  const [num, setNum] = useState(0);
  const [desc, setDesc] = useState(false);
  const [nav, setNav] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [bubble, setBubble] = useState('.2rem');
  const [bg, setbg] = useState(false);
  // function fetchCryptoPrices() {
  //   // Fetch multiple cryptocurrencies with additional data like market cap, 24hr volume, and percentage change
  //   fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,tether,cardano,solana,ripple&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Display data for each cryptocurrency
  //       document.getElementById('bitcoin').innerHTML = `
  //         Bitcoin: $${data.bitcoin.usd} <br>
  //         24h Change: ${data.bitcoin.usd_24h_change.toFixed(2)}% <br>
  //         Market Cap: $${data.bitcoin.usd_market_cap.toLocaleString()} <br>
  //         24h Volume: $${data.bitcoin.usd_24h_vol.toLocaleString()}
  //       `;
  //       document.getElementById('ethereum').innerHTML = `
  //         Ethereum: $${data.ethereum.usd} <br>
  //         24h Change: ${data.ethereum.usd_24h_change.toFixed(2)}% <br>
  //         Market Cap: $${data.ethereum.usd_market_cap.toLocaleString()} <br>
  //         24h Volume: $${data.ethereum.usd_24h_vol.toLocaleString()}
  //       `;
  //       document.getElementById('binance').innerHTML = `
  //         Binance Coin: $${data.binancecoin.usd} <br>
  //         24h Change: ${data.binancecoin.usd_24h_change.toFixed(2)}% <br>
  //         Market Cap: $${data.binancecoin.usd_market_cap.toLocaleString()} <br>
  //         24h Volume: $${data.binancecoin.usd_24h_vol.toLocaleString()}
  //       `;
  //       // Repeat for other coins...
  //     })
  //     .catch(error => console.error('Error fetching the data:', error));
  // }
  
  // // Fetch the prices initially
  // fetchCryptoPrices();
  
  // // Update the prices every 10 seconds
  // setInterval(fetchCryptoPrices, 10000); // 10000ms = 10 seconds
  const bubbleSized = ()=>{
    if(window.scrollY > 0.2){
      setBubble(String(window.scrollY/400)+'rem')
    }else{
      setBubble('.2rem')
    }
    
  }
  window.addEventListener('scroll', bubbleSized)

  const changeNavBehavour = ()=>{
      if(window.scrollY >= 249){
        setNav(true);
      }else{
        setNav(false)
      }
    }
    window.addEventListener('scroll', changeNavBehavour)

    const moveUp = ()=> {
      if(window.scrollY >= 260){
        setSlideUp(true)
      }else{
        setSlideUp(false)
      }
    }
    window.addEventListener('scroll', moveUp)

  let datas = ['rely', 'Benita', 'move', 'letsGo']
  let recentDatas = datas.slice(1,3)

  let description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio consequuntur, quibusdam sit odit itaque est. Consequuntur, quasi voluptatem dicta, neque aliquid id architecto consectetur sint laborum similique dolorem culpa rem.'
  if(!desc){
    description = isHero? description.substring(0,90) + '...' : description;
  }

  return (
    <div>
      <div>Homepage</div>
      <Link to={'base'} >Base </Link>
    </div>
  )
}

export default Hero