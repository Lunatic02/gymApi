import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/gyms/routes'
import { gymsRoutes } from './http/controllers/users/routes'


export const app = fastify()

app.register(fastifyJwt, {
  secret: 'pocopianao'
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation Errror', issues: error.format() })
  }
  return reply.status(500).send({ message: 'Internal server error' })
})

