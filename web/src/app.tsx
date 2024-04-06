import { useState } from 'react'

import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Textarea } from './components/ui/textarea'

import { api } from './lib/api'
import { Message } from './components/message'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  async function handleSubmit() {
    try {
      if (question) {
        const response = await api.post(`/messages`, { question })
        console.log('response', response)
        if (response.status === 200) {
          setAnswer(response.data.text)
        } else {
          alert('Ocorreu um erro na sua solicitação!')
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div className="p-10">
      <h1 className="mb-2 text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        My Own GPT
      </h1>
      <h2 className="mb-8 text-center text-lg text-muted-foreground sm:text-xl">
        Essa IA foi alimentada com uma base de dados privada.
      </h2>
      <Card>
        <CardContent className="p-10">
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

            {answer && (
              <Message
                avatar="https://github.com/shadcn.png"
                message={answer}
                name={'LuffyGPT'}
              />
            )}
          </div>

          <form>
            <Textarea
              required
              placeholder="Digite sua pergunta aqui..."
              className="mb-4"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button
              variant="default"
              type="button"
              onClick={() => handleSubmit()}
            >
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
