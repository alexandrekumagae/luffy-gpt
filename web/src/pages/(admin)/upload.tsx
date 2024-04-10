import { Link } from 'react-router-dom'

import { api } from '@/lib/api'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  file: z.any(),
})

type FormData = z.infer<typeof formSchema>

export function Upload() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.file) {
      toast({
        variant: 'destructive',
        title: 'Erro no upload do arquivo.',
        description: 'Selecione um arquivo.',
      })
      return
    }

    const formData = new FormData()
    formData.append('file', data.file)

    try {
      const response = await api.post('/files/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        toast({
          variant: 'default',
          title: 'Arquivo enviado com sucesso!',
        })
        reset()
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro no upload do arquivo!',
          description: 'Tente novamente em alguns minutos.',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no upload do arquivo!',
        description: 'Tente novamente em alguns minutos.',
      })
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className="p-5">
      <Link to="/">
        <Button variant="default">Voltar para a tela inicial</Button>
      </Link>
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              Selecione o documento a ser enviado para base de dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <Input type="file" id="file" {...register('file')} required />
                {errors.file && <span>{errors.file.message}</span>}

                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}