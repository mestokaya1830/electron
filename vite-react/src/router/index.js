import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'
const Login = React.lazy(() => import('../pages/Login'))
const Register = React.lazy(() => import('../pages/Register'))

export default function index() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
