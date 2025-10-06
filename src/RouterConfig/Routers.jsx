import React from 'react'
import Home from '../Public/Home/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const routes = [
    { path: '/', element: <Home />, errorElement: <div>Error 4O4</div>},

]
const router = createBrowserRouter(routes)

const Routers = () => {

  return <RouterProvider router = {router} />
}

export default Routers