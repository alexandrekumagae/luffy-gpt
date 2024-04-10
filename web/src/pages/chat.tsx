import { useState } from 'react'
import { Link } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { api } from '@/lib/api'

import { Message } from '@/components/message'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

const formSchema = z.object({
  question: z.string().min(3, { message: 'Campo obrigatório.' }),
})

type FormData = z.infer<typeof formSchema>

export function Chat() {
  const { toast } = useToast()

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (data) {
        setQuestion(data.question)
        setShowLoader(true)
        const response = await api.post(`/messages`, data)
        if (response.status === 200) {
          setAnswer(response.data.text)
          reset()
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro no envio da pergunta!',
            description: 'Tente novamente daqui alguns minutos.',
          })
        }
        setShowLoader(false)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no envio da pergunta!',
        description: 'Tente novamente daqui alguns minutos.',
      })
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              required
              placeholder="Digite sua pergunta aqui..."
              className="mb-4"
              {...register('question')}
            />
            <Button variant="default" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
