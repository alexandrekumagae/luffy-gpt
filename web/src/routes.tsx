import { createBrowserRouter } from 'react-router-dom'

import App from './app'

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
    path: '/upload',
    element: <Upload />,
  },
])
