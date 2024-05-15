import type { FastifyInstance } from "fastify"

import { verifyJwt } from "@/http/middlewares/verify-jwt"

import { create } from "./create"

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create)
}
