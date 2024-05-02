import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

import { sendMessage } from './routes/send-message'
import { sendFile } from './routes/send-file'
import { listUploads } from './routes/list-uploads'
import { listMessages } from './routes/list-messages'

const app = fastify()

app.register(multipart)

app.register(cors, {
  origin: '*',
})

app.register(sendMessage)
app.register(listMessages)

app.register(sendFile)
app.register(listUploads)

app.listen({ port: 3002, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server is running on http://localhost:3002 🔥.')
})
