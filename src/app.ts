import fastify from 'fastify'
import {z} from 'zod'
import {prisma} from './lib/prisma'
import { request } from 'http'
import { register } from './http/controllers/register'

export const app = fastify()


