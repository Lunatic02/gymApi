import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { register } from './http/controllers/register'


export const app = fastify()

app.register(fastifyJwt, {
  secret: 'pocopianao'
})

app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation Errror', issues: error.format() })
  }
  return reply.status(500).send({ message: 'Internal server error' })
})

