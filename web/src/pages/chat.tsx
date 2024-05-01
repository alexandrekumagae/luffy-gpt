import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchMessages } from '@/hooks/useFetchMessages'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatForm } from '@/components/chat-form'
import { ListMessages } from '@/components/list-messages'

export function Chat() {
  const [showLoader, setShowLoader] = useState(false)

  const { messages, fetchMessages } = useFetchMessages()

  function handleSetLoader(showLoader: boolean) {
    setShowLoader(showLoader)
  }

  useEffect(() => {
    fetchMessages()
  }, [showLoader])

  return (
    <>
      <header className="grid grid-cols-3 items-center pl-5 pt-5">
        <Link to="/" className="block">
          <Button variant="default">Voltar para a tela inicial</Button>
        </Link>
        <div className="flex items-center justify-center">
          <h1 className="text-center text-2xl font-bold">Luffy GPT</h1>
        </div>
        <div></div>
      </header>

      <div className="flex min-h-full flex-col items-center justify-center pb-20 pt-20">
        <div className="mx-auto flex w-full max-w-[600px] items-center justify-center">
          <div className="w-full">
            <div className="mb-8 flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="text-center font-bold">
                  Como posso te ajudar hoje?
                </div>
              )}

              <ListMessages messages={messages} />

              {showLoader && <Skeleton className="h-[80px] w-full" />}
            </div>

            <ChatForm handleSetLoader={handleSetLoader} />
          </div>
        </div>
      </div>
    </>
  )
}
