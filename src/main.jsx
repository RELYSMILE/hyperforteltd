import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import Dashboard from './Admin/Dashboard/Dashboard.jsx'
import UpdateBook from './Admin/UpdateBook/UpdateBook.jsx'
import AddNewBook from './Admin/AddNewBook/AddNewBook.jsx'
import LibraryManagement from './Admin/LibraryManagement/LibraryManagement.jsx'
import ManageAdmin from './Admin/ManageAdmin/ManageAdmin.jsx'
import Settinggs from './Admin/Settinggs/Settinggs.jsx'
import BookStatus from './Admin/BookStatus/BookStatus.jsx'
import Home from './Public/Home/Home.jsx'
import About from './Public/About/About.jsx'
import Books from './Public/Books/Books.jsx'
import Login from './Public/Login/Login.jsx'
import AdminRole from './Admin/AdminRole/AdminRole.jsx'
import { AppContextProvider } from './Admin/Context/Context.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/home',
    element: <App />,
    errorElement: <div className='not-found'>
        <div className='title'>Eur-Africa says</div>
        <div className='error'>Error 404</div>
        <div className='error-message'>Page Not found</div>
      </div>
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <div className='not-found'>
        <div className='title'>Eur-Africa says</div>
        <div className='error'>Error 404</div>
        <div className='error-message'>Page Not found</div>
      </div>
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/authentication',
    element: <Login />,
  },

  // ================================== Admin ==============================================
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/books-management',
    element: <LibraryManagement />,
  },
  {
    path: '/add-new-book',
    element: <AddNewBook />,
  },
  {
    path: '/update-book/:bookID',
    element: <UpdateBook />,
  },
  {
    path: '/book-status',
    element: <BookStatus />,
  },
  {
    path: '/administrative-management',
    element: <ManageAdmin />,
  },
  {
    path: '/admin-role',
    element: <AdminRole />,
  },
  {
    path: '/settings',
    element: <Settinggs />,
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <AppContextProvider>
      <RouterProvider router={ router} />
    </AppContextProvider>
  </React.StrictMode>,
)