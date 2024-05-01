import { Link } from 'react-router-dom'

import { useFetchUploads } from '@/hooks/useFetchUploads'

import { UploadForm } from '@/components/upload-form'
import { UploadsTable } from '@/components/uploads-table'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Upload() {
  const { uploads } = useFetchUploads()

  return (
    <>
      <header className="grid grid-cols-3 items-center pl-5 pt-5">
        <Link to="/" className="block">
          <Button variant="default">Voltar para a tela inicial</Button>
        </Link>
        <div className="flex items-center justify-center">
          <h1 className="text-center text-2xl font-bold">Arquivos</h1>
        </div>
        <div></div>
      </header>

      <div className="flex min-h-[90vh] flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div>
            <Card className="mx-auto w-[450px]">
              <CardHeader>
                <CardTitle>
                  Selecione o documento a ser enviado para base de dados
                </CardTitle>
              </CardHeader>

              <CardContent>
                <UploadForm />
              </CardContent>
            </Card>

            <h2 className="mb-4 mt-4">Lista de uploads:</h2>
            <UploadsTable uploads={uploads} />
          </div>
        </div>
      </div>
    </>
  )
}
