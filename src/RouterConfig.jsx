import React from 'react'
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
import ProtectedRoute from './ProtectedRoute.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const routes = [
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

  // Admin protected routes
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/books-management',
    element: <ProtectedRoute><LibraryManagement /></ProtectedRoute>,
  },
  {
    path: '/add-new-book',
    element: <ProtectedRoute><AddNewBook /></ProtectedRoute>,
  },
  {
    path: '/update-book/:bookID',
    element: <ProtectedRoute><UpdateBook /></ProtectedRoute>,
  },
  {
    path: '/book-status',
    element: <ProtectedRoute><BookStatus /></ProtectedRoute>,
  },
  {
    path: '/administrative-management',
    element: <ProtectedRoute><ManageAdmin /></ProtectedRoute>,
  },
  {
    path: '/admin-role',
    element: <ProtectedRoute><AdminRole /></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><Settinggs /></ProtectedRoute>,
  },
]

const router = createBrowserRouter(routes)

const RouterConfig = () => {
  return <RouterProvider router={router} />
}

export default RouterConfig
