import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchMessages } from '@/hooks/useFetchMessages'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatForm } from '@/components/chat/chat-form'
import { ListMessages } from '@/components/chat/list-messages'

import { ArrowDownIcon } from '@radix-ui/react-icons'

export function Chat() {
  const [showLoader, setShowLoader] = useState(false)

  const { messages, fetchMessages } = useFetchMessages()

  function handleSetLoader(showLoader: boolean) {
    setShowLoader(showLoader)
  }

  useEffect(() => {
    if (!showLoader) {
      fetchMessages()
    }
  }, [showLoader])

  return (
    <>
      <Button
        className="fixed bottom-10 right-10"
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <ArrowDownIcon />
      </Button>

      <header className="fixed left-0 top-0 z-10 grid w-full grid-cols-3 items-center bg-white p-4">
        <Link to="/" className="flex">
          <Button variant="default">Voltar para a tela inicial</Button>
        </Link>

        <div className="flex items-center justify-center">
          <h1 className="text-center text-2xl font-bold">Luffy GPT</h1>
        </div>

        <div className="flex justify-end"></div>
      </header>

      <div className="flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-20">
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
