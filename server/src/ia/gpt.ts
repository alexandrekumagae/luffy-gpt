import { RetrievalQAChain } from 'langchain/chains'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'

import { redis, redisVectorStore } from '../lib/redis-store'

const openAiChat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAIA_API_KEY,
  modelName: 'gpt-3.5-turbo',
  temperature: 0.3,
})

const prompt = new PromptTemplate({
  template: `
    Você responde perguntas a respeito das informações pessoais do usuário.
    Use o conteúdo dos documentos abaixo para responder a pergunta do usuário.
    Se a resposta não for encontrada nos documentos, responda que você não sabe, não tente inventar uma resposta.

    Documentos:
    {context}

    Pergunta:
    {question}
  `.trim(),
  inputVariables: ['context', 'question'],
})

const chain = RetrievalQAChain.fromLLM(
  openAiChat,
  redisVectorStore.asRetriever(),
  {
    prompt,
    returnSourceDocuments: false,
    verbose: false,
  },
)

export async function sendMessageToGPT(message: string) {
  await redis.connect()

  const response = await chain.call({
    query: message,
  })

  await redis.disconnect()

  return response
}
