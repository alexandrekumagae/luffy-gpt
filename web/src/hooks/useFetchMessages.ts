import { useState, useEffect } from 'react'

import { api } from '@/lib/api'

import { useToast } from '@/components/ui/use-toast'

export function useFetchMessages() {
  const { toast } = useToast()

  const [messages, setMessages] = useState([])

  async function fetchMessages() {
    try {
      const response = await api.get('/messages')

      if (response.status === 200) {
        setMessages(response.data)
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar o histórico de mensagens!',
          description: 'Tente novamente daqui alguns minutos.',
        })
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar o histórico de mensagens!',
        description: 'Tente novamente daqui alguns minutos.',
      })
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return { messages, fetchMessages }
}
