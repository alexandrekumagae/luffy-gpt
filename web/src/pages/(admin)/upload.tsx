import { Link } from 'react-router-dom'

import { api } from '@/lib/api'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@/components/ui/table'

interface UploadProps {
  id: string
  filename: string
  uploadDate: string
}

const formSchema = z.object({
  file: z.any(),
})

type FormData = z.infer<typeof formSchema>

export function Upload() {
  const { toast } = useToast()

  const [uploads, setUploads] = useState([])

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

  async function getUploads() {
    try {
      const response = await api.get('/uploads')
      setUploads(response.data)
    } catch {}
  }

  useEffect(() => {
    getUploads()
  }, [])

  return (
    <div className="p-5">
      <Link to="/">
        <Button variant="default">Voltar para a tela inicial</Button>
      </Link>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div>
          <Card className="mx-auto w-[690px]">
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
          <h2 className="mb-4 mt-4">Lista de uploads:</h2>
          {uploads.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Arquivo</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploads &&
                  uploads.map((upload: UploadProps, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{upload.id}</TableCell>
                      <TableCell>{upload.filename}</TableCell>
                      <TableCell>{upload.uploadDate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <>Nenhum arquivo enviado.</>
          )}
        </div>
      </div>
    </div>
  )
}
