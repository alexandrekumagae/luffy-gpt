import { useState, useEffect } from 'react'

import { api } from '@/lib/api'

export function useFetchUploads() {
  const [uploads, setUploads] = useState([])

  async function fetchUploads() {
    try {
      const response = await api.get('/uploads')
      setUploads(response.data)
    } catch {}
  }

  useEffect(() => {
    fetchUploads()
  }, [])

  return { uploads }
}
