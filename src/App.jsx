import { useEffect, useState } from 'react'
import Hero from './components/Hero/Hero';
import './App.css'

function App() {

  return (
    <>
    <Hero btc='91,000' />
    <div className="text-xl font-bold underline">
      Hello rely!
    </div>
    </>
  );
}

export default App
