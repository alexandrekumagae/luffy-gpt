import { ArrowRightIcon } from '@radix-ui/react-icons'

import { OptionCard } from './components/option-card'

function App() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div>
        <h1 className="mb-4 text-center">Selecione uma opção:</h1>

        <div className="grid max-w-[600px] grid-cols-2 gap-4">
          <OptionCard
            title="LuffyGPT"
            icon={<ArrowRightIcon />}
            link="/chat"
            description="Faça perguntas com base em seus dados."
          />

          <OptionCard
            title="Arquivos"
            icon={<ArrowRightIcon />}
            link="/upload"
            description="Cadastre novas informações para alimentar o LuffyGPT."
          />
        </div>
      </div>
    </div>
  )
}

export default App
