import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { Toaster } from '@/components/ui/toaster'

import { Footer } from './components/footer'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    <Footer />

    <Toaster />
  </React.StrictMode>,
)
