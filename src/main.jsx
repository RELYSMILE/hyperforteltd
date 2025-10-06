import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import Routers from './RouterConfig/Routers.jsx'
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
)