import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useLoginStore } from '@/store'

import { api } from '@/lib/api'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  login: z.string().min(2, {
    message: 'Login must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { login, setLogin } = useLoginStore()

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.post('/users/login', data)

      console.log('response', response)
      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Erro no login!',
          description: 'Login ou senha inválidos.',
        })
      }

      setLogin(data.login)
      navigate('/upload')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no login!',
        description: 'Login ou senha inválidos.',
      })
    }
  }

  useEffect(() => {
    if (login) {
      navigate('/upload')
    }
  }, [login])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Link to="/" className="absolute left-5 top-5">
        <Button variant="default">Voltar para a tela inicial</Button>
      </Link>
      <div className="mx-auto flex max-w-[600px] items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h1 className="mb-4 text-center">
            Entre com suas credenciais para acessar a ferramenta:
          </h1>

          <Label htmlFor="login" className="mb-2 block">
            Login
          </Label>
          <Input
            required
            id="login"
            placeholder="Digite seu login"
            className="mb-4"
            {...register('login')}
          />

          <Label htmlFor="password" className="mb-2 block">
            Senha
          </Label>
          <Input
            required
            id="password"
            placeholder="Digite sua senha"
            className="mb-4"
            type="password"
            {...register('password')}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  )
}
