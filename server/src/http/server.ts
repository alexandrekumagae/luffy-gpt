import fastify from 'fastify'
import cors from '@fastify/cors'

import { sendMessage } from './routes/send-message'
import { sendFile } from './routes/send-file'

import multipart from '@fastify/multipart'

const app = fastify()

app.register(multipart)

app.register(cors, {
  origin: '*',
})

app.register(sendMessage)
app.register(sendFile)

app.listen({ port: 3002, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server is running on http://localhost:3002 🔥.')
})
