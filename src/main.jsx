import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { AppContextProvider } from './Admin/Context/Context.jsx'
import RouterConfig from './RouterConfig.jsx'
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <AppContextProvider>
      <RouterConfig />
    </AppContextProvider>
  </React.StrictMode>,
)