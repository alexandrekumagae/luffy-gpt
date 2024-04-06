import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import App from './app'

import { Login } from './pages/login'
import { Dashboard } from './pages/(admin)/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])
