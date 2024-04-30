import { useState, useEffect } from 'react'

import { api } from '@/lib/api'

export function useFetchMessages() {
  const [messages, setMessages] = useState([])

  async function fetchMessages() {
    try {
      const response = await api.get('/messages')
      setMessages(response.data)
    } catch {}
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return { messages, fetchMessages }
}
