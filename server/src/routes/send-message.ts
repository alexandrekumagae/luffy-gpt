import { FastifyInstance } from 'fastify'

import z from 'zod'

import { randomUUID } from 'node:crypto'

import { sendMessageToGPT } from '../ia/gpt'

import { redis } from '../lib/redis-store'

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

      await redis.connect()

      await redis.hSet(`chats:${randomUUID()}`, [
        'id',
        randomUUID(),
        'message',
        question,
        'type',
        'question',
        'createdAt',
        new Date().toISOString(),
      ])

      await redis.hSet(`chats:${randomUUID()}`, [
        'id',
        randomUUID(),
        'message',
        response.text,
        'type',
        'answer',
        'createdAt',
        new Date().toISOString(),
      ])

      await redis.disconnect()

      return reply.status(200).send({ text: response.text })
    } catch (err) {
      console.log('erro', err)
      return reply
        .status(500)
        .send({ message: 'Ocorreu um erro na solicitação.' })
    }
  })
}
