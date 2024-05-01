import { useEffect } from 'react'
import { Message } from './message'

interface Messages {
  id: string
  message: string
  type: string
  createdAt: string
}

interface ListMessagesProps {
  messages: Messages[]
}

export function ListMessages({ messages }: ListMessagesProps) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages])

  return (
    <>
      <ul className="flex flex-col gap-4">
        {messages.map((message) => (
          <li key={message.id}>
            <Message
              avatar={
                message.type === 'question'
                  ? 'https://github.com/alexandrekumagae.png'
                  : 'https://github.com/shadcn.png'
              }
              message={message.message}
              name={message.type === 'question' ? 'Você' : 'LuffyGPT'}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
