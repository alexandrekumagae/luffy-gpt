import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Message } from '@/components/message'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatForm } from '@/components/chat-form'

export function Chat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  function handleSetQuestion(question: string) {
    setQuestion(question)
  }

  function handleSetAnswer(answer: string) {
    setAnswer(answer)
  }

  function handleSetLoader(showLoader: boolean) {
    setShowLoader(showLoader)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Link to="/" className="absolute left-5 top-5">
        <Button variant="default">Voltar para a tela inicial</Button>
      </Link>
      <div className="mx-auto flex w-full max-w-[600px] items-center justify-center">
        <div className="w-full">
          <div className="mb-8 flex flex-col gap-4">
            {!question && (
              <h1 className="text-center font-bold">
                Como posso te ajudar hoje?
              </h1>
            )}

            {question && (
              <Message
                avatar="https://github.com/alexandrekumagae.png"
                message={question}
                name={'Você'}
              />
            )}

            {showLoader && <Skeleton className="h-[80px] w-full" />}

            {answer && (
              <Message
                avatar="https://github.com/shadcn.png"
                message={answer}
                name={'LuffyGPT'}
              />
            )}
          </div>

          <ChatForm
            handleSetQuestion={handleSetQuestion}
            handleSetAnswer={handleSetAnswer}
            handleSetLoader={handleSetLoader}
          />
        </div>
      </div>
    </div>
  )
}
