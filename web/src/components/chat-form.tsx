import { api } from '@/lib/api'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useToast } from '@/components/ui/use-toast'

import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  question: z.string().min(3, { message: 'Campo obrigatório.' }),
})

type FormData = z.infer<typeof formSchema>

interface ChatFormProps {
  handleSetQuestion: (question: string) => void
  handleSetAnswer: (answer: string) => void
  handleSetLoader: (setLoader: boolean) => void
}

export function ChatForm({
  handleSetQuestion,
  handleSetAnswer,
  handleSetLoader,
}: ChatFormProps) {
  const { toast } = useToast()

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (data) {
        handleSetQuestion(data.question)
        handleSetLoader(true)

        const response = await api.post(`/messages`, data)
        if (response.status === 200) {
          handleSetAnswer(response.data.text)
          reset()
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro no envio da pergunta!',
            description: 'Tente novamente daqui alguns minutos.',
          })
        }

        handleSetLoader(false)
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
  )
}
