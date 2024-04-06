import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/api'

const formSchema = z.object({
  file: z.string().refine((value) => !!value, {
    message: 'Please select a file',
    path: ['file'],
  }),
})

export function Dashboard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('file', data.file)

    const response = await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('response', response)
  }

  return (
    <div className="p-5">
      <Link to="/">
        <Button variant="default">Voltar para o chat</Button>
      </Link>
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              Selecione o documento a ser enviado para base de dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Selecione o arquivo"
                          type="file"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Entrar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
