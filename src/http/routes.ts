import { FastifyInstance } from "fastify";
import { app } from "../app";
import { register } from "./controllers/register";

export async function appRoutes(app:FastifyInstance) {
  app.post('/users', register)

}