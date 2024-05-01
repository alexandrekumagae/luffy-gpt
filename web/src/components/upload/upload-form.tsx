import { api } from '@/lib/api'

import { useToast } from '@/components/ui/use-toast'

import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const formSchema = z.object({
  file: z.any(),
})

type FormData = z.infer<typeof formSchema>

export function UploadForm() {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Input type="file" id="file" {...register('file')} required />
          {errors.file && <span>{errors.file.message}</span>}
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </>
  )
}
