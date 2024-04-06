import { FastifyInstance } from 'fastify'

import z from 'zod'

export async function sendFile (app: FastifyInstance) {  
  app.post('/api/files', async function(request, reply) {  
    const createLinkSchema = z.object({
      file: z.string().refine((value) => !!value, {
        message: 'Please select a file',
        path: ['file'],
      }),
    })
    
    const { file } = createLinkSchema.parse(request.file)
    
    console.log('file', file)
    // try {
    // } catch (err) {
    //   return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    // }
  })
}