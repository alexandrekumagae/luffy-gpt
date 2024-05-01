import { FastifyInstance } from 'fastify'

import { redis } from '../lib/redis-store'

export async function listUploads(app: FastifyInstance) {
  app.get('/api/uploads', async function (request, reply) {
    try {
      await redis.connect()

      const keys = await redis.keys('uploads:*')
      const uploads = await Promise.all(
        keys.map(async (key) => {
          const filename = key.split(':')[1]
          const uploadInfo = await redis.hGetAll(key)
          return { filename, ...uploadInfo }
        }),
      )

      await redis.disconnect()

      reply.status(200).send(uploads)
    } catch (error) {
      console.error('Error listing uploads from Redis:', error)
      reply.status(500).send({ error: 'Error listing uploads' })
    }
  })
}
