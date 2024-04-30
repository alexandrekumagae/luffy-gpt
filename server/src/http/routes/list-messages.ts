import { FastifyInstance } from 'fastify'

import { redis } from '../../lib/redis-store'

export async function listMessages(app: FastifyInstance) {
  app.get('/api/messages', async function (request, reply) {
    try {
      await redis.connect()

      const keys = await redis.keys('chats:*')
      const messages = await Promise.all(
        keys.map(async (key) => {
          const messageInfo = await redis.hGetAll(key)
          return { ...messageInfo }
        }),
      )

      await redis.disconnect()

      const orderedMessages = messages.sort((a, b) => {
        // Compare os valores de 'dataKey' para ordenar os objetos
        const keyA = a.createdAt
        const keyB = b.createdAt

        // Ordenar em ordem crescente
        if (keyA < keyB) {
          return -1
        } else if (keyA > keyB) {
          return 1
        } else {
          return 0
        }
      })

      reply.status(200).send(orderedMessages)
    } catch (error) {
      console.error('Error listing messages from Redis:', error)
      reply.status(500).send({ error: 'Error listing messages' })
    }
  })
}
