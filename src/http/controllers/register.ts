import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUseCase } from "../../use-cases/register"
import { PrismaUsersRepository } from "../../repositories/prisma-users-repository"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name, email, password
    })
  } catch (err) {
    return reply.status(409).send({
      message: 'E-mail already in use'
    })

  }

  return reply.status(201).send()
} 