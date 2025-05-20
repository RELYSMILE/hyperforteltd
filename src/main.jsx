import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/Hero/Hero.jsx'
import Base from './components/Base.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
    errorElement: <div>Not found</div>
  },

  {
    path: '/base',
    element: <Base />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={ router} />
  </React.StrictMode>,
)