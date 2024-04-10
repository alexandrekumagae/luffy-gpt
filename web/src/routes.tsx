import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import App from './app'

import { Login } from './pages/login'
import { Upload } from './pages/upload'
import { Chat } from './pages/chat'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
])
