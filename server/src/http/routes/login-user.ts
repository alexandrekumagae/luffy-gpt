import { FastifyInstance } from 'fastify'

import z from 'zod'

export async function loginUser(app: FastifyInstance) {
  app.post('/api/users/login', async function (request, reply) {
    try {
      const loginSchema = z.object({
        login: z.string().min(3),
        password: z.string().min(3),
      })

      const { login, password } = loginSchema.parse(request.body)

      if (
        login !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
      ) {
        reply.status(500).send({ message: 'Login ou senha incorretos!' })
      }

      reply.status(200).send()
    } catch (error) {
      reply.status(500).send({ message: 'Login error, try again!' })
    }
  })
}
