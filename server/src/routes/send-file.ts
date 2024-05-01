import { FastifyInstance } from 'fastify'

import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

import { pipeline } from 'stream/promises'

import { convertFilesContentToDB } from '../ia/loader'

import { redis } from '../lib/redis-store'

export async function sendFile(app: FastifyInstance) {
  app.post('/api/files/upload', async function (request, reply) {
    try {
      const data = await request.file()
      if (!data || !data.file) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      const ext = path.extname(data.filename)
      const basename = path.basename(data.filename, ext)
      const uuid = randomUUID()
      const filename = `${basename}-${uuid}${ext}`

      const docsDir = path.join(__dirname, '..', '..', '..', 'tmp', 'docs')
      const savePath = path.join(docsDir, filename)

      if (!fs.existsSync(docsDir)) {
        try {
          fs.mkdirSync(docsDir, { recursive: true })
        } catch (err) {
          console.error('Failed to create directory:', err)
          return reply.status(500).send({ error: 'Failed to create directory' })
        }
      }

      try {
        await pipeline(data.file, fs.createWriteStream(savePath))
      } catch (err) {
        return reply.status(500).send({ error: 'Error processing file upload' })
      }

      convertFilesContentToDB()

      await redis.connect()

      await redis.hSet(`uploads:${filename}`, [
        'id',
        randomUUID(),
        'filename',
        filename,
        'uploadDate',
        new Date().toISOString(),
      ])

      await redis.disconnect()

      reply.status(200).send({ message: 'Upload realizado com sucesso!' })
    } catch (error) {
      reply.code(500).send({ error })
    }
  })
}
