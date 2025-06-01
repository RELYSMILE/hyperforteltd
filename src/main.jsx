import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Screens/Home.jsx'
import Login from './Screens/Login.jsx'

const a = 1

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Not found</div>
  },
])
const route = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <div>Not found</div>
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <div>Not found</div>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {a === 1 ?
      <RouterProvider router={ router} />
    :
    <RouterProvider router={ route} />}
  </React.StrictMode>,
)