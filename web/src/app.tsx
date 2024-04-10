import { ArrowRightIcon } from '@radix-ui/react-icons'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from './components/ui/card'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <div>
        <h1 className="mb-4 text-center">Selecione uma opção:</h1>
        <div className="grid max-w-[600px] grid-cols-2 gap-4">
          <Link to="/chat">
            <Card className="">
              <CardHeader>
                <CardTitle className="mb-4 flex justify-between gap-4">
                  LuffyGPT <ArrowRightIcon />
                </CardTitle>
                <CardDescription>
                  Faça perguntas com base em seus dados.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/upload">
            <Card className="">
              <CardHeader>
                <CardTitle className="mb-4 flex justify-between gap-4">
                  Arquivos <ArrowRightIcon />
                </CardTitle>
                <CardDescription>
                  Cadastre novas informações para alimentar o LuffyGPT.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App
