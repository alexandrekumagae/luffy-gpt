import { FastifyInstance } from 'fastify'

import z from 'zod'

import { sendMessageToGPT } from '../../ia/gpt'

export async function sendMessage(app: FastifyInstance) {
  app.post('/api/messages', async function (request, reply) {
    const createMessageSchema = z.object({
      question: z.string().min(3),
    })

    const { question } = createMessageSchema.parse(request.body)

    try {
      const response = await sendMessageToGPT(question)

      if (!response.text) {
        return reply
          .status(500)
          .send({ message: 'Ocorreu um erro na sua solicitação.' })
      }

      return reply.status(200).send({ text: response.text })
    } catch (err) {
      console.log('erro', err)
      return reply
        .status(500)
        .send({ message: 'Ocorreu um erro na solicitação.' })
    }
  })
}
