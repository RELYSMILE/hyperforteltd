import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Screens/Home.jsx'
import Wallet from './Screens/Wallet.jsx'
import UnlockPi from './Screens/UnlockPi.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not found</div>
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <div>Not found</div>
  },
  {
    path: '/wallet',
    element: <Wallet />
  },
  {
    path: '/unlockPi',
    element: <UnlockPi />
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={ router} />
  </React.StrictMode>,
)