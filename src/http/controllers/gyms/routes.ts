import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { authenticate } from "../users/authenticate.spec";
import { profile } from "../users/profile";
import { register } from "../users/register";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // When Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}